/**
 * Design System - Main Export File
 * 
 * Central export point for all design system components, utilities, and tokens.
 * Use this file for tree-shakable imports across the application.
 */

// Theme Provider and Hook
export { ThemeProvider, useTheme } from './ThemeProvider.jsx';

// Design Tokens
export {
  brandColors,
  lightThemeColors,
  darkThemeColors,
  typography,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  spacing,
  shadows,
  borders,
  borderRadius,
  borderWidth,
  motion,
  duration,
  easing,
  breakpoints,
  createDesignTokens,
  designTokens,
} from './tokens/index.js';

// Future exports for primitives (to be added in subsequent tasks)
// export { Button } from './primitives/Button';
// export { Card } from './primitives/Card';
// export { Typography, Heading, Text } from './primitives/Typography';
// export { Badge } from './primitives/Badge';

// Future exports for layout primitives (to be added in subsequent tasks)
// export { Stack } from './layout/Stack';
// export { Grid } from './layout/Grid';
// export { Container } from './layout/Container';

// Future exports for composite components (to be added in subsequent tasks)
// export { ClassCard } from './composite/ClassCard';

// Future exports for animation utilities (to be added in subsequent tasks)
// export { AnimationWrapper } from './motion/AnimationWrapper';
