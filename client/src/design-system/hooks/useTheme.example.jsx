/**
 * Example Usage of useTheme Hook
 * 
 * This file demonstrates how to use the useTheme hook to access
 * theme state, theme controls, and design tokens.
 * 
 * Requirements: 2.8, 13.10
 */

import React from 'react';
import { useTheme } from '../ThemeProvider.jsx';

/**
 * Example 1: Theme Toggle Button
 * Demonstrates using toggleTheme to switch between light and dark modes
 */
export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

/**
 * Example 2: Theme Selector
 * Demonstrates using setTheme to explicitly set a theme
 */
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <label>Select Theme:</label>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

/**
 * Example 3: Using Design Tokens
 * Demonstrates accessing design tokens for custom styling
 */
export function CustomStyledComponent() {
  const { tokens } = useTheme();
  
  return (
    <div 
      style={{
        backgroundColor: tokens.colors.semantic.surface,
        color: tokens.colors.semantic.text.primary,
        padding: tokens.spacing['6'],
        borderRadius: tokens.borders.radius.lg,
        boxShadow: tokens.shadows.md,
        fontFamily: tokens.typography.fontFamily.sans,
      }}
    >
      <h2 
        style={{
          fontFamily: tokens.typography.fontFamily.serif,
          fontSize: tokens.typography.fontSize['2xl'],
          fontWeight: tokens.typography.fontWeight.bold,
          marginBottom: tokens.spacing['4'],
        }}
      >
        Custom Styled Component
      </h2>
      <p style={{ fontSize: tokens.typography.fontSize.base }}>
        This component uses design tokens directly from the useTheme hook.
      </p>
    </div>
  );
}

/**
 * Example 4: Theme-Aware Component
 * Demonstrates checking current theme to apply conditional logic
 */
export function ThemeAwareComponent() {
  const { theme, tokens } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <div 
        style={{
          backgroundColor: theme === 'light' 
            ? tokens.colors.brand.cream.bg 
            : tokens.colors.semantic.background,
          padding: tokens.spacing['4'],
          borderRadius: tokens.borders.radius.md,
        }}
      >
        {theme === 'light' 
          ? 'Light theme active - using cream background' 
          : 'Dark theme active - using dark background'}
      </div>
    </div>
  );
}

/**
 * Example 5: Complete Usage in a Component
 * Shows all available hook properties in one component
 */
export function CompleteExample() {
  const { theme, setTheme, toggleTheme, tokens } = useTheme();
  
  return (
    <div style={{ padding: tokens.spacing['8'] }}>
      <h1 style={{ 
        fontFamily: tokens.typography.fontFamily.serif,
        color: tokens.colors.semantic.text.primary 
      }}>
        useTheme Hook - Complete Example
      </h1>
      
      {/* Display current theme */}
      <p>Current Theme: <strong>{theme}</strong></p>
      
      {/* Theme toggle button */}
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      
      {/* Explicit theme setters */}
      <div>
        <button onClick={() => setTheme('light')}>Set Light</button>
        <button onClick={() => setTheme('dark')}>Set Dark</button>
      </div>
      
      {/* Display some token values */}
      <div style={{ marginTop: tokens.spacing['6'] }}>
        <h2>Token Examples:</h2>
        <ul>
          <li>Primary Color: {tokens.colors.semantic.primary}</li>
          <li>Background: {tokens.colors.semantic.background}</li>
          <li>Font Family: {tokens.typography.fontFamily.sans}</li>
          <li>Base Spacing: {tokens.spacing['4']}</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Hook Return Value Interface:
 * 
 * {
 *   theme: 'light' | 'dark',           // Current theme mode
 *   setTheme: (theme) => void,         // Function to set theme explicitly
 *   toggleTheme: () => void,           // Function to toggle between themes
 *   tokens: DesignTokens               // Complete design tokens object
 * }
 * 
 * Design Tokens Structure:
 * 
 * {
 *   colors: {
 *     brand: { terracotta, espresso, cream, sage },
 *     semantic: { primary, secondary, background, surface, text, state }
 *   },
 *   typography: {
 *     fontFamily: { serif, sans, mono },
 *     fontSize: { xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl },
 *     fontWeight: { normal, medium, semibold, bold },
 *     lineHeight: { tight, snug, normal, relaxed, loose },
 *     letterSpacing: { tighter, tight, normal, wide, wider, widest }
 *   },
 *   spacing: { 0, px, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 },
 *   shadows: { none, sm, md, lg, xl, 2xl },
 *   borders: {
 *     radius: { none, sm, md, lg, xl, 2xl, full },
 *     width: { thin, base, thick }
 *   },
 *   motion: {
 *     duration: { fast, base, slow, slower },
 *     easing: { linear, easeIn, easeOut, easeInOut, spring }
 *   },
 *   breakpoints: { xs, sm, md, lg, xl, 2xl }
 * }
 */
