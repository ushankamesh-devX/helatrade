# HelaTrade Color System (Tailwind CSS v4)

This document outlines the custom color palette initialized for the HelaTrade project using Tailwind CSS v4's `@theme` directive.

## Color System Implementation

The colors are defined using Tailwind v4's modern `@theme` directive with OKLCH color space for better color accuracy and consistency:

```css
@theme {
  --color-primary-500: oklch(0.55 0.018 210);
  --color-orange-600: oklch(0.62 0.20 40);
  --color-blue-900: oklch(0.58 0.11 228);
  --color-yellow-500: oklch(0.82 0.18 85);
}
```

## Color Palette

### Primary Colors (Gray Scale)
- **Primary 50-900**: Light to dark gray variations using OKLCH
- **Primary 600**: Main brand color

### Accent Colors

#### Blue (`oklch(0.58 0.11 228)`)
- Used for: Links, info states, secondary actions
- Variations: `blue-50` to `blue-900`
- Access: `bg-blue-500`, `text-blue-900`, etc.

#### Orange (`oklch(0.62 0.20 40)`)
- Used for: Call-to-action buttons, highlights, warnings
- Variations: `orange-50` to `orange-900`
- Access: `bg-orange-600`, `text-orange-500`, etc.

#### Yellow (`oklch(0.82 0.18 85)`)
- Used for: Attention-grabbing elements, notifications
- Variations: `yellow-50` to `yellow-900`
- Access: `bg-yellow-500`, `text-yellow-700`, etc.

### Semantic Colors

All semantic colors include full variations (50-900):
- **Success**: Green tones for positive states
- **Warning**: Amber tones for caution states
- **Error**: Red tones for negative states
- **Info**: Blue tones for information states

### Brand Colors

Special brand color variants:
- `brand-light`: Light brand variation
- `brand`: Default brand color
- `brand-dark`: Dark brand variation

### Accent Variants

Quick access to main accent colors:
- `accent-orange`: Primary orange accent
- `accent-yellow`: Primary yellow accent
- `accent-blue`: Primary blue accent

## Usage Examples

### Tailwind v4 Utility Classes
```jsx
// Background colors
<div className="bg-primary-600">Primary background</div>
<div className="bg-orange-500">Orange background</div>
<div className="bg-blue-900">Blue background</div>

// Text colors
<p className="text-primary-800">Primary text</p>
<p className="text-orange-600">Orange text</p>
<p className="text-yellow-700">Yellow text</p>

// Border colors
<div className="border border-primary-300">Primary border</div>
<div className="border-2 border-orange-400">Orange border</div>

// Brand colors
<div className="bg-brand text-white">Brand background</div>
<div className="bg-accent-orange">Accent orange</div>
```

### Button Examples
```jsx
// Primary button
<button className="bg-primary-600 text-white border border-primary-600 px-4 py-2 rounded hover:bg-primary-700">
  Primary Button
</button>

// Orange accent button
<button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
  Orange Button
</button>

// Yellow button with dark text
<button className="bg-yellow-500 text-primary-800 px-4 py-2 rounded hover:bg-yellow-600">
  Yellow Button
</button>
```

### Card Examples
```jsx
// Success card
<div className="p-4 bg-success-100 border border-success-300 rounded">
  <h4 className="font-medium text-success-800">Success</h4>
  <p className="text-success-600">Operation completed successfully</p>
</div>

// Warning card
<div className="p-4 bg-warning-100 border border-warning-300 rounded">
  <h4 className="font-medium text-warning-800">Warning</h4>
  <p className="text-warning-600">Please review your input</p>
</div>
```

## Color Combinations

### Recommended Combinations
1. **Primary + Orange**: `bg-primary-600` with `accent-orange`
2. **Blue + White**: `bg-blue-900` with `text-white`
3. **Orange + Yellow**: `bg-orange-600` with `text-yellow-500`
4. **Primary + Blue**: `bg-primary-600` with `bg-blue-900`

### Accessibility
All color combinations maintain proper contrast ratios:
- Text on light backgrounds: Use 600-900 variations
- Text on dark backgrounds: Use 50-400 variations
- Minimum 4.5:1 contrast ratio for normal text

## Advantages of Tailwind v4 with OKLCH

1. **Better Color Consistency**: OKLCH provides more perceptually uniform colors
2. **Automatic Utility Generation**: No need for manual utility class definitions
3. **Modern Color Space**: Better color accuracy across devices
4. **Simplified Configuration**: Single `@theme` directive instead of complex config files

## Migration from v3

If you have existing Tailwind v3 classes, they should work seamlessly. The new color system adds additional options while maintaining backward compatibility.
