# Product Requirements

**Status:** Canonical Product Draft  
**Version:** 1.0  
**Project:** Invest Smarter with AI  
**Domain Authority:** Product scope, users, journeys, MVP capabilities, content experience, progress, and platform requirements.

---

# 1. Product Goal

Build a simple learning platform that helps busy professionals and entrepreneurs become competent medium- to long-term investors without requiring full-time market analysis.

The platform should transform curriculum into action.

The core experience is:

**Learn → Apply → Produce Deliverable → Track Progress**

AI workflows should reduce friction throughout.

---

# 2. Primary User

A busy professional or entrepreneur who:

- has limited research time;
- has some investable capital;
- wants to understand investing;
- wants a repeatable decision process;
- values efficiency;
- may use ChatGPT or Claude;
- wants to build a portfolio without watching markets continuously.

---

# 3. Primary Jobs to Be Done

The user hires the product to:

## Learn
Understand investing without unnecessary academic depth.

## Build
Create a personal investment system.

## Research
Understand companies and industries quickly.

## Decide
Evaluate valuation, dislocations, risk, and opportunity.

## Execute
Know what action to take next.

## Monitor
Manage a portfolio efficiently.

---

# 4. MVP Principle

Build the minimum product needed to deliver the learning outcome.

Do not build infrastructure for hypothetical scale.

Avoid adding features because competitors have them.

Every feature should improve:

- learning;
- execution;
- retention;
- decision quality;
- time efficiency.

---

# 5. MVP Content Architecture

Use:

**Program → Course → Module/Lesson → Exercise → Deliverable**

Core courses:

1. 000 — Investing Foundations
2. 101 — Build Your Investment System
3. 201 — Understand Any Business
4. 301 — What Is It Worth?
5. 401 — Spot the Opportunity
6. 501 — Manage Your Portfolio

---

# 6. Course Page

Each course page should show:

- course title;
- promise;
- learning outcomes;
- modules;
- progress;
- estimated effort if available;
- final deliverable;
- prerequisites;
- continue button.

Avoid clutter.

---

# 7. Lesson Experience

Each lesson should support:

- clear objective;
- slides/content;
- examples;
- AI workflow where relevant;
- source references;
- short exercise;
- next action.

The student should always know:

> What am I supposed to understand or do now?

---

# 8. Progress Tracking

Minimum MVP:

- course progress;
- lesson completed status;
- deliverable status;
- last visited lesson.

Useful later:

- skill map;
- quiz performance;
- streaks;
- learning analytics.

Avoid gamification that distracts from investment competence.

---

# 9. Deliverables

The platform should support completion of:

- Investor Profile;
- Investment System;
- Rapid Business Map;
- Valuation & Expectations Card;
- Opportunity Card;
- Portfolio Operating System.

MVP options:

- downloadable template;
- form;
- markdown/text workspace.

Do not require complex document editing for v1.

---

# 10. AI Workflow Experience

AI should be embedded in lessons.

MVP can provide:

- copyable prompts;
- prompt templates;
- source checklists;
- example inputs;
- example outputs;
- verification checklists.

The MVP does not need to host its own LLM.

Students may use:

- ChatGPT;
- Claude;
- other capable assistants.

---

# 11. Future Native AI

Only consider native AI integration when it clearly improves the product.

Potential future features:

- document upload;
- filing summarization;
- structured company map;
- valuation-assumption extraction;
- thesis update;
- portfolio review.

Do not add before:

- user demand;
- cost analysis;
- compliance review;
- privacy review.

---

# 12. Dashboard

MVP dashboard should prioritize:

- continue learning;
- current course;
- progress;
- pending deliverable;
- saved templates/resources.

Future:

- watchlist;
- investment cockpit;
- portfolio review calendar.

---

# 13. Resources Library

Useful resources:

- canonical templates;
- AI prompts;
- checklists;
- glossary;
- source hierarchy;
- example deliverables.

Keep resources tied to decisions.

Avoid becoming a generic content library.

---

# 14. Search

Search is useful when content volume justifies it.

MVP may use simple course navigation first.

Add advanced search only when necessary.

---

# 15. Quizzes

Use sparingly.

Best for:

- misconceptions;
- foundational concepts;
- risk awareness.

Do not make quiz completion the primary success metric.

---

# 16. Authentication

MVP requirements depend on launch model.

If progress must persist across devices, authentication is required.

Preferred qualities:

- low friction;
- secure;
- simple account recovery.

Do not overbuild identity systems.

---

# 17. Payments

Not required until monetization.

When introduced, support:

- clear pricing;
- secure payment provider;
- subscription or one-time purchase depending business model;
- receipts;
- refund policy;
- entitlement management.

Payments require compliance/security review.

---

# 18. Admin / Content Management

For MVP, content may remain repository-driven.

A full CMS is not required initially.

Add admin tooling when:

- non-technical editors need access;
- content changes frequently;
- manual deploys become a bottleneck.

---

# 19. Content Source

Canonical course and methodology content lives in repository documentation.

The application should not silently create competing content copies.

If content is compiled into the app, maintain a clear generation/update process.

---

# 20. Analytics

MVP analytics should answer:

- where students stop;
- which courses are completed;
- which deliverables are completed;
- which lessons are revisited;
- which AI workflows are used/copied.

Avoid collecting data without a product question.

---

# 21. Feedback

Provide a simple way to collect:

- lesson confusion;
- missing content;
- requested topics;
- usefulness;
- demand for new courses.

This feedback determines whether advanced content should be created.

---

# 22. Accessibility

The platform should target:

- readable typography;
- keyboard usability;
- sufficient contrast;
- meaningful labels;
- responsive layouts;
- chart explanations.

Financial education should not depend solely on visual color coding.

---

# 23. Responsive Design

Core flows should work on:

- desktop;
- tablet;
- mobile.

Complex financial analysis may be easier on desktop, but learning should remain accessible on mobile.

---

# 24. Performance

Prioritize:

- fast page load;
- lightweight content pages;
- optimized images/charts;
- minimal unnecessary client-side complexity.

---

# 25. Security

Minimum:

- protect user accounts;
- protect payment data through trusted providers;
- avoid storing unnecessary sensitive financial data;
- use environment variables for secrets;
- validate inputs;
- keep dependencies maintained.

---

# 26. Privacy

Do not collect portfolio or financial data unless it is necessary.

If user financial data is introduced later:

- define purpose;
- minimize collection;
- protect it;
- define retention;
- review compliance.

---

# 27. Out of Scope for MVP

Unless requirements change:

- brokerage execution;
- automated trading;
- copy trading;
- live portfolio synchronization;
- real-time market terminal;
- native AI financial adviser;
- advanced social network;
- options analytics;
- complex backtesting;
- custom quantitative engine.

---

# 28. Future Features Trigger

A feature should move into scope when there is evidence of:

- repeated user demand;
- learning benefit;
- meaningful friction;
- business value;
- feasible compliance/security.

---

# 29. Product Success

Success is not maximum screen time.

Success is:

- course completion;
- deliverable completion;
- improved decision process;
- repeated use of frameworks;
- reduced research friction;
- user confidence grounded in understanding.

---

# 30. Product North Star

The product should help a busy student move from:

> I do not know what to look at.

to:

> I know what matters, I have a framework, AI helps me do the heavy lifting, and I can make the final decision myself.
