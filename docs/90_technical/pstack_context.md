# Pstack Context — Proyecto "Invest Smarter with AI"

## Objetivo

Este archivo describe la configuración actual de Pstack usada en Codex para que cualquier asistente, agente o generador de prompts dentro del proyecto **Invest Smarter with AI** entienda qué capacidades están disponibles, cómo deben invocarse y cuándo conviene usarlas.

---

## Entorno actual

- IDE: VS Code
- Agente principal: OpenAI Codex
- Modelo actual de Codex: `gpt-6.1-sol`
- Reasoning global actual: `low`
- Pstack: habilitado
- Plugin: `pstack@open-pstack`
- Versión instalada: `1.5.0`
- Marketplace: `open-pstack`
- Multi-agent: habilitado con `multi_agent = true`
- Configuración de proveedores: **Codex-only**
- Claude CLI: no instalado / no usado
- Grok CLI: no instalado / no usado

Pstack usa `inherit-parent`, por lo que los agentes heredan el modelo y el nivel de reasoning de la sesión de Codex desde la que son lanzados.

---

## Configuración de roles

### Roles de agente único

Los siguientes roles usan un solo agente con `inherit-parent`:

- `feature`
- `refactoring`
- `bug-fix`
- `perf-issue`
- `hillclimb`
- `judgment and prose`
- `hardest tasks`
- `how explorer`
- `how explainer`
- `why investigators`
- `why synthesizer`
- `reflect tooling`
- `reflect judgment`
- `reflect divergent`
- `reflect synthesizer`
- `swarm workers`

Uso esperado: trabajo rutinario, implementación, explicación, refactorización, bugs normales y tareas donde un único agente es suficiente.

---

## Paneles multi-agent

Los siguientes workflows usan **2 agentes paralelos independientes**:

### `architect`

Configuración:

```text
architect runners:
- inherit-parent
- inherit-parent
```

Uso recomendado:

- arquitectura frontend/backend
- estructura del repositorio
- selección de stack
- modelo de datos
- autenticación
- estrategia de despliegue
- decisiones difíciles de diseño
- definición del MVP
- trade-offs técnicos

### `arena`

Configuración:

```text
arena runners:
- inherit-parent
- inherit-parent

arena cross-judge pool:
- inherit-parent
- inherit-parent
```

Nota: el cross-judge pool suministra un juez separado; dos entradas no implican necesariamente dos jueces ejecutándose simultáneamente.

Uso recomendado:

- comparar dos implementaciones
- comparar stacks o arquitecturas
- evaluar varias soluciones
- elegir entre alternativas con trade-offs claros
- decisiones donde interesa competir entre enfoques

### `interrogate`

Configuración:

```text
interrogate reviewers:
- inherit-parent
- inherit-parent
```

Uso recomendado:

- revisión crítica de código
- buscar regresiones
- revisar edge cases
- validar supuestos
- revisión pre-release
- seguridad y mantenibilidad
- detectar defectos antes de merge/deploy

---

## Reasoning y control de consumo

La configuración actual usa:

```toml
model_reasoning_effort = "low"
```

Como Pstack usa `inherit-parent`, los subagentes también heredan ese nivel salvo que la sesión padre se cambie explícitamente.

### Regla recomendada para este proyecto

Usar **Low** para:

- cambios de UI
- crear componentes
- editar textos
- crear páginas
- CSS
- wiring simple
- CRUD básico
- pequeñas correcciones
- tareas repetitivas

Usar **Medium** para:

- lógica de negocio
- features con varias capas
- bugs no triviales
- cambios con impacto transversal
- diseño de APIs
- migraciones pequeñas

Usar **High** para:

- arquitectura
- modelo de datos crítico
- autenticación/autorización
- pagos
- seguridad
- refactors grandes
- decisiones difíciles de producto técnico
- revisión antes de producción
- bugs difíciles

No usar múltiples agentes ni High reasoning para tareas triviales.

---

## Estrategia recomendada para "Invest Smarter with AI"

El proyecto busca construir una plataforma web para enseñar inversión en bolsa.

Pstack debe usarse como capa de ingeniería y revisión, no como requisito para cada cambio. [Product Requirements](../07_product/product_requirements.md) define las prioridades de producto y MVP; [Source of Truth](../00_project/source_of_truth.md) define el alcance y la arquitectura curricular. Pstack implementa esas decisiones y no las redefine.

Flujo recomendado:

```text
1. Definir problema
2. Si es rutinario → agente único
3. Si es una decisión estructural → pstack:architect
4. Si hay alternativas → pstack:arena
5. Implementar
6. Si el cambio es importante → pstack:interrogate
7. Corregir
8. Validar
9. Deploy
```

---

