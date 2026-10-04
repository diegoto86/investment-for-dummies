---
title: "301 — What Is It Worth?"
status: "Canonical Draft"
version: "1.0"
program: "Invest Smarter with AI"
audience: "Busy professionals and entrepreneurs"
---

# 301 — What Is It Worth?

## Course promise

**Understand valuation, expectations and when price disconnects from value.**

This course teaches practical valuation for investors who do not have time to build complex institutional models.

The student should learn to estimate a reasonable valuation range, understand what expectations are embedded in the price, and distinguish:

- cheap;
- fairly valued;
- expensive;
- potentially undervalued;
- value trap.

The objective is not false precision.

The objective is better judgment.

---

# 1. What the student should be able to do

By the end of the course, the student should be able to:

- understand price vs value;
- understand why valuation depends on business quality and growth;
- use relevant valuation multiples;
- compare current valuation with history and peers;
- build simple bear / base / bull scenarios;
- understand market expectations;
- estimate a reasonable fair-value range;
- identify possible undervaluation;
- distinguish undervaluation from deterioration;
- use AI to normalize financial data and build scenarios without surrendering judgment.

---

# 2. Lesson 1 — Price is not value

## Price
Current market quotation.

## Value
Economic worth based on future cash generation and risk.

## Key idea

A company can be:

- excellent but overpriced;
- mediocre but temporarily undervalued;
- cheap for a good reason;
- expensive and still a good investment if economics improve dramatically.

---

# 3. Lesson 2 — What drives valuation

Valuation is influenced by:

- growth;
- margins;
- durability;
- capital intensity;
- balance-sheet risk;
- competitive advantage;
- cyclicality;
- interest rates;
- market expectations.

## Mental model

Higher-quality, durable growth usually deserves a higher multiple.

Cyclical, leveraged or structurally declining businesses usually deserve a lower multiple.

---

# 4. Lesson 3 — Core valuation metrics

Use only when appropriate.

## P/E

Useful when:

- earnings are meaningful;
- business is reasonably mature;
- capital structure is not distorting comparison.

## Forward P/E

Useful for expectation comparison.

Risk:

Consensus may be wrong.

## EV/EBITDA

Useful for comparing businesses with different capital structures.

Limitations:

Can understate capital intensity.

## Price / FCF

Useful when cash generation is central.

## FCF yield

Useful to compare cash generation relative to market value.

## Price / Sales

Useful only when margins and business economics are understood.

Avoid using it alone.

---

# 5. Lesson 4 — Historical valuation

Compare the company against itself.

Ask:

- What multiple has the market historically paid?
- Was the business quality the same?
- Was growth the same?
- Was the rate environment the same?
- Were margins at similar levels?

## Warning

Historical average does not equal fair value.

The company or industry may have structurally changed.

---

# 6. Lesson 5 — Peer valuation

Compare companies with similar economics.

Potential dimensions:

- growth;
- margins;
- leverage;
- ROIC;
- cyclicality;
- competitive position.

## Avoid

Comparing companies merely because they share an industry label.

---

# 7. Lesson 6 — Expectations matter

A stock price reflects what the market collectively expects.

The key question becomes:

> What needs to happen for today's price to make sense?

Possible expectations:

- revenue growth;
- margin expansion;
- lower losses;
- higher utilization;
- new product success;
- cycle recovery;
- multiple expansion.

---

# 8. Lesson 7 — Reverse the question

Instead of asking only:

> What is this company worth?

Ask:

> What is the market already assuming?

This is especially useful in high-growth or cyclical companies.

---

# 9. Lesson 8 — Simple scenario analysis

Use:

- Bear;
- Base;
- Bull.

Change only the variables that materially drive value.

Possible variables:

- revenue growth;
- margin;
- EPS;
- FCF;
- terminal multiple;
- cycle recovery.

## Rule

Do not create 25 assumptions.

Focus on the few drivers that move the outcome.

---

# 10. Lesson 9 — Fair-value range

Do not pretend fair value is a single exact number.

Prefer:

- conservative range;
- base range;
- optimistic range.

Example structure:

