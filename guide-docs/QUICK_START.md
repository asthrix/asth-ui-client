# Asth UI - Quick Start Guide

## 🎯 What You're Building

A **component library website** with a **custom shadcn-compatible registry** that allows developers to install your components via CLI:

```bash
npx shadcn-ui@latest add -r asth-ui animated-button
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR WEBSITE                              │
│  (Next.js + Fumadocs + Framer Motion)                       │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐           │
│  │ Homepage │  │ /components│  │ /docs/[slug]  │           │
│  │  Hero    │  │   Browser  │  │ Documentation │           │
│  │  Bento   │  │   Cards    │  │ Live Preview  │           │
│  └──────────┘  └──────────┘  └────────────────┘           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                  REGISTRY SYSTEM                             │
│                                                              │
│  src/registry/blocks/     →  Build Script  →  API Routes   │
│  ├── animated-button.tsx      (Node.js)       /api/registry │
│  ├── hero-section.tsx                                       │
│  └── ...                                                     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              DEVELOPER'S PROJECT                             │
│                                                              │
│  $ npx shadcn-ui add -r asth-ui animated-button             │
│                                                              │
│  → Downloads from your API                                   │
│  → Installs in their components/blocks/                     │
│  → Ready to use!                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Implementation Flow

### **Week 1: Foundation**
```bash
# 1. Install dependencies
npm install framer-motion gray-matter shiki
npm install -D @types/fs-extra fs-extra

# 2. Create folders
mkdir -p src/registry/blocks
mkdir -p src/app/api/registry
mkdir -p src/components/preview
mkdir -p src/components/home
mkdir -p scripts
```

### **Week 2-3: Registry System**
**Goal:** Make CLI installation work

1. **Create registry schema** → Define component metadata structure
2. **Write build script** → Auto-generate registry.json from your components
3. **Create API routes** → Serve components to CLI
4. **Test locally** → Verify CLI can install from localhost

**Test Command:**
```bash
npm run build:registry
curl http://localhost:3000/api/registry
```

### **Week 4: Dynamic Preview**
**Goal:** Never copy-paste code into docs

1. **Create ComponentPreview** → Preview + Code tabs
2. **Create DynamicPreview** → Server component that reads files
3. **Use in MDX** → `<DynamicPreview componentName="..." />`

**Result:** Documentation stays in sync with source code automatically!

### **Week 5: Homepage**
**Goal:** Aceternity-style showcase

1. **Hero with animations** → Framer Motion powered
2. **Bento Grid** → Visual component showcase
3. **How It Works** → 3-step CLI guide

### **Week 6: Component Browser**
**Goal:** `/components` page with all blocks

1. **Component cards** → Hover animations
2. **Grid layout** → Responsive
3. **Link to docs** → Each component has detail page

### **Week 7: Documentation**
**Goal:** Complete docs with Fumadocs

1. **Installation guide** → How to add registry
2. **Component pages** → Individual MDX files
3. **Usage examples** → Copy-paste code

### **Week 8: Build Components**
**Goal:** Create 5-10 production blocks

1. **Animated Button** → Simple starter
2. **Hero Section** → Full page component
3. **Feature Grid** → Bento-style layout
4. **Form Component** → With validation
5. **Data Table** → Sortable/filterable

---

## 🔑 Key Concepts

### 1. The Registry System
**What it does:** Allows CLI to download your components

**How it works:**
```
Component File → Build Script → registry.json → API Route → CLI
```

**Critical files:**
- `scripts/build-registry.mjs` - Scans components, generates JSON
- `src/app/api/registry/route.ts` - Serves registry.json
- `src/app/api/registry/[name]/route.ts` - Serves individual components

### 2. Dynamic Preview
**What it does:** Shows live preview + synced code in docs

**How it works:**
```
MDX File → DynamicPreview Component → Reads src/registry/blocks/ → Renders
```

**Critical files:**
- `src/components/preview/dynamic-preview.tsx` - Server Component
- `src/components/preview/component-preview.tsx` - Client Component with tabs
- `src/components/preview/code-block.tsx` - Syntax highlighted code

### 3. Component Structure
**Each component must:**
- Live in `src/registry/blocks/[name].tsx`
- Export as default
- Use 'use client' if using Framer Motion
- Import from `@/components/ui/` for shadcn components

**Example:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function AnimatedButton({ children, ...props }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}
```

---

## 📦 Project Structure

```
asth-ui-client/
├── src/
│   ├── registry/              # ⭐ Your components live here
│   │   ├── schema.ts
│   │   ├── index.tsx
│   │   └── blocks/
│   │       ├── animated-button.tsx
│   │       ├── hero-section.tsx
│   │       └── ...
│   │
│   ├── app/
│   │   ├── (home)/
│   │   │   └── page.tsx      # Homepage with Hero, Bento, etc.
│   │   ├── components/
│   │   │   └── page.tsx      # Component browser
│   │   ├── docs/
│   │   │   └── [[...slug]]/
│   │   │       └── page.tsx  # Dynamic docs pages
│   │   └── api/
│   │       └── registry/      # ⭐ CLI talks to these routes
│   │           ├── route.ts
│   │           └── [name]/
│   │               └── route.ts
│   │
│   └── components/
│       ├── preview/           # ⭐ Dynamic preview system
│       │   ├── component-preview.tsx
│       │   ├── code-block.tsx
│       │   └── dynamic-preview.tsx
│       ├── home/              # Homepage sections
│       │   ├── hero.tsx
│       │   ├── bento-grid.tsx
│       │   └── how-it-works.tsx
│       └── ui/                # shadcn components
│
├── content/
│   └── docs/
│       ├── installation.mdx
│       └── components/
│           ├── animated-button.mdx
│           └── ...
│
├── public/
│   └── registry/              # ⭐ Generated by build script
│       ├── registry.json
│       ├── animated-button.tsx
│       └── ...
│
├── scripts/
│   └── build-registry.mjs     # ⭐ Generates registry
│
└── package.json
    "scripts": {
      "build:registry": "node scripts/build-registry.mjs",
      "dev": "npm run build:registry && next dev --turbo",
      "prebuild": "npm run build:registry"
    }
```

