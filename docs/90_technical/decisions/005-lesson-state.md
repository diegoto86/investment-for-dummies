# One state owner per lesson

Status: Accepted and implemented in Phase 0.

`LessonExperience` is the only hydrated React root on a fixture lesson. It renders narrative, callout, example, quiz and sources. Answers and feedback are local component state keyed by block ID. There is no global store or cross-island subscription system.

Astro prerenders the complete lesson so narrative is readable before hydration and without JavaScript. Quiz controls remain disabled until hydration completes. Without JavaScript, an explicit notice explains the interaction requirement.

Single-choice grading is formative and runs in the browser. Answer keys are inspectable. Reloading clears answers. The fixture does not award progress, assess course mastery or save learner data.