| Scenario | Earnings / FCF | Multiple | Implied Value |
|---|---:|---:|---:|
| Bear | X | X | X |
| Base | X | X | X |
| Bull | X | X | X |

---

# 11. Lesson 10 — Margin of safety

Margin of safety protects against:

- estimation error;
- business deterioration;
- market volatility;
- unexpected events.

## Important

The required margin depends on uncertainty.

A predictable company may need less discount than a cyclical, leveraged or highly uncertain company.

---

# 12. Lesson 11 — Cheap vs undervalued

## Cheap

Low valuation multiple.

## Undervalued

Market price appears below reasonable economic value.

A company can be cheap because:

- earnings are peaking;
- industry is declining;
- debt is dangerous;
- customer concentration is high;
- accounting earnings overstate cash economics.

---

# 13. Lesson 12 — Value traps

Potential signs:

- persistent revenue decline;
- deteriorating margins;
- rising debt;
- shrinking FCF;
- structural disruption;
- poor capital allocation;
- recurring dilution;
- "cheap" valuation based on peak earnings.

## Key question

> Is the valuation low because the market is wrong, or because the business is getting worse?

---

# 14. Lesson 13 — Market expectations around earnings

Understand:

- consensus;
- guidance;
- beat / miss;
- revisions;
- forward estimates.

A company can beat earnings and still fall if expectations were even higher.

A company can miss earnings and rise if the market feared worse.

---

# 15. AI workflow — Normalize the financials

Provide filings or financial tables.

## Prompt

> Create a 5-year table using only the attached documents with:
> revenue, revenue growth, gross margin, operating margin, EPS, operating cash flow, CapEx, free cash flow, net debt and diluted share count.
>
> Mark any unavailable data as missing. Do not estimate missing values unless I explicitly ask. Cite the document and period for each figure.

---

# 16. AI workflow — Historical valuation

## Prompt

> Using the valuation history I provide, compare the current multiple with historical ranges. Then identify which business conditions would make historical comparison misleading. Do not assume mean reversion is inevitable.

---

# 17. AI workflow — Peer comparison

## Prompt

> Compare these companies using revenue growth, operating margin, FCF margin, net debt, ROIC where available, and current valuation multiples. Explain which differences in business quality could justify a valuation premium or discount.

---

# 18. AI workflow — Expectations analysis

## Prompt

> Based on current consensus estimates, guidance and the current market price I provide, infer what expectations appear to be embedded in the valuation. Separate:
> - facts;
> - market expectations;
> - your inference;
> - variables that would change the conclusion.

---

# 19. AI workflow — Scenario builder

## Prompt

> Build a simple Bear / Base / Bull valuation using only the three most important value drivers for this company. Show assumptions explicitly. Do not produce a single target price without showing the assumptions that create it.

---

# 20. Human judgment

The investor must decide:

- Are the assumptions reasonable?
- Is the multiple appropriate for this business?
- Is the business currently above or below normalized earnings?
- What could make the valuation framework fail?
- Is uncertainty low enough to invest?

---

# 21. Common mistakes

- using one multiple for every sector;
- comparing P/E without comparing growth and quality;
- using peak cyclical earnings;
- trusting consensus blindly;
- anchoring on a previous share price;
- assuming a stock is cheap because it fell;
- calculating a DCF with dozens of unsupported assumptions;
- asking AI for a target price before understanding the business.

---

# 22. Deliverable — Valuation & Expectations Card

## Company
Ticker / price.

## Current valuation
Relevant multiples.

## Historical context
Range and caveats.

## Peer context
Relevant peers and differences.

## Expectations
What appears priced in?

## Bear case
Key assumptions.

## Base case
Key assumptions.

## Bull case
Key assumptions.

## Fair-value range
Reasonable range, not false precision.

## Main valuation risk
What could make this analysis wrong?

## Decision

- clearly unattractive;
- watch;
- potentially attractive;
- requires more research.

---

# 23. Graduation test

The student should be able to explain:

- Why is this company valued at this multiple?
- What assumptions justify the current price?
- What would need to happen for the stock to be undervalued?
- Is the apparent discount caused by temporary fear or structural deterioration?
- What is a reasonable valuation range?

If the student cannot explain the assumptions behind the valuation, they should not rely on the output.
