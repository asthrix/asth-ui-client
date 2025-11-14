# Asth UI Registry Setup

This project is configured to work with the `shadcn` CLI for distributing custom components following the official shadcn registry specification.

## Configuration

The registry is configured in `components.json`:

```json
{
  "registries": {
    "@asth-ui": "http://localhost:3000/r/{name}.json"
  }
}
```

## Registry Structure (Official shadcn Format)

### Root Registry (`/r` or `/r/registry.json`)

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "asth-ui",
  "homepage": "https://github.com/asthrix/asth-ui-client",
  "items": [
    {
      "name": "header-01",
      "type": "registry:block",
      "description": "header 01 component",
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

### Individual Component Files (`/r/{name}.json`)

Each component has its own JSON file with the full content:

```json
{
  "name": "header-01",
  "type": "registry:block",
  "description": "header 01 component",
  "files": [
    {
      "path": "registry/headers/header-01.tsx",
      "content": "... full component code ...",
      "type": "registry:component"
    }
  ],
  "dependencies": ["framer-motion", "lucide-react", "react"],
  "registryDependencies": ["button", "sheet"]
}
```

## Using the Registry

### 1. Start the Development Server

```bash
npm run dev
```

This will:
- Build the registry (creates JSON files for each component)
- Start the Next.js server on `http://localhost:3000`

### 2. Install Components

Once the server is running, you can install components using the shadcn CLI:

```bash
# Install a single component
npx shadcn@latest add @asth-ui/header-01

# Install multiple components
npx shadcn@latest add @asth-ui/header-01 @asth-ui/header-02

# View component details before installing
npx shadcn@latest view @asth-ui/header-01
```

### 3. Available Components

Current components in the registry:

- `@asth-ui/header-01` - Modern header with logo, nav menu, Login + CTA buttons
- `@asth-ui/header-02` - Header with logo, nav menu, search input
- `@asth-ui/header-03` - Symmetrical header with centered logo
- `@asth-ui/header-04` - Modern header with search + multiple actions

## Registry Structure

```
public/registry/
├── header-01.json          # Registry item for header-01
├── header-02.json          # Registry item for header-02
├── header-03.json          # Registry item for header-03
├── header-04.json          # Registry item for header-04
├── registry.json           # Full registry index
├── categories.json         # Categories metadata
└── headers-header-*.tsx    # Component source files
```

## API Endpoints

The registry follows the official shadcn registry specification:

- `GET /r` or `GET /r/registry.json` - Root registry with schema, name, homepage, and items list
- `GET /r/{name}.json` - Individual component with full content (e.g., `/r/header-01.json`)

### Examples:

```bash
# Get the full registry index
curl http://localhost:3000/r

# Get a specific component
curl http://localhost:3000/r/header-01.json
```

## Adding New Components

1. Create your component in `src/registry/blocks/{category}/`
2. Run `npm run build:registry` to regenerate the registry
3. The component will be available at `@asth-ui/{component-name}`

## Production Deployment

For production use, update the registry URL in `components.json`:

```json
{
  "registries": {
    "@asth-ui": "https://your-domain.com/r/{name}.json"
  }
}
```

Then users can install from your production URL:

```bash
npx shadcn@latest add @asth-ui/header-01
```

## Registry Schema

The registry follows the official shadcn schema specification:

### Root Registry Schema

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "asth-ui",
  "homepage": "https://github.com/asthrix/asth-ui-client",
  "items": [...]
}
```

**Properties:**
- `$schema` - Schema URL for validation
- `name` - Registry name (used for data attributes and metadata)
- `homepage` - Registry homepage URL
- `items` - Array of registry items

### Registry Item Schema

Each item in the registry follows this structure:

```json
{
  "name": "header-01",
  "type": "registry:block",
  "description": "header 01 component",
  "files": [
    {
      "path": "registry/headers/header-01.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": ["framer-motion", "lucide-react", "react"],
  "registryDependencies": ["button", "sheet"]
}
```

**Properties:**
- `name` - Unique identifier for the component
- `type` - Registry type (registry:block, registry:component, registry:ui, etc.)
- `description` - Human-readable description
- `files` - Array of files with path and type
- `dependencies` - NPM package dependencies
- `registryDependencies` - Dependencies on other registry items

**Individual Component Files:**

When served individually at `/r/{name}.json`, files include the full content:

```json
{
  "files": [
    {
      "path": "registry/headers/header-01.tsx",
      "content": "... full source code ...",
      "type": "registry:component"
    }
  ]
}
```

## Troubleshooting

### Component not found

Make sure the development server is running:
```bash
npm run dev
```

### Registry build failed

Clean and rebuild:
```bash
rm -rf public/registry/*.json
npm run build:registry
```

### Wrong URL

Check `components.json` has the correct registry URL with `{name}` placeholder:
```json
"@asth-ui": "http://localhost:3000/r/{name}.json"
```

## Resources

- [shadcn Registry Documentation](https://ui.shadcn.com/docs/registry)
- [Registry Namespaces](https://ui.shadcn.com/docs/registry/namespace)
- [Registry Schema](https://ui.shadcn.com/docs/registry/registry-json)
