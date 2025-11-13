# BRIX Wireframe Kit - Asth UI Implementation Plan

## 📋 Executive Summary

This document provides a comprehensive plan for implementing the **BRIX Agency Wireframe Kit** components into your Asth UI registry system. The Figma design contains **217 component variants** across 14 major categories, all built as **fully responsive single components** using **only shadcn/ui components and CSS variables**.

**Project Context:**
- **Design System:** BRIX Agency Wireframes (Figma)
- **Target Framework:** Next.js 15 + shadcn/ui + Framer Motion
- **Architecture:** File-based registry with dynamic previews
- **Styling:** Tailwind CSS with shadcn/ui CSS variables (no custom variables)
- **Responsive Strategy:** Single component per variant (mobile-first approach)
- **Component Library:** 100% shadcn/ui components (Button, Card, Sheet, Form, etc.)

---

## 🎨 Figma Design Analysis

### Design System Overview

**Using shadcn/ui Design Tokens:**
```typescript
// Colors - Using shadcn/ui CSS variables
{
  background: 'hsl(var(--background))',     // White/Dark background
  foreground: 'hsl(var(--foreground))',     // Text color
  muted: 'hsl(var(--muted))',               // Light Gray (#F1F3F7)
  'muted-foreground': 'hsl(var(--muted-foreground))', // Medium Gray (#6D758F)
  border: 'hsl(var(--border))',             // Border color
  input: 'hsl(var(--input))',               // Input borders
  primary: 'hsl(var(--primary))',           // Primary brand color
  secondary: 'hsl(var(--secondary))',       // Secondary color
}

// Typography - Using Tailwind Typography Classes
{
  // Headings
  'text-4xl': { size: '2.25rem', lineHeight: '2.5rem' },  // 36px/40px (Display 8)
  'text-2xl': { size: '1.5rem', lineHeight: '2rem' },     // 24px (Display 5)
  'text-xl': { size: '1.25rem', lineHeight: '1.75rem' },  // 20px (Display 5)
  'text-lg': { size: '1.125rem', lineHeight: '1.75rem' }, // 18px (Display 4)
  
  // Body Text
  'text-sm': { size: '0.875rem', lineHeight: '1.25rem' }, // 14px (Paragraph)
  'text-xs': { size: '0.75rem', lineHeight: '1rem' },     // 12px (Display 1)
  
  // Font Weights
  'font-normal': 400,
  'font-semibold': 600,
  'font-bold': 700,
  'font-extrabold': 800,
}

// Spacing - Using Tailwind Spacing Scale
spacing: {
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
}

// Border Radius - Using shadcn/ui
borderRadius: {
  'rounded-sm': '0.125rem',       // 2px
  'rounded': '0.25rem',           // 4px
  'rounded-md': '0.375rem',       // 6px
  'rounded-lg': 'var(--radius)',  // 8px (shadcn default)
  'rounded-xl': '0.75rem',        // 12px
  'rounded-2xl': '1rem',          // 16px
}
```

---

## 📊 Component Inventory

### Complete Component Categories (14 Categories)
**Note:** All components are fully responsive (mobile/tablet/desktop in single component)

| Category | Variants | Priority | Responsive |
|----------|----------|----------|------------|
| **Headers** | 10 | 🔴 Critical | ✅ Mobile-first |
| **Heroes** | 20 | 🔴 Critical | ✅ Mobile-first |
| **Footers** | 17 | 🔴 Critical | ✅ Mobile-first |
| **Notification Bars** | 12 | 🟡 High | ✅ Mobile-first |
| **Contact Forms** | 15 | 🟡 High | ✅ Mobile-first |
| **Call to Action** | 11 | 🟡 High | ✅ Mobile-first |
| **Logo Strips** | 12 | 🟢 Medium | ✅ Mobile-first |
| **Stats** | 13 | 🟢 Medium | ✅ Mobile-first |
| **Accordions** | 7 | 🟢 Medium | ✅ Mobile-first |
| **Team Members** | 14 | 🟢 Medium | ✅ Mobile-first |
| **Testimonials** | 13 | 🟢 Medium | ✅ Mobile-first |
| **Pricing** | 11 | 🟢 Medium | ✅ Mobile-first |
| **Gallery** | 20 | ⚪ Low | ✅ Mobile-first |
| **Content Cards** | 18 | 🟡 High | ✅ Mobile-first |
| **Content Sections** | 33 | 🟡 High | ✅ Mobile-first |
| **Dropdowns** | 11 | ⚪ Low | ✅ Mobile-first |
| **eCommerce Cards** | 10 | ⚪ Low | ✅ Mobile-first |
| **TOTAL** | **217** | | |

---

## 🎯 Implementation Strategy

