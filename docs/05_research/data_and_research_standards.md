# Data & Research Standards

**Status:** Canonical  
**Version:** 1.0  
**Project:** Invest Smarter with AI  
**Domain Authority:** Financial data, research sourcing, evidence quality, freshness, citations, and AI-assisted research standards.

This is the sole operational authority for source hierarchy, primary-source requirements, citations, freshness, data verification, and AI research verification. The [Source of Truth](../00_project/source_of_truth.md) governs audience and scope; [Investment Methodology](../02_methodology/investment_methodology.md) governs analytical decisions. [Templates & Rubrics](../03_templates/templates_and_rubrics.md) implements these standards in forms.

---

# 1. Purpose

This document defines the minimum research standards for:

- course content;
- examples;
- company analysis;
- ETF analysis;
- broker comparisons;
- valuation work;
- dislocation analysis;
- portfolio monitoring;
- AI-assisted research.

The objective is to make analysis:

**traceable, current, comparable, and resistant to hallucination.**

---

# 2. Core Research Principle

> A conclusion is only as reliable as the evidence behind it.

AI may accelerate research.

It does not lower the evidence standard.

---

# 3. Source Hierarchy

Use the highest-quality source reasonably available.

## Tier 1 — Primary / Authoritative

Preferred for material facts.

Verify material investment facts and critical numbers against primary sources. If primary evidence is unavailable, identify the gap and preserve uncertainty rather than present the claim as verified.

Examples:

- regulatory filings;
- annual reports;
- quarterly reports;
- audited financial statements;
- investor-relations materials;
- official earnings releases;
- official company presentations;
- official guidance;
- exchange data;
- regulator databases;
- index-provider methodology;
- ETF issuer documents;
- broker legal and pricing documents.

---

## Tier 2 — High-Quality Secondary

Useful for context and synthesis.

Examples:

- institutional research;
- reputable financial-data providers;
- major financial news organizations;
- industry associations;
- respected specialist publications.

---

## Tier 3 — Aggregators

Useful for speed and screening.

Examples:

- finance portals;
- screeners;
- secondary data websites.

Material numbers should be cross-checked when used for decisions.

---

## Tier 4 — Community / Social

Useful primarily for:

- idea generation;
- identifying questions;
- sentiment context;
- locating alternative interpretations.

Do not use as sole evidence for a material investment claim. Social sources may generate questions and context, but must not settle a material fact.

---

# 4. Primary Source First

For company-specific analysis, prioritize:

1. latest annual report;
2. latest quarterly/interim report;
3. latest earnings release;
4. latest investor presentation;
5. latest earnings call or transcript;
6. company IR website.

For important historical questions, use the relevant period's source rather than relying on a current summary.

---

# 5. Freshness

Every material datapoint should have a date or period.

Examples:

- FY2025 revenue;
- Q2 2026 operating margin;
- share price as of 2026-10-04;
- consensus estimates as of a specific date.

Avoid undated claims such as:

> The company trades at 18x earnings.

Prefer:

> As of [date], the company trades at approximately 18x [NTM/FY] earnings.

---

# 6. Period Standards

Always identify whether a figure is:

- quarterly;
- year-to-date;
- TTM / LTM;
- fiscal year;
- calendar year;
- NTM;
- consensus forward estimate.

Do not mix periods silently.

---

# 7. GAAP / IFRS vs Adjusted Metrics

Clearly label:

- GAAP;
- IFRS;
- non-GAAP;
- adjusted;
- organic;
- reported.

When management-adjusted metrics are used:

- understand the adjustment;
- check whether exclusions recur;
- avoid treating recurring "one-offs" as truly exceptional.

---

# 8. Currency

Every financial figure should clearly identify currency when ambiguity is possible.

For cross-company comparisons:

- use consistent currency where practical;
- do not confuse trading currency with economic exposure;
- record the FX date when conversion materially affects the comparison.

---

# 9. Shares and Per-Share Data

Use the correct denominator.

Distinguish:

- basic shares;
- diluted shares;
- period-end shares;
- weighted-average shares.

Monitor dilution over time.

---

# 10. Enterprise Value

When using enterprise-value multiples, document:

- market capitalization date;
- debt definition;
- cash definition;
- minority interests if relevant;
- lease treatment if material;
- other adjustments if material.

Do not present EV as an exact universal figure when provider methodologies differ.

---

# 11. Free Cash Flow

FCF definitions can differ.

State the definition used.

Default simple teaching definition:

**Operating Cash Flow − Capital Expenditure**

For industries requiring a different treatment, explain why.

---

# 12. Consensus Estimates

Consensus is not fact.

Always label it as:

- estimate;
- consensus;
- forecast.

Record:

- source;
- date;
- period;
- metric.

Consensus can move quickly after earnings or guidance.

---

# 13. Guidance

Distinguish:

- official management guidance;
- analyst consensus;
- market-implied expectations;
- AI inference.

Never merge these categories.

---

# 14. Valuation Data

For valuation comparisons, document:

- price date;
- financial period;
- trailing vs forward;
- adjusted vs reported metric;
- peer definition;
- historical window.

Avoid comparing:

- trailing P/E of one company;
- forward P/E of another;

