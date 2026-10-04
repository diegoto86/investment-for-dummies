import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, basename, dirname } from 'node:path';
import { Marked } from 'marked';
import { z } from 'zod';
import { isCourseAvailable } from './domain';
import {
  courseSchema, moduleSchema, lessonSchema, quizSchema,
  type Course, type Module, type Lesson, type Quiz, type LessonDocument, type LessonBlock,
} from './schema';

const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
const safeUrl = (url: string) => /^(https?:\/\/|\/(?!\/)|#)/.test(url);
const markdown = new Marked({ renderer: {
  html() { throw new Error('Raw HTML is not allowed in lesson Markdown'); },
  link({ href, tokens }) {
    if (!safeUrl(href)) throw new Error('Unsafe Markdown link');
    return `<a href="${escape(href)}">${this.parser.parseInline(tokens)}</a>`;
  },
  image({ href, text }) {
    if (!text.trim()) throw new Error('Markdown images require alternative text');
    if (!safeUrl(href)) throw new Error('Unsafe Markdown image');
    return `<img src="${escape(href)}" alt="${escape(text)}" />`;
  },
} });
export function compileMarkdown(source: string): string {
  return markdown.parse(source, { async: false });
}

export interface CatalogInput { courses: unknown[]; modules: unknown[]; lessons: unknown[]; quizzes: unknown[] }
export interface Catalog { courses: Course[]; modules: Module[]; lessons: Lesson[]; quizzes: Quiz[] }

function orderSiblings<T extends { id: string; order: number }>(records: T[], parentId: (record: T) => string, label: string): T[] {
  const positions = new Set<string>();
  for (const record of records) {
    const parent = parentId(record);
    const position = `${parent}/${record.order}`;
    if (positions.has(position)) throw new Error(`${label} ${record.id}: duplicate sibling order ${record.order} in ${parent}`);
    positions.add(position);
  }
  return records.sort((a, b) => {
    const parentA = parentId(a), parentB = parentId(b);
    return parentA === parentB ? a.order - b.order : parentA < parentB ? -1 : 1;
  });
}

function parse<T>(schema: z.ZodType<T>, value: unknown, label: string): T {
  const result = schema.safeParse(value);
  if (!result.success) throw new Error(`${label}: ${z.prettifyError(result.error)}`);
  return result.data;
}
export function validateCatalog(input: CatalogInput): Catalog {
  const courses = input.courses.map(value => parse(courseSchema, value, 'Course'));
  const modules = input.modules.map(value => parse(moduleSchema, value, 'Module'));
  const lessons = input.lessons.map(value => parse(lessonSchema, value, 'Lesson'));
  const quizzes = input.quizzes.map(value => parse(quizSchema, value, 'Quiz'));
  for (const [label, records] of [['Course', courses], ['Module', modules], ['Lesson', lessons], ['Quiz', quizzes]] satisfies [string, { id: string }[]][]) {
    const ids = new Set<string>();
    for (const record of records) {
      if (ids.has(record.id)) throw new Error(`${label}: duplicate ID ${record.id}`);
      ids.add(record.id);
    }
  }
  const routes = new Set<string>();
  for (const module of modules) if (!courses.some(course => course.id === module.courseId)) throw new Error(`Module ${module.id}: unresolved course ${module.courseId}`);
  for (const lesson of lessons) {
    const module = modules.find(module => module.id === lesson.moduleId);
    if (!module) throw new Error(`Lesson ${lesson.id}: unresolved module ${lesson.moduleId}`);
    const route = `${module.courseId}/${lesson.slug}`;
    if (routes.has(route)) throw new Error(`Duplicate lesson route ${route}`);
    routes.add(route);
    const blockIds = new Set<string>();
    for (const block of lesson.blocks) {
      if (blockIds.has(block.id)) throw new Error(`Lesson ${lesson.id}: duplicate block ID ${block.id}`);
      blockIds.add(block.id);
      if (block.kind === 'quiz' && !quizzes.some(quiz => quiz.id === block.quizId)) throw new Error(`Lesson ${lesson.id}: unresolved quiz ${block.quizId}`);
    }
  }
  return {
    courses: courses.sort((a,b) => a.order-b.order),
    modules: orderSiblings(modules, module => module.courseId, 'Module'),
    lessons: orderSiblings(lessons, lesson => lesson.moduleId, 'Lesson'),
    quizzes,
  };
}

async function files(directory: string): Promise<string[]> {
  const results: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await files(path));
    else if (entry.name.endsWith('.json')) results.push(path);
  }
  return results.sort();
}
export async function loadCatalog(root = resolve('content/courses')) {
  const input: CatalogInput = { courses: [], modules: [], lessons: [], quizzes: [] };
  const narrativePaths = new Map<string, string>();
  for (const path of await files(root)) {
    let value: unknown;
    try { value = JSON.parse(await readFile(path, 'utf8')); }
    catch (error) { throw new Error(`Cannot read content ${path}`, { cause: error }); }
    if (path.endsWith('course.json')) input.courses.push(value);
    else if (basename(dirname(path)) === 'modules' && path.endsWith('.json')) input.modules.push(value);
    else if (basename(dirname(path)) === 'lessons' && path.endsWith('.json')) {
      const lesson = parse(lessonSchema, value, path);
      input.lessons.push(lesson);
      narrativePaths.set(lesson.id, resolve(path, '..'));
    } else if (basename(dirname(path)) === 'activities') input.quizzes.push(value);
    else throw new Error(`Unknown content file ${path}`);
  }
  const catalog = validateCatalog(input);
  const documents: LessonDocument[] = [];
  for (const lesson of catalog.lessons) {
    const blocks: LessonBlock[] = [];
    for (const block of lesson.blocks) {
      if (block.kind === 'narrative') {
        const directory = narrativePaths.get(lesson.id);
        if (!directory) throw new Error(`Missing narrative directory for ${lesson.id}`);
        const path = join(directory, block.file);
        let source: string;
        try { source = await readFile(path, 'utf8'); }
        catch (error) { throw new Error(`Lesson ${lesson.id}: unresolved narrative ${path}`, { cause: error }); }
        blocks.push({ id: block.id, kind: 'narrative', html: compileMarkdown(source) });
      } else if (block.kind === 'quiz') {
        const quiz = catalog.quizzes.find(quiz => quiz.id === block.quizId);
        if (!quiz) throw new Error(`Unresolved quiz ${block.quizId}`);
        blocks.push({ id: block.id, kind: 'quiz', quiz });
      } else blocks.push(block);
    }
    documents.push({ ...lesson, blocks });
  }
  return { ...catalog, documents };
}

export function lessonRoutes(catalog: Awaited<ReturnType<typeof loadCatalog>>) {
  return catalog.documents.map(lesson => {
    const module = catalog.modules.find(module => module.id === lesson.moduleId);
    if (!module) throw new Error(`Unresolved module ${lesson.moduleId}`);
    return { params: { courseId: module.courseId, lessonSlug: lesson.slug }, props: { lesson } };
  });
}
export function courseStatus(course: Course) {
  return isCourseAvailable(course) ? 'En desarrollo' : 'Próximamente';
}
