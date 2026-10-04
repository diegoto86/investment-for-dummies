# Web/App Learning Platform Roadmap

**Project:** Invest Smarter with AI  
**Document status:** Proposed Execution Plan  
**Version:** 0.1  
**Recommended path:** `docs/07_product/web_app_roadmap.md`  
**Language:** Product/UX in Spanish; financial concepts and market terminology in English.

---

## 1. Product Goal

Build a reusable, content-driven learning platform for investment education.

The product should not behave like a slide deck placed on the web. It should behave like a modern interactive learning experience with vertical scrolling, visual explanations, inline quizzes, scenarios, checkpoints, exercises, progress, deliverables, financial examples and future AI-assisted learning.

The platform must be built so that new courses can be added as content without rebuilding the application.

---

## 2. Product North Star

> **The platform is the learning engine. Courses are content loaded into that engine.**

```text
CONTENT
Course / Module / Lesson / Quiz / Deliverable
                ↓
LEARNING ENGINE
Rendering / interactions / progress / assessment
                ↓
PRODUCT EXPERIENCE
Web today / mobile-ready later
```

A new course should not require new application architecture.

---

## 3. Core Product Principle

The application must be **content-driven, not page-driven**.

Avoid:

```text
React page
  └─ hardcoded Course 000 content
```

Prefer:

```text
Course content
      ↓
validated content model
      ↓
lesson renderer
      ↓
reusable learning blocks
```

The web application should know how to render a `Lesson`. It should not need custom code to understand what “Investing Foundations” is.

---

## 4. MVP Scope

The first platform skeleton must support:

- Home;
- Program / Course Catalog;
- Course Overview;
- Module navigation;
- Lesson experience;
- vertical scrolling lesson format;
- reusable content blocks;
- inline quizzes;
- immediate quiz feedback;
- lesson completion;
- course progress;
- basic deliverable experience;
- six canonical course placeholders;
- responsive desktop/mobile behavior;
- persistence of progress;
- source/citation blocks;
- financial terminology presentation;
- accessibility basics;
- analytics-ready event structure.

Do **not** build yet:

- payments;
- subscription plans;
- complex authentication;
- admin CMS;
- native iOS/Android apps;
- live brokerage integration;
- real-time market data;
- community features;
- certificates;
- gamification;
- complex AI tutor;
- recommendation engine;
- adaptive learning.

The architecture should not block these capabilities, but the MVP should not implement them.

---

## 5. Information Architecture

```text
Home
│
├─ Programa
│   ├─ 000 — Investing Foundations
│   ├─ 101 — Build Your Investment System
│   ├─ 201 — Understand Any Business
│   ├─ 301 — What Is It Worth?
│   ├─ 401 — Spot the Opportunity
│   └─ 501 — Manage Your Portfolio
│
├─ Course
│   ├─ Overview
│   ├─ Modules
│   ├─ Progress
│   └─ Deliverables
│
└─ Lesson
    ├─ Intro / objective
    ├─ Learning blocks
    ├─ Visuals
    ├─ Examples
    ├─ Quiz / checkpoint
    ├─ Exercise
    ├─ Sources
    └─ Completion / next lesson
```

Future areas may include Dashboard, Portfolio Lab, Artifacts, Glossary, AI Research Assistant, Account and Billing.

---

## 6. Course Lifecycle

Every course should have an explicit state:

```text
draft
coming_soon
published
archived
```

This allows all six canonical courses to exist in the interface immediately without requiring their content to exist.

A `coming_soon` course only needs metadata:

- course id;
- title;
- short description;
- learning outcome;
- status;
- order;
- optional cover visual.

It does not need modules or lessons yet.

---

## 7. Canonical Content Model

Minimum hierarchy:

```text
Program
  └─ Course
      └─ Module
          └─ Lesson
              └─ Block[]
```

### Course

```text
id
slug
title
subtitle
description
status
order
estimated_duration
learning_outcomes[]
modules[]
deliverables[]
```

### Module

```text
id
title
description
order
lessons[]
```

### Lesson