### Phase-Based Approach

Based on your existing implementation plan and the Figma design, we'll implement in 4 phases:

#### **Phase 1: Foundation Components (Weeks 1-2)**
*Building blocks that other components depend on*

**Components to Implement:**
1. **Design System Setup**
   - Use shadcn/ui CSS variables (no custom variables)
   - Typography using Tailwind classes
   - Spacing using Tailwind utilities
   - Border radius using shadcn defaults

2. **shadcn/ui Base Components** (Install via CLI)
   - `button` - All button variants
   - `card` - Card layouts
   - `input` - Form inputs
   - `badge` - Category tags
   - `separator` - Dividers
   - `navigation-menu` - Navigation

3. **Responsive Grid System**
   - Mobile-first approach (default styles for mobile)
   - Tablet: `md:` breakpoint (768px)
   - Desktop: `lg:` and `xl:` breakpoints (1024px, 1280px)

**Deliverables:**
```bash
# Install all required shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add navigation-menu
npx shadcn@latest add form
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add accordion
npx shadcn@latest add avatar
npx shadcn@latest add tabs
```

---

#### **Phase 2: Critical Layout Blocks (Weeks 3-5)**
*High-impact components for landing pages*

**Priority 🔴 Components (47 total):**

##### **2.1 Notification Bars (12 variants)**
```typescript
// Component Pattern (Fully Responsive):
notification-bar-01.tsx through notification-bar-12.tsx

// Example: notification-bar-01
{
  name: "notification-bar-01",
  type: "components:block",
  category: "notification-bars",
  subcategory: "top-banner",
  dependencies: ["framer-motion"],
  registryDependencies: ["button"],
  responsive: true, // Single component for all devices
  breakpoints: ["mobile: default", "tablet: md:", "desktop: lg:"]
}
```

##### **2.2 Headers (10 variants)**
```typescript
// Component Pattern (Fully Responsive):
header-01.tsx through header-10.tsx

// Example: header-01
{
  name: "header-01",
  category: "headers",
  subcategory: "navigation",
  features: ["responsive-menu", "mobile-drawer", "sticky"],
  dependencies: ["framer-motion"],
  registryDependencies: ["button", "navigation-menu", "sheet"],
  responsive: true, // Mobile hamburger, tablet compact, desktop full nav
}
```

##### **2.3 Heroes (20 variants)**
```typescript
// Component Pattern (Fully Responsive):
hero-01.tsx through hero-20.tsx

// Example: hero-01
{
  name: "hero-01",
  category: "heroes",
  subcategory: "full-screen",
  features: ["animated-background", "responsive-text", "cta-buttons"],
  dependencies: ["framer-motion"],
  registryDependencies: ["button", "badge"],
  responsive: true, // Text scales, images stack on mobile
}
```

##### **2.4 Footers (17 variants)**
```typescript
// Component Pattern (Fully Responsive):
footer-01.tsx through footer-17.tsx

// Layout Types (All Responsive):
- Simple (1-2 columns → stack on mobile)
- Multi-column (3-4 columns → 2 col tablet, 1 col mobile)
- Newsletter signup (horizontal → vertical on mobile)
- Social media links (centered on mobile)
```

**Deliverables:**
```
src/registry/blocks/
├── notification-bars/
│   └── notification-bar-01.tsx → notification-bar-12.tsx
├── headers/
│   └── header-01.tsx → header-10.tsx
├── heroes/
│   └── hero-01.tsx → hero-20.tsx
└── footers/
    └── footer-01.tsx → footer-17.tsx

content/docs/components/
├── notification-bars/
│   └── index.mdx (all 12 variants)
├── headers/
│   └── index.mdx (all 10 variants)
├── heroes/
│   └── index.mdx (all 20 variants)
└── footers/
    └── index.mdx (all 17 variants)
```

---

#### **Phase 3: Engagement Blocks (Weeks 6-8)**
*Forms, CTAs, and social proof*

**Priority 🟡 Components (88 total):**

##### **3.1 Contact Forms (15 variants)**
```typescript
// Fully Responsive Components:
contact-form-01.tsx through contact-form-15.tsx

// Form Variations:
- Simple (name, email, message) → stack on mobile
- Advanced (multi-step) → progress bar adapts
- Newsletter signup → compact on mobile
- Appointment booking → date picker responsive
- Feedback forms → rating stars scale

// Features (using shadcn/ui):
- Form validation (react-hook-form + zod)
- Success/error states (toast component)
- Loading animations (spinner component)
- File upload UI (input component)
```

