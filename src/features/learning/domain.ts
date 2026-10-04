export type { Course, Module, Lesson, LearningBlock, Quiz, LessonBlock, LessonDocument } from './schema';
import type { Course, Quiz } from './schema';

export function isCourseAvailable(course: Course): boolean {
  return course.status === 'in_development';
}

export function evaluateQuiz(quiz: Quiz, optionId: string) {
  if (!quiz.options.some(option => option.id === optionId)) throw new Error('Unknown quiz option');
  const correct = optionId === quiz.correctOptionId;
  return { correct, feedback: correct ? quiz.feedback.correct : quiz.feedback.incorrect };
}