```text
id
slug
title
description
order
estimated_duration
objectives[]
blocks[]
quiz?
sources[]
completion_rule
```

### Block

```text
id
type
content
configuration
```

The storage implementation may evolve, but this logical contract should remain stable.

---

## 8. Learning Block System

The lesson renderer should use a registry of reusable content blocks.

```text
block.type
    ↓
Block Registry
    ↓
UI Component
```

Initial block types:

| Block | Purpose | MVP |
|---|---|---:|
| `hero` | Lesson opening / hook | Yes |
| `text` | Explanatory narrative | Yes |
| `concept` | New financial concept | Yes |
| `callout` | Warning / takeaway | Yes |
| `example` | Practical financial example | Yes |
| `comparison` | Compare alternatives | Yes |
| `table` | Structured data | Yes |
| `image` | Illustration / screenshot | Yes |
| `chart` | Financial/conceptual chart | Yes |
| `steps` | Process / sequence | Yes |
| `accordion` | Progressive disclosure | Yes |
| `quiz` | Inline assessment | Yes |
| `checkpoint` | Reflection / decision point | Yes |
| `exercise` | Practical task | Yes |
| `source_list` | Sources/references | Yes |
| `deliverable_cta` | Link to artifact | Yes |
| `case_study` | Scenario-based learning | Later MVP |
| `ai_workflow` | AI prompt/workflow | Later MVP |
| `embed` | Supported external embeds | Later |

A new block type should be implemented once and become available to every course.

---

## 9. Lesson Experience

Recommended flow:

```text
HOOK
↓
WHY IT MATTERS
↓
CONCEPT
↓
VISUAL EXPLANATION
↓
REAL EXAMPLE
↓
INTERACTION / QUIZ
↓
DECISION
↓
PRACTICAL EXERCISE
↓
KEY TAKEAWAY
↓
NEXT LESSON
```

Not every lesson needs every block. The content determines the pedagogical sequence.

---

## 10. Scrolling UX

Use vertical scrolling instead of presentation-style slides.

Recommended behavior:

- continuous vertical reading;
- clear visual sections;
- generous whitespace;
- sticky lesson progress on desktop;
- compact progress indicator on mobile;
- active-section awareness;
- subtle entrance animations;
- interactive visuals when useful;
- persistent Next/Previous navigation;
- no mandatory full-screen scroll snapping;
- reduced-motion support;
- keyboard accessibility.

Avoid turning every viewport into a fake slide.

---

## 11. Quiz System

### MVP question types

- Single Choice;
- Multiple Choice;
- True / False;
- Scenario Choice.

Later:

- Numeric;
- Ordering;
- Matching;
- Short Answer;
- AI-evaluated response.

### Behavior

1. learner answers;
2. submits;
3. receives immediate feedback;
4. understands why it is correct/incorrect;
5. retries when pedagogically useful.

Quiz feedback is more important than score.

### Quiz model

```text
question
type
options[]
correct_answer
explanation
retry_allowed
required_for_completion
```

---

## 12. Progress Model

Progress exists at three levels:

```text
Lesson Progress
Module Progress
Course Progress
```

Initial status model:

```text
not_started
in_progress
completed
```

A lesson should not be completed merely because it was opened.

Possible completion rules:

- explicit “Completar lección” action;
- required quiz answered;
- required checkpoint completed;
- required deliverable started/submitted.

The system must support configurable completion rules.

---

## 13. Progress Persistence

The UI should depend on a `ProgressRepository` abstraction.

```text
Learning UI
    ↓
Progress Service
    ↓
ProgressRepository
    ├─ LocalProgressRepository     ← MVP
    └─ RemoteProgressRepository    ← future authenticated platform
```

This allows the first version to persist progress locally without coupling the product to a backend too early.

---

## 14. Content Storage Strategy

### MVP recommendation

Use structured content that can live in the repository.

```text
content/
└─ courses/
   ├─ 000/
   │  ├─ course.*
   │  ├─ modules/
   │  └─ lessons/
   ├─ 101/
   │  └─ course.*
   └─ ...
```

