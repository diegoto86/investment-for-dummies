import { z } from 'zod';

const stableId = z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'Use a stable lowercase ID');
export const courseIdSchema = z.enum(['000', '101', '201', '301', '401', '501']).brand<'CourseId'>();
const moduleIdSchema = stableId.brand<'ModuleId'>();
const lessonIdSchema = stableId.brand<'LessonId'>();
const quizIdSchema = stableId.brand<'QuizId'>();
const blockIdSchema = stableId.brand<'BlockId'>();
const text = z.string().trim().min(1);
const sourceSchema = z.strictObject({ title: text, url: z.url().refine(url => url.startsWith('https://'), 'Sources require HTTPS') });

export const courseSchema = z.strictObject({
  id: courseIdSchema, title: text, description: text, journeyCta: text,
  status: z.enum(['in_development', 'coming_soon']), order: z.number().int().nonnegative(),
});
export const moduleSchema = z.strictObject({
  id: moduleIdSchema, courseId: courseIdSchema, title: text,
  order: z.number().int().nonnegative(), visibility: z.literal('internal'),
});
const narrativeSchema = z.strictObject({ id: blockIdSchema, kind: z.literal('narrative'), file: z.string().regex(/^[a-z0-9-]+\.md$/) });
const calloutSchema = z.strictObject({ id: blockIdSchema, kind: z.literal('callout'), title: text, body: text });
const exampleSchema = z.strictObject({ id: blockIdSchema, kind: z.literal('example'), title: text, body: text });
const quizReferenceSchema = z.strictObject({ id: blockIdSchema, kind: z.literal('quiz'), quizId: quizIdSchema });
const sourcesSchema = z.strictObject({ id: blockIdSchema, kind: z.literal('sources'), title: text, sources: z.array(sourceSchema).min(1) });
export const learningBlockSchema = z.discriminatedUnion('kind', [narrativeSchema, calloutSchema, exampleSchema, quizReferenceSchema, sourcesSchema]);
export const lessonSchema = z.strictObject({
  id: lessonIdSchema, moduleId: moduleIdSchema, slug: stableId, title: text,
  order: z.number().int().nonnegative(), revision: z.number().int().positive(),
  visibility: z.literal('internal'), blocks: z.array(learningBlockSchema).min(1),
});
export const quizSchema = z.strictObject({
  id: quizIdSchema, kind: z.literal('single-choice'), revision: z.number().int().positive(),
  prompt: text, options: z.array(z.strictObject({ id: stableId, label: text })).min(2),
  correctOptionId: stableId, feedback: z.strictObject({ correct: text, incorrect: text }),
}).superRefine((quiz, context) => {
  if (new Set(quiz.options.map(option => option.id)).size !== quiz.options.length)
    context.addIssue({ code: 'custom', message: 'Duplicate quiz option IDs' });
  if (!quiz.options.some(option => option.id === quiz.correctOptionId))
    context.addIssue({ code: 'custom', message: 'Invalid quiz answer key' });
});

export type Course = z.infer<typeof courseSchema>;
export type Module = z.infer<typeof moduleSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type LearningBlock = z.infer<typeof learningBlockSchema>;
export type Quiz = z.infer<typeof quizSchema>;
export type LessonBlock =
  | { id: LearningBlock['id']; kind: 'narrative'; html: string }
  | { id: LearningBlock['id']; kind: 'quiz'; quiz: Quiz }
  | Exclude<LearningBlock, { kind: 'narrative' | 'quiz' }>;
export type LessonDocument = Omit<Lesson, 'blocks'> & { blocks: LessonBlock[] };