##### **3.2 Call to Action (11 variants)**
```typescript
// Fully Responsive Components:
cta-01.tsx through cta-11.tsx

// CTA Types:
- Hero CTA (full-width → centered on mobile)
- Inline CTA (2-col → stack on mobile)
- Sidebar CTA (sticky → bottom fixed on mobile)
- Banner (horizontal → vertical on mobile)

// Features (using shadcn/ui):
- Buttons (shadcn button component)
- Cards (shadcn card component)
- Badges (shadcn badge component)
```

##### **3.3 Content Cards (18 variants)**
```typescript
// Fully Responsive Components:
content-card-01.tsx through content-card-18.tsx

// Card Types:
- Blog cards (3-col → 2-col tablet → 1-col mobile)
- Service cards (4-col → 2-col tablet → 1-col mobile)
- Feature cards (grid → stack on mobile)
- Portfolio cards (masonry → single col mobile)

// Layouts (using Tailwind grid):
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Gap: gap-4 md:gap-6 lg:gap-8
```

##### **3.4 Content Sections (33 variants)**
```typescript
// Fully Responsive Components:
content-section-01.tsx through content-section-33.tsx

// Section Types:
- Text + Image (side-by-side → stack on mobile)
- Feature Grid (3-col → 1-col mobile)
- Timeline (vertical always)
- FAQ (accordion component)
```

**Deliverables:**
```
src/registry/blocks/
├── contact-forms/
│   └── contact-form-01.tsx → contact-form-15.tsx
├── cta/
│   └── cta-01.tsx → cta-11.tsx
├── content-cards/
│   └── content-card-01.tsx → content-card-18.tsx
└── content-sections/
    └── content-section-01.tsx → content-section-33.tsx
```

---

#### **Phase 4: Data Display & Extras (Weeks 9-10)**
*Stats, testimonials, pricing, etc.*

**Priority 🟢 Components (82 total):**

##### **4.1 Stats Sections (13 variants)**
```typescript
// Fully Responsive Components:
stats-01.tsx through stats-13.tsx

// Stat Layouts (All Responsive):
- Horizontal grid (4-col → 2-col tablet → 1-col mobile)
- Vertical stack (always vertical, spacing adapts)
- Circular progress (size scales with viewport)
- Counter animations (same speed all devices)

// Data Types:
- Numbers (with k/M formatting)
- Percentages (progress bars)
- Time-based metrics
```

##### **4.2 Testimonials (13 variants)**
```typescript
// Fully Responsive Components:
testimonial-01.tsx through testimonial-13.tsx

// Testimonial Types (All Responsive):
- Card grid (3-col → 2-col tablet → 1-col mobile)
- Slider/carousel (swipe on mobile)
- Single large testimonial (text scales)
- Video testimonials (16:9 ratio maintained)
- Rating stars (centered on mobile)

// Features (using shadcn/ui):
- Avatar component (shadcn avatar)
- Card component (shadcn card)
- Carousel (embla-carousel)
```

##### **4.3 Team Members (14 variants)**
```typescript
// Fully Responsive Components:
team-member-01.tsx through team-member-14.tsx

// Team Layouts (All Responsive):
- Grid (4-col → 2-col tablet → 1-col mobile)
- List view (horizontal scroll on mobile)
- Card with hover effects (touch-friendly on mobile)

// Info Display (using shadcn/ui):
- Avatar (shadcn avatar component)
- Card (shadcn card component)
- Button (shadcn button for social links)
```

##### **4.4 Pricing Tables (11 variants)**
```typescript
// Fully Responsive Components:
pricing-01.tsx through pricing-11.tsx

// Pricing Types (All Responsive):
- Simple (3-col → stack on mobile)
- Comparison table (horizontal scroll on mobile)
- Tiered pricing (cards stack on mobile)
- Toggle (monthly/yearly switch adapts)

// Features (using shadcn/ui):
- Card component (highlighted "Popular" plan)
- Button component (CTA buttons)
- Badge component (feature tags)
- Switch component (billing toggle)
```

##### **4.5 Additional Components (31 variants)**
```typescript
// Logo Strips (12 variants)
logo-strip-01.tsx through logo-strip-12.tsx
// Horizontal scroll on mobile, grid on desktop

// Accordions (7 variants)
accordion-01.tsx through accordion-07.tsx
// Using shadcn accordion component

// Gallery (20 variants)
gallery-01.tsx through gallery-20.tsx
// Masonry → single column on mobile

// Dropdowns (11 variants) 
dropdown-01.tsx through dropdown-11.tsx
// Using shadcn dropdown-menu component

// eCommerce Cards (10 variants)
ecommerce-card-01.tsx through ecommerce-card-10.tsx
// Product cards: 4-col → 2-col tablet → 1-col mobile
```