For a React/Next stack, a good candidate is:

- MDX for narrative;
- validated frontmatter;
- structured data for quizzes and metadata;
- reusable block components;
- schema validation at build/test time.

The exact technology must be confirmed after repository inspection.

Content access should be behind a `ContentRepository` adapter:

```text
Lesson Page
    ↓
Content Service
    ↓
ContentRepository
    ├─ LocalContentRepository      ← MVP
    └─ CMSContentRepository        ← future
```

---

## 15. Language Rule

Default learning language: **Spanish**.

Financial and market concepts: **English**.

Examples: Free Cash Flow, Market Cap, Drawdown, Margin of Safety, Position Sizing, Earnings, Guidance, Limit Order.

Explanation, navigation, instructions and narrative remain in Spanish.

---

## 16. Deliverable / Artifact System

Courses should attach practical outputs to lessons/modules.

Examples:

- Investor Profile;
- Broker Comparison;
- ETF Check;
- Rapid Business Map;
- Valuation & Expectations Card;
- Opportunity Card;
- Position Thesis Card;
- Monthly Portfolio Review.

Logical model:

```text
DeliverableDefinition
    ↓
LearnerArtifact
```

Do not hardcode forms into individual courses.

For the first skeleton:

- show the deliverable;
- explain what it is;
- show completion status;
- allow a simple draft/input experience for one pilot artifact.

---

## 17. Source and Evidence Support

Financial education content should support:

```text
source
publisher
title
date
url/reference
as_of_date
```

Lesson blocks should be able to display citations, source lists and “data as of” labels.

---

## 18. Design System

Build a small reusable design system before producing many pages.

Foundation:

- typography;
- spacing;
- layout grid;
- cards;
- buttons;
- navigation;
- progress indicators;
- form fields;
- feedback states;
- charts;
- tooltips;
- callouts.

Learning-specific components:

- Concept Card;
- Example Card;
- Risk Callout;
- Quiz Card;
- Checkpoint;
- Key Takeaway;
- Financial Metric;
- Comparison;
- Source Citation;
- Deliverable CTA.

Do not create a large general-purpose component library.

---

## 19. Responsive / App Strategy

Web-first.

The application must work well on desktop, tablet and mobile browser from the start.

Do not build native mobile apps during MVP.

```text
Responsive Web
     ↓
PWA-ready
     ↓
shared backend/domain contracts
     ↓
native app only if evidence justifies it
```

---

## 20. Architecture Guardrails

1. **Content is not application code.** Adding a lesson should not require modifying routing or page components.
2. **Course identity is data.** Avoid course-specific logic such as `if course === "000"` for ordinary rendering.
3. **Reusable learning blocks.** Course-specific UI components should be exceptional.
4. **Domain models before backend.** Stabilize Course, Module, Lesson, Block, Quiz, Progress and Deliverable contracts first.
5. **Adapter boundaries.** Isolate Content, Progress, Auth, Analytics, AI and future Market Data.
6. **Web first.** Avoid premature native-mobile complexity.
7. **Accessibility.** Keyboard navigation, labels, focus, contrast and reduced motion.
8. **Performance.** Animations/charts must not compromise reading performance.

---

## 21. Recommended Architecture Shape

```text
┌──────────────────────────────────────┐
│              UI LAYER                │
│ Home / Catalog / Course / Lesson     │
│ Dashboard / Artifacts                │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│        LEARNING EXPERIENCE LAYER     │
│ Lesson Renderer                      │
│ Block Registry                       │
│ Quiz Engine                          │
│ Progress Engine                      │
│ Artifact Renderer                    │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│            DOMAIN LAYER              │
│ Course / Module / Lesson             │
│ Quiz / Progress / Artifact           │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│           ADAPTER LAYER              │
│ Content Repository                   │
│ Progress Repository                  │
│ Auth Provider                        │
│ Analytics Provider                   │
│ AI Provider (future)                 │
└──────────────────┬───────────────────┘
                   │
        ┌──────────┴───────────┐
        │                      │
   Local content          Future services
   Local progress         DB / CMS / AI / Auth
```

