# Implementation Plan: Distinctive Visual Design System Overhaul

## Overview

This implementation plan converts the design system specification into incremental coding tasks for the PulseFit Studio application. The design system will introduce a comprehensive token-based architecture with reusable primitive components, layout utilities, composite components, and theme management—all built in JavaScript/JSX to match the existing codebase.

The implementation follows a layered approach: (1) design tokens foundation, (2) theme provider infrastructure, (3) primitive components (Button, Card, Typography), (4) layout primitives (Stack, Grid), (5) animation system, (6) composite components (refactored ClassCard), and (7) application-level integration. Each step builds on the previous layers to ensure incremental validation and integration.

## Tasks

- [x] 1. Create design system directory structure and design tokens
  - Create `/client/src/design-system` directory with subdirectories: `/tokens`, `/primitives`, `/layout`, `/composite`, `/motion`, `/utils`
  - Create design tokens file with color, typography, spacing, shadow, border, motion, and breakpoint definitions
  - Export tokens as JavaScript constants
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10_

- [ ] 2. Implement theme provider and CSS custom property system
  - [-] 2.1 Create ThemeProvider component with React Context
    - Implement theme state management (light/dark modes)
    - Implement localStorage persistence with fallback to in-memory storage
    - Implement system preference detection via `prefers-color-scheme`
    - Implement CSS custom property injection into document root
    - Add data-theme attribute management on root element
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9_
  
  - [-] 2.2 Create useTheme hook for accessing theme context
    - Export hook that provides theme value, setTheme, toggleTheme, and tokens object
    - _Requirements: 2.8, 13.10_
  
  - [~] 2.3 Integrate ThemeProvider into App.jsx root component
    - Wrap existing application with ThemeProvider
    - Pass defaultTheme and storageKey props
    - _Requirements: 2.1, 2.2, 18.2_

- [~] 3. Checkpoint - Verify theme switching works
  - Ensure theme provider correctly switches between light and dark modes
  - Verify CSS custom properties update in browser DevTools
  - Ensure all tests pass, ask the user if questions arise

- [ ] 4. Implement Button primitive component
  - [~] 4.1 Create Button component with variant system
    - Implement variants: primary, secondary, outline, ghost, danger
    - Implement sizes: sm, md, lg
    - Implement loading state with spinner indicator
    - Implement left/right icon composition support
    - Implement fullWidth prop
    - Add ARIA attributes (aria-label, aria-disabled, aria-busy)
    - Support keyboard activation (Enter/Space keys)
    - Apply focus ring styles for keyboard navigation
    - Use design tokens for colors, spacing, typography
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 10.4, 10.5, 10.6, 10.7, 10.8_
  
  - [ ]* 4.2 Write unit tests for Button component
    - Test all variants render correctly
    - Test size variations
    - Test loading state disables button and shows spinner
    - Test keyboard activation (Enter and Space)
    - Test icon composition
    - _Requirements: 3.1, 3.2, 3.3, 3.7, 3.10, 17.1_

- [ ] 5. Implement Card primitive component
  - [~] 5.1 Create Card component with variants
    - Implement variants: default, panel, outlined, elevated
    - Implement padding options: none, sm, md, lg
    - Implement interactive prop for hover states
    - Apply semantic shadow tokens based on variant
    - Apply semantic border tokens based on variant
    - Support asChild composition pattern
    - Use design tokens for shadows, borders, spacing
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_
  
  - [ ]* 5.2 Write unit tests for Card component
    - Test all variants apply correct styles
    - Test padding options
    - Test interactive hover behavior
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 17.1_

- [ ] 6. Implement Typography components (Heading and Text)
  - [~] 6.1 Create Heading component with semantic levels
    - Require level prop (1-6) for semantic HTML
    - Implement as prop to decouple visual from semantic
    - Implement variants: display, headline, title, subhead
    - Implement weight options: normal, medium, semibold, bold
    - Render correct h1-h6 element based on level prop
    - Use typography design tokens
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.11, 10.15_
  
  - [~] 6.2 Create Text component with size and color options
    - Implement size options: xs, sm, base, lg, xl
    - Implement weight options: normal, medium, semibold, bold
    - Implement color options: primary, secondary, tertiary, accent, muted
    - Implement text alignment: left, center, right
    - Implement truncate prop for single-line ellipsis
    - Implement clamp prop for multi-line truncation
    - Use typography design tokens
    - _Requirements: 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.12_
  
  - [ ]* 6.3 Write unit tests for Typography components
    - Test Heading renders correct semantic element (h1-h6)
    - Test as prop overrides visual rendering
    - Test Text color variants meet contrast requirements
    - Test truncate and clamp behaviors
    - _Requirements: 5.1, 5.2, 5.9, 5.10, 17.1_

