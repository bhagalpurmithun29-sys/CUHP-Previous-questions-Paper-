# Lifecycle Framework

## 1. Overview
The Lifecycle Framework orchestrates the movement of data across distinct states (Active -> Archive -> Purge) in coordination with the Retention Engine.

## 2. Data States

### 2.1 Creation & Active Usage
* Data resides in high-performance operational databases (MongoDB) or hot Data Warehouse tiers.
* Highly accessible via APIs and Dashboards.

### 2.2 Archival (Cold Storage)
* When data reaches the end of its "Active" retention period, it is moved to cold storage (e.g., AWS S3 Glacier).
* **Restoration**: Users can request data restoration from the archive, which takes 12-24 hours. The restored data is temporary and automatically purges after a defined window (e.g., 7 days).

### 2.3 Secure Disposal (Purge)
* When the total retention lifecycle ends, the data undergoes a hard purge.
* **Crypto-shredding**: If data is encrypted, dropping the specific encryption key immediately renders the data permanently inaccessible, guaranteeing secure disposal even in distributed environments.