**Deliverables:**
```
src/registry/blocks/
├── stats/
│   └── stats-01.tsx → stats-13.tsx
├── testimonials/
│   └── testimonial-01.tsx → testimonial-13.tsx
├── team-members/
│   └── team-member-01.tsx → team-member-14.tsx
├── pricing/
│   └── pricing-01.tsx → pricing-11.tsx
├── logo-strips/
│   └── logo-strip-01.tsx → logo-strip-12.tsx
├── accordions/
│   └── accordion-01.tsx → accordion-07.tsx
├── gallery/
│   └── gallery-01.tsx → gallery-20.tsx
├── dropdowns/
│   └── dropdown-01.tsx → dropdown-11.tsx
└── ecommerce-cards/
    └── ecommerce-card-01.tsx → ecommerce-card-10.tsx
```

---

## 🏗️ Technical Implementation Guide

### Component Structure Template

Every component will follow this pattern using **only shadcn/ui components**:

```typescript
// File: src/registry/blocks/headers/header-01.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

interface Header01Props {
  logo?: React.ReactNode
  menuItems?: MenuItem[]
  ctaButton?: string
}

interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}

export default function Header01({
  logo,
  menuItems = [],
  ctaButton = 'Get Started',
}: Header01Props) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {logo || <span className="text-xl font-bold">Logo</span>}
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <NavigationMenu className="hidden md:flex">
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink 
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenu>

        {/* Desktop CTA - Hidden on mobile */}
        <Button className="hidden md:inline-flex">{ctaButton}</Button>

        {/* Mobile Menu - Hidden on desktop */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <Button className="mt-4 w-full">{ctaButton}</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
```

### Registry Entry Pattern

```json
{
  "name": "header-01",
  "type": "components:block",
  "description": "Sticky header with responsive navigation and mobile drawer menu",
  "category": "headers",
  "subcategory": "navigation",
  "dependencies": ["framer-motion", "lucide-react"],
  "registryDependencies": ["button", "navigation-menu", "sheet"],
  "files": ["header-01.tsx"],
  "responsive": true,
  "breakpoints": {
    "mobile": "Sheet drawer menu, stacked layout",
    "tablet": "md: - Compact navigation",
    "desktop": "lg: - Full navigation menu"
  },
  "animations": ["slide-in", "fade"],
  "features": ["sticky", "mobile-drawer", "backdrop-blur"]
}
```

---

## 🎨 Design Token Mapping

### Using shadcn/ui CSS Variables

**No custom CSS variables needed** - Use shadcn/ui defaults:

```css
/* File: src/app/global.css */
/* shadcn/ui already provides these variables */

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --radius: 0.5rem;
  }
}

/* Use Tailwind classes for typography - no custom classes needed */
/* Examples:
  - text-xs (12px)
  - text-sm (14px)
  - text-base (16px)
  - text-lg (18px)
  - text-xl (20px)
  - text-2xl (24px)
  - text-4xl (36px)
  
  - font-normal (400)
  - font-semibold (600)
  - font-bold (700)
  - font-extrabold (800)
*/
```

### Color Usage Examples

```typescript
// Use shadcn/ui color classes directly
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Secondary text</p>
  <Button>Primary action</Button>
  <div className="border rounded-lg">Card with border</div>
</div>

// Responsive spacing with Tailwind
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
    Responsive heading
  </h1>
</div>
```

---

## 📱 Responsive Implementation Pattern

### Mobile-First Approach (Single Component)

```typescript
// ✅ Correct: Single responsive component using shadcn/ui
export default function Header01() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo - Same on all devices */}
        <div className="flex items-center">
          <span className="text-lg md:text-xl font-bold">Logo</span>
        </div>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <NavigationMenu className="hidden md:flex">
          {/* Desktop menu items */}
        </NavigationMenu>
        
        {/* Mobile Menu - Hidden on desktop */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            {/* Mobile menu drawer */}
          </SheetContent>
        </Sheet>
        
        {/* CTA Button - Responsive sizing */}
        <Button className="hidden md:inline-flex">Get Started</Button>
      </div>
    </header>
  )
}

// ❌ Wrong: Don't create separate mobile components
// Don't do: Header01Desktop() and Header01Mobile()
```

### Responsive Grid Pattern

```typescript
// Content Cards - Single responsive component
export default function ContentCard01() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      {/* Heading - Responsive text size */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8">
        Our Services
      </h2>
      
      {/* Grid - Responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {cards.map((card) => (
          <Card key={card.id}>
            {/* Card content */}
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### Breakpoint System (Tailwind Defaults)

```typescript
// Use Tailwind's built-in breakpoints:
const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Tablets (primary breakpoint)
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
}

