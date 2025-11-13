import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REGISTRY_PATH = path.join(__dirname, '../src/registry/blocks')
const OUTPUT_PATH = path.join(__dirname, '../public/registry')

/**
 * Extract npm dependencies from import statements
 */
function extractDependencies(content) {
  const deps = new Set()
  const importRegex = /import\s+(?:[\w{},\s*]+\s+from\s+)?['"]([^'"]+)['"]/g
  let match

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]
    // Only external packages (not relative imports like ./ or @/)
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      // Extract package name (handle scoped packages like @radix-ui/react-slot)
      const packageName = importPath.startsWith('@')
        ? importPath.split('/').slice(0, 2).join('/')
        : importPath.split('/')[0]
      deps.add(packageName)
    }
  }

  return Array.from(deps)
}

/**
 * Extract shadcn registry dependencies from @/components/ui imports
 */
function extractRegistryDependencies(content) {
  const deps = new Set()
  const importRegex = /import\s+.*?from\s+['"]@\/components\/ui\/([^'"]+)['"]/g
  let match

  while ((match = importRegex.exec(content)) !== null) {
    deps.add(match[1])
  }

  return Array.from(deps)
}

/**
 * Main build function
 */
async function buildRegistry() {
  console.log('🏗️  Building Asth UI registry...\n')

  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_PATH, { recursive: true })

    // Read all component files from blocks directory
    const files = await fs.readdir(REGISTRY_PATH)
    const tsxFiles = files.filter((file) => file.endsWith('.tsx'))

    if (tsxFiles.length === 0) {
      console.log('⚠️  No components found in src/registry/blocks/')
      console.log('   Create your first component to get started!\n')
      return
    }

    const registry = []

    // Process each component file
    for (const file of tsxFiles) {
      const componentName = file.replace('.tsx', '')
      const filePath = path.join(REGISTRY_PATH, file)
      const content = await fs.readFile(filePath, 'utf-8')

      // Extract dependencies
      const dependencies = extractDependencies(content)
      const registryDependencies = extractRegistryDependencies(content)

      // Save component file to public/registry
      const outputFilePath = path.join(OUTPUT_PATH, file)
      await fs.writeFile(outputFilePath, content)

      // Add to registry
      const registryItem = {
        name: componentName,
        type: 'components:block',
        description: `Animated ${componentName.replace(/-/g, ' ')} component`,
        files: [file],
        dependencies: dependencies.length > 0 ? dependencies : undefined,
        registryDependencies:
          registryDependencies.length > 0 ? registryDependencies : undefined,
      }

      // Remove undefined fields
      Object.keys(registryItem).forEach((key) => {
        if (registryItem[key] === undefined) {
          delete registryItem[key]
        }
      })

      registry.push(registryItem)

      console.log(`✅ Processed: ${componentName}`)
      if (dependencies.length > 0) {
        console.log(`   Dependencies: ${dependencies.join(', ')}`)
      }
      if (registryDependencies.length > 0) {
        console.log(`   Registry deps: ${registryDependencies.join(', ')}`)
      }
    }

    // Write registry.json
    const registryJsonPath = path.join(OUTPUT_PATH, 'registry.json')
    await fs.writeFile(registryJsonPath, JSON.stringify(registry, null, 2))

    console.log(`\n✨ Registry built successfully!`)
    console.log(`   ${registry.length} component(s) registered`)
    console.log(`   Output: public/registry/\n`)
  } catch (error) {
    console.error('❌ Error building registry:', error)
    process.exit(1)
  }
}

// Run the build
buildRegistry()