- [~] 7. Checkpoint - Verify primitive components work with theme
  - Test Button, Card, Heading, and Text components in light and dark themes
  - Verify color contrast meets WCAG AA standards
  - Ensure all tests pass, ask the user if questions arise

- [ ] 8. Implement Stack layout primitive
  - [~] 8.1 Create Stack component for flexbox layouts
    - Implement direction options: vertical, horizontal
    - Implement spacing prop using design token keys
    - Implement align options: start, center, end, stretch
    - Implement justify options: start, center, end, between, around
    - Implement wrap prop for flexbox wrapping
    - Implement divider prop with correct rendering between children
    - Use spacing design tokens
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10_
  
  - [ ]* 8.2 Write unit tests for Stack component
    - Test vertical and horizontal directions
    - Test spacing token application
    - Test align and justify options
    - Test divider rendering (not before first or after last child)
    - _Requirements: 6.1, 6.2, 6.8, 6.9, 6.10, 17.1_

- [ ] 9. Implement Grid layout primitive
  - [~] 9.1 Create Grid component for CSS Grid layouts
    - Implement columns as number or responsive breakpoint object
    - Implement responsive column resolution with cascade logic
    - Implement gap prop using design token keys
    - Implement alignItems options: start, center, end, stretch
    - Implement justifyItems options: start, center, end, stretch
    - Default to 1 column when no breakpoint matches
    - Use CSS Grid for implementation
    - Use spacing design tokens
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.10, 11.1, 11.2_
  
  - [ ]* 9.2 Write property test for responsive column calculation
    - **Property 1: Responsive Column Cascade**
    - **Validates: Requirements 7.2, 7.3, 7.7, 7.8**
    - Generate arbitrary breakpoint configurations
    - Verify column count cascades to next smaller defined breakpoint
    - Verify fallback to 1 column when no breakpoints match
    - _Requirements: 7.2, 7.3, 7.7, 7.8, 17.5_

- [ ] 10. Implement Animation system with Framer Motion
  - [~] 10.1 Create AnimationWrapper component
    - Implement animation presets: fadeIn, slideUp, slideDown, scaleIn
    - Implement duration, delay, and once props
    - Implement Intersection Observer for scroll-triggered animations
    - Respect prefers-reduced-motion media query
    - Use GPU-accelerated properties (transform, opacity) only
    - Use motion design tokens for duration and easing
    - Gracefully fallback if IntersectionObserver is unsupported
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 9.10, 9.11, 9.12, 12.3, 12.4, 14.4, 14.5_
  
  - [~] 10.2 Create motion utilities for common animations
    - Define animation preset variants for Framer Motion
    - Export reusable motion configurations
    - _Requirements: 9.1, 9.10_
  
  - [ ]* 10.3 Write unit tests for AnimationWrapper
    - Test reduced motion preference disables animations
    - Test once prop triggers animation exactly once
    - Test children render even if animation fails
    - _Requirements: 9.6, 9.8, 9.12, 17.1_

- [~] 11. Checkpoint - Verify layout and animation primitives
  - Test Stack and Grid with different configurations
  - Test AnimationWrapper with scroll triggers
  - Verify animations respect reduced motion preference
  - Ensure all tests pass, ask the user if questions arise

- [ ] 12. Implement Badge primitive component
  - [~] 12.1 Create Badge component for labels and tags
    - Implement variants: default, primary, secondary, success, warning, error
    - Implement sizes: sm, md, lg
    - Use design tokens for colors and spacing
    - _Requirements: 1.1, 1.2, 3.1, 3.2_
  
  - [ ]* 12.2 Write unit tests for Badge component
    - Test all variants render with correct colors
    - Test size variations
    - _Requirements: 17.1_

- [ ] 13. Refactor ClassCard as composite component using primitives
  - [~] 13.1 Rebuild ClassCard using design system primitives
    - Replace div containers with Card primitive
    - Replace heading with Heading primitive
    - Replace text with Text primitive
    - Replace button with Button primitive
    - Use Badge primitive for category and level tags
    - Implement variants: default, compact, featured
    - Implement hover animations using AnimationWrapper
    - Use lazy loading for images (loading="lazy")
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 12.6, 18.7_
  
  - [ ]* 13.2 Write integration tests for ClassCard
    - Test ClassCard displays all service metadata
    - Test booking button triggers onBook callback
    - Test hover animation applies transform and shadow
    - _Requirements: 8.1, 8.2, 8.3, 8.9, 17.8_