// Common responsive patterns:
className="
  text-base md:text-lg lg:text-xl          // Text scaling
  p-4 md:p-6 lg:p-8                        // Padding scaling
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 // Grid columns
  flex-col md:flex-row                     // Flex direction
  hidden md:block                          // Show/hide elements
  gap-4 md:gap-6 lg:gap-8                  // Gap scaling
"
```

---

## 🔄 Animation Guidelines

### Framer Motion Patterns (from Figma)

```typescript
// 1. Slide In (Headers, Notification Bars)
const slideIn = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

// 2. Fade In Up (Cards, Sections)
const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8 }
}

// 3. Scale on Hover (Buttons, Cards)
const scaleHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 17 }
}

// 4. Stagger Children (Lists, Grids)
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// 5. Number Counter (Stats)
const counter = (target: number) => ({
  initial: { value: 0 },
  animate: { value: target },
  transition: { duration: 2, ease: 'easeOut' }
})
```

---

## 📝 Documentation Structure

### MDX File Pattern

```mdx
---
title: Header 01 - Sticky Navigation
description: A fully responsive sticky header with navigation menu and mobile drawer
category: Headers
subcategory: Navigation
responsive: true
animations: slide-in, fade
---

import { DynamicPreview } from '@/components/preview/dynamic-preview'

## Header 01

A modern, fully responsive sticky header with smooth animations. Features a mobile drawer menu, desktop navigation, and adapts seamlessly across all device sizes.

### Preview

<DynamicPreview componentName="header-01" />

### Installation

```bash
npx shadcn@latest add -r asth-ui header-01
```

### Dependencies

This component uses only shadcn/ui components:
- `button` - CTA button
- `navigation-menu` - Desktop navigation
- `sheet` - Mobile drawer menu

### Usage

```tsx
import Header01 from '@/registry/blocks/headers/header-01'

export default function App() {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <Header01
      logo={<YourLogo />}
      menuItems={menuItems}
      ctaButton="Get Started"
    />
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `ReactNode` | `"Logo"` | Custom logo component |
| `menuItems` | `MenuItem[]` | `[]` | Navigation menu items |
| `ctaButton` | `string` | `"Get Started"` | CTA button text |

### Responsive Behavior

This is a **single component** that adapts to all screen sizes:

- **Mobile (< 768px):** Hamburger menu with Sheet drawer, compact logo
- **Tablet (768px - 1024px):** Compact navigation menu, medium logo
- **Desktop (> 1024px):** Full navigation menu with CTA button

### Animations

- Header slides down on page load using Framer Motion
- Smooth backdrop blur effect
- Mobile drawer slides in from right

### Customization

All styling uses shadcn/ui CSS variables:

```typescript
// Colors automatically adapt to your theme
// Override in your tailwind.config:
{
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... shadcn/ui variables
      }
    }
  }
}
```

### Related Components

- [Header 02](/docs/components/header-02) - Transparent variant
- [Header 03](/docs/components/header-03) - With search bar
- [Notification Bar 01](/docs/components/notification-bar-01) - Top banner
```

---

## 🛠️ Build Automation

### Enhanced Registry Build Script

