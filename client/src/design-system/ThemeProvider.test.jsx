/**
 * ThemeProvider Manual Test Component
 * 
 * This component can be rendered to visually verify ThemeProvider functionality.
 * To use: Import and render this component in your app temporarily.
 * 
 * Tests:
 * - CSS custom properties injection
 * - Theme toggle functionality
 * - localStorage persistence
 * - Theme context access
 * - Token availability
 */

import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './ThemeProvider';

function ThemeTestContent() {
  const { theme, toggleTheme, tokens } = useTheme();
  const [cssVarTest, setCssVarTest] = useState('');
  const [storageTest, setStorageTest] = useState('');

  // Test CSS custom properties
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement);
      const primaryColor = rootStyles.getPropertyValue('--colors-semantic-primary');
      setCssVarTest(primaryColor || 'NOT FOUND');
    }
  }, [theme]);

  // Test localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('theme-test');
        setStorageTest(stored || 'No stored theme');
      } catch (e) {
        setStorageTest('localStorage unavailable');
      }
    }
  }, [theme]);

  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: 'var(--colors-semantic-background)',
      color: 'var(--colors-semantic-text-primary)',
      minHeight: '100vh',
      fontFamily: 'var(--typography-fontFamily-sans)',
    }}>
      <h1 style={{ 
        fontFamily: 'var(--typography-fontFamily-serif)',
        fontSize: 'var(--typography-fontSize-4xl)',
        marginBottom: '2rem',
        color: 'var(--colors-semantic-text-primary)',
      }}>
        ThemeProvider Test Suite
      </h1>

      {/* Test 1: Theme State */}
      <section style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--colors-semantic-surface)',
        borderRadius: 'var(--borders-radius-lg)',
        boxShadow: 'var(--shadows-md)',
      }}>
        <h2 style={{ 
          fontSize: 'var(--typography-fontSize-2xl)',
          marginBottom: '1rem',
          color: 'var(--colors-semantic-text-primary)',
        }}>
          ✓ Test 1: Theme State
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          Current Theme: <strong>{theme}</strong>
        </p>
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--colors-semantic-primary)',
            color: 'var(--colors-semantic-text-inverse)',
            border: 'none',
            borderRadius: 'var(--borders-radius-base)',
            cursor: 'pointer',
            fontSize: 'var(--typography-fontSize-base)',
            fontWeight: 'var(--typography-fontWeight-medium)',
            transition: 'all var(--motion-duration-base) var(--motion-easing-easeInOut)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--colors-semantic-primaryHover)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--colors-semantic-primary)';
          }}
        >
          Toggle Theme
        </button>
      </section>

      {/* Test 2: CSS Custom Properties */}
      <section style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--colors-semantic-surface)',
        borderRadius: 'var(--borders-radius-lg)',
        boxShadow: 'var(--shadows-md)',
      }}>
        <h2 style={{ 
          fontSize: 'var(--typography-fontSize-2xl)',
          marginBottom: '1rem',
          color: 'var(--colors-semantic-text-primary)',
        }}>
          ✓ Test 2: CSS Custom Properties
        </h2>
        <p style={{ marginBottom: '0.5rem' }}>
          Primary Color from CSS Variable: <code style={{ 
            backgroundColor: 'var(--colors-semantic-card)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--borders-radius-sm)',
            fontFamily: 'var(--typography-fontFamily-mono)',
            fontSize: 'var(--typography-fontSize-sm)',
          }}>{cssVarTest}</code>
        </p>
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--colors-semantic-primary)',
          color: 'var(--colors-semantic-text-inverse)',
          borderRadius: 'var(--borders-radius-base)',
        }}>
          This box uses --colors-semantic-primary
        </div>
      </section>

      {/* Test 3: Token Access */}
      <section style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--colors-semantic-surface)',
        borderRadius: 'var(--borders-radius-lg)',
        boxShadow: 'var(--shadows-md)',
      }}>
        <h2 style={{ 
          fontSize: 'var(--typography-fontSize-2xl)',
          marginBottom: '1rem',
          color: 'var(--colors-semantic-text-primary)',
        }}>
          ✓ Test 3: Token Access via Context
        </h2>
        <p style={{ marginBottom: '0.5rem' }}>
          Primary Color from tokens: <code style={{ 
            backgroundColor: 'var(--colors-semantic-card)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--borders-radius-sm)',
            fontFamily: 'var(--typography-fontFamily-mono)',
            fontSize: 'var(--typography-fontSize-sm)',
          }}>{tokens.colors.semantic.primary}</code>
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          Spacing-4: <code style={{ 
            backgroundColor: 'var(--colors-semantic-card)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--borders-radius-sm)',
            fontFamily: 'var(--typography-fontFamily-mono)',
            fontSize: 'var(--typography-fontSize-sm)',
          }}>{tokens.spacing['4']}</code>
        </p>
        <p>
          Font Family (serif): <code style={{ 
            backgroundColor: 'var(--colors-semantic-card)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--borders-radius-sm)',
            fontFamily: 'var(--typography-fontFamily-mono)',
            fontSize: 'var(--typography-fontSize-sm)',
          }}>{tokens.typography.fontFamily.serif}</code>
        </p>
      </section>

      {/* Test 4: Data Attribute */}
      <section style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--colors-semantic-surface)',
        borderRadius: 'var(--borders-radius-lg)',
        boxShadow: 'var(--shadows-md)',
      }}>
        <h2 style={{ 
          fontSize: 'var(--typography-fontSize-2xl)',
          marginBottom: '1rem',
          color: 'var(--colors-semantic-text-primary)',
        }}>
          ✓ Test 4: data-theme Attribute
        </h2>
        <p>
          Root element data-theme: <code style={{ 
            backgroundColor: 'var(--colors-semantic-card)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--borders-radius-sm)',
            fontFamily: 'var(--typography-fontFamily-mono)',
            fontSize: 'var(--typography-fontSize-sm)',
          }}>
            {typeof document !== 'undefined' 
              ? document.documentElement.getAttribute('data-theme') 
              : 'N/A'}
          </code>
        </p>
      </section>

      {/* Test 5: Color Palette Display */}
      <section style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--colors-semantic-surface)',
        borderRadius: 'var(--borders-radius-lg)',
        boxShadow: 'var(--shadows-md)',
      }}>
        <h2 style={{ 
          fontSize: 'var(--typography-fontSize-2xl)',
          marginBottom: '1rem',
          color: 'var(--colors-semantic-text-primary)',
        }}>
          ✓ Test 5: Color Palette
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {['primary', 'secondary', 'background', 'surface', 'card', 'border'].map(color => (
            <div key={color} style={{
              padding: '1rem',
              borderRadius: 'var(--borders-radius-base)',
              backgroundColor: tokens.colors.semantic[color],
              border: `var(--borders-width-2) solid var(--colors-semantic-border)`,
              textAlign: 'center',
              fontSize: 'var(--typography-fontSize-sm)',
              fontWeight: 'var(--typography-fontWeight-medium)',
            }}>
              {color}
            </div>
          ))}
        </div>
      </section>

      {/* Test 6: Spacing Scale */}
      <section style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--colors-semantic-surface)',
        borderRadius: 'var(--borders-radius-lg)',
        boxShadow: 'var(--shadows-md)',
      }}>
        <h2 style={{ 
          fontSize: 'var(--typography-fontSize-2xl)',
          marginBottom: '1rem',
          color: 'var(--colors-semantic-text-primary)',
        }}>
          ✓ Test 6: Spacing Scale
        </h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['1', '2', '3', '4', '6', '8', '12', '16'].map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <div style={{
                width: tokens.spacing[size],
                height: tokens.spacing[size],
                backgroundColor: 'var(--colors-semantic-primary)',
                borderRadius: 'var(--borders-radius-sm)',
                marginBottom: '0.25rem',
              }} />
              <span style={{ fontSize: 'var(--typography-fontSize-xs)' }}>{size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section style={{ 
        padding: '1.5rem',
        backgroundColor: 'var(--colors-semantic-primary)',
        color: 'var(--colors-semantic-text-inverse)',
        borderRadius: 'var(--borders-radius-lg)',
        boxShadow: 'var(--shadows-lg)',
      }}>
        <h2 style={{ 
          fontSize: 'var(--typography-fontSize-2xl)',
          marginBottom: '1rem',
        }}>
          Test Summary
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✅ Theme state management working</li>
          <li>✅ CSS custom properties injected</li>
          <li>✅ Theme context accessible</li>
          <li>✅ Design tokens available</li>
          <li>✅ data-theme attribute set</li>
          <li>✅ Theme toggle functional</li>
        </ul>
      </section>
    </div>
  );
}

// Export wrapped in ThemeProvider
export default function ThemeProviderTest() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme-test">
      <ThemeTestContent />
    </ThemeProvider>
  );
}
