# Asth UI - System Architecture Diagram

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          ASTH UI WEBSITE                                 │
│                     (Next.js 15 + App Router)                           │
│                                                                          │
│  ┌────────────────┐  ┌──────────────────┐  ┌─────────────────────┐   │
│  │   Homepage     │  │  /components     │  │   /docs/[slug]      │   │
│  │  ┌──────────┐  │  │  ┌────────────┐  │  │  ┌───────────────┐ │   │
│  │  │ Hero     │  │  │  │ Component  │  │  │  │ MDX Content   │ │   │
│  │  │ Animated │  │  │  │ Grid       │  │  │  │ + Metadata    │ │   │
│  │  └──────────┘  │  │  │ & Search   │  │  │  └───────────────┘ │   │
│  │  ┌──────────┐  │  │  └────────────┘  │  │  ┌───────────────┐ │   │
│  │  │ Bento    │  │  │                   │  │  │ DynamicPreview│ │   │
│  │  │ Grid     │  │  │  Auto-generated   │  │  │ Component     │ │   │
│  │  └──────────┘  │  │  from Registry    │  │  └───────────────┘ │   │
│  │  ┌──────────┐  │  │                   │  │        ↓           │   │
│  │  │ How It   │  │  │                   │  │  ┌───────────────┐ │   │
│  │  │ Works    │  │  │                   │  │  │ Live Preview  │ │   │
│  │  └──────────┘  │  │                   │  │  │ + Code Tabs   │ │   │
│  └────────────────┘  └──────────────────┘  └─────────────────────┘   │
│                                                                          │
└──────────────────────────────────┬───────────────────────────────────────┘
                                   │
                                   │ Reads from
                                   ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                        REGISTRY SYSTEM                                   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ src/registry/blocks/                                             │  │
│  │ ├── animated-button.tsx    ← SINGLE SOURCE OF TRUTH             │  │
│  │ ├── hero-section.tsx                                             │  │
│  │ ├── feature-grid.tsx                                             │  │
│  │ └── ...                                                           │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                   │                                      │
│                                   │ Scanned by                           │
│                                   ↓                                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ scripts/build-registry.mjs                                       │  │
│  │                                                                   │  │
│  │ • Scans all .tsx files                                           │  │
│  │ • Extracts imports (dependencies)                                │  │
│  │ • Generates metadata                                             │  │
│  │ • Outputs registry.json                                          │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                   │                                      │
│                                   │ Generates                            │
│                                   ↓                                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ public/registry/                                                 │  │
│  │ ├── registry.json          ← Component metadata                 │  │
│  │ ├── animated-button.tsx    ← Raw source code                    │  │
│  │ ├── hero-section.tsx                                             │  │
│  │ └── ...                                                           │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                   │                                      │
│                                   │ Served by                            │
│                                   ↓                                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ src/app/api/registry/                                            │  │
│  │                                                                   │  │
│  │ /api/registry              → Returns registry.json               │  │
│  │ /api/registry/[name]       → Returns raw component source        │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────┬───────────────────────────────────────┘
                                   │
                                   │ Consumed by
                                   ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                     DEVELOPER'S PROJECT                                  │
│                                                                          │
│  Terminal Command:                                                       │
│  $ npx shadcn-ui@latest add -r asth-ui animated-button                 │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ shadcn CLI Process:                                             │   │
│  │                                                                  │   │
│  │ 1. Reads components.json                                        │   │
│  │ 2. Finds "asth-ui" registry URL                                 │   │
│  │ 3. Fetches /api/registry → Gets registry.json                   │   │
│  │ 4. Finds "animated-button" metadata                             │   │
│  │ 5. Fetches /api/registry/animated-button.tsx → Gets source      │   │
│  │ 6. Installs dependencies (if any)                               │   │
│  │ 7. Writes file to components/blocks/animated-button.tsx         │   │
│  │ 8. ✅ Done!                                                      │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Project Structure After Installation:                                  │
│  components/                                                             │
│  └── blocks/                                                             │
│      └── animated-button.tsx    ← Ready to import!                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

### Build Time (Development)
```
Developer writes component
        ↓
src/registry/blocks/animated-button.tsx
        ↓
npm run build:registry
        ↓
scripts/build-registry.mjs
        ↓
Scans files + Extracts metadata
        ↓
public/registry/
├── registry.json
└── animated-button.tsx
```

### Runtime (User Visits Website)
```
User visits /docs/components/animated-button
        ↓
Next.js renders page.tsx
        ↓
MDX file loaded with <DynamicPreview componentName="..." />
        ↓
DynamicPreview (Server Component) runs
        ↓
fs.readFileSync('src/registry/blocks/animated-button.tsx')
        ↓
Imports component + Reads source code
        ↓
Passes to ComponentPreview (Client Component)
        ↓
Renders: [Preview Tab] [Code Tab]
```