```javascript
// File: scripts/build-registry.mjs
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REGISTRY_PATH = path.join(__dirname, '../src/registry/blocks')
const OUTPUT_PATH = path.join(__dirname, '../public/registry')

// Category configuration
const CATEGORIES = {
  headers: {
    name: 'Headers',
    description: 'Navigation bars and top sections',
    icon: '🏛️'
  },
  heroes: {
    name: 'Heroes',
    description: 'Landing page hero sections',
    icon: '🦸'
  },
  footers: {
    name: 'Footers',
    description: 'Bottom page sections',
    icon: '🦶'
  },
  'contact-forms': {
    name: 'Contact Forms',
    description: 'Form components for user input',
    icon: '📧'
  },
  cta: {
    name: 'Call to Action',
    description: 'Conversion-focused sections',
    icon: '📣'
  },
  stats: {
    name: 'Statistics',
    description: 'Data visualization blocks',
    icon: '📊'
  },
  testimonials: {
    name: 'Testimonials',
    description: 'Social proof and reviews',
    icon: '💬'
  },
  pricing: {
    name: 'Pricing',
    description: 'Pricing tables and cards',
    icon: '💰'
  }
}

async function buildRegistry() {
  console.log('🏗️  Building BRIX component registry...\n')
  
  await fs.ensureDir(OUTPUT_PATH)
  
  const registry = []
  const stats = {
    total: 0,
    byCategory: {}
  }
  
  // Scan all category folders
  for (const category of Object.keys(CATEGORIES)) {
    const categoryPath = path.join(REGISTRY_PATH, category)
    
    if (!await fs.pathExists(categoryPath)) continue
    
    const files = await fs.readdir(categoryPath)
    const categoryComponents = []
    
    for (const file of files) {
      if (!file.endsWith('.tsx')) continue
      
      const componentName = file.replace('.tsx', '')
      const filePath = path.join(categoryPath, file)
      const content = await fs.readFile(filePath, 'utf-8')
      
      // Extract metadata from component
      const metadata = extractMetadata(content, componentName, category)
      
      // Copy to public/registry
      const outputFile = path.join(OUTPUT_PATH, `${category}-${file}`)
      await fs.writeFile(outputFile, content)
      
      registry.push(metadata)
      categoryComponents.push(componentName)
      stats.total++
    }
    
    stats.byCategory[category] = categoryComponents.length
    
    if (categoryComponents.length > 0) {
      console.log(`✅ ${CATEGORIES[category].icon} ${CATEGORIES[category].name}: ${categoryComponents.length} components`)
    }
  }
  
  // Write registry.json
  await fs.writeFile(
    path.join(OUTPUT_PATH, 'registry.json'),
    JSON.stringify(registry, null, 2)
  )
  
  // Write category index
  await fs.writeFile(
    path.join(OUTPUT_PATH, 'categories.json'),
    JSON.stringify(CATEGORIES, null, 2)
  )
  
  console.log(`\n✨ Registry built successfully!`)
  console.log(`📦 Total: ${stats.total} components\n`)
}

function extractMetadata(content, name, category) {
  const dependencies = extractDependencies(content)
  const registryDependencies = extractRegistryDependencies(content)
  const animations = extractAnimations(content)
  const responsive = checkResponsive(content, name)
  
  return {
    name,
    type: "components:block",
    category,
    description: extractDescription(content),
    dependencies,
    registryDependencies,
    files: [`${category}-${name}.tsx`],
    responsive,
    animations,
    features: extractFeatures(content)
  }
}

function extractDependencies(content) {
  const deps = new Set()
  const importRegex = /import .+ from ['"]([^'"]+)['"]/g
  let match
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      deps.add(importPath)
    }
  }
  
  return Array.from(deps)
}

function extractRegistryDependencies(content) {
  const deps = new Set()
  const importRegex = /import .+ from ['"]@\/components\/ui\/([^'"]+)['"]/g
  let match
  
  while ((match = importRegex.exec(content)) !== null) {
    deps.add(match[1])
  }
  
  return Array.from(deps)
}

function extractAnimations(content) {
  const animations = []
  
  if (content.includes('whileHover')) animations.push('hover')
  if (content.includes('whileTap')) animations.push('tap')
  if (content.includes('initial') && content.includes('animate')) {
    animations.push('entrance')
  }
  if (content.includes('whileInView')) animations.push('scroll-reveal')
  
  return animations
}

function checkResponsive(content, name) {
  return {
    mobile: name.includes('mobile') || content.includes('md:hidden'),
    tablet: content.includes('md:') && content.includes('lg:'),
    desktop: !name.includes('mobile')
  }
}

function extractDescription(content) {
  // Try to extract description from JSDoc comment
  const descRegex = /\/\*\*\s*\n\s*\*\s*(.+)\n/
  const match = content.match(descRegex)
  return match ? match[1] : ''
}

function extractFeatures(content) {
  const features = []
  
  if (content.includes('useState')) features.push('interactive')
  if (content.includes('form') || content.includes('Form')) features.push('form')
  if (content.includes('sticky')) features.push('sticky')
  if (content.includes('modal') || content.includes('dialog')) features.push('modal')
  
  return features
}

buildRegistry().catch(console.error)
```

---

## 🧪 Testing Strategy

### Component Testing Checklist

For each component, verify:

#### Visual Testing
- [ ] Matches Figma design pixel-perfect
- [ ] Responsive on all breakpoints (mobile, tablet, desktop)
- [ ] Dark mode support (if applicable)
- [ ] Animations smooth at 60fps
- [ ] Hover states work correctly

#### Functional Testing
- [ ] All interactive elements respond to clicks
- [ ] Forms validate input correctly
- [ ] Navigation links are functional
- [ ] Accessibility (keyboard navigation, ARIA labels)
- [ ] Screen reader compatibility

#### Integration Testing
- [ ] CLI installation works: `npx shadcn-ui add -r asth-ui [component]`
- [ ] Dependencies install automatically
- [ ] Component renders in fresh Next.js project
- [ ] TypeScript types are correct
- [ ] No console errors/warnings

#### Performance Testing
- [ ] Bundle size < 50KB (per component)
- [ ] Initial render < 100ms
- [ ] No layout shift (CLS)
- [ ] Images optimized and lazy loaded

---

## 📦 Deliverables Timeline

### Phase 1: Foundation (Week 1-2)
**Deliverable:** 6 base components + design token system
- Design tokens configured in Tailwind v4
- Base components built and tested
- Registry build script updated
- Documentation framework ready

