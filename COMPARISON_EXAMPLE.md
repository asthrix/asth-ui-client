# Adding a New Component: Comparison

## Scenario: You want to add a new `footer-01` component

---

## Method 1: Using Official `shadcn build`

### Steps Required:

#### 1. Create the component file
```bash
src/registry/blocks/footers/footer-01.tsx
```

#### 2. Write your component
```tsx
"use client";

import { Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer01() {
  return <footer>...</footer>;
}
```

#### 3. Manually edit `registry.json` in root
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "asth-ui",
  "homepage": "https://github.com/asthrix/asth-ui-client",
  "items": [
    {
      "name": "header-01",
      "type": "registry:block",
      "files": [...]
    },
    {
      "name": "header-02",
      "type": "registry:block",
      "files": [...]
    },
    // ⬇️ YOU MUST ADD THIS MANUALLY
    {
      "name": "footer-01",
      "type": "registry:block",
      "description": "Modern footer with social links",
      "files": [
        {
          "path": "src/registry/blocks/footers/footer-01.tsx",
          "type": "registry:component"
        }
      ],
      "dependencies": ["lucide-react", "react"],
      "registryDependencies": ["button"]
    }
  ]
}
```

#### 4. Run build
```bash
npm run registry:build
```

#### 5. Result
```
public/r/footer-01.json created ✅
```

**Total Steps: 5**
**Manual Work:** 
- ✍️ Write component (necessary)
- ✍️ Manually add to registry.json
- ✍️ Manually list all dependencies
- ✍️ Manually list registry dependencies

---

## Method 2: Using Our Custom Script

### Steps Required:

#### 1. Create the component file
```bash
src/registry/blocks/footers/footer-01.tsx
```

#### 2. Write your component
```tsx
"use client";

import { Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer01() {
  return <footer>...</footer>;
}
```

#### 3. Run build
```bash
npm run build:registry
```

#### 4. Result
```
📁 Processing category: footers
   ✅ footer-01
      Dependencies: lucide-react, react          # ← Auto-detected!
      Registry deps: button                      # ← Auto-detected!

✨ Registry built successfully!
   2 categories
   5 component(s) registered
```

**Total Steps: 3**
**Manual Work:**
- ✍️ Write component (necessary)
- ✅ Everything else is automatic!

---

## Real Example: What Happens Behind the Scenes

### Your Component File
```tsx
"use client";

import { motion } from "framer-motion";          // ← Script detects: framer-motion
import { Facebook, Twitter, Mail } from "lucide-react";  // ← Script detects: lucide-react
import * as React from "react";                  // ← Script detects: react
import { Button } from "@/components/ui/button"; // ← Script detects: button (registry)
import { Input } from "@/components/ui/input";   // ← Script detects: input (registry)

export default function Footer01() {
  return (
    <motion.footer>
      <div>
        <h3>Subscribe to our newsletter</h3>
        <Input placeholder="Email" />
        <Button>Subscribe</Button>
      </div>
      <div>
        <Facebook />
        <Twitter />
        <Mail />
      </div>
    </motion.footer>
  );
}
```

### What Our Script Generates

**public/registry/registry.json:**
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "asth-ui",
  "homepage": "https://github.com/asthrix/asth-ui-client",
  "items": [
    {
      "name": "footer-01",
      "type": "registry:block",
      "description": "footer 01 component",
      "files": [
        {
          "path": "registry/footers/footer-01.tsx",
          "type": "registry:component"
        }
      ],
      "dependencies": [
        "framer-motion",     // ← Auto-extracted!
        "lucide-react",      // ← Auto-extracted!
        "react"              // ← Auto-extracted!
      ],
      "registryDependencies": [
        "button",            // ← Auto-extracted!
        "input"              // ← Auto-extracted!
      ]
    }
  ]
}
```

**public/registry/footer-01.json:**
```json
{
  "name": "footer-01",
  "type": "registry:block",
  "description": "footer 01 component",
  "files": [
    {
      "path": "registry/footers/footer-01.tsx",
      "content": "... your entire component code ...",
      "type": "registry:component"
    }
  ],
  "dependencies": ["framer-motion", "lucide-react", "react"],
  "registryDependencies": ["button", "input"]
}
```

---

## What If You Need to Update a Component?

### Scenario: You add a new import to `header-01`

**Before:**
```tsx
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
```

**After:**
```tsx
import { Menu, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";  // ← NEW
```

### Method 1: Official `shadcn build`

1. ❌ Update component file
2. ❌ Manually update `registry.json` to add "input" to registryDependencies
3. ❌ Run `npm run registry:build`

### Method 2: Our Custom Script

1. ✅ Update component file
2. ✅ Run `npm run build:registry` (automatically detects new dependency!)

---

## Maintenance Over Time

### After 50 Components...

**Official Method:**
- 📝 One giant `registry.json` file with 50+ items
- 😰 Easy to make mistakes when editing
- 🔍 Hard to find specific component definition
- ⏰ Time-consuming to add/update components

**Our Method:**
- 📁 Clean folder structure
- 🚀 Just create new files, script handles everything
- ✨ Auto-discovers, auto-updates
- ⚡ Fast development workflow

---

## The Bottom Line

### Official `shadcn build`:
**Philosophy:** "You define everything, we process it"
- More control, more manual work
- Good for small projects
- Standard, well-documented

### Our Custom Script:
**Philosophy:** "Convention over configuration"
- Less control, less work
- Good for large projects
- Automatic, time-saving

---

## Which Should You Choose?

### Choose Official if:
- ✅ You have < 10 components
- ✅ You want maximum control
- ✅ You don't mind manual maintenance
- ✅ You value standard tooling

### Choose Custom if:
- ✅ You have > 10 components (or plan to)
- ✅ You value automation
- ✅ You want faster development
- ✅ You follow consistent conventions

---

## Summary

**Time to add a new component:**

| Method | Steps | Time | Manual Work |
|--------|-------|------|-------------|
| Official | 5 steps | ~3-5 min | Write component + Update registry.json |
| Custom | 3 steps | ~1-2 min | Write component only |

**Maintenance overhead:**

| Method | Per Component | Per Update |
|--------|--------------|------------|
| Official | Edit registry.json | Edit registry.json |
| Custom | Nothing | Nothing |

Our custom script saves you time and reduces errors! 🎉