---

# 22. Delivery Roadmap

## PHASE 0 — Architecture Baseline

**Goal:** Freeze minimum contracts before significant UI implementation.

### Work

- inspect current repository;
- identify framework/dependencies;
- define route map;
- define Course/Module/Lesson schemas;
- define Block contract;
- define Quiz schema;
- define Progress contract;
- define course lifecycle status;
- decide content file format;
- create initial ADRs;
- establish lint/test baseline.

### Deliverables

```text
ADR-001 Content as Data
ADR-002 Lesson Block Registry
ADR-003 Progress Repository
ADR-004 Web-First / App-Ready Strategy
ADR-005 Course Lifecycle
```

### Exit Criterion

We can describe exactly how a new empty course and a new lesson are added without changing application architecture.

---

## PHASE 1 — App Shell & Navigation

**Goal:** Create the visible product skeleton.

### Build

- global layout;
- header/navigation;
- responsive shell;
- Home;
- Program / Course Catalog;
- Course Overview;
- Lesson route;
- error/not-found states;
- reusable page containers;
- initial design tokens.

### Seed

Add all six canonical courses as metadata. Only Course 000 needs to move toward real content; the other five can display **Próximamente**.

### Exit Criterion

A user can navigate Home → Program → Course → Lesson shell → Course on desktop and mobile.

---

## PHASE 2 — Content Engine

**Goal:** Make course creation independent from page development.

### Build

- content schema validation;
- local content repository;
- course/module/lesson loaders;
- frontmatter/metadata parser;
- block registry;
- generic lesson renderer;
- source support;
- build-time validation.

Use fixture/demo content, not hardcoded Course 000 prose.

### Exit Criterion

A new lesson file is discovered and rendered without creating a new page component.

**This is the most important architecture milestone.**

---

## PHASE 3 — Interactive Lesson Runtime

**Goal:** Turn scrolling content into a learning experience.

### Build

- hero;
- text;
- concept;
- callout;
- example;
- comparison;
- table;
- image;
- chart;
- steps;
- accordion;
- checkpoint;
- source list;
- next lesson navigation;
- scrolling progress;
- responsive content width;
- motion/reduced-motion behavior;
- keyboard navigation.

### Exit Criterion

One demo lesson feels like a finished learning experience rather than documentation rendered in a browser.

---

## PHASE 4 — Quiz Engine

**Goal:** Support active learning inside lessons.

### Build

- Single Choice;
- Multiple Choice;
- True / False;
- Scenario Choice;
- answer state;
- immediate feedback;
- explanation;
- retry;
- optional completion requirement.

### Exit Criterion

A content author can create a quiz from data/content without writing UI code.

---

## PHASE 5 — Progress Engine

**Goal:** Create continuity across sessions.

### Build

- lesson status;
- module progress;
- course progress;
- progress UI;
- explicit completion;
- configurable completion rules;
- local persistence;
- repository abstraction.

### Exit Criterion

A learner can close the browser, return and continue where they stopped.

---

## PHASE 6 — Course 000 Integration

**Goal:** Use the real first course to validate the architecture.

As lessons become ready:

```text
Course 000 content
      ↓
content schema
      ↓
lesson blocks
      ↓
web
```

When a content need is unsupported:

1. decide whether it is reusable;
2. if reusable, add a Block type;
3. if unique, simplify the content before adding custom code.

### Exit Criterion

Course 000 can be consumed end-to-end in the platform.

---

## PHASE 7 — Deliverables / Artifacts MVP

**Goal:** Connect learning to real investor actions.

Start with **Investor Profile**.

### Build

- deliverable definition;
- artifact view;
- input fields;
- save draft;
- completion status;
- link from lesson/course;
- simple validation.

### Exit Criterion

A learner can finish Course 000 and leave with a saved Investor Profile.

---

## PHASE 8 — Learner Identity & Cloud Persistence

**Trigger:** We need persistent accounts across devices/pilot users.

### Build

- authentication;
- learner profile;
- remote progress repository;
- remote artifact persistence;
- migration from local state if needed.