### Phase 2: Critical Blocks (Week 3-5)
**Deliverable:** 40 components (Headers + Heroes + Footers)
- 10 header variants (desktop + mobile)
- 20 hero variants (desktop + mobile)
- 17 footer variants (desktop + mobile)
- Full documentation for each
- CLI installation tested

### Phase 3: Engagement (Week 6-8)
**Deliverable:** 74 components (Forms + CTAs + Content Cards)
- 15 contact form variants
- 11 CTA variants
- 18 content card variants
- 33 content section variants
- Interactive demos

### Phase 4: Data Display (Week 9-10)
**Deliverable:** 74 components (Stats + Testimonials + Team + Pricing)
- 13 stats variants
- 13 testimonial variants
- 14 team member variants
- 11 pricing table variants
- Animated counters and carousels

---

## 🎨 Design Conversion Workflow

### From Figma to Code (Step-by-Step)

```bash
# 1. Export Figma Node
# Use Figma's "Code" panel or plugin to get component structure

# 2. Convert to shadcn/ui patterns
# Replace Figma components with shadcn equivalents:
Figma "Button" → shadcn <Button />
Figma "Input" → shadcn <Input />
Figma "Card" → shadcn <Card />

# 3. Add Framer Motion
# Wrap static elements with <motion.div>
<div> → <motion.div initial={{ ... }} animate={{ ... }}>

# 4. Make Responsive
# Add Tailwind breakpoint classes
className="text-2xl md:text-4xl lg:text-6xl"

# 5. Extract to Props
# Convert hard-coded values to props
"Get Started" → {ctaButton}

# 6. Add TypeScript
interface ComponentProps {
  title: string
  description: string
  variant?: 'default' | 'large'
}

# 7. Test & Document
npm run build:registry
npm run dev
# Create MDX documentation

# 8. Commit to Registry
git add src/registry/blocks/[category]/[component].tsx
git add content/docs/components/[component].mdx
git commit -m "feat: add [component-name]"
```

---

## 🔧 Configuration Updates

### Update components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/global.css",
    "baseColor": "stone",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "blocks": "@/components/blocks",
    "base": "@/components/base"
  },
  "registries": {
    "asth-ui": {
      "url": "https://asth-ui.com/api/registry",
      "categories": [
        "headers",
        "heroes",
        "footers",
        "contact-forms",
        "cta",
        "content-cards",
        "stats",
        "testimonials",
        "team-members",
        "pricing",
        "accordions",
        "logo-strips",
        "gallery",
        "dropdowns"
      ]
    }
  }
}
```

### Update package.json Scripts

```json
{
  "scripts": {
    "dev": "npm run build:registry && next dev --turbo",
    "build": "npm run build:registry && next build",
    "build:registry": "node scripts/build-registry.mjs",
    "build:fast": "next build",
    "test:registry": "node scripts/test-registry.mjs",
    "preview:component": "node scripts/preview-component.mjs"
  }
}
```

---

## 📊 Success Metrics

### Key Performance Indicators (KPIs)

#### Development Metrics
- [ ] **Component Count:** 389 total components implemented
- [ ] **Code Quality:** 100% TypeScript coverage
- [ ] **Test Coverage:** >80% component test coverage
- [ ] **Documentation:** Every component has MDX page
- [ ] **Build Time:** Registry builds in <30 seconds

#### User Experience Metrics
- [ ] **Page Load:** <2s for homepage
- [ ] **CLI Install Time:** <10s per component
- [ ] **Animation Performance:** 60fps on all animations
- [ ] **Mobile Performance:** Lighthouse score >90
- [ ] **Accessibility:** WCAG 2.1 AA compliant

#### Business Metrics
- [ ] **Component Installs:** Track via API analytics
- [ ] **Popular Components:** Top 10 most-used blocks
- [ ] **User Retention:** Return visits to documentation
- [ ] **GitHub Stars:** Community engagement
- [ ] **NPM Downloads:** (if published as package)

---

## 🚀 Next Steps

### Immediate Actions (This Week)

1. **Review and Approve Plan**
   - Confirm component priorities
   - Adjust timeline if needed
   - Allocate resources

2. **Set Up Development Environment**
   ```bash
   # Install missing dependencies
   npm install framer-motion
   
   # Create folder structure
   mkdir -p src/registry/blocks/{headers,heroes,footers,contact-forms,cta}
   mkdir -p src/registry/base
   
   # Update build script
   cp scripts/build-registry.mjs scripts/build-registry.backup.mjs
   # (Replace with enhanced version above)
   ```

3. **Start with Phase 1**
   - Build design token system
   - Create 6 base components
   - Test registry build
   - Document in Fumadocs

4. **Set Up Project Management**
   - Create GitHub project board
   - Break down into issues (1 issue per component)
   - Use labels: `component`, `documentation`, `bug`, `enhancement`
   - Track progress weekly

### Week 1 Deliverables
- [ ] shadcn/ui components installed via CLI
- [ ] No custom CSS variables (using shadcn/ui defaults)
- [ ] Registry build script updated for new naming (header-01 not header-v1)
- [ ] First responsive component documented with DynamicPreview

---

## 💡 Pro Tips & Best Practices

### 1. Component Naming Convention
```
[category]-[number].tsx (not v[number])
Examples:
- header-01.tsx, header-02.tsx, header-10.tsx
- hero-01.tsx, hero-15.tsx
- footer-01.tsx, footer-17.tsx
- contact-form-01.tsx
```

### 2. Code Organization
```
src/registry/blocks/
├── headers/
│   ├── header-01.tsx
│   ├── header-02.tsx
│   └── index.ts          // Export all
├── heroes/
│   ├── hero-01.tsx
│   └── index.ts
└── shared/               // Shared utilities (if needed)
    ├── animations.ts
    └── hooks.ts
