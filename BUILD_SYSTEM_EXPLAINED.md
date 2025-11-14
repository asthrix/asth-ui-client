# Registry Build System Comparison

## Official `shadcn build` vs Custom Build Script

### Overview

**Official Method:**
```bash
npx shadcn@latest build
```
Reads a manually-created `registry.json` from your project root.

**Our Custom Method:**
```bash
node scripts/build-registry.mjs
```
Auto-generates registry by scanning source files.

---

## How the Official `shadcn build` Works

### Step 1: You Create `registry.json` Manually

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "asth-ui",
  "homepage": "https://github.com/asthrix/asth-ui-client",
  "items": [
    {
      "name": "header-01",
      "type": "registry:block",
      "description": "Modern header with navigation",
      "files": [
        {
          "path": "registry/headers/header-01.tsx",
          "type": "registry:component"
        }
      ],
      "dependencies": ["framer-motion", "lucide-react", "react"],
      "registryDependencies": ["button", "sheet"]
    }
  ]
}
```

### Step 2: Run Build Command

```bash
npx shadcn@latest build
```

### Step 3: CLI Generates Output

```
public/r/
├── header-01.json          # Component with full content
├── header-02.json
└── registry.json           # Copy of your input
```

### Workflow

```
You write registry.json (manual)
        ↓
Run: shadcn build
        ↓
CLI reads registry.json
        ↓
CLI reads files from "path" property
        ↓
CLI generates JSON files with content
        ↓