### CLI Installation (Developer Uses Your Components)
```
Developer runs: npx shadcn-ui add -r asth-ui animated-button
        ↓
CLI reads local components.json
        ↓
Finds registry URL: https://asth-ui.com/api/registry
        ↓
GET /api/registry → registry.json
        ↓
Finds component metadata (dependencies, files, etc.)
        ↓
GET /api/registry/animated-button.tsx → raw source
        ↓
Installs to components/blocks/animated-button.tsx
        ↓
✅ Component ready to use!
```

---

## 🔄 Component Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│ 1. CREATE                                                    │
│    Developer writes new component in src/registry/blocks/    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. BUILD                                                     │
│    npm run build:registry                                    │
│    → Generates registry.json                                 │
│    → Copies to public/registry/                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. DOCUMENT                                                  │
│    Create MDX file in content/docs/components/               │
│    → Add <DynamicPreview componentName="..." />              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. PREVIEW                                                   │
│    DynamicPreview reads source file                          │
│    → Live preview on website                                 │
│    → Code automatically synced                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. DISTRIBUTE                                                │
│    API routes serve component                                │
│    → CLI downloads via /api/registry/[name]                  │
│    → Installed in user's project                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ File System Structure

```
asth-ui-client/
│
├── src/
│   ├── registry/                    ← COMPONENT SOURCE
│   │   ├── schema.ts               (Type definitions)
│   │   ├── index.tsx               (Registry exports)
│   │   └── blocks/                 ← YOUR COMPONENTS LIVE HERE
│   │       ├── animated-button.tsx
│   │       ├── hero-section.tsx
│   │       ├── feature-grid.tsx
│   │       ├── animated-card.tsx
│   │       └── data-table.tsx
│   │
│   ├── app/
│   │   ├── (home)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx            ← Homepage (Hero, Bento, How It Works)
│   │   │
│   │   ├── components/
│   │   │   └── page.tsx            ← Component browser (grid view)
│   │   │
│   │   ├── docs/
│   │   │   ├── layout.tsx          (Fumadocs layout)
│   │   │   └── [[...slug]]/
│   │   │       └── page.tsx        ← Dynamic docs pages
│   │   │
│   │   ├── api/
│   │   │   └── registry/           ← REGISTRY API
│   │   │       ├── route.ts        (GET /api/registry → registry.json)
│   │   │       └── [name]/
│   │   │           └── route.ts    (GET /api/registry/[name] → source)
│   │   │
│   │   └── global.css
│   │
│   ├── components/
│   │   ├── preview/                ← DYNAMIC PREVIEW SYSTEM
│   │   │   ├── dynamic-preview.tsx (Server: reads files)
│   │   │   ├── component-preview.tsx (Client: tabs UI)
│   │   │   └── code-block.tsx      (Client: syntax highlight)
│   │   │
│   │   ├── home/                   ← HOMEPAGE SECTIONS
│   │   │   ├── hero.tsx           (Animated hero)
│   │   │   ├── bento-grid.tsx     (Component showcase)
│   │   │   └── how-it-works.tsx   (3-step guide)
│   │   │
│   │   ├── ui/                     ← SHADCN COMPONENTS
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   │
│   │   └── component-card.tsx      (For /components page)
│   │
│   └── lib/
│       ├── utils.ts
│       └── source.ts               (Fumadocs config)
│
├── content/
│   └── docs/                       ← DOCUMENTATION CONTENT
│       ├── index.mdx               (Docs home)
│       ├── installation.mdx        (Setup guide)
│       └── components/             ← COMPONENT DOCS
│           ├── animated-button.mdx
│           ├── hero-section.mdx
│           └── ...
│
├── public/
│   └── registry/                   ← GENERATED (by build script)
│       ├── registry.json           (Component metadata)
│       ├── animated-button.tsx     (Raw source copies)
│       ├── hero-section.tsx
│       └── ...
│
├── scripts/
│   └── build-registry.mjs          ← BUILD SCRIPT
│                                   (Generates registry)
│
├── components.json                 (shadcn config)
├── source.config.ts                (Fumadocs config)
├── next.config.mjs
└── package.json
```

---

## 🔌 API Endpoints

### GET `/api/registry`
**Purpose:** Returns complete registry metadata

**Response:**
```json
[
  {
    "name": "animated-button",
    "type": "components:block",
    "description": "Button with hover animations",
    "files": ["animated-button.tsx"],
    "dependencies": ["framer-motion"],
    "registryDependencies": ["button"]
  },
  {
    "name": "hero-section",
    "type": "components:block",
    "files": ["hero-section.tsx"],
    "dependencies": ["framer-motion"],
    "registryDependencies": ["button", "card"]
  }
]
```

