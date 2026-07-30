/**
 * Design Tokens for PulseFit Studio Design System
 * 
 * This file contains all design tokens (colors, typography, spacing, shadows, borders, motion, breakpoints)
 * exported as JavaScript constants for use throughout the application.
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

/**
 * Brand color palette - preserving terracotta and espresso aesthetic
 * Requirement 1.1
 */
export const brandColors = {
  terracotta: {
    400: '#D89580',
    500: '#C47B5C',
    600: '#B56847',
    700: '#9A5538',
  },
  espresso: {
    900: '#3E2723',
    800: '#4E342E',
    700: '#5D4037',
    500: '#795548',
  },
  cream: {
    bg: '#FFF8F0',
    surface: '#FFFBF5',
    card: '#FFFFFF',
    border: '#F5E6D3',
  },
  sage: {
    500: '#8FA888',
  },
};

/**
 * Semantic color tokens for light theme
 * Requirement 1.2
 */
export const lightThemeColors = {
  primary: brandColors.terracotta[500],
  primaryHover: brandColors.terracotta[600],
  secondary: brandColors.espresso[900],
  secondaryHover: brandColors.espresso[800],
  background: brandColors.cream.bg,
  surface: brandColors.cream.surface,
  card: brandColors.cream.card,
  border: brandColors.cream.border,
  text: {
    primary: brandColors.espresso[900],
    secondary: brandColors.espresso[700],
    tertiary: brandColors.espresso[500],
    accent: brandColors.terracotta[500],
    inverse: brandColors.cream.card,
  },
  state: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
};

/**
 * Semantic color tokens for dark theme
 * Requirement 1.2
 */
export const darkThemeColors = {
  primary: brandColors.terracotta[400],
  primaryHover: brandColors.terracotta[500],
  secondary: brandColors.cream.surface,
  secondaryHover: brandColors.cream.bg,
  background: '#1A1A1A',
  surface: '#242424',
  card: '#2E2E2E',
  border: '#3E3E3E',
  text: {
    primary: brandColors.cream.surface,
    secondary: '#E0E0E0',
    tertiary: '#B0B0B0',
    accent: brandColors.terracotta[400],
    inverse: brandColors.espresso[900],
  },
  state: {
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#EF5350',
    info: '#42A5F5',
  },
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

/**
 * Font family tokens - Playfair Display for headings, DM Sans for body
 * Requirement 1.3
 */
export const fontFamily = {
  serif: '"Playfair Display", Georgia, serif',
  sans: '"DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", Consolas, "Courier New", monospace',
};

/**
 * Font size scale using rem units for accessibility
 * Requirement 1.3
 */
export const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
};

/**
 * Font weight tokens
 * Requirement 1.3
 */
export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

/**
 * Line height tokens (unitless for scalability)
 * Requirement 1.3
 */
export const lineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

/**
 * Letter spacing tokens using em units
 * Requirement 1.3
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.15em',
};

/**
 * Typography tokens combined
 * Requirement 1.3
 */
export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
};

// ============================================================================
// SPACING TOKENS
// ============================================================================

/**
 * Spacing scale using 4px base unit and rem units for consistency
 * Requirement 1.4
 */
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
};

// ============================================================================
// SHADOW TOKENS
// ============================================================================

/**
 * Shadow tokens for elevation levels with warm, subtle shadows
 * Requirement 1.5
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(62, 39, 35, 0.05)',
  base: '0 1px 3px 0 rgba(62, 39, 35, 0.1), 0 1px 2px 0 rgba(62, 39, 35, 0.06)',
  md: '0 4px 6px -1px rgba(62, 39, 35, 0.1), 0 2px 4px -1px rgba(62, 39, 35, 0.06)',
  lg: '0 10px 15px -3px rgba(62, 39, 35, 0.1), 0 4px 6px -2px rgba(62, 39, 35, 0.05)',
  xl: '0 20px 25px -5px rgba(62, 39, 35, 0.1), 0 10px 10px -5px rgba(62, 39, 35, 0.04)',
  '2xl': '0 25px 50px -12px rgba(62, 39, 35, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(62, 39, 35, 0.06)',
};

// ============================================================================
// BORDER TOKENS
// ============================================================================

/**
 * Border radius tokens
 * Requirement 1.6
 */
export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  base: '0.5rem',  // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  full: '9999px',
};

/**
 * Border width tokens
 * Requirement 1.6
 */
export const borderWidth = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
};

/**
 * Border tokens combined
 * Requirement 1.6
 */
export const borders = {
  radius: borderRadius,
  width: borderWidth,
};

// ============================================================================
// MOTION TOKENS
// ============================================================================

/**
 * Animation duration tokens
 * Requirement 1.7
 */
export const duration = {
  fast: '150ms',
  base: '250ms',
  slow: '350ms',
  slower: '500ms',
};

/**
 * Easing function tokens for smooth animations
 * Requirement 1.7
 */
export const easing = {
  linear: 'cubic-bezier(0, 0, 1, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

/**
 * Motion tokens combined
 * Requirement 1.7
 */
export const motion = {
  duration,
  easing,
};

// ============================================================================
// BREAKPOINT TOKENS
// ============================================================================

/**
 * Responsive breakpoint tokens for mobile-first design
 * Requirement 1.8
 */
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// COMPLETE DESIGN TOKENS EXPORT
// ============================================================================

/**
 * Creates complete design token set for a given theme
 * @param {('light'|'dark')} theme - Theme mode
 * @returns {Object} Complete design tokens object
 */
export const createDesignTokens = (theme = 'light') => {
  const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;
  
  return {
    colors: {
      brand: brandColors,
      semantic: colors,
    },
    typography,
    spacing,
    shadows,
    borders,
    motion,
    breakpoints,
  };
};

/**
 * Default design tokens (light theme)
 * Requirement 1.9
 */
export const designTokens = createDesignTokens('light');

/**
 * Export all token categories individually for selective imports
 */
export default {
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
};