### Exit Criterion

A learner can log in on another device and see progress/artifacts.

---

## PHASE 9 — Product Instrumentation

**Goal:** Improve the product using real behavior.

Minimum events:

```text
course_viewed
lesson_started
lesson_completed
quiz_answered
quiz_retry
checkpoint_completed
deliverable_started
deliverable_completed
course_completed
```

Measure:

- Where do learners abandon?
- Which concepts produce errors?
- Which lessons take too long?
- Which blocks are useful?
- Does the learner finish the deliverable?
- Does the learner return?

---

## PHASE 10 — Content Operations

**Trigger:** Repository-based content becomes a real publishing bottleneck.

Possible evolution:

```text
Local MDX/content
      ↓
Content Repository abstraction
      ↓
Headless CMS / internal authoring tool
```

Do not build a CMS before the workflow requires it.

---

## PHASE 11 — Monetization

**Trigger:** Learning experience and willingness-to-pay are validated.

Possible scope:

- account plans;
- checkout;
- entitlement;
- course access;
- billing;
- invoices/receipts;
- promo codes.

Payment logic must remain separate from course rendering.

---

## PHASE 12 — AI-Native Capabilities

Potential capabilities:

- explain concept;
- ask about current lesson;
- critique a learner thesis;
- generate a counterargument;
- help interpret company information;
- research workflow assistant;
- artifact feedback.

Architecture:

```text
Learning UI
   ↓
AI Service
   ↓
Provider Adapter
```

Do not couple the learning engine to one AI provider.

---

## PHASE 13 — Mobile App Decision

Do not automatically build a native app.

Review after product evidence exists:

- mobile usage share;
- need for offline access;
- value of push notifications;
- whether PWA is sufficient;
- native capability requirements.

Only then choose a native approach.

---

## 23. Parallel Workstreams

After Phase 0, two tracks proceed in parallel:

```text
              PRODUCT FOUNDATION
                     │
          ┌──────────┴──────────┐
          │                     │
      WEB TRACK            CONTENT TRACK
          │                     │
     App Shell              Course 000
     Content Engine         Modules
     Block Registry         Lessons
     Quiz Engine            Examples
     Progress               Quizzes
     Artifacts              Investor Profile
          │                     │
          └──────────┬──────────┘
                     ↓
                 PILOT 000
```

Course 000 continuously tests whether the reusable web primitives are sufficient.

---

## 24. Recommended Delivery Cadence

For a solo founder assisted by AI/Codex, use small vertical milestones.

```text
Sprint 0  Architecture baseline + repo inspection
Sprint 1  App shell + Program + Course Overview
Sprint 2  Content engine + Lesson renderer
Sprint 3  Learning blocks + scrolling experience
Sprint 4  Quiz engine + progress
Sprint 5  Course 000 first lessons integrated
Sprint 6  Investor Profile + pilot readiness
```

Do not attach calendar duration until the current repository is inspected.

---

## 25. Definition of Done — Platform Skeleton

The skeleton is ready when:

- all six courses appear in the Program;
- unpublished courses work as placeholders;
- Course 000 can contain modules and lessons;
- adding a course does not require custom pages;
- adding a lesson does not require route edits;
- lessons render from content;
- content is schema-validated;
- reusable learning blocks work across courses;
- inline quizzes work;
- quiz feedback is immediate;
- learner progress persists;
- course/module/lesson progress is visible;
- desktop/mobile UX works;
- keyboard navigation works for core interactions;
- reduced-motion preferences are respected;
- sources can be attached;
- the Investor Profile can attach without course-specific form architecture;
- analytics interfaces exist;
- future Auth/CMS/AI integrations can use adapters;
- no Course 000 logic is hardcoded into generic platform components.

---

## 26. Architecture Tests

### Empty Course Test

Add a fictional metadata-only course. Expected: Catalog and Course Overview render with `coming_soon`.

### New Lesson Test

Add a lesson content file. Expected: it appears and renders without a new page component.

### Reusable Block Test

Use the same `concept`/`quiz` block in two courses. Expected: no duplicated UI code.