```

### 3. Component Best Practices
- ✅ Use only shadcn/ui components (Button, Card, Sheet, etc.)
- ✅ Use shadcn/ui CSS variables (--background, --foreground, etc.)
- ✅ Single responsive component (not separate mobile versions)
- ✅ Mobile-first approach (default styles for mobile, then md:, lg:)
- ❌ Don't create custom CSS variables
- ❌ Don't create base utility components
- ❌ Don't create separate mobile/desktop versions

### 4. Animation Best Practices
- Use `whileInView` for scroll animations with Framer Motion
- Add `viewport={{ once: true }}` to prevent re-triggering
- Keep `duration` between 0.4-0.8 seconds
- Use easing curves: `ease: [0.22, 1, 0.36, 1]` (smooth standard)

### 5. Responsive Images
```typescript
// Always use Next.js Image component
import Image from 'next/image'

<Image
  src={imageSrc}
  alt="Description"
  width={1200}
  height={600}
  className="w-full h-auto object-cover"
  placeholder="blur"
  blurDataURL={blurData}
/>
```

### 6. Form Best Practices
- Use shadcn/ui `form` component with `react-hook-form`
- Use shadcn/ui `input`, `textarea`, `select` components
- Use shadcn/ui `button` for submit
- Use shadcn/ui `toast` for success/error messages
- Add validation with Zod schema

---

## 📚 Resources

### Design References
- **Figma File:** [BRIX Agency Wireframe Kit](https://www.figma.com/design/ypwQ02Dt7AAzmPJCInAlAb/)
- **Style Guide:** Extracted in "Design System Overview" section above

### Technical Documentation
- **shadcn/ui Docs:** https://ui.shadcn.com
- **Framer Motion Docs:** https://www.framer.com/motion
- **Next.js 15 Docs:** https://nextjs.org/docs
- **Tailwind CSS v4:** https://tailwindcss.com/docs

### Inspiration
- **Aceternity UI:** https://ui.aceternity.com
- **Magic UI:** https://magicui.design
- **Tailwind UI:** https://tailwindui.com

---

## 🎯 Conclusion

This implementation plan provides a **complete roadmap** for building **217 production-ready responsive components** from the BRIX Figma wireframe kit. By following the phased approach, you'll:

1. ✅ Use only shadcn/ui components and CSS variables (no custom design tokens)
2. ✅ Build fully responsive components (single component for mobile/tablet/desktop)
3. ✅ Implement critical landing page blocks first (notification bars, headers, heroes, footers)
4. ✅ Add engagement blocks (forms, CTAs, content cards, sections)
5. ✅ Complete with data display components (stats, testimonials, pricing, galleries)

**Key Changes from Original Plan:**
- ❌ No custom CSS variables → ✅ Use shadcn/ui variables only
- ❌ No separate mobile components → ✅ Single responsive components
- ❌ No base utility components → ✅ Use shadcn/ui components directly
- Component naming: `header-01.tsx` not `header-v1.tsx`
- Total components: **217 variants** (not 389, since no separate mobile versions)

**Timeline:** 10 weeks (~22 components per week average)
**Outcome:** A comprehensive component library with shadcn-compatible registry
**Competitive Advantage:** Single source of truth with dynamic code previews

**Ready to start?** Begin with Phase 1 by installing all required shadcn/ui components via CLI, then move systematically through each phase building responsive components.

---

**Document Version:** 1.0  
**Last Updated:** November 13, 2025  
**Author:** Asth UI Development Team  
**Status:** Ready for Implementation 🚀
