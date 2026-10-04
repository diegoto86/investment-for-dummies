# Technical Context

**Status:** Operational  
**Version:** 1.0  
**Project:** Invest Smarter with AI  
**Domain Authority:** Repository organization, engineering conventions, implementation workflow, and technical-document boundaries.

> Technical configuration is operational and may change more frequently than curriculum or methodology.
>
> Update this document when the implementation environment changes.

---

# 1. Technical Purpose

This document tells Codex and human contributors how to work inside the repository without mixing engineering decisions with curriculum decisions.

The repository is the canonical master.

---

# 2. Canonical Documentation Layout

```text
docs/
├─ 00_project/
│  └─ source_of_truth.md
├─ 01_curriculum/
│  ├─ 000_investing_foundations.md
│  ├─ 101_build_your_investment_system.md
│  ├─ 201_understand_any_business.md
│  ├─ 301_what_is_it_worth.md
│  ├─ 401_spot_the_opportunity.md
│  └─ 501_manage_your_portfolio.md
├─ 02_methodology/
│  └─ investment_methodology.md
├─ 03_templates/
├─ 04_pedagogy/
│  └─ pedagogy_and_slide_design.md
├─ 05_research/
│  └─ data_and_research_standards.md
├─ 06_compliance/
│  └─ legal_risk_compliance.md
├─ 07_product/
│  └─ product_requirements.md
├─ 90_technical/
│  ├─ technical_context.md
│  └─ pstack_context.md
└─ 99_archive/
   └─ README.md
```

---

# 3. Document Authority

Before implementing a change, determine which canonical document governs it.

## Vision / Audience / Scope
`docs/00_project/source_of_truth.md`

## Course Content
`docs/01_curriculum/`

## Investment Logic
`docs/02_methodology/investment_methodology.md`

## Teaching / Slides
`docs/04_pedagogy/pedagogy_and_slide_design.md`

## Research / Data
`docs/05_research/data_and_research_standards.md`

## Compliance
`docs/06_compliance/legal_risk_compliance.md`

## Product Behavior
`docs/07_product/product_requirements.md`

## Engineering
`docs/90_technical/`

Do not solve a conflict by inventing a new rule in code.

Resolve it in the governing document first.

---

# 4. Repository Is Master

ChatGPT Project sources may mirror repository documents for context.

They are not independent masters.

When canonical content changes:

1. update repository;
2. commit change;
3. update mirrored project source;
4. archive obsolete versions if useful.

---

# 5. Engineering Principles

Optimize for:

- simple MVP;
- maintainability;
- low operational cost;
- clear UX;
- fast iteration;
- testability;
- accessibility.

Avoid premature abstraction.

---

# 6. Implementation Rule

Before coding:

1. inspect existing files;
2. identify canonical requirement;
3. understand existing behavior;
4. make the smallest maintainable change;
5. preserve unrelated behavior;
6. validate;
7. summarize changes.

---

# 7. Content vs Application

Do not hard-code canonical curriculum in many unrelated components.

Prefer a maintainable content flow.

The application should consume canonical content or a controlled derived format.

Avoid parallel manual copies that can drift.

---

# 8. Suggested Source Structure

Exact framework structure may evolve, but separation should remain clear.

```text
src/
├─ app/
├─ components/
│  ├─ ui/
│  ├─ course/
│  ├─ charts/
│  └─ layout/
├─ features/
│  ├─ courses/
│  ├─ lessons/
│  ├─ progress/
│  ├─ quizzes/
│  ├─ deliverables/
│  └─ ai/
├─ lib/
├─ services/
├─ config/
├─ types/
└─ styles/
```

Do not create folders that have no real implementation need.

---

# 9. Data Boundary

`data/` should be used for:

- examples;
- fixtures;
- seed data.

Do not treat static repo files as a live financial-data architecture.

Live market-data integration should be designed separately when needed.

---

# 10. Secrets

Never commit:

- API keys;
- passwords;
- tokens;
- private credentials.

Use environment variables and `.env.example`.

---

# 11. Tests

Use the smallest useful test layer.

## Unit
Pure logic and utilities.

## Integration
Feature interactions, persistence, APIs.

## E2E
Critical user journeys.

Do not create tests that simply mirror implementation detail.

---

# 12. Critical User Journeys

When implemented, prioritize testing:

- open course;
- navigate lesson;
- save progress;
- complete deliverable;
- resume course;
- authentication;
- payment/entitlement if introduced.

---

# 13. Accessibility

Engineering should support:

- keyboard navigation;
- semantic HTML;
- labels;
- adequate contrast;
- responsive design;
- chart alternatives where necessary.

---

# 14. Performance

Prefer:

- static rendering when appropriate;
- lightweight pages;
- optimized assets;
- lazy loading for heavy content;
- minimal unnecessary dependencies.

---

# 15. AI Integration

The MVP does not require a native LLM.

If native AI is later added:

- define use case;
- define source boundaries;
- define data retention;
- define cost limits;
- add compliance review;
- add hallucination mitigation;
- log enough to debug without unnecessarily retaining sensitive data.

---

# 16. External Financial Data

Before integrating a provider, evaluate:

- coverage;
- latency;
- licensing;
- redistribution rights;
- cost;
- reliability;
- corporate actions;
- historical adjustments;
- API limits.

Do not select providers solely on developer convenience.

---

# 17. Technical Documentation Rule

Operational configuration such as:

- model version;
- reasoning setting;
- Pstack version;
- provider setup;

belongs here, not in project Source of Truth.

---

# 18. Codex Workflow

For routine implementation:

- inspect;
- implement;
- test;
- summarize.

For architecture:

- analyze before coding;
- compare trade-offs;
- avoid premature infrastructure.

For important changes:

- perform critical review before release.

---

# 19. Pstack

Pstack-specific configuration should live in:

`docs/90_technical/pstack_context.md`

That file may be updated independently as the tooling environment changes.

---

# 20. Archive

Obsolete technical documentation goes to:

`docs/99_archive/`

Archived files must not be treated as active requirements.

---

# 21. Technical North Star

The engineering system should make the educational product easier to evolve, not become the product itself.