Output: public/r/*.json
```

**Pros:**
- ✅ Standard, official approach
- ✅ Well-documented
- ✅ Maintained by shadcn team
- ✅ Less code to maintain

**Cons:**
- ❌ Manual maintenance of registry.json
- ❌ Must manually add each component
- ❌ Must manually specify dependencies
- ❌ Easy to forget updating registry.json
- ❌ Duplication of information (files + registry)

---

## How Our Custom `build-registry.mjs` Works

### Step 1: File Structure (Convention-Based)

```
src/registry/blocks/
├── headers/
│   ├── header-01.tsx
│   ├── header-02.tsx
│   └── header-03.tsx
├── footers/
│   └── footer-01.tsx
└── hero/
    └── hero-01.tsx
```

### Step 2: Script Auto-Scans

```javascript
// 1. Read all category directories
const categories = await fs.readdir('src/registry/blocks/');

// 2. For each category, find all .tsx files
const files = await fs.readdir(`src/registry/blocks/${category}`);
const tsxFiles = files.filter(file => file.endsWith('.tsx'));

// 3. For each file, extract info
for (const file of tsxFiles) {
  const content = await fs.readFile(filePath, 'utf-8');
  const dependencies = extractDependencies(content);
  const registryDependencies = extractRegistryDependencies(content);
  
  // Build registry item...
}
```

### Step 3: Auto-Extract Dependencies

```javascript
function extractDependencies(content) {
  // Find: import { motion } from "framer-motion";
  // Extract: "framer-motion"
  
  // Find: import { Menu } from "lucide-react";
  // Extract: "lucide-react"
  
  // Find: import { Button } from "@/components/ui/button";
  // Skip (internal import)
}

function extractRegistryDependencies(content) {
  // Find: import { Button } from "@/components/ui/button";
  // Extract: "button"
  
  // Find: import { Sheet } from "@/components/ui/sheet";
  // Extract: "sheet"
}
```

### Step 4: Generate Registry JSON

```javascript
const registryJson = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "asth-ui",
  homepage: "https://github.com/asthrix/asth-ui-client",
  items: registry  // Auto-built array
};
```

### Step 5: Output Files

```
public/registry/
├── header-01.json          # With full content
├── header-02.json          # With full content
├── header-03.json          # With full content
├── registry.json           # Root registry
├── categories.json         # Categories metadata
└── headers-header-01.tsx   # Source files
```

### Workflow

```
You create: src/registry/blocks/headers/header-01.tsx
        ↓
Run: node scripts/build-registry.mjs
        ↓
Script scans src/registry/blocks/
        ↓
Script reads each .tsx file
        ↓
Script extracts imports → dependencies
        ↓
Script builds registry.json automatically
        ↓
Script writes individual component JSON files
        ↓
Output: public/registry/*.json
```

**Pros:**
- ✅ Zero manual maintenance
- ✅ Auto-discovers new components
- ✅ Auto-extracts dependencies
- ✅ Single source of truth (the component file)
- ✅ Category-based organization
- ✅ Can't forget to update registry
- ✅ Faster development workflow

**Cons:**
- ❌ Custom code to maintain
- ❌ Must follow conventions (folder structure)
- ❌ Less flexible than manual approach
- ❌ Dependency extraction might miss edge cases

---

## Technical Deep Dive: Dependency Extraction

### How `extractDependencies()` Works

```javascript
function extractDependencies(content) {
  const deps = new Set();
  // Regex to match import statements
  const importRegex = /import\s+(?:[\w{},\s*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const matches = content.matchAll(importRegex);

  for (const match of matches) {
    const importPath = match[1];
    
    // Skip relative imports (./file or ../file)
    if (importPath.startsWith(".")) continue;
    
    // Skip internal imports (@/...)
    if (importPath.startsWith("@/")) continue;
    
    // Extract package name
    if (importPath.startsWith("@")) {
      // Scoped package: @radix-ui/react-slot → @radix-ui/react-slot
      const packageName = importPath.split("/").slice(0, 2).join("/");
      deps.add(packageName);
    } else {
      // Regular package: lucide-react/icons → lucide-react
      const packageName = importPath.split("/")[0];
      deps.add(packageName);
    }
  }

  return Array.from(deps);
}
```

### Example:

**Input (Component Code):**
```tsx
import { motion } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
```

**Output (Extracted Dependencies):**
```javascript
[
  "framer-motion",    // ✅ External package
  "lucide-react",     // ✅ External package
  "react"             // ✅ External package
  // @/components/ui/* are excluded (internal)
]
```

### How `extractRegistryDependencies()` Works

```javascript
function extractRegistryDependencies(content) {
  const deps = new Set();
  // Match: import ... from '@/components/ui/COMPONENT'
  const importRegex = /import\s+.*?from\s+['"]@\/components\/ui\/([^'"]+)['"]/g;
  const matches = content.matchAll(importRegex);

  for (const match of matches) {
    deps.add(match[1]);  // Extract component name
  }

  return Array.from(deps);
}
```

**Input:**
```tsx
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NavigationMenu } from "@/components/ui/navigation-menu";
```

**Output:**
```javascript
[
  "button",
  "sheet",
  "navigation-menu"
]
```

---

## When to Use Which Approach?

### Use Official `shadcn build` When:

1. ✅ You have a small number of components
2. ✅ You prefer official, standard tooling
3. ✅ You want maximum flexibility in structure
4. ✅ You're comfortable manually maintaining registry.json
5. ✅ You want to rely on official shadcn CLI updates

### Use Custom Script When:

1. ✅ You have many components
2. ✅ You want automatic discovery
3. ✅ You want automatic dependency extraction
4. ✅ You value DRY (Don't Repeat Yourself)
5. ✅ You follow a consistent folder structure
6. ✅ You want faster development workflow

---

## Could We Switch to Official `shadcn build`?

**Yes!** Here's how:

### Step 1: Create Root `registry.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "asth-ui",
  "homepage": "https://github.com/asthrix/asth-ui-client",
  "items": [
    {
      "name": "header-01",
      "type": "registry:block",
      "description": "Modern header with navigation",
      "files": [
        {
          "path": "src/registry/blocks/headers/header-01.tsx",
          "type": "registry:component"
        }
      ],
      "dependencies": ["framer-motion", "lucide-react", "react"],
      "registryDependencies": ["button", "sheet"]
    }
    // ... manually add all other components
  ]
}
```

### Step 2: Update package.json

```json
{
  "scripts": {
    "build:registry": "shadcn build --output public/r"
  }
}
```

### Step 3: Run Build

```bash
npm run build:registry
```

**Trade-off:** You lose automatic discovery and dependency extraction.

---

## Hybrid Approach (Best of Both Worlds)

You could create a script that:
1. Auto-discovers components (like our script)
2. Generates root `registry.json`
3. Then calls `shadcn build` to process it

```javascript
// generate-registry-json.mjs
// ... auto-discover and create registry.json

// Then in package.json:
{
  "scripts": {
    "prebuild:registry": "node scripts/generate-registry-json.mjs",
    "build:registry": "shadcn build"
  }
}
```

This way you get:
- ✅ Automatic discovery (custom script)
- ✅ Official processing (shadcn CLI)
- ✅ Standard output format

---

## Conclusion

**Our Custom Script** is more powerful for development because it automates repetitive tasks. The official `shadcn build` is simpler but requires manual maintenance.

For a component library with many components, our approach saves significant time and reduces human error.
