import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadCatalog, validateCatalog, lessonRoutes, compileMarkdown, type CatalogInput } from '../../src/features/learning/catalog';
import { evaluateQuiz } from '../../src/features/learning/domain';
import { lessonSchema } from '../../src/features/learning/schema';

async function fixtureInput(): Promise<CatalogInput> {
  const { courses, modules, lessons, quizzes } = await loadCatalog();
  return structuredClone({ courses, modules, lessons, quizzes });
}
test('canonical courses and the five fixture blocks load from repository files', async () => {
  const catalog = await loadCatalog();
  assert.deepEqual(catalog.courses.map(course => course.id), ['000','101','201','301','401','501']);
  assert.deepEqual(catalog.courses.map(course => course.title), ['Investing Foundations','Build Your Investment System','Understand Any Business','What Is It Worth?','Spot the Opportunity','Manage Your Portfolio']);
  assert.deepEqual(catalog.documents[0]?.blocks.map(block => block.kind), ['narrative','callout','example','quiz','sources']);
  assert.equal(lessonRoutes(catalog)[0]?.params.lessonSlug, 'fixture-interna');
  const block = catalog.documents[0]?.blocks[0];
  assert.ok(block?.kind === 'narrative');
  assert.ok(block.html.includes('<strong>prueba interna de la plataforma</strong>'));
});
test('duplicate identities and unresolved references are rejected', async () => {
  const input = await fixtureInput();
  assert.throws(() => validateCatalog({ ...input, courses: [...input.courses, input.courses[0]] }), /duplicate ID/);
  assert.throws(() => validateCatalog({ ...input, modules: [] }), /unresolved module/);
  assert.throws(() => validateCatalog({ ...input, courses: [] }), /unresolved course/);
  assert.throws(() => validateCatalog({ ...input, quizzes: [] }), /unresolved quiz/);
  const lesson = lessonSchema.parse(input.lessons[0]);
  assert.throws(() => validateCatalog({ ...input, lessons: [{ ...lesson, blocks: [...lesson.blocks, lesson.blocks[0]] }] }), /duplicate block ID/);
  assert.throws(() => validateCatalog({ ...input, lessons: [{ ...lesson, id: 'copy' }, lesson] }), /Duplicate lesson route/);
});
test('unknown blocks, answer keys, duplicate options and missing source labels fail validation', async () => {
  const catalog = await loadCatalog();
  const input = await fixtureInput();
  const lesson = catalog.lessons[0];
  const quiz = catalog.quizzes[0];
  assert.ok(lesson && quiz);
  assert.throws(() => validateCatalog({ ...input, lessons: [{ ...lesson, blocks: [{ id: 'bad', kind: 'unknown' }] }] }), /Lesson/);
  assert.throws(() => validateCatalog({ ...input, quizzes: [{ ...quiz, correctOptionId: 'missing' }] }), /Invalid quiz answer key/);
  assert.throws(() => validateCatalog({ ...input, quizzes: [{ ...quiz, options: [...quiz.options, quiz.options[0]] }] }), /Duplicate quiz option IDs/);
  assert.throws(() => validateCatalog({ ...input, lessons: [{ ...lesson, blocks: [{ id: 'sources', kind: 'sources', title: '', sources: [] }] }] }), /Lesson/);
});
test('Markdown excludes raw HTML, unsafe links and images without alt text', () => {
  assert.throws(() => compileMarkdown('<script>alert(1)</script>'), /Raw HTML/);
  assert.throws(() => compileMarkdown('[bad](javascript:alert)'), /Unsafe/);
  assert.throws(() => compileMarkdown('![](/image.jpg)'), /alternative text/);
  assert.ok(compileMarkdown('![A useful illustration](/image.jpg)').includes('alt="A useful illustration"'));
});

