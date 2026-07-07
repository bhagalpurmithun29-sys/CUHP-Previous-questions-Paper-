#!/bin/bash
mkdir -p frontend/src/{api,assets,components/{common,layout,paper,auth,admin},hooks,pages,store,types,utils,context,services}
touch frontend/src/components/common/{Button,Input,Modal,Spinner}.tsx
touch frontend/src/components/layout/{Header,Footer,Sidebar,MainLayout}.tsx
touch frontend/src/pages/{Home,Login,Register,Dashboard,UploadPaper,SearchPapers,AdminDashboard,NotFound}.tsx
touch frontend/src/api/client.ts
touch frontend/src/store/authStore.ts
touch frontend/src/types/index.ts

echo "Frontend structure generated."
