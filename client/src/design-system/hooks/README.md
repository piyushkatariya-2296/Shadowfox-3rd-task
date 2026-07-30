# useTheme Hook

**Requirements:** 2.8, 13.10

## Overview

The `useTheme` hook provides access to the theme context, enabling components to:
- Access the current theme mode (light/dark)
- Switch between themes programmatically
- Access all design tokens for the current theme

## Usage

### Basic Import

```jsx
import { useTheme } from '../design-system/ThemeProvider.jsx';
// or
import { useTheme } from '../design-system';
```

### Hook Return Value

```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark';          // Current theme mode
  setTheme: (theme: 'light' | 'dark') => void;  // Set theme explicitly
  toggleTheme: () => void;          // Toggle between light and dark
  tokens: DesignTokens;             // Complete design tokens object
}
```

## Examples

### 1. Simple Theme Toggle

```jsx
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

### 2. Explicit Theme Selection

```jsx
function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <p>Current: {theme}</p>
    </div>
  );
}
```

### 3. Using Design Tokens

```jsx
function StyledComponent() {
  const { tokens } = useTheme();
  
  return (
    <div style={{
      backgroundColor: tokens.colors.semantic.surface,
      color: tokens.colors.semantic.text.primary,
      padding: tokens.spacing['4'],
      borderRadius: tokens.borders.radius.md,
      boxShadow: tokens.shadows.sm,
    }}>
      Styled with design tokens
    </div>
  );
}
```

### 4. Theme-Aware Component

```jsx
function ConditionalContent() {
  const { theme, tokens } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme === 'light' 
        ? tokens.colors.brand.cream.bg 
        : tokens.colors.semantic.background
    }}>
      {theme === 'light' ? 'Light mode content' : 'Dark mode content'}
    </div>
  );
}
```

### 5. Complete Example

```jsx
function CompleteExample() {
  const { theme, setTheme, toggleTheme, tokens } = useTheme();
  
  return (
    <div style={{ padding: tokens.spacing['6'] }}>
      <h1 style={{ 
        fontFamily: tokens.typography.fontFamily.serif,
        color: tokens.colors.semantic.text.primary 
      }}>
        Current Theme: {theme}
      </h1>
      
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
    </div>
  );
}
```

## Design Tokens Structure

The `tokens` object contains all design tokens organized by category:

### Colors

```javascript
tokens.colors = {
  brand: {
    terracotta: { 400, 500, 600, 700 },
    espresso: { 900, 800, 700, 500 },
    cream: { bg, surface, card, border },
    sage: { 500 }
  },
  semantic: {
    primary,           // Main brand color
    primaryHover,      // Hover state for primary
    secondary,         // Secondary brand color
    secondaryHover,    // Hover state for secondary
    background,        // Page background
    surface,           // Surface background
    card,             // Card background
    border,           // Border color
    text: {
      primary,        // Primary text color
      secondary,      // Secondary text color
      tertiary,       // Tertiary text color
      accent,         // Accent text color
      inverse         // Inverse text color (for colored backgrounds)
    },
    state: {
      success,        // Success state color
      warning,        // Warning state color
      error,          // Error state color
      info            // Info state color
    }
  }
}
```

### Typography

```javascript
tokens.typography = {
  fontFamily: {
    serif,   // "Playfair Display, Georgia, serif"
    sans,    // "DM Sans, system-ui, sans-serif"
    mono     // "JetBrains Mono, Consolas, monospace"
  },
  fontSize: {
    xs,      // 0.75rem (12px)
    sm,      // 0.875rem (14px)
    base,    // 1rem (16px)
    lg,      // 1.125rem (18px)
    xl,      // 1.25rem (20px)
    '2xl',   // 1.5rem (24px)
    '3xl',   // 1.875rem (30px)
    '4xl',   // 2.25rem (36px)
    '5xl',   // 3rem (48px)
    '6xl'    // 3.75rem (60px)
  },
  fontWeight: {
    normal,    // 400
    medium,    // 500
    semibold,  // 600
    bold       // 700
  },
  lineHeight: {
    tight,     // 1.1
    snug,      // 1.25
    normal,    // 1.5
    relaxed,   // 1.75
    loose      // 2
  },
  letterSpacing: {
    tighter,   // -0.05em
    tight,     // -0.025em
    normal,    // 0
    wide,      // 0.025em
    wider,     // 0.05em
    widest     // 0.15em
  }
}
```

### Spacing

```javascript
tokens.spacing = {
  '0',     // 0
  'px',    // 1px
  '0.5',   // 0.125rem (2px)
  '1',     // 0.25rem (4px)
  '2',     // 0.5rem (8px)
  '3',     // 0.75rem (12px)
  '4',     // 1rem (16px)
  '5',     // 1.25rem (20px)
  '6',     // 1.5rem (24px)
  '8',     // 2rem (32px)
  '10',    // 2.5rem (40px)
  '12',    // 3rem (48px)
  '16',    // 4rem (64px)
  '20',    // 5rem (80px)
  '24'     // 6rem (96px)
}
```

### Shadows

```javascript
tokens.shadows = {
  none,    // 'none'
  sm,      // Small shadow
  md,      // Medium shadow
  lg,      // Large shadow
  xl,      // Extra large shadow
  '2xl'    // 2x extra large shadow
}
```

### Borders

```javascript
tokens.borders = {
  radius: {
    none,    // 0
    sm,      // 0.125rem (2px)
    md,      // 0.375rem (6px)
    lg,      // 0.5rem (8px)
    xl,      // 0.75rem (12px)
    '2xl',   // 1rem (16px)
    full     // 9999px (pill shape)
  },
  width: {
    thin,    // 1px
    base,    // 2px
    thick    // 4px
  }
}
```

### Motion

```javascript
tokens.motion = {
  duration: {
    fast,     // 150ms
    base,     // 250ms
    slow,     // 350ms
    slower    // 500ms
  },
  easing: {
    linear,      // cubic-bezier(0, 0, 1, 1)
    easeIn,      // cubic-bezier(0.4, 0, 1, 1)
    easeOut,     // cubic-bezier(0, 0, 0.2, 1)
    easeInOut,   // cubic-bezier(0.4, 0, 0.2, 1)
    spring       // cubic-bezier(0.34, 1.56, 0.64, 1)
  }
}
```

### Breakpoints

```javascript
tokens.breakpoints = {
  xs,      // 0px
  sm,      // 640px
  md,      // 768px
  lg,      // 1024px
  xl,      // 1280px
  '2xl'    // 1536px
}
```

## Requirements Fulfilled

- **Requirement 2.8**: Provides theme value, setTheme, toggleTheme, and tokens object via context
- **Requirement 13.10**: Hook is exported and accessible to all components

## Error Handling

The hook will throw an error if used outside of a ThemeProvider:

```jsx
// ❌ This will throw an error
function MyComponent() {
  const { theme } = useTheme(); // Error: useTheme must be used within a ThemeProvider
  return <div>{theme}</div>;
}

// ✅ Correct usage
function App() {
  return (
    <ThemeProvider>
      <MyComponent /> {/* Now useTheme works */}
    </ThemeProvider>
  );
}
```

## Testing

To manually test the useTheme hook, you can use the `ThemeTest` component:

```jsx
import { ThemeProvider } from './design-system/ThemeProvider.jsx';
import { ThemeTest } from './design-system/hooks/ThemeTest.jsx';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="pulsefit-theme">
      <ThemeTest />
    </ThemeProvider>
  );
}
```

## Related Files

- **ThemeProvider.jsx**: Contains the hook implementation
- **tokens/index.js**: Design token definitions
- **useTheme.example.jsx**: Additional usage examples
- **ThemeTest.jsx**: Manual testing component

## See Also

- [ThemeProvider Documentation](../ThemeProvider.jsx)
- [Design Tokens Documentation](../tokens/README.md)
- [Design System Overview](../README.md)
