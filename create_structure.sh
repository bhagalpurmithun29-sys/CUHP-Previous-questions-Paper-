#!/bin/bash
# Root Directories
mkdir -p docs database scripts assets .github/workflows

# Frontend Directories
mkdir -p frontend/src/{assets,components,layouts,pages,features,hooks,contexts,services,api,constants,utils,types,styles,config,providers,routes,lib,store,animations,icons}

# Backend Directories
mkdir -p backend/src/{config,controllers,services,repositories,middlewares,routes,models,interfaces,types,validators,dtos,utils,constants,database,storage,jobs,logs,tests}

echo "Directories created successfully."
