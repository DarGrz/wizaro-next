# Spacing Standardization Guide for Wizaro.pl

## Overview

This document outlines the standardized spacing system implemented to create consistent margins and padding throughout the Wizaro.pl application.

## Spacing Scale

### Size Reference
- **micro**: 4px - For borders, tight spacing
- **xs**: 8px - For small gaps, form field spacing  
- **sm**: 12px - For button padding, small margins
- **base**: 16px - For standard text spacing, form elements
- **md**: 24px - For card padding, section spacing
- **lg**: 32px - For larger cards, major component spacing
- **xl**: 48px - For section dividers, major layout spacing
- **xxl**: 64px - For large sections, hero spacing
- **section**: 80px - For major page sections
- **page**: 96px - For page-level top/bottom spacing

## Utility Classes

### Pre-built Component Classes

#### Card Spacing
```css
.card-spacing          /* p-md md:p-lg (24px -> 32px) */
.card-spacing-lg        /* p-lg md:p-xl (32px -> 48px) */
```

#### Button Spacing
```css
.button-spacing         /* px-lg py-sm md:px-xl md:py-base (32px/12px -> 48px/16px) */
.button-spacing-sm      /* px-base py-xs md:px-lg md:py-sm (16px/8px -> 32px/12px) */
```

#### Section Spacing
```css
.section-spacing        /* py-xl md:py-section (48px -> 80px) */
.section-spacing-lg     /* py-section md:py-page (80px -> 96px) */
```

#### Layout Utilities
```css
.container-spacing      /* px-base md:px-lg max-w-6xl mx-auto */
.form-spacing          /* p-base md:p-md */
.gap-standard          /* gap-base md:gap-md */
.gap-section           /* gap-md md:gap-lg */
```

#### Content Spacing
```css
.content-spacing        /* space-y-base md:space-y-md */
.content-spacing-lg     /* space-y-md md:space-y-lg */
```

#### Mobile-first Helpers
```css
.mobile-tight          /* p-sm md:p-base */
.mobile-standard       /* p-base md:p-md */
.mobile-comfortable    /* p-md md:p-lg */
.mobile-spacious       /* p-lg md:p-xl */
```

## Implementation Guidelines

### 1. Migration Strategy

**Phase 1: Core Components**
- ✅ SummaryStepGoogleProfile.tsx (completed)
- Forms and form steps
- Modal components
- Card components

**Phase 2: Layout Components**
- Header and Footer
- Navigation components
- Section containers

**Phase 3: Page-level Components**
- Landing pages
- Dashboard layouts
- Content pages

### 2. Common Patterns

#### Cards and Containers
```tsx
// Old way
<div className="bg-white p-3 md:p-6 rounded-lg">

// New way
<div className="bg-white card-spacing rounded-lg">
```

#### Buttons
```tsx
// Old way
<button className="px-6 py-3 bg-blue-500 text-white rounded">

// New way
<button className="button-spacing bg-blue-500 text-white rounded">
```

#### Sections
```tsx
// Old way
<section className="py-16 px-4 sm:px-6 lg:px-8">

// New way
<section className="section-spacing container-spacing">
```

#### Content Spacing
```tsx
// Old way
<div className="space-y-4">

// New way
<div className="content-spacing">
```

### 3. Responsive Patterns

#### Mobile-first Approach
- Start with mobile spacing
- Increase for tablet/desktop using md: prefix
- Follow the pattern: `mobile -> tablet -> desktop`

#### Common Responsive Patterns
```tsx
// Cards: Tighter on mobile, more spacious on desktop
className="card-spacing"

// Sections: Standard spacing that grows
className="section-spacing"

// Buttons: Comfortable sizing that adapts
className="button-spacing"
```

## File Structure

```
src/
├── app/
│   ├── globals.css        # Imports spacing.css
│   └── spacing.css        # Spacing utility classes
├── components/
│   └── formSteps/
│       └── SummaryStepGoogleProfile.tsx  # Updated with new spacing
└── tailwind.config.js     # Extended spacing scale
```

## Usage Examples

### Before (Inconsistent)
```tsx
<div className="space-y-4">
  <div className="bg-gray-50 p-3 rounded-lg">
    <h3 className="mb-2">Title</h3>
    <div className="grid gap-2">
      <button className="px-6 py-3">Button</button>
    </div>
  </div>
</div>
```

### After (Standardized)
```tsx
<div className="content-spacing">
  <div className="bg-gray-50 card-spacing rounded-lg">
    <h3 className="mb-sm">Title</h3>
    <div className="grid gap-standard">
      <button className="button-spacing">Button</button>
    </div>
  </div>
</div>
```

## Benefits

1. **Consistency**: All components follow the same spacing patterns
2. **Maintainability**: Easy to update spacing globally
3. **Responsive**: Built-in mobile-first responsive design
4. **Developer Experience**: Semantic class names that are easy to remember
5. **Design System**: Creates a cohesive visual hierarchy

## Next Steps

1. **Test the updated component** to ensure it looks good
2. **Apply to other form steps** using the same patterns
3. **Update major layout components** (Header, Footer)
4. **Migrate page-level components** systematically
5. **Remove old inconsistent spacing** as you go

## Quick Reference

| Use Case | Class | Result | Direct Utilities |
|----------|-------|---------|------------------|
| Small card | `card-spacing` | p-md md:p-lg | `p-md md:p-lg` |
| Large card | `card-spacing-lg` | p-lg md:p-xl | `p-lg md:p-xl` |
| Button | `button-spacing` | px-lg py-sm md:px-xl md:py-base | `px-lg py-sm md:px-xl md:py-base` |
| Small button | `button-spacing-sm` | px-base py-xs md:px-lg md:py-sm | `px-base py-xs md:px-lg md:py-sm` |
| Section | `section-spacing` | py-xl md:py-section | `py-xl md:py-section` |
| Page section | `section-spacing-lg` | py-section md:py-page | `py-section md:py-page` |
| Content flow | `content-spacing` | space-y-base md:space-y-md | `space-y-base md:space-y-md` |
| Standard gap | `gap-standard` | gap-base md:gap-md | `gap-base md:gap-md` |

## Available Tailwind Utilities

With the updated configuration, you can now use these spacing utilities directly:

### Padding
- `p-micro`, `p-xs`, `p-sm`, `p-base`, `p-md`, `p-lg`, `p-xl`, `p-xxl`, `p-section`, `p-page`
- `px-micro`, `py-micro`, `pt-micro`, `pr-micro`, `pb-micro`, `pl-micro` (and all other variants)

### Margin  
- `m-micro`, `m-xs`, `m-sm`, `m-base`, `m-md`, `m-lg`, `m-xl`, `m-xxl`, `m-section`, `m-page`
- `mx-micro`, `my-micro`, `mt-micro`, `mr-micro`, `mb-micro`, `ml-micro` (and all other variants)

### Gap
- `gap-micro`, `gap-xs`, `gap-sm`, `gap-base`, `gap-md`, `gap-lg`, `gap-xl`, `gap-xxl`, `gap-section`, `gap-page`

### Space (for space-y and space-x)
- `space-y-micro`, `space-y-xs`, `space-y-sm`, `space-y-base`, `space-y-md`, `space-y-lg`, `space-y-xl`, `space-y-xxl`, `space-y-section`, `space-y-page`
- `space-x-micro`, `space-x-xs`, `space-x-sm`, `space-x-base`, `space-x-md`, `space-x-lg`, `space-x-xl`, `space-x-xxl`, `space-x-section`, `space-x-page`

Remember: Always use the utility classes instead of arbitrary values to maintain consistency!