---

## 🎨 Design Principles

### Aceternity-Style Aesthetics
1. **Generous Whitespace** - Let components breathe
2. **Subtle Animations** - Purposeful, not distracting
3. **Dark Mode First** - Perfect dark theme support
4. **Modern Typography** - Geist or Inter font
5. **Bento Layouts** - Grid-based visual showcase

### Animation Guidelines (Framer Motion)
```typescript
// ✅ Good - Subtle and smooth
<motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>

// ❌ Bad - Too aggressive
<motion.div whileHover={{ scale: 1.5, rotate: 180 }} transition={{ duration: 2 }}>
```

---

## 🧪 Testing Your Registry

### 1. Build the registry
```bash
npm run build:registry
```

**Expected output:**
```
🏗️  Building registry...
✅ Built 5 components
```

### 2. Check the files
```bash
cat public/registry/registry.json
ls public/registry/
```

### 3. Test API locally
```bash
npm run dev
curl http://localhost:3000/api/registry | jq
curl http://localhost:3000/api/registry/animated-button
```

### 4. Test CLI installation
```bash
# In a separate Next.js project
cd /path/to/test-project
npx shadcn-ui@latest add -r http://localhost:3000/api/registry animated-button
```

**Expected:** Component should be installed in `components/blocks/animated-button.tsx`

---

## 🚨 Common Issues & Solutions

### Issue: "Component not found" in CLI
**Solution:**
1. Run `npm run build:registry`
2. Check `public/registry/registry.json` exists
3. Verify component name matches file name exactly

### Issue: Framer Motion not animating
**Solution:**
1. Add `'use client'` directive at top of component
2. Check Framer Motion is installed
3. Ensure component is client-side rendered

### Issue: Code preview showing old code
**Solution:**
- Restart dev server (DynamicPreview reads files on server)
- DynamicPreview is a Server Component, it caches

### Issue: Build script not finding components
**Solution:**
1. Check files are in `src/registry/blocks/`
2. Check files end with `.tsx`
3. Check default export exists

---

## 📝 Creating Your First Component

### Step 1: Create the component file
```bash
touch src/registry/blocks/animated-button.tsx
```

### Step 2: Write the component
```typescript
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import type { ButtonProps } from '@/components/ui/button'

export default function AnimatedButton({ children, ...props }: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}
```

### Step 3: Build the registry
```bash
npm run build:registry
```

### Step 4: Create documentation
```bash
touch content/docs/components/animated-button.mdx
```

```mdx
---
title: Animated Button
description: A button with smooth hover animations
---

import { DynamicPreview } from '@/components/preview/dynamic-preview'

<DynamicPreview componentName="animated-button" />

## Installation

\`\`\`bash
npx shadcn-ui@latest add -r asth-ui animated-button
\`\`\`

## Usage

\`\`\`tsx
import { AnimatedButton } from '@/components/blocks/animated-button'

export default function Example() {
  return <AnimatedButton>Click me</AnimatedButton>
}
\`\`\`
```

### Step 5: Test it
```bash
npm run dev
# Visit http://localhost:3000/docs/components/animated-button
```

---

## 🎯 Success Metrics

### Phase 1 Complete When:
- ✅ Framer Motion installed
- ✅ All folders created
- ✅ Dev server runs without errors

### Phase 2 Complete When:
- ✅ Registry.json generates successfully
- ✅ API routes return data
- ✅ CLI can install a component locally

### Phase 3 Complete When:
- ✅ DynamicPreview shows live component
- ✅ Code tab shows source code
- ✅ Changing component file updates preview

### Phase 4 Complete When:
- ✅ Homepage has hero with animations
- ✅ Bento grid displays
- ✅ All animations are smooth (60fps)

### Project Complete When:
- ✅ CLI installation works from production URL
- ✅ 10+ components available
- ✅ All documentation pages exist
- ✅ Site is deployed and accessible

---

## 🚀 Deployment

### Before Deploying:
1. Update registry URL in docs (localhost → production)
2. Test build: `npm run build`
3. Test production locally: `npm start`

### Vercel Deployment:
```bash
vercel --prod
```

### Post-Deployment:
```bash
# Test from production
curl https://asth-ui.com/api/registry | jq

# Test CLI installation
npx shadcn-ui@latest add -r https://asth-ui.com/api/registry animated-button
```

---

## 📚 Key Resources

- **Full Implementation Plan:** `IMPLEMENTATION_PLAN.md`
- **PRD:** `PRD.md`
- **shadcn/ui Docs:** https://ui.shadcn.com
- **Fumadocs:** https://fumadocs.dev
- **Framer Motion:** https://www.framer.com/motion

---

## ✅ Next Actions

1. **Read the full IMPLEMENTATION_PLAN.md** (detailed code samples)
2. **Start Phase 1** (Install dependencies)
3. **Join Discord/GitHub** (For questions - optional)
4. **Build your first component** (Animated Button)

**Ready?** Start with Phase 1 in the Implementation Plan!
