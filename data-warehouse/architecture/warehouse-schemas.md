# Warehouse Schemas & Architecture

## 1. Overview
The CUHP Question Bank Enterprise Data Warehouse (EDW) is designed as a provider-neutral, scalable analytical platform. It strictly separates analytical workloads from operational databases (MongoDB) to ensure performance and flexibility.

## 2. Schema Strategy
The EDW utilizes a hybrid approach:
- **Core Warehouse**: Kimball Star Schema with Conformed Dimensions to provide a unified enterprise view.
- **Data Marts**: Snowflake variations and pre-aggregated tables optimized for specific reporting domains.

## 3. Storage Tiers
- **Staging Area**: Temporary tables where raw data from operational systems lands before transformation.
- **ODS / Integration Layer**: Cleansed, standardized transactional data.
- **Dimensional Layer**: The core Fact and Dimension tables.
- **Presentation / Mart Layer**: Materialized views and aggregates served to BI tools (Tableau, PowerBI, Metabase) and the Analytical API.

## 4. Platform Agnosticism
The schema definitions rely on ANSI SQL standards (e.g., standard data types, window functions) ensuring portability across columnar databases like Snowflake, BigQuery, Amazon Redshift, or open-source engines like Presto/Trino over Parquet.
