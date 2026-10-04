# Markdown narrative with structured activities

Status: Accepted and implemented in Phase 0.

Course and module metadata, lesson block ordering and quiz definitions live in JSON under `content/courses`. Narrative blocks reference adjacent Markdown files. The catalog compiles Markdown into safe HTML and resolves quiz references into a serializable lesson document.

This implements the approved narrative and structured-data separation without executable MDX or a custom directive language. Authors add lesson JSON and referenced content rather than application pages.

Raw HTML and unsafe Markdown URLs are rejected. Markdown images require alternative text. The internal fixture is architectural test material, not a reviewed publication of canonical Course 000. Canonical curriculum and rubrics remain unchanged in `docs`. Real published content will need an explicit canonical-source review workflow before it is introduced.
