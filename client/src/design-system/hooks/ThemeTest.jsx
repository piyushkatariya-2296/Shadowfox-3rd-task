/**
 * Theme Test Component
 * 
 * A simple component to manually test the useTheme hook functionality.
 * This can be temporarily imported into App.jsx for verification.
 * 
 * Requirements: 2.8, 13.10
 */

import React from 'react';
import { useTheme } from '../ThemeProvider.jsx';

export function ThemeTest() {
  const { theme, setTheme, toggleTheme, tokens } = useTheme();
  
  return (
    <div 
      style={{
        padding: tokens.spacing['8'],
        backgroundColor: tokens.colors.semantic.background,
        color: tokens.colors.semantic.text.primary,
        minHeight: '100vh',
        fontFamily: tokens.typography.fontFamily.sans,
      }}
    >
      <div 
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: tokens.colors.semantic.surface,
          padding: tokens.spacing['6'],
          borderRadius: tokens.borders.radius.lg,
          boxShadow: tokens.shadows.md,
        }}
      >
        <h1 
          style={{
            fontFamily: tokens.typography.fontFamily.serif,
            fontSize: tokens.typography.fontSize['3xl'],
            fontWeight: tokens.typography.fontWeight.bold,
            marginBottom: tokens.spacing['6'],
            color: tokens.colors.semantic.text.primary,
          }}
        >
          useTheme Hook Test
        </h1>
        
        {/* Current Theme Display */}
        <div style={{ marginBottom: tokens.spacing['6'] }}>
          <h2 
            style={{
              fontSize: tokens.typography.fontSize.xl,
              fontWeight: tokens.typography.fontWeight.semibold,
              marginBottom: tokens.spacing['3'],
              color: tokens.colors.semantic.text.secondary,
            }}
          >
            Current Theme
          </h2>
          <p 
            style={{
              fontSize: tokens.typography.fontSize.lg,
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.semantic.primary,
            }}
          >
            {theme.toUpperCase()}
          </p>
        </div>
        
        {/* Theme Controls */}
        <div style={{ marginBottom: tokens.spacing['6'] }}>
          <h2 
            style={{
              fontSize: tokens.typography.fontSize.xl,
              fontWeight: tokens.typography.fontWeight.semibold,
              marginBottom: tokens.spacing['3'],
              color: tokens.colors.semantic.text.secondary,
            }}
          >
            Theme Controls
          </h2>
          <div style={{ display: 'flex', gap: tokens.spacing['3'] }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: `${tokens.spacing['3']} ${tokens.spacing['6']}`,
                backgroundColor: tokens.colors.semantic.primary,
                color: tokens.colors.semantic.text.inverse,
                border: 'none',
                borderRadius: tokens.borders.radius.md,
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.medium,
                cursor: 'pointer',
                transition: `background-color ${tokens.motion.duration.base} ${tokens.motion.easing.easeInOut}`,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = tokens.colors.semantic.primaryHover;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = tokens.colors.semantic.primary;
              }}
            >
              Toggle Theme
            </button>
            
            <button
              onClick={() => setTheme('light')}
              style={{
                padding: `${tokens.spacing['3']} ${tokens.spacing['6']}`,
                backgroundColor: theme === 'light' ? tokens.colors.semantic.primary : tokens.colors.semantic.surface,
                color: theme === 'light' ? tokens.colors.semantic.text.inverse : tokens.colors.semantic.text.primary,
                border: `${tokens.borders.width.base} solid ${tokens.colors.semantic.border}`,
                borderRadius: tokens.borders.radius.md,
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.medium,
                cursor: 'pointer',
              }}
            >
              Light
            </button>
            
            <button
              onClick={() => setTheme('dark')}
              style={{
                padding: `${tokens.spacing['3']} ${tokens.spacing['6']}`,
                backgroundColor: theme === 'dark' ? tokens.colors.semantic.primary : tokens.colors.semantic.surface,
                color: theme === 'dark' ? tokens.colors.semantic.text.inverse : tokens.colors.semantic.text.primary,
                border: `${tokens.borders.width.base} solid ${tokens.colors.semantic.border}`,
                borderRadius: tokens.borders.radius.md,
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.medium,
                cursor: 'pointer',
              }}
            >
              Dark
            </button>
          </div>
        </div>
        
        {/* Token Values Display */}
        <div style={{ marginBottom: tokens.spacing['6'] }}>
          <h2 
            style={{
              fontSize: tokens.typography.fontSize.xl,
              fontWeight: tokens.typography.fontWeight.semibold,
              marginBottom: tokens.spacing['3'],
              color: tokens.colors.semantic.text.secondary,
            }}
          >
            Design Tokens (Sample)
          </h2>
          <div 
            style={{
              backgroundColor: tokens.colors.semantic.background,
              padding: tokens.spacing['4'],
              borderRadius: tokens.borders.radius.md,
              fontFamily: tokens.typography.fontFamily.mono,
              fontSize: tokens.typography.fontSize.sm,
            }}
          >
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{JSON.stringify({
  'colors.semantic.primary': tokens.colors.semantic.primary,
  'colors.semantic.background': tokens.colors.semantic.background,
  'colors.semantic.text.primary': tokens.colors.semantic.text.primary,
  'typography.fontFamily.serif': tokens.typography.fontFamily.serif,
  'typography.fontSize.base': tokens.typography.fontSize.base,
  'spacing.4': tokens.spacing['4'],
  'shadows.md': tokens.shadows.md,
  'borders.radius.lg': tokens.borders.radius.lg,
  'motion.duration.base': tokens.motion.duration.base,
}, null, 2)}
            </pre>
          </div>
        </div>
        
        {/* Visual Test Boxes */}
        <div>
          <h2 
            style={{
              fontSize: tokens.typography.fontSize.xl,
              fontWeight: tokens.typography.fontWeight.semibold,
              marginBottom: tokens.spacing['3'],
              color: tokens.colors.semantic.text.secondary,
            }}
          >
            Visual Test
          </h2>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: tokens.spacing['4'],
            }}
          >
            <div 
              style={{
                padding: tokens.spacing['4'],
                backgroundColor: tokens.colors.semantic.primary,
                color: tokens.colors.semantic.text.inverse,
                borderRadius: tokens.borders.radius.md,
                textAlign: 'center',
              }}
            >
              Primary
            </div>
            <div 
              style={{
                padding: tokens.spacing['4'],
                backgroundColor: tokens.colors.semantic.secondary,
                color: tokens.colors.semantic.text.inverse,
                borderRadius: tokens.borders.radius.md,
                textAlign: 'center',
              }}
            >
              Secondary
            </div>
            <div 
              style={{
                padding: tokens.spacing['4'],
                backgroundColor: tokens.colors.semantic.state.success,
                color: '#FFFFFF',
                borderRadius: tokens.borders.radius.md,
                textAlign: 'center',
              }}
            >
              Success
            </div>
            <div 
              style={{
                padding: tokens.spacing['4'],
                backgroundColor: tokens.colors.semantic.state.error,
                color: '#FFFFFF',
                borderRadius: tokens.borders.radius.md,
                textAlign: 'center',
              }}
            >
              Error
            </div>
          </div>
        </div>
        
        {/* Hook Properties Checklist */}
        <div style={{ marginTop: tokens.spacing['8'] }}>
          <h2 
            style={{
              fontSize: tokens.typography.fontSize.xl,
              fontWeight: tokens.typography.fontWeight.semibold,
              marginBottom: tokens.spacing['3'],
              color: tokens.colors.semantic.text.secondary,
            }}
          >
            useTheme Hook Properties ✓
          </h2>
          <ul 
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li style={{ marginBottom: tokens.spacing['2'] }}>
              ✅ <strong>theme</strong>: {typeof theme} = "{theme}"
            </li>
            <li style={{ marginBottom: tokens.spacing['2'] }}>
              ✅ <strong>setTheme</strong>: {typeof setTheme}
            </li>
            <li style={{ marginBottom: tokens.spacing['2'] }}>
              ✅ <strong>toggleTheme</strong>: {typeof toggleTheme}
            </li>
            <li style={{ marginBottom: tokens.spacing['2'] }}>
              ✅ <strong>tokens</strong>: {typeof tokens} (with {Object.keys(tokens).length} categories)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ThemeTest;
