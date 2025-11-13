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

    const registry = []
    let totalComponents = 0

    // Read all category directories
    const categories = await fs.readdir(REGISTRY_PATH, { withFileTypes: true })
    const categoryDirs = categories.filter((dirent) => dirent.isDirectory())

    if (categoryDirs.length === 0) {
      console.log('⚠️  No category folders found in src/registry/blocks/')
      console.log('   Create a category folder (e.g., headers/) to get started!\n')
      return
    }

    // Process each category
    for (const categoryDir of categoryDirs) {
      const category = categoryDir.name
      const categoryPath = path.join(REGISTRY_PATH, category)
      
      console.log(`📁 Processing category: ${category}`)

      // Read all component files in this category
      const files = await fs.readdir(categoryPath)
      const tsxFiles = files.filter((file) => file.endsWith('.tsx'))

      if (tsxFiles.length === 0) {
        console.log(`   ⚠️  No components found in ${category}/\n`)
        continue
      }

      // Process each component file
      for (const file of tsxFiles) {
        const componentName = file.replace('.tsx', '')
        const filePath = path.join(categoryPath, file)
        const content = await fs.readFile(filePath, 'utf-8')

        // Extract dependencies
        const dependencies = extractDependencies(content)
        const registryDependencies = extractRegistryDependencies(content)

        // Save component file to public/registry with category prefix
        const outputFileName = `${category}-${file}`
        const outputFilePath = path.join(OUTPUT_PATH, outputFileName)
        await fs.writeFile(outputFilePath, content)

        // Add to registry
        const registryItem = {
          name: componentName,
          type: 'components:block',
          category: category,
          description: `${componentName.replace(/-/g, ' ')} component`,
          files: [outputFileName],
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
        totalComponents++

        console.log(`   ✅ ${componentName}`)
        if (dependencies.length > 0) {
          console.log(`      Dependencies: ${dependencies.join(', ')}`)
        }
        if (registryDependencies.length > 0) {
          console.log(`      Registry deps: ${registryDependencies.join(', ')}`)
        }
      }

      console.log('') // Empty line between categories
    }

    // Write registry.json
    const registryJsonPath = path.join(OUTPUT_PATH, 'registry.json')
    await fs.writeFile(registryJsonPath, JSON.stringify(registry, null, 2))

    // Write categories index
    const categoriesData = categoryDirs.map((dir) => ({
      name: dir.name,
      label: dir.name.charAt(0).toUpperCase() + dir.name.slice(1),
    }))
    const categoriesJsonPath = path.join(OUTPUT_PATH, 'categories.json')
    await fs.writeFile(
      categoriesJsonPath,
      JSON.stringify(categoriesData, null, 2)
    )

    console.log(`✨ Registry built successfully!`)
    console.log(`   ${categoryDirs.length} categor${categoryDirs.length === 1 ? 'y' : 'ies'}`)
    console.log(`   ${totalComponents} component(s) registered`)
    console.log(`   Output: public/registry/\n`)
  } catch (error) {
    console.error('❌ Error building registry:', error)
    process.exit(1)
  }
}

// Run the build
buildRegistry()