## Cuándo generar prompts con Pstack

Al generar prompts para Codex dentro de este proyecto, decidir primero qué tipo de tarea se está pidiendo.

### Desarrollo rutinario

No invocar paneles multi-agent salvo necesidad.

Prompt pattern:

```text
Implement the following change.

First inspect the relevant files and understand the current implementation.
Make the smallest maintainable change.
Preserve existing behavior unless explicitly requested.
Run the relevant checks/tests.
Summarize what changed.
```

### Arquitectura

Usar:

```text
Use pstack:architect.
```

Prompt pattern:

```text
Use pstack:architect.

Analyze this problem before implementing anything.

Goal:
<goal>

Constraints:
<constraints>

Evaluate:
- architecture
- trade-offs
- maintainability
- scalability
- security
- implementation complexity
- operational cost

Do not write code yet.
Recommend one approach and explain why.
```

### Comparar soluciones

Usar:

```text
Use pstack:arena.
```

Prompt pattern:

```text
Use pstack:arena.

Compare the following approaches independently:

A: <approach A>
B: <approach B>

Evaluate:
- complexity
- maintainability
- performance
- cost
- developer experience
- long-term fit

Choose a winner and explain the trade-offs.
```

### Revisión crítica

Usar:

```text
Use pstack:interrogate.
```

Prompt pattern:

```text
Use pstack:interrogate.

Review the current implementation critically.

Look for:
- bugs
- regressions
- incorrect assumptions
- edge cases
- security issues
- maintainability problems
- unnecessary complexity
- missing tests

Do not modify anything yet.
Return findings ranked by severity.
```

---

## Prompting rules for this project

When generating prompts for Codex:

1. Prefer **single-agent execution** for routine implementation.
2. Use `pstack:architect` only when the decision affects architecture or future development.
3. Use `pstack:arena` when there are genuinely competing approaches.
4. Use `pstack:interrogate` after substantial implementation or before release.
5. Avoid using multi-agent workflows merely to create buttons, text, styling or simple CRUD.
6. Explicitly say `Do not modify anything yet` during architecture/review phases.
7. Separate **analysis/design** from **implementation**.
8. Ask Codex to inspect the existing repository before proposing changes.
9. Prefer the smallest correct implementation over unnecessary abstraction.
10. Require validation/tests appropriate to the change.
11. Escalate reasoning from Low → Medium → High only when task complexity justifies it.
12. Remember that panel workflows launch multiple agents and therefore consume more compute/quota.

---

## Project-specific priorities

The following implementation summary follows [Product Requirements](../07_product/product_requirements.md). Product owns product/MVP priorities; Pstack implements them. For the Invest Smarter with AI platform, optimize for:

- simple MVP
- clean UX
- low operational cost
- maintainability
- fast iteration
- clear course/module/lesson structure
- student progress tracking
- quizzes/exercises
- practical deliverables after each course
- charts and financial examples
- future payment/subscription capability
- future admin/content management capability

Avoid premature complexity in v1.

Do not build infrastructure for hypothetical scale unless there is a clear near-term requirement.

---

## Recommended Pstack usage by phase

| Phase | Pstack usage |
|---|---|
| Product/MVP definition | `architect` |
| Tech stack decision | `architect` or `arena` |
| Repo setup | single agent |
| UI implementation | single agent |
| Course pages | single agent |
| Authentication | `architect` → implementation → `interrogate` |
| Database schema | `architect` |
| Student progress | single agent / Medium reasoning |
| Payments | `architect` → `interrogate` |
| Admin panel | single agent |
| Complex bug | `bug-fix` |
| Refactor | `refactoring` |
| Pre-release review | `interrogate` |
| Competing implementation options | `arena` |

---

## Important context for prompt generators

Do not assume that Claude or Grok are available.

Do not generate prompts that require external providers unless the configuration is changed.

Current Pstack execution environment is:

```text
Codex
└── GPT-6.1 Sol
    ├── single-agent roles → 1 inherited agent
    └── panel roles → 2 inherited parallel agents
```

For architecture, security, payments, authentication and difficult bugs, it is acceptable to recommend temporarily increasing the parent Codex reasoning level before invoking Pstack.

For normal web development, favor efficient single-agent execution.

---

## Current configuration summary

```text
Pstack version: 1.5.0
Provider strategy: Codex-only
Model strategy: inherit-parent
Parent model: gpt-6.1-sol
Parent reasoning: low
multi_agent: true

Single-model roles: 1 agent

architect:
  2 parallel agents

arena:
  2 parallel runners
  cross-judge pool enabled

interrogate:
  2 parallel reviewers
```

This configuration is intentionally optimized for a balance between **quality, parallel review and controlled Codex usage**.
