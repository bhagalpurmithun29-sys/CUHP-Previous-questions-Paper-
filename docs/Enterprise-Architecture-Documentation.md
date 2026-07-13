# CUHP Enterprise Architecture & Deployment Documentation

## 1. Platform Module Ecosystem
The CUHP Question Bank AI ecosystem is orchestrated by the **AI Platform Integration & Orchestration** module. This capstone module oversees the end-to-end Request Lifecycle:

1. **AI Gateway**: Receives the raw query.
2. **Prompt Management**: Injects variables into the locked template.
3. **Model Routing**: Selects OpenAI, Anthropic, or Gemini.
4. **RAG / Vector Platform**: Fetches Academic Context.
5. **Safety Engine**: Validates inputs (jailbreaks) and outputs (citations).
6. **Analytics & Audit**: Persists execution metrics and interactions.

## 2. Feature Flags
A dynamic feature flag system allows operational teams to toggle entire modules without redeploying. Example flags:
- `ai-chat`: Toggles the academic chat window.
- `strict-safety`: Toggles human-in-the-loop fallback for moderation.
- `experimental-routing`: Toggles cost-based routing algorithms.

## 3. Pre-Deployment Validation
The `DeploymentReadinessService` runs automated pre-flight checks:
- Environment Variable Verification
- MongoDB Indexes Check
- RBAC Role seeding
- Vector DB (Pinecone/Milvus) cluster health
- Safety policies configuration validation

## 4. API Endpoints
- `GET /api/v1/platform/overview`: High-level workflow orchestration rates.
- `GET /api/v1/platform/health`: Specific latency across underlying microservices.
- `GET /api/v1/platform/dependencies`: Validates connections between isolated modules.
- `GET /api/v1/platform/workflows`: Structural blueprint of the AI execution pipeline.
- `GET /api/v1/platform/readiness`: Aggregated deployment score.
- `POST /api/v1/platform/flags`: Update boolean toggles for module enablement.

## 5. Roles
Only users with `super_admin`, `platform_ops`, `admin`, or `executive` can view the Orchestration NOC.

## 6. Runbook Highlights
If an integration goes down (e.g. `SystemDependencies` shows `FAILED` for RAG):
1. Navigate to `/admin/platform` (Platform Orchestration).
2. Use Feature Flags to disable `paper-qa` temporarily.
3. Validate connection strings.
4. Hit "Run Full Validation" to regenerate the deployment readiness checklist.