**Used by:**
- shadcn CLI (to list available components)
- Website `/components` page (to generate grid)

---

### GET `/api/registry/[name]`
**Purpose:** Returns raw source code for specific component

**Example:** `/api/registry/animated-button`

**Response:**
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

**Used by:**
- shadcn CLI (to download component source)
- Could be used by VS Code extension (future)

---

## 🧩 Component Dependencies

### Dependency Chain Example
```
User wants to install: animated-card
        ↓
registry.json shows dependencies:
{
  "name": "animated-card",
  "registryDependencies": ["card", "button"],
  "dependencies": ["framer-motion"]
}
        ↓
shadcn CLI automatically:
1. Installs framer-motion (npm)
2. Installs card component (from shadcn)
3. Installs button component (from shadcn)
4. Installs animated-card (from your registry)
        ↓
✅ All dependencies resolved!
```

### Dependency Types

**`dependencies`** - NPM packages
```json
"dependencies": ["framer-motion", "class-variance-authority"]
```

**`registryDependencies`** - Other shadcn/ui components
```json
"registryDependencies": ["button", "card", "dialog"]
```

**`devDependencies`** - Dev-only packages
```json
"devDependencies": ["@types/react"]
```

---

## 🎨 Framer Motion Integration

### Animation Pattern
```
Component without animation (shadcn/ui)
        ↓
Wrap with motion.div
        ↓
Add animations (whileHover, whileTap, etc.)
        ↓
Export as new "animated" version
        ↓
User installs your enhanced version
```

### Example Flow
```typescript
// shadcn's Button (base)
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>
}

// Your AnimatedButton (enhanced)
export default function AnimatedButton({ children, ...props }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}
```

---

## 📱 Responsive Design Flow

```
Component Design
        ↓
Mobile First (320px+)
        ↓
Tablet (768px+)
        ↓
Desktop (1024px+)
        ↓
Large Desktop (1440px+)
        ↓
Test on all breakpoints
        ↓
Add to registry
```

---

## 🚀 Deployment Pipeline

```
Local Development
├── npm run dev
├── Build registry on file save
└── Hot reload
        ↓
Git Commit
├── Push to GitHub
└── Trigger CI/CD
        ↓
Vercel Build
├── npm run build:registry (prebuild)
├── next build
└── Static generation
        ↓
Production
├── https://asth-ui.com
├── API routes live
└── CLI can install from production URL
        ↓
User Installation
└── npx shadcn-ui add -r https://asth-ui.com/api/registry [component]
```

---

## 🔐 Security Considerations

### API Routes
- ✅ Read-only (no write operations)
- ✅ Static file serving
- ✅ No authentication needed (public registry)
- ✅ Rate limiting (via Vercel)

### Component Safety
- ✅ No server-side execution
- ✅ Static code only
- ✅ User reviews code before using
- ✅ Open source (transparency)

---

## 📊 Performance Optimization

### Build Time
```
Component files (src/registry/blocks/)
        ↓
Build script runs once
        ↓
Generates static JSON
        ↓
No runtime overhead
```

### Runtime
```
Website pages
        ↓
Static generation (SSG)
        ↓
DynamicPreview runs on server
        ↓
Client only receives HTML
        ↓
Fast page loads
```

### API Routes
```
/api/registry/*
        ↓
Serves static files from public/
        ↓
Cached by CDN
        ↓
<100ms response time
```

---

## 🧪 Testing Strategy

### Unit Tests
- Registry build script
- Component exports
- API route responses

### Integration Tests
- CLI installation flow
- DynamicPreview rendering
- API endpoint availability

### E2E Tests
- Full user journey
- Homepage → Components → Docs → Install

---

## 📈 Monitoring & Analytics

### Key Metrics
- API request counts
- Component installation counts
- Popular components
- Error rates

### Tools (Optional)
- Vercel Analytics
- PostHog
- Plausible

---

## 🎯 Success Indicators

✅ **Registry Working:**
- CLI can install components
- API routes return valid data
- No 404 errors

✅ **Documentation Working:**
- DynamicPreview shows components
- Code tabs display source
- All pages load correctly

✅ **Performance:**
- Page load < 2s
- API response < 100ms
- No hydration errors

✅ **User Experience:**
- Animations smooth (60fps)
- Mobile responsive
- Dark mode perfect

---

This architecture is designed to be:
- **Simple:** File-based, no database
- **Scalable:** Can handle 100+ components
- **Maintainable:** Single source of truth
- **Fast:** Static generation + CDN caching
