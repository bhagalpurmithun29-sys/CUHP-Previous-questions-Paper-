# Metadata Catalog

## 1. Overview
The Metadata Catalog provides a centralized inventory of all data assets across the operational databases, Data Warehouse, and AI vector stores. It ensures data is discoverable, understandable, and trusted.

## 2. Dataset Registration
Every data asset (Table, View, Vector Index, S3 Bucket) must be registered in the catalog.
* **Auto-Discovery**: Background crawlers parse database schemas and automatically register technical metadata (columns, data types).
* **Manual Enrichment**: Data Stewards manually enrich the catalog with descriptions, tags, and classification levels.

## 3. Metadata Structure
* **Technical Metadata**: Physical schema, primary keys, indexing.
* **Business Metadata**: Business Glossary tags, definitions, and PII markers.
* **Operational Metadata**: Last updated time, ETL pipeline name, row counts.

## 4. Asset Relationships & Lineage
The catalog visually maps relationships, extending the Data Quality lineage graph. Users can see:
* Which raw MongoDB collections feed which Data Warehouse dimensions.
* Which Executive Dashboard relies on which specific Fact table.

## 5. Ownership & Certification
* Every dataset must list a Data Owner (Accountable) and Data Steward (Responsible).
* **Certification Status**: Sourced from the Data Quality module (Certified/Gold, Trusted/Silver, Draft, Deprecated), allowing analysts to quickly filter for high-quality datasets.
