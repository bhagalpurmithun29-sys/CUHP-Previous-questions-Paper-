# CUHP Question Bank

**The Digital Repository of Previous Year Question Papers for Central University of Himachal Pradesh.**

## Introduction
The CUHP Question Bank is a production-ready, highly scalable, and modern web application developed to provide students of the Central University of Himachal Pradesh with a reliable platform for accessing previous year's question papers. Built with a Clean Architecture, it ensures robust data management, secure authentication, and a seamless user experience.

## Key Features
- **Secure Authentication:** Robust user authentication system including Role-Based Access Control (RBAC), secure password recovery, and token management.
- **Academic Hierarchy Management:** Comprehensive School, Department, Course, Semester, and Subject management modules for administrators.
- **Academic Navigation System:** A recursive, responsive sidebar tree and mobile drawer for navigating the full academic structure smoothly.
- **Question Paper Repository:** Centralized storage and retrieval of question papers categorized by course, semester, and department.
- **Activity Logging:** Detailed tracking of user actions and system events for auditing purposes.
- **Modern UI/UX:** Responsive, accessible, and animated frontend leveraging Tailwind CSS, Framer Motion, and a unified Admin Layout.
- **Media Management:** Cloudinary integration for efficient storage and delivery of documents, PDFs, and image assets.

## Tech Stack

### Frontend
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion
- **State Management:** Zustand, TanStack Query
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form, Zod
- **Utilities:** Axios, React PDF

### Backend
- **Runtime:** Node.js, Express
- **Language:** TypeScript
- **Database:** MongoDB & Mongoose
- **Security:** Helmet, CORS, JWT (JSON Web Tokens), bcrypt
- **Storage:** Cloudinary
- **Logging & Monitoring:** Morgan

## Architecture
The platform is built using a **Feature-based Clean Architecture** across both frontend and backend to ensure scalability, maintainability, and clear separation of concerns.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Cloudinary](https://cloudinary.com/) Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "CUHP PREVIOUS QUESTIONS"
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Configuration**
   - Create a `.env` file in the `frontend` directory using `.env.example` as a template.
   - Create a `.env` file in the `backend` directory using `.env.example` as a template.
   - Configure necessary keys (MongoDB URI, JWT Secret, Cloudinary credentials, etc.).

5. **Run the Application Locally**
   - Start Backend: `cd backend && npm run dev`
   - Start Frontend: `cd frontend && npm run dev`

## Contributing
Contributions are welcome! Please ensure that your code adheres to the project's coding standards and structure before submitting a pull request.
