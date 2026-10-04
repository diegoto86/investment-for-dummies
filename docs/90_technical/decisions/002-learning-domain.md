# Framework-independent learning domain

Status: Accepted and implemented in Phase 0.

`src/features/learning/schema.ts` defines validated Course, Module, Lesson, LearningBlock and Quiz contracts. Types derive from these schemas. Neither the schemas nor the pure quiz evaluator imports Astro or React.

The catalog resolves content relationships at build time. React consumes a compiled lesson document and owns temporary answers. Course publication status is separate from learner state. Phase 0 has no progress or mastery model.

There are five supported block kinds. New kinds require a schema, exhaustive renderer support and behavior tests. Unknown kinds fail validation rather than disappearing from a lesson.
