# Consent Management & Governance

## 1. Overview
The Consent Management module explicitly records user permissions for data processing, ensuring that predictive modeling, AI training, and analytics only utilize data that users have opted into.

## 2. Consent Capturing
* Users are presented with granular Consent Preferences (e.g., "Allow my anonymized data to train AI models", "Allow usage for Academic Analytics").
* **Consent Recording**: Captures the exact timestamp, IP address, and the specific version of the Privacy Policy the user agreed to.

## 3. Dynamic Consent Validation
* Before the ETL pipeline extracts data for Analytics, it queries the `consent/` engine to validate if the user has opted in. If they have not, their record is skipped or filtered out of the downstream ML dataset.

## 4. Withdrawal & Updates
* Users can update or withdraw their consent at any time via the User Settings UI.
* **Consent Withdrawal**: A withdrawal event cascades to the underlying analytical stores, flagging the user's previously collected data for removal from active ML training sets.
* **Consent History**: A strict, immutable audit log tracks every change the user makes to their privacy preferences.