### Progress Adapter Test

Switch local progress for a mocked remote repository. Expected: lesson UI does not change.

### Mobile Test

Complete a lesson/quiz on narrow viewport. Expected: no desktop-only interaction.

### Content Failure Test

Introduce an invalid lesson schema. Expected: validation catches it before production.

---

## 27. Decisions to Defer

Do not choose prematurely:

- final CMS vendor;
- auth vendor;
- payment provider;
- database;
- native framework;
- AI provider/model;
- market-data provider;
- community system;
- certificates;
- gamification;
- recommendation algorithms.

Define boundaries now; choose vendors when requirements exist.

---

## 28. Key Risks

**Overbuilding infrastructure** → use local content/progress first.  
**Designing around Course 000** → generic schemas + empty-course tests.  
**Dozens of custom lesson components** → controlled Block Registry.  
**Scrolling becomes visually heavy** → restrained motion + progressive disclosure.  
**Quizzes become trivia** → test decisions/misconceptions, not memorization.  
**CMS becomes its own product** → repository content until friction is proven.  
**Native app distracts from validation** → responsive web/PWA first.  
**AI becomes the product instead of learning** → AI supports reasoning; investor decides.

---

## 29. Priorities

### P0 — Must Have

- app shell;
- six-course catalog;
- course lifecycle;
- content model;
- content loader;
- module/lesson navigation;
- scrolling lesson renderer;
- core learning blocks;
- quizzes;
- progress;
- responsive UX;
- basic accessibility.

### P1 — Next

- Course 000;
- Investor Profile;
- sources/citations;
- analytics;
- authentication/cloud persistence.

### P2 — After Validation

- CMS;
- payments;
- richer artifact engine;
- AI-native interactions;
- PWA/offline;
- advanced assessments.

### P3 — Evidence Required

- native mobile app;
- community;
- gamification;
- certificates;
- broker integrations;
- personalized recommendations.

---

## 30. First Implementation Backlog

1. Inspect repository and document current stack.
2. Define route map.
3. Define Course/Module/Lesson domain schemas.
4. Define Block schema and registry contract.
5. Define Quiz schema.
6. Define `ProgressRepository` interface.
7. Define `ContentRepository` interface.
8. Seed six course manifests.
9. Build Program page.
10. Build generic Course Overview.
11. Build generic Lesson route.
12. Implement local content loader.
13. Implement first learning blocks.
14. Create one fixture lesson.
15. Implement quiz MVP.
16. Implement local progress.
17. Add responsive navigation.
18. Add schema validation tests.
19. Add accessibility smoke tests.
20. Run architecture review before real Course 000 integration.

---

## 31. Architecture Review Gates

**Gate A — Before UI Expansion:** approve domain/content contracts.  
**Gate B — Before Course 000 Integration:** prove content can be added without custom page code.  
**Gate C — Before Authentication:** prove local progress abstraction can be replaced cleanly.  
**Gate D — Before CMS:** prove repository content actually limits publishing velocity.  
**Gate E — Before Native App:** prove mobile needs exceed responsive web/PWA.

---

## 32. PM Recommendation

Critical path:

```text
Architecture Contract
       ↓
App Shell
       ↓
Content Engine
       ↓
Lesson Runtime
       ↓
Quiz + Progress
       ↓
Course 000
       ↓
Investor Profile
       ↓
Pilot
```

The most important milestone is not “Home page complete.” It is:

> **A new course and lesson can be added without changing the application architecture.**

Once this is true, the product can scale from Course 000 to Course 501 by adding content rather than rebuilding the platform.

---

## 33. Immediate Next Step

Do not ask Codex to “build the website” yet.

First ask Codex to:

1. inspect the existing repository;
2. identify the current stack and architecture;
3. compare it with this roadmap;
4. propose the smallest implementation plan for Phase 0 and Phase 1;
5. flag conflicts or unnecessary dependencies;
6. make no code changes;
7. return proposed files, routes, schemas, ADRs, tests and acceptance criteria.

After review, implementation begins with Phase 0.
