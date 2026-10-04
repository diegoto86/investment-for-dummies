---
title: "101 — Build Your Investment System"
status: "Canonical Draft"
version: "1.0"
program: "Invest Smarter with AI"
audience: "Busy professionals and entrepreneurs"
---

# 101 — Build Your Investment System

This course applies the audience, scope, and six-course architecture in the [Source of Truth](../00_project/source_of_truth.md). Analytical principles follow [Investment Methodology](../02_methodology/investment_methodology.md); sourcing and verification follow [Research Standards](../05_research/data_and_research_standards.md). [Templates & Rubrics](../03_templates/templates_and_rubrics.md) owns form schemas and completion thresholds.

## Course promise

**Create a portfolio strategy you can actually maintain.**

The purpose of this course is to turn investment knowledge into a repeatable personal system.

The student should finish with:

- a broker decision;
- a target allocation;
- a Core / Satellite structure if appropriate;
- a recurring contribution plan;
- a first investment;
- a simple AI-assisted workflow for comparing ETFs and brokers.

---

# 1. What the student should be able to do

By the end of the course, the student should be able to:

- define a portfolio objective;
- choose an appropriate asset allocation;
- understand diversification and concentration;
- distinguish Core from Satellite positions;
- compare ETFs efficiently;
- compare brokers efficiently;
- understand DCA vs lump sum;
- execute a basic order correctly;
- document the reason for the first investment;
- create a system that does not require constant monitoring.

---

# 2. Lesson 1 — Start with the objective

Before choosing a security, define:

- what the capital is for;
- expected holding period;
- minimum liquidity requirement;
- maximum tolerable drawdown;
- recurring contribution capacity;
- desired level of involvement.

## Core question

> What portfolio can I maintain through both good and bad markets?

---

# 3. Lesson 2 — Asset allocation

Asset allocation is the first major portfolio decision.

## Main buckets

- cash;
- bonds;
- equities;
- other assets when justified.

## Key drivers

- horizon;
- financial stability;
- future liabilities;
- tolerance for drawdowns;
- need for liquidity.

## Important principle

Asset allocation should reflect the student's life, not market headlines.

---

# 4. Lesson 3 — Diversification

Diversification reduces dependence on a single outcome.

## Dimensions

- company;
- sector;
- geography;
- business model;
- currency exposure;
- asset class;
- time.

## Common mistake

Owning many securities that all depend on the same factor.

Example:

Five technology stocks are not necessarily diversified.

---

# 5. Lesson 4 — Core / Satellite

This is the default architecture for many students in this program.

## Core

The part of the portfolio designed to compound with minimal intervention.

Possible examples:

- global equity ETF;
- broad US equity ETF;
- broad bond exposure;
- strategic cash allocation.

These possible Core components do not expand the teaching depth authorized by the Source of Truth. Methodology governs portfolio logic.

## Satellite

The part used for:

- individual stocks;
- temporary dislocations;
- sector opportunities;
- higher-conviction ideas.

## Why this fits busy professionals

The Core reduces the need to constantly find ideas.

The Satellite preserves the ability to exploit opportunities.

## Rule

Do not prescribe universal percentages.

The allocation depends on:

- skill;
- time;
- risk;
- conviction;
- portfolio size;
- personal objectives.

---

# 6. Lesson 5 — DCA vs lump sum

## DCA

Investing periodically.

### Advantages

- behavioral discipline;
- automation;
- reduces timing pressure.

### Limitations

- capital may remain uninvested;
- does not eliminate market risk.

## Lump sum

Investing available capital at once or in large blocks.

### Advantages

- capital is invested sooner;
- simpler execution.

### Limitations

- greater emotional sensitivity to entry timing.

## Decision framework

Ask:

- Is the money already available?
- Is the horizon long?
- Would a drawdown immediately after investing cause panic?
- Is there a strategic reason to phase entry?

---

# 7. Lesson 6 — ETF selection

The student should not compare 50 variables.

