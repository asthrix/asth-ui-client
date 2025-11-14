# Registry Quick Reference

## Structure Overview

```
Asth UI Registry
├── Root Registry (/r)
│   ├── $schema: "https://ui.shadcn.com/schema/registry.json"
│   ├── name: "asth-ui"
│   ├── homepage: "https://github.com/asthrix/asth-ui-client"
│   └── items: [...]
│
└── Individual Components (/r/{name}.json)
    ├── name
    ├── type: "registry:block"
    ├── description
    ├── files (with full content)
    ├── dependencies (npm packages)
    └── registryDependencies (shadcn components)
```

## Key Differences from Initial Setup

### ✅ Correct (Official Specification)

**Root Registry (`/r`):**
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "asth-ui",
  "homepage": "https://github.com/asthrix/asth-ui-client",
  "items": [
    {
      "name": "header-01",
      "type": "registry:block",
      "files": [
        {
          "path": "registry/headers/header-01.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

**Individual Component (`/r/header-01.json`):**
```json
{
  "name": "header-01",
  "type": "registry:block",
  "files": [
    {
      "path": "registry/headers/header-01.tsx",
      "content": "... full code ...",
      "type": "registry:component"
    }
  ],
  "dependencies": ["framer-motion", "lucide-react", "react"],
  "registryDependencies": ["button", "sheet"]
}
```

### ❌ Initial Mistakes

1. ❌ Missing `$schema`, `name`, `homepage` in root registry
2. ❌ Root registry was just an array, not an object with `items`
3. ❌ Components had `category` field (not in official schema)
4. ❌ Files had `target` field in root registry (only needed for individual files)
5. ❌ Root registry items had `content` in files (should only be in individual component files)

## File Types

| Type | Description | Use Case |
|------|-------------|----------|
| `registry:block` | Complex components with multiple files | Headers, sections, pages |
| `registry:component` | Simple components | Basic UI elements |
| `registry:ui` | UI components and primitives | shadcn/ui style components |
| `registry:lib` | Libraries and utilities | Helper functions |
| `registry:hook` | React hooks | Custom hooks |
| `registry:page` | Page/route files | Full page templates |
| `registry:file` | Miscellaneous files | Config, env files |

## Build Process

1. **Source**: `src/registry/blocks/{category}/{component}.tsx`
2. **Build Script**: `scripts/build-registry.mjs`
3. **Output**:
   - `public/registry/registry.json` (root registry)
   - `public/registry/{name}.json` (individual components)
   - `public/registry/{category}-{component}.tsx` (source files)

## Installation Flow

1. User runs: `npx shadcn@latest add @asth-ui/header-01`
2. CLI reads: `components.json` → finds `@asth-ui` namespace
3. CLI resolves: `http://localhost:3000/r/{name}.json` → `http://localhost:3000/r/header-01.json`
4. CLI fetches: Component JSON with full content
5. CLI installs:
   - Dependencies from `dependencies` array
   - Registry deps from `registryDependencies` array
   - Files from `files` array with `content`

## URLs

- **Namespace in components.json**: `@asth-ui`
- **URL Pattern**: `http://localhost:3000/r/{name}.json`
- **Root Registry**: `http://localhost:3000/r` or `http://localhost:3000/r/registry.json`
- **Component Example**: `http://localhost:3000/r/header-01.json`

## Official Documentation

- [Registry Docs](https://ui.shadcn.com/docs/registry)
- [Getting Started](https://ui.shadcn.com/docs/registry/getting-started)
- [registry.json Schema](https://ui.shadcn.com/docs/registry/registry-json)
- [registry-item.json Schema](https://ui.shadcn.com/docs/registry/registry-item-json)
- [Namespaces](https://ui.shadcn.com/docs/registry/namespace)
