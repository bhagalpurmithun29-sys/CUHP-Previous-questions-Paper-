# Semantic Models & Logical Layer

## 1. Overview
The Semantic Layer abstracts physical database schemas (e.g., `Fact_Uploads`, `Dim_Student`) into business-friendly terms. It acts as the bridge between the Data Warehouse and Business Intelligence tools.

## 2. Logical Data Models
Instead of requiring analysts to understand complex SQL JOINs, the Semantic Layer defines pre-joined entities.
* **Example**: An entity called `Student Performance` automatically joins `Fact_Downloads`, `Dim_Student`, and `Dim_Course`, resolving all surrogate keys behind the scenes.

## 3. Reusable Business Dimensions
Dimensions are defined once in the Semantic Layer and inherited by all metrics.
* **Time Dimension**: Standardizes how "Month-to-Date" (MTD) or "Year-over-Year" (YoY) is calculated across the entire platform.
* **Academic Hierarchy**: Ensures that drilling down from `Department -> Program -> Course -> Subject` behaves consistently regardless of the underlying fact table.

## 4. Semantic Relationships
The platform manages semantic relationships (One-to-Many, Many-to-Many) explicitly. If a user in a BI tool tries to aggregate `Downloads` by `Faculty Hire Date`, the Semantic Layer understands the relationship is invalid and warns the user, preventing incorrect analytical conclusions.