test('Markdown link labels preserve inline formatting and entities without permitting HTML', () => {
  const html = compileMarkdown('[**Bold** *emphasis* `code` ~~deleted~~ A &amp; B](https://example.org?a=1&b=2)');
  assert.ok(html.includes('<strong>Bold</strong>'));
  assert.ok(html.includes('<em>emphasis</em>'));
  assert.ok(html.includes('<code>code</code>'));
  assert.ok(html.includes('<del>deleted</del>'));
  assert.ok(html.includes('A &amp; B'));
  assert.ok(!html.includes('&amp;amp;'));
  assert.ok(html.includes('href="https://example.org?a=1&amp;b=2"'));
  assert.throws(() => compileMarkdown('[<strong>unsafe</strong>](https://example.org)'), /Raw HTML/);
  assert.throws(() => compileMarkdown('[**unsafe**](javascript:alert)'), /Unsafe/);
  assert.throws(() => compileMarkdown('[![](/image.jpg)](https://example.org)'), /alternative text/);
  assert.ok(compileMarkdown('[![Chart](/image.jpg)](https://example.org)').includes('<img src="/image.jpg" alt="Chart"'));
});

test('modules and lessons use authored sibling order and reject duplicate positions', async () => {
  const input = await fixtureInput();
  const { modules, lessons } = await loadCatalog();
  const module = modules[0], lesson = lessons[0];
  assert.ok(module && lesson);
  const laterModule = { ...module, id: 'a-later-module', order: 10 };
  const laterLesson = { ...lesson, id: 'a-later-lesson', slug: 'later', order: 10 };
  const catalog = validateCatalog({ ...input, modules: [laterModule, module], lessons: [laterLesson, lesson] });
  assert.deepEqual(catalog.modules.map(record => record.id), [module.id, laterModule.id]);
  assert.deepEqual(catalog.lessons.map(record => record.id), [lesson.id, laterLesson.id]);
  assert.throws(() => validateCatalog({ ...input, modules: [module, { ...laterModule, order: module.order }] }), /Module.*duplicate sibling order/);
  assert.throws(() => validateCatalog({ ...input, lessons: [lesson, { ...laterLesson, order: lesson.order }] }), /Lesson.*duplicate sibling order/);
  assert.throws(() => validateCatalog({ ...input, modules: [{ ...module, order: -1 }] }), /Module/);
  assert.throws(() => validateCatalog({ ...input, lessons: [{ ...lesson, order: 0.5 }] }), /Lesson/);
  const separateParents = validateCatalog({ ...input,
    modules: [module, { ...module, id: 'other-course-module', courseId: '101' }],
    lessons: [lesson, { ...lesson, id: 'other-module-lesson', moduleId: 'other-course-module' }],
  });
  assert.equal(separateParents.modules.length, 2);
  assert.equal(separateParents.lessons.length, 2);
});
test('quiz evaluates submitted choices and rejects an unknown option', async () => {
  const { quizzes } = await loadCatalog();
  const quiz = quizzes[0];
  assert.ok(quiz);
  assert.equal(evaluateQuiz(quiz, 'verify').correct, true);
  assert.equal(evaluateQuiz(quiz, 'follow').correct, false);
  assert.throws(() => evaluateQuiz(quiz, 'unknown'), /Unknown quiz option/);
});
test('another lesson file generates another route with no page implementation', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'invest-content-'));
  try {
    await cp('content/courses', directory, { recursive: true });
    const original: unknown = JSON.parse(await readFile(join(directory,'000/lessons/fixture.json'),'utf8'));
    const lesson = lessonSchema.parse(original);
    await writeFile(join(directory,'000/lessons/another.json'), JSON.stringify({ ...lesson, id: '000-another-fixture', slug: 'otra-prueba', order: 1 }));
    const routes = lessonRoutes(await loadCatalog(directory));
    assert.equal(routes.length, 2);
    assert.ok(routes.some(route => route.params.lessonSlug === 'otra-prueba'));
    await rm(join(directory,'000/lessons/fixture.md'));
    await assert.rejects(loadCatalog(directory), /unresolved narrative/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
