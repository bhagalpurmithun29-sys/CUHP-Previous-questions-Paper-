# Developer Handbook

## 1. Introduction
This handbook provides engineering best practices for extending the Enterprise Data Warehouse.

## 2. Dimensional Modeling Guidelines
- **Surrogate Keys**: Always use surrogate keys (auto-incrementing INT or BIGINT) as primary keys for dimension tables. Never use natural keys (like student ID) as primary keys, as they do not support SCD Type 2 properly.
- **Null Handling**: Avoid NULLs in foreign keys within Fact tables. If a dimension is unknown at load time, map it to a default "Unknown" or "N/A" row in the dimension table (e.g., surrogate key `-1`).

## 3. Fact Table Guidelines
- **Additive Measures**: Ensure measures in transactional fact tables are fully additive wherever possible.
- **Grain Verification**: Before adding a new measure to a fact table, verify it aligns precisely with the declared grain of the table.

## 4. API Development
Analytical APIs must be heavily optimized:
- Enforce pagination and maximum date ranges on all queries.
- Utilize the `query-layer` abstractions instead of writing raw SQL in controllers.
- Cache the responses of high-frequency dashboard queries using Redis.
