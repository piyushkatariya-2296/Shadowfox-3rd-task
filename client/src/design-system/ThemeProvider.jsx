/**
 * ThemeProvider Component
 * 
 * Manages theme state (light/dark mode), provides design tokens via React Context,
 * and injects CSS custom properties into the document root.
 * 
 * Features:
 * - Light and dark theme support
 * - localStorage persistence with fallback to in-memory storage
 * - System preference detection via prefers-color-scheme
 * - CSS custom property injection for all design tokens
 * - data-theme attribute management on root element
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9
 */

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { createDesignTokens } from './tokens/index.js';

// ============================================================================
// STORAGE UTILITY
// ============================================================================

/**
 * Creates a storage interface with localStorage fallback to in-memory storage
 * Requirement 2.7 - localStorage with fallback
 */
const createStorage = () => {
  // Check if localStorage is available
  let isLocalStorageAvailable = false;
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    isLocalStorageAvailable = true;
  } catch (e) {
    console.warn('localStorage unavailable. Using in-memory storage for current session.');
  }

  // In-memory fallback storage
  const memoryStorage = {};

  return {
    getItem: (key) => {
      if (isLocalStorageAvailable) {
        return localStorage.getItem(key);
      }
      return memoryStorage[key] || null;
    },
    setItem: (key, value) => {
      if (isLocalStorageAvailable) {
        localStorage.setItem(key, value);
      } else {
        memoryStorage[key] = value;
      }
    },
    removeItem: (key) => {
      if (isLocalStorageAvailable) {
        localStorage.removeItem(key);
      } else {
        delete memoryStorage[key];
      }
    },
  };
};

// ============================================================================
// THEME VALIDATION
// ============================================================================

/**
 * Validates theme value and returns 'light' or 'dark'
 * Requirement 2.4 - Theme validation
 */
const validateTheme = (theme) => {
  if (theme !== 'light' && theme !== 'dark') {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid theme value: ${theme}. Falling back to 'light'.`);
    }
    return 'light';
  }
  return theme;
};

/**
 * Detects system color scheme preference
 * Requirement 2.2 - System preference detection
 */
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return 'light';
};

// ============================================================================
// CSS CUSTOM PROPERTY INJECTION
// ============================================================================

/**
 * Flattens nested token object to CSS custom property format
 * Example: { colors: { semantic: { primary: '#C47B5C' } } }
 * Becomes: { '--colors-semantic-primary': '#C47B5C' }
 */
const flattenTokens = (obj, prefix = '') => {
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}-${key}` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Recursively flatten nested objects
        Object.assign(result, flattenTokens(value, newKey));
      } else {
        // Convert to CSS custom property format
        result[`--${newKey}`] = value;
      }
    }
  }
  
  return result;
};

/**
 * Sanitizes CSS values to prevent CSS injection attacks
 * Requirement: Security - CSS value sanitization
 */
const sanitizeCSSValue = (value) => {
  if (typeof value !== 'string') {
    return String(value);
  }
  
  // Block dangerous patterns
  const dangerousPatterns = [
    /javascript:/i,
    /<script/i,
    /expression\(/i,
    /import\s/i,
    /@import/i,
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(value)) {
      console.error(`Blocked potentially dangerous CSS value: ${value}`);
      return ''; // Return empty string as fallback
    }
  }
  
  return value;
};

/**
 * Injects CSS custom properties into document root
 * Requirement 2.5 - CSS custom property injection
 * Requirement 2.3 - Update CSS custom properties on theme change
 */
const injectCSSCustomProperties = (tokens) => {
  if (typeof document === 'undefined') {
    return; // Skip on server-side rendering
  }

  const rootElement = document.documentElement;
  const flattenedTokens = flattenTokens(tokens);
  
  // Use requestAnimationFrame to batch DOM updates for performance
  requestAnimationFrame(() => {
    for (const [property, value] of Object.entries(flattenedTokens)) {
      const sanitizedValue = sanitizeCSSValue(value);
      if (sanitizedValue) {
        rootElement.style.setProperty(property, sanitizedValue);
      }
    }
  });
};

// ============================================================================
// THEME CONTEXT
// ============================================================================

/**
 * Theme Context - provides theme state and design tokens
 * Requirement 2.8 - Theme context provision
 */
const ThemeContext = createContext(undefined);

/**
 * useTheme Hook - access theme context
 * Requirement 2.8 - Theme context access
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ============================================================================
// THEME PROVIDER COMPONENT
// ============================================================================

/**
 * ThemeProvider Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {('light'|'dark')} [props.defaultTheme] - Default theme (optional)
 * @param {string} [props.storageKey='theme'] - localStorage key for persistence
 */
export const ThemeProvider = ({ 
  children, 
  defaultTheme, 
  storageKey = 'theme' 
}) => {
  const storage = useMemo(() => createStorage(), []);
  
  /**
   * Initialize theme state
   * Priority: localStorage > defaultTheme > system preference > 'light'
   * Requirement 2.2 - Load from localStorage OR detect system preference
   */
  const [theme, setThemeState] = useState(() => {
    // Try to load from storage
    const storedTheme = storage.getItem(storageKey);
    if (storedTheme) {
      return validateTheme(storedTheme);
    }
    
    // Use defaultTheme if provided
    if (defaultTheme) {
      return validateTheme(defaultTheme);
    }
    
    // Detect system preference
    return getSystemTheme();
  });

  /**
   * Memoized design tokens based on current theme
   * Requirement 2.8 - Provide tokens object
   */
  const tokens = useMemo(() => createDesignTokens(theme), [theme]);

  /**
   * Set theme with validation and persistence
   * Requirement 2.4 - Persist to localStorage
   */
  const setTheme = (newTheme) => {
    const validatedTheme = validateTheme(newTheme);
    setThemeState(validatedTheme);
    storage.setItem(storageKey, validatedTheme);
  };

  /**
   * Toggle between light and dark themes
   * Requirement 2.8 - Provide toggleTheme function
   */
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  /**
   * Effect: Inject CSS custom properties and set data-theme attribute
   * Requirement 2.5 - Inject CSS custom properties on mount
   * Requirement 2.3 - Update CSS custom properties on theme change
   * Requirement 2.6 - Update without re-rendering React components
   * Requirement 2.9 - Set data-theme attribute on root element
   */
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    // Inject CSS custom properties
    injectCSSCustomProperties(tokens);
    
    // Set data-theme attribute on root element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Cleanup function (though not strictly necessary for these operations)
    return () => {
      // Could remove data-theme attribute here if needed
      // document.documentElement.removeAttribute('data-theme');
    };
  }, [theme, tokens]);

  /**
   * Effect: Listen for system theme changes
   * Requirement 2.2 - Respond to system preference changes
   */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a theme
      const storedTheme = storage.getItem(storageKey);
      if (!storedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [storage, storageKey]);

  /**
   * Context value
   * Requirement 2.8 - Provide complete theme context
   */
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      tokens,
    }),
    [theme, tokens]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Default export
export default ThemeProvider;
