#!/bin/bash
mkdir -p backend/src/{config,controllers,middlewares,models,repositories,routes,services,utils,types,validation}
touch backend/src/app.ts
touch backend/src/server.ts
touch backend/.env
touch backend/.gitignore

# Config files
touch backend/src/config/database.ts
touch backend/src/config/env.ts

# User Domain
touch backend/src/controllers/auth.controller.ts
touch backend/src/services/auth.service.ts
touch backend/src/repositories/user.repository.ts
touch backend/src/models/user.model.ts
touch backend/src/routes/auth.routes.ts
touch backend/src/validation/auth.validation.ts

# Paper Domain
touch backend/src/controllers/paper.controller.ts
touch backend/src/services/paper.service.ts
touch backend/src/repositories/paper.repository.ts
touch backend/src/models/paper.model.ts
touch backend/src/routes/paper.routes.ts
touch backend/src/validation/paper.validation.ts

# Report Domain
touch backend/src/controllers/report.controller.ts
touch backend/src/services/report.service.ts
touch backend/src/repositories/report.repository.ts
touch backend/src/models/report.model.ts
touch backend/src/routes/report.routes.ts

# Middlewares
touch backend/src/middlewares/auth.middleware.ts
touch backend/src/middlewares/role.middleware.ts
touch backend/src/middlewares/error.middleware.ts
touch backend/src/middlewares/validate.middleware.ts
touch backend/src/middlewares/rateLimit.middleware.ts

# Utils
touch backend/src/utils/logger.ts
touch backend/src/utils/AppError.ts
touch backend/src/utils/catchAsync.ts

echo "Backend structure generated."
