# Developer Handbook: CUHP Platform Architecture

## Core Principles
The CUHP AI ecosystem is built on a modular, decoupled architecture. All requests pass through an API Gateway, which delegates to specialized services.

## Development Workflow
1. **Branching**: Follow GitFlow. Create feature branches from `develop`.
2. **Adding a Route**:
   - Create a controller method wrapped in `catchAsync`.
   - Protect the route in the `routes` directory using `protect` and `restrictTo`.
   - Register the route module in `index.ts`.
3. **Frontend Integration**:
   - Write a custom TanStack hook in `src/features/<module>/hooks/`.
   - Build UI components in `src/features/<module>/components/`.
   - Assemble the dashboard in `src/features/<module>/pages/`.

## Feature Flags
Do not hardcode feature availability. Instead, read from the `featureFlagService`. This allows operational teams to toggle your feature during runtime.

## Error Handling
Always throw an `AppError` inside services. The global error handler will convert it into a standard JSON response for the frontend.