- [ ] 14. Refactor Navbar component using design system primitives
  - [~] 14.1 Rebuild Navbar using design system primitives
    - Replace button elements with Button primitive
    - Replace text elements with Text/Heading primitives
    - Use Stack primitive for layout spacing
    - Implement theme toggle button using useTheme hook
    - Use design tokens for colors and spacing
    - _Requirements: 18.6, 13.10, 2.8_
  
  - [ ]* 14.2 Write accessibility tests for Navbar
    - Test keyboard navigation through nav links
    - Test focus indicators are visible
    - Test semantic HTML structure (nav element)
    - _Requirements: 10.4, 10.5, 10.6, 10.7, 10.12, 17.9_

- [ ] 15. Implement utility functions for design system
  - [~] 15.1 Create color contrast calculation utility
    - Implement WCAG contrast ratio calculation
    - Create validation function for color combinations
    - _Requirements: 10.2, 10.3, 17.3_
  
  - [~] 15.2 Create CSS value sanitization utility
    - Validate CSS custom property values
    - Reject dangerous patterns (javascript:, <script>, expression())
    - _Requirements: 14.6, 16.1, 16.2, 16.3_
  
  - [~] 15.3 Create image URL validation utility
    - Validate URL protocols (only http/https allowed)
    - Provide safe placeholder fallback
    - _Requirements: 16.5, 16.6_
  
  - [ ]* 15.4 Write property test for color contrast validation
    - **Property 2: Contrast Ratio Calculation**
    - **Validates: Requirements 10.2, 10.3**
    - Generate arbitrary color pairs
    - Verify contrast ratio is between 1 and 21
    - Verify identical colors return ratio of 1
    - Verify pure white/black returns ratio of 21
    - _Requirements: 10.2, 10.3, 17.3_

- [~] 16. Checkpoint - Verify composite components and utilities
  - Test refactored ClassCard and Navbar render correctly
  - Verify color contrast meets WCAG AA standards
  - Test theme toggle in Navbar switches themes
  - Ensure all tests pass, ask the user if questions arise

- [ ] 17. Update global styles with design system tokens
  - [~] 17.1 Create global styles injection function
    - Generate CSS reset styles (box-sizing, margin reset)
    - Generate font-face declarations for Playfair Display and DM Sans
    - Enable smooth scrolling (respecting reduced motion)
    - Apply custom scrollbar styles using brand colors
    - Inject global styles into document head
    - _Requirements: 15.1, 15.2, 15.3, 15.4_
  
  - [~] 17.2 Update Tailwind config to use design tokens
    - Extend Tailwind theme with design system color palette
    - Add custom utilities for design tokens
    - _Requirements: 1.1, 1.2, 15.3, 15.4_

- [ ] 18. Implement accessibility validation utilities
  - [~] 18.1 Create ARIA attribute validation utility
    - Validate required ARIA attributes on interactive components
    - Check for proper ARIA roles
    - _Requirements: 10.9, 17.9_
  
  - [~] 18.2 Create keyboard navigation testing utilities
    - Provide test helpers for keyboard events (Tab, Enter, Space)
    - _Requirements: 10.4, 10.5, 10.6, 10.8, 17.8_
  
  - [ ]* 18.3 Write accessibility tests using jest-axe
    - Test Button component for WCAG violations
    - Test Card component for semantic HTML
    - Test Typography components for heading hierarchy
    - Test Navbar for keyboard navigation
    - _Requirements: 10.1, 10.12, 10.15, 17.9, 17.10_

- [ ] 19. Implement error handling and resilience patterns
  - [~] 19.1 Add error boundaries for design system components
    - Create error boundary wrapper for graceful failures
    - Log errors in development mode
    - _Requirements: 14.5, 13.6_
  
  - [~] 19.2 Add validation and fallback logic to ThemeProvider
    - Validate theme values from localStorage
    - Fallback to light theme on invalid values
    - Handle localStorage unavailability gracefully
    - _Requirements: 14.1, 14.2, 14.3, 16.4_
  
  - [~] 19.3 Add validation to design token access
    - Return fallback values for undefined tokens
    - Log warnings in development mode
    - _Requirements: 14.2, 13.6_
  
  - [ ]* 19.4 Write unit tests for error scenarios
    - Test invalid theme value handling
    - Test missing design token access
    - Test localStorage unavailability
    - Test IntersectionObserver polyfill fallback
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 17.1_

