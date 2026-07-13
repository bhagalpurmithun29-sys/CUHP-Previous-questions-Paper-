# Enterprise Mobile UI/UX Optimization, Responsive Design System & Adaptive Experience Platform

## 1. Folder Tree

```text
frontend/src/features/mobile-ui/
├── components/
│   ├── AdaptiveCards.tsx
│   ├── AdaptiveDialogs.tsx
│   ├── AdaptiveNavigation.tsx
│   ├── AdaptiveSearch.tsx
│   ├── BottomNavigation.tsx
│   ├── GestureSupport.tsx
│   ├── MobileTypography.tsx
│   ├── OrientationHandler.tsx
│   ├── ResponsiveForms.tsx
│   ├── ResponsiveLayout.tsx
│   ├── ResponsiveSidebar.tsx
│   ├── ResponsiveTable.tsx
│   ├── SafeAreaProvider.tsx
│   └── TouchControls.tsx
├── hooks/
│   └── useResponsive.ts
└── pages/
    └── MobileExperiencePage.tsx
```

## 2. Architecture

- **`useResponsive` Hook**: Evaluates window dimensions to provide immediate feedback on device boundaries (`isMobile`, `isTablet`, `isDesktop`) via state, powering all adaptive component trees.
- **`ResponsiveLayout`**: Central Shell mechanism rendering a standard Desktop Sidebar for large viewports, while falling back to a `BottomNavigation` block when `< 768px` threshold is crossed. This guarantees safe touch zones.
- **Adaptive Components**: All primitive UI boundaries (Modals, Tables, Grids) must reference Tailwind Breakpoints natively (`md:`, `lg:`) or leverage the `useResponsive` hook for heavy structural shifts (e.g., Table rows flipping to Cards on mobile).

## 3. Acceptance Checklist

- [x] Generated `useResponsive` custom hook.
- [x] Implemented `ResponsiveLayout` handling Desktop/Mobile navigational shifts.
- [x] Built the `MobileExperiencePage` visualizing device context in real-time.
- [x] Exported stubs for structural wrappers (`SafeAreaProvider`, `OrientationHandler`).
- [x] Ensured high accessibility with tap-friendly touch targets in `BottomNavigation`.
