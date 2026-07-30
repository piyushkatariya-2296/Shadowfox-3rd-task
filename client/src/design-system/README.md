# PulseFit Studio Design System

This directory contains the complete design system for the PulseFit Studio application, including design tokens, primitive components, layout components, composite components, motion utilities, and helper functions.

## Directory Structure

```
design-system/
├── tokens/          # Design tokens (colors, typography, spacing, shadows, borders, motion, breakpoints)
├── primitives/      # Atomic UI components (Button, Card, Typography, Badge, Input)
├── layout/          # Layout primitives (Stack, Grid, Container, Section)
├── composite/       # Domain-specific components built from primitives (ClassCard, BookingModal, Navbar)
├── motion/          # Animation utilities and wrappers
└── utils/           # Helper functions and utilities
```

## Design Tokens

The design system is built on a foundation of design tokens that define:

- **Colors**: Brand colors (terracotta, espresso, cream, sage) and semantic tokens
- **Typography**: Font families (Playfair Display, DM Sans), sizes, weights, line heights, letter spacing
- **Spacing**: Consistent 4px-based spacing scale using rem units
- **Shadows**: Elevation levels with warm, subtle shadows
- **Borders**: Border radius and width tokens
- **Motion**: Animation durations and easing functions
- **Breakpoints**: Responsive design breakpoints (xs, sm, md, lg, xl, 2xl)

## Usage

### Import Design Tokens

```javascript
import { designTokens, brandColors, spacing, typography } from './design-system/tokens';

// Access specific tokens
const primaryColor = designTokens.colors.semantic.primary;
const baseFontSize = designTokens.typography.fontSize.base;
const mediumSpacing = designTokens.spacing[6];
```

### Theme Support

The design system supports both light and dark themes:

```javascript
import { createDesignTokens } from './design-system/tokens';

const lightTokens = createDesignTokens('light');
const darkTokens = createDesignTokens('dark');
```

## Brand Identity

The design system preserves the PulseFit Studio brand identity:
- **Terracotta** (#C47B5C) - Primary brand color
- **Espresso** (#3E2723) - Secondary brand color
- **Cream** (#FFF8F0) - Background color
- **Sage** (#8FA888) - Accent color

Typography uses **Playfair Display** for headings and **DM Sans** for body text to maintain the boutique fitness studio aesthetic.

## Next Steps

1. Implement ThemeProvider component
2. Create primitive components (Button, Card, Typography)
3. Build layout primitives (Stack, Grid)
4. Develop composite components (ClassCard, BookingModal)
5. Add animation utilities
6. Integrate into existing pages