- [ ] 20. Create Storybook documentation for design system
  - [~] 20.1 Set up Storybook in the project
    - Install Storybook dependencies
    - Configure Storybook for React and Tailwind
    - _Requirements: 13.3, 17.12_
  
  - [~] 20.2 Create stories for all primitive components
    - Create stories for Button with all variants and states
    - Create stories for Card with all variants
    - Create stories for Typography components
    - Create stories for Badge component
    - Create stories for Stack and Grid layout primitives
    - _Requirements: 13.3, 13.4, 17.12_
  
  - [~] 20.3 Create stories for composite components
    - Create stories for ClassCard with all variants
    - Create stories for Navbar in light and dark themes
    - _Requirements: 13.3, 13.4_

- [ ] 21. Implement performance optimizations
  - [~] 21.1 Add CSS custom property batching in ThemeProvider
    - Batch CSS custom property updates in requestAnimationFrame
    - _Requirements: 12.1, 12.2_
  
  - [~] 21.2 Add will-change optimization to AnimationWrapper
    - Apply will-change hint only during active animations
    - Remove will-change after animation completes
    - _Requirements: 12.8, 12.9_
  
  - [~] 21.3 Implement debounced resize handlers for Grid
    - Add debounced window resize listener for responsive recalculations
    - _Requirements: 12.11_

- [ ] 22. Final integration and migration
  - [~] 22.1 Update remaining pages to use design system components
    - Refactor Home page to use design system primitives
    - Refactor Services page to use refactored ClassCard
    - Refactor Dashboard page to use design system primitives
    - _Requirements: 18.1, 18.2, 18.9, 18.10_
  
  - [~] 22.2 Remove legacy component styles and unused CSS
    - Audit and remove unused Tailwind classes
    - Remove duplicate style definitions
    - _Requirements: 18.1, 18.2_
  
  - [~] 22.3 Create migration documentation
    - Document component mapping (old → new)
    - Document breaking changes
    - Provide code examples for common patterns
    - _Requirements: 18.3, 18.4, 13.3, 13.4_

- [~] 23. Final checkpoint - Complete testing and validation
  - Run full test suite (unit, integration, accessibility tests)
  - Verify WCAG AA compliance with accessibility audits
  - Test light and dark theme switching across all pages
  - Verify responsive behavior on mobile, tablet, and desktop viewports
  - Test keyboard navigation flows across the application
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements from the requirements document for traceability
- The implementation follows a bottom-up approach: tokens → provider → primitives → layouts → animations → composites → integration
- Checkpoints ensure incremental validation and provide opportunities for user feedback
- Property tests validate universal correctness properties defined in the design document
- Unit tests validate component behavior and edge cases
- Integration tests validate component composition and user flows
- Accessibility tests ensure WCAG 2.1 Level AA compliance
- All components use JavaScript/JSX to match the existing codebase pattern
- The design system preserves the distinctive terracotta/espresso aesthetic with Playfair Display and DM Sans typography
- Migration is phased to allow coexistence of old and new components during transition

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["2.3"] },
    { "id": 3, "tasks": ["4.1", "5.1", "6.1", "6.2"] },
    { "id": 4, "tasks": ["4.2", "5.2", "6.3", "8.1", "12.1"] },
    { "id": 5, "tasks": ["8.2", "9.1", "12.2"] },
    { "id": 6, "tasks": ["9.2", "10.1", "10.2"] },
    { "id": 7, "tasks": ["10.3", "13.1"] },
    { "id": 8, "tasks": ["13.2", "14.1", "15.1", "15.2", "15.3"] },
    { "id": 9, "tasks": ["14.2", "15.4"] },
    { "id": 10, "tasks": ["17.1", "17.2", "18.1", "18.2"] },
    { "id": 11, "tasks": ["18.3", "19.1", "19.2", "19.3"] },
    { "id": 12, "tasks": ["19.4", "20.1"] },
    { "id": 13, "tasks": ["20.2", "20.3", "21.1", "21.2", "21.3"] },
    { "id": 14, "tasks": ["22.1"] },
    { "id": 15, "tasks": ["22.2", "22.3"] }
  ]
}
```
