# Enterprise Deployment Guide: CUHP Question Bank

## 1. Pre-Requisites
- Node.js >= 18.x
- MongoDB Server / Atlas Cluster
- Pinecone or Milvus Vector Database Account
- OpenAI / Anthropic API Keys

## 2. Environment Configuration
Ensure `.env.production` contains all necessary secrets:
```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/cuhp
JWT_SECRET=super_secure_secret_key_123!
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
VECTOR_DB_URL=https://cuhp-vector-index...
```

## 3. Build & Deploy
### Backend
1. `cd backend`
2. `npm install`
3. `npm run build`
4. Start via PM2 or Docker: `pm2 start dist/server.js --name cuhp-backend`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run build`
4. Serve the `dist` folder via Nginx or host on Vercel/Netlify.

## 4. Post-Deployment Validation
1. Log in as a `super_admin`.
2. Navigate to `/admin/platform`.
3. Click **Run Full Validation** to confirm that the Gateway, Prompt Repo, and Safety Engines are cleanly interconnected.
4. If `DeploymentReadiness` shows `READY FOR PRODUCTION`, the platform is live.
