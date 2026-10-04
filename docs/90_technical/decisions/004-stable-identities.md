# Stable content identities

Status: Accepted and implemented in Phase 0.

Course, module, lesson, quiz and block IDs identify content independently of its title or position. Schemas validate IDs and provide distinct TypeScript brands. Lesson slugs identify URLs; renaming a slug does not rename the lesson ID.

Course, module, lesson and quiz IDs are unique within their entity type. Block IDs are unique within a lesson. Quiz option IDs are unique within their quiz. A course cannot have two lesson routes with the same slug.

Modules use authored order within their course; lessons use authored order within their module. Duplicate sibling positions fail validation. Different parents may reuse positions. Catalog collections group by parent ID and sort siblings by order, independently of filenames. Block order remains the lesson's authored array order.

React namespaces generated heading IDs with `useId`; content identities remain unchanged. Quiz state uses Maps keyed by canonical block IDs so valid names such as `constructor` cannot read inherited properties.

Lesson and quiz revisions identify authored versions. No persistence migration policy is implemented because Phase 0 stores no learner data. Lessons identify their module; modules identify their course. Adding a lesson does not require changing a route implementation or a module lesson list.