without explicitly saying so.

---

# 15. Historical Comparisons

Historical valuation should be interpreted alongside:

- growth;
- margins;
- rate environment;
- balance sheet;
- business mix;
- cyclicality.

Interpretation follows [Methodology's historical valuation principles](../02_methodology/investment_methodology.md#72-historical-valuation); historical-average multiples are not automatic price targets.

---

# 16. Sector-Specific Metrics

Use sector-appropriate definitions.

Examples:

- banks: CET1, NIM, NPLs;
- REITs: FFO/AFFO;
- SaaS: ARR/NRR;
- semiconductors: utilization, ASP, inventory;
- retail: same-store sales.

If a metric has multiple industry definitions, state the one used.

---

# 17. Market Price Data

For time-sensitive market analysis, use current or appropriately dated market data.

Record:

- date;
- market session if relevant;
- currency;
- adjusted/unadjusted status if relevant.

Pre-market and after-hours prices should be labeled explicitly.

---

# 18. Technical Data

When using:

- 50-day moving average (50DMA);
- 200-day moving average (200DMA);
- RSI;
- support / resistance;

record the date and price context.

Technical signals should not be treated as fundamental evidence. Their analytical role is governed by [Methodology](../02_methodology/investment_methodology.md#10-technical-context).

---

# 19. Dislocation Research

When a stock moves materially, separate:

## Confirmed Fact
What happened?

## Management Explanation
What did the company say?

## Market Interpretation
How are investors/media interpreting it?

## Fundamental Impact
What changed economically?

## Unknowns
What is not yet clear?

This separation is mandatory.

---

# 20. Industry Research

For unfamiliar industries, build a research stack.

Suggested order:

1. company filings;
2. competitor filings;
3. supplier/customer commentary;
4. industry association;
5. specialist research;
6. reputable media.

Cross-company evidence is valuable for distinguishing:

- company-specific issues;
- sector-wide issues;
- macro issues.

---

# 21. Supply-Chain Research

When material, identify:

- key inputs;
- critical suppliers;
- manufacturing nodes;
- geographic dependencies;
- logistics;
- inventory;
- customers;
- substitutes.

Claims about bottlenecks or dependency should ideally be supported by:

- filings;
- company commentary;
- supplier/customer evidence;
- industry sources.

---

# 22. Contradictory Sources

When sources disagree:

1. do not silently choose;
2. identify the discrepancy;
3. prefer primary/current evidence;
4. explain methodological differences;
5. preserve uncertainty when unresolved.

---

# 23. AI Research Standard

AI output is a research layer, not a source.

The model should be instructed to:

- use specified sources;
- cite material claims;
- mark missing information;
- separate fact from inference;
- identify uncertainty;
- avoid filling gaps.

---

# 24. AI Hallucination Control

For important outputs:

1. require citations;
2. verify key numbers;
3. check quoted periods;
4. compare against source documents;
5. ask the model to identify unsupported claims;
6. rerun critical extraction when necessary.

For material investment conclusions, also:

- verify against primary sources and cite the source;
- check source dates and freshness;
- separate facts from inference and make uncertainty explicit;
- cross-check contradictory evidence under section 22;
- never rely on a single AI answer;
- preserve source context and avoid invented precision;
- keep final judgment human.

---

# 25. Standard Evidence Labels

Use when helpful:

**CONFIRMED FACT**  
Supported directly by source.

**MANAGEMENT CLAIM**  
Statement by company management.

**CONSENSUS ESTIMATE**  
Third-party forecast.

**INFERENCE**  
Reasoned interpretation.

**HYPOTHESIS**  
Idea requiring evidence.

**UNKNOWN**  
Not established.

---

# 26. Research Time Budget

Research depth should match decision value.

Stage budgets and ordinary monthly review time are governed by the [Source of Truth time constraint](../00_project/source_of_truth.md#22-time-constraint). The stages below describe evidence priorities, not independent time limits.

## Rapid Screen

Use:

- basic business description;
- valuation snapshot;
- major event;
- obvious red flags.

## Business Understanding

Use:

- filings;
- industry map;
- supply chain;
- economics;
- key KPIs.

## Opportunity Analysis
Use additional research time only when justified.

Use:

- valuation scenarios;
- dislocation;
- catalysts;
- peer evidence;
- thesis risks.

## Monitoring
Event-driven.

Use only new information that may change the thesis.

---

# 27. Stop Rules

Stop deeper research when:

- business remains impossible to understand;
- source quality is insufficient;
- valuation is clearly unattractive;
- balance-sheet risk is unacceptable;
- thesis depends on too many unsupported assumptions.

Time is an investment resource. These stop rules apply the [Methodology research escalation rule](../02_methodology/investment_methodology.md#23-research-escalation-rule), with source quality governed here.

---

# 28. Citation Standard for Course Content

For factual or time-sensitive examples, retain enough source detail to reproduce the claim.

At minimum:

- source organization;
- document title;
- publication / reporting date;
- relevant period;
- link or document reference where applicable.

---

# 29. Research North Star

The desired outcome is not maximum information.

It is:

> enough high-quality evidence to make the next decision with appropriate confidence.