Learn to use the canonical [ETF 6-Point Check](../03_templates/templates_and_rubrics.md#8-template-101b--etf-6-point-check). The headings below explain the form; Templates owns its checklist schema.

## 1. Index

What does the ETF replicate?

## 2. Holdings

What do I actually own?

Check:

- number of holdings;
- top 10 weight;
- sector concentration;
- geographic concentration.

## 3. Cost

- TER;
- other visible costs;
- spread.

## 4. Size and liquidity

- AUM;
- trading liquidity;
- spread.

## 5. Structure / domicile

When relevant:

- UCITS;
- replication method;
- fund domicile.

## 6. Distribution

- accumulating;
- distributing.

## Useful to know

- tracking difference;
- tracking error;
- physical vs synthetic replication;
- fund currency vs trading currency vs economic exposure.

---

# 8. Lesson 7 — ETF red flags

Potential red flags:

- tiny AUM;
- extremely narrow theme;
- high concentration;
- high TER without clear justification;
- weak liquidity;
- leverage or inverse exposure not understood;
- product structure the student cannot explain.

## Rule

If you cannot explain what drives the ETF's return, you should not buy it.

---

# 9. Lesson 8 — Broker selection

The broker is infrastructure, not the strategy. Use the canonical [Broker Comparison](../03_templates/templates_and_rubrics.md#7-template-101a--broker-comparison); the criteria below are teaching explanations and examples, not a separate form schema.

## Compare

- regulation;
- custody;
- investor protection framework;
- commissions;
- FX costs;
- spread;
- available markets;
- fractional shares;
- account currency;
- transfer-out process;
- reporting;
- interface;
- customer support.

## Types

- long-term investing broker;
- trading-focused broker;
- bank broker;
- specialized broker.

---

# 10. Lesson 9 — AI workflow: compare brokers efficiently

## Inputs

Give AI:

- country of residence;
- brokers under consideration;
- expected markets;
- expected transaction frequency;
- portfolio size range;
- base currency;
- long-term vs tactical use.

## Ask AI to compare

- regulation;
- fees;
- FX;
- custody;
- market access;
- reporting;
- transferability;
- operational risk.

## Verification

Always verify directly on the broker website:

- current fees;
- legal entity;
- regulatory status;
- custody structure;
- current product availability.

## Example prompt

> I am a long-term investor resident in Spain comparing Broker A, Broker B and Broker C. Build a comparison table using regulation, custody, trading fees, FX fees, market access, fractional shares, transfer fees and tax-reporting support. Separate confirmed facts from items I need to verify directly. Do not choose a winner unless the evidence clearly supports the conclusion.

---

# 11. Lesson 10 — AI workflow: ETF comparison

Upload or provide:

- factsheets;
- KID/KIID;
- issuer pages.

## Ask AI to extract

- index;
- TER;
- AUM;
- domicile;
- replication;
- accumulating/distributing;
- top holdings;
- sector concentration;
- geographic concentration.

## Useful output

A normalized comparison table.

## Example prompt

> Compare these three ETF factsheets. Use only the attached documents. Extract index, TER, AUM, domicile, replication method, distribution policy, top 10 concentration, sector exposure and geographic exposure. Flag any field that is missing instead of guessing.

---

# 12. Lesson 11 — Order execution

## Market order

Executes at the best available market price.

### Risk
Unexpected execution price in volatile or illiquid securities.

## Limit order

Executes only at the specified price or better.

### Benefit
More price control.

### Risk
May not execute.

## Stop order

Introduced conceptually here.

The student should understand the mechanism but not treat stops as mandatory for every long-term position.

---

# 13. Lesson 12 — What happens when you press BUY

The student should understand:

1. order submission;
2. routing;
3. bid / ask;
4. execution;
5. confirmation;
6. settlement;
7. portfolio position.

## Why this matters

Understanding execution reduces fear and prevents avoidable mistakes.

---

# 14. Lesson 13 — Automation

Busy investors should automate what does not require judgment.

Potentially automate:

- recurring contributions;
- ETF purchases when appropriate;
- savings transfers;
- price alerts;
- earnings reminders.

Do not automate:

- individual-stock purchases that require thesis review;
- reacting to headlines;
- complex strategies not understood.

---

# 15. Common mistakes

- selecting a broker only because of a promotion;
- obsessing over tiny fee differences while ignoring custody or FX;
- buying overlapping ETFs;
- mistaking many ETFs for diversification;
- buying a thematic ETF without understanding concentration;
- changing allocation every month;
- copying someone else's portfolio;
- putting too much capital into Satellite positions too early.

---

# 16. Deliverable — Investment System #001

Build the required Investment System #001 using the canonical components:

- [101A Broker Comparison](../03_templates/templates_and_rubrics.md#7-template-101a--broker-comparison): compare 2–3 brokers and explain the trade-off accepted.
- [101B ETF 6-Point Check](../03_templates/templates_and_rubrics.md#8-template-101b--etf-6-point-check): apply the check when choosing an ETF.
- [101C Personal Portfolio Architecture](../03_templates/templates_and_rubrics.md#9-template-101c--personal-portfolio-architecture): explain how the allocation and limits fit the Investor Profile.
- [101D First Investment Record](../03_templates/templates_and_rubrics.md#10-template-101d--first-investment-record): document the investment and its portfolio role.

Execution may be real or a paper trade if the student is not ready. Templates owns the fields; the course teaches comparison, allocation, and execution.

---

# 17. Graduation test

Apply the [Course 101 graduation rubric](../03_templates/templates_and_rubrics.md#101--build-your-investment-system) and [canonical scoring threshold](../03_templates/templates_and_rubrics.md#5-universal-evaluation-rubric). The questions below demonstrate the required outcomes.

The student should be able to answer:

- Why this broker?
- Why this ETF or first security?
- What role does it play in the portfolio?
- What would make the position inappropriate?
- How much time will this system require each month?

If the system requires constant attention, it is poorly designed for the target student.
