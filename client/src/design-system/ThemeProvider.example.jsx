/**
 * ThemeProvider Usage Example
 * 
 * This file demonstrates how to use the ThemeProvider component
 * and access theme context in your application.
 */

import React from 'react';
import { ThemeProvider, useTheme } from './ThemeProvider';

// ============================================================================
// EXAMPLE 1: Basic App Setup with ThemeProvider
// ============================================================================

export function AppWithTheme() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="pulsefit-theme">
      <App />
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 2: Theme Toggle Button Component
// ============================================================================

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--colors-semantic-primary)',
        color: 'var(--colors-semantic-text-inverse)',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

// ============================================================================
// EXAMPLE 3: Component Using Theme Tokens
// ============================================================================

export function ThemedCard({ children }) {
  const { tokens } = useTheme();
  
  return (
    <div
      style={{
        backgroundColor: tokens.colors.semantic.card,
        color: tokens.colors.semantic.text.primary,
        padding: tokens.spacing['6'],
        borderRadius: tokens.borders.radius.lg,
        boxShadow: tokens.shadows.md,
        border: `${tokens.borders.width['1']} solid ${tokens.colors.semantic.border}`,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Component Using CSS Custom Properties
// ============================================================================

export function StyledComponent() {
  return (
    <div
      style={{
        // CSS custom properties are automatically available
        backgroundColor: 'var(--colors-semantic-surface)',
        color: 'var(--colors-semantic-text-primary)',
        padding: 'var(--spacing-4)',
        borderRadius: 'var(--borders-radius-base)',
      }}
    >
      This component uses CSS custom properties injected by ThemeProvider
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: Theme-Aware Component with Conditional Rendering
// ============================================================================

export function ThemeAwareComponent() {
  const { theme, tokens } = useTheme();
  
  return (
    <div style={{ padding: tokens.spacing['8'] }}>
      <h2>Current Theme: {theme}</h2>
      <p style={{ color: tokens.colors.semantic.text.secondary }}>
        {theme === 'light' 
          ? 'Enjoying the light theme!' 
          : 'Dark mode is easier on the eyes!'}
      </p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Manual Theme Setter
// ============================================================================

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <label htmlFor="theme-select">Choose Theme:</label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{
          marginLeft: '1rem',
          padding: '0.5rem',
          borderRadius: '0.25rem',
        }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

// ============================================================================
// COMPLETE APP EXAMPLE
// ============================================================================

function App() {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
      }}>
        <h1>PulseFit Studio</h1>
        <ThemeToggleButton />
      </header>
      
      <main>
        <ThemeAwareComponent />
        
        <ThemedCard>
          <h3>Class Schedule</h3>
          <p>Join us for yoga, strength training, and more!</p>
        </ThemedCard>
        
        <StyledComponent />
        
        <ThemeSelector />
      </main>
    </div>
  );
}
