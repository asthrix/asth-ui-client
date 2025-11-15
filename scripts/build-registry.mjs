import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "../src/registry");
const OUTPUT_PATH = path.join(__dirname, "../public/r");

/**
 * Registry type configuration
 * Maps directory names to registry types and their installation targets
 */
const REGISTRY_TYPES = {
  ui: {
    type: "registry:ui",
    targetPrefix: "components/ui",
    description: "UI component",
  },
  blocks: {
    type: "registry:block",
    targetPrefix: "components/blocks",
    description: "Block component",
  },
  components: {
    type: "registry:component",
    targetPrefix: "components",
    description: "Component",
  },
  hooks: {
    type: "registry:hook",
    targetPrefix: "hooks",
    description: "Hook",
  },
  lib: {
    type: "registry:lib",
    targetPrefix: "lib",
    description: "Library",
  },
};

/**
 * Extract npm dependencies from import statements
 */
function extractDependencies(content) {
  const deps = new Set();
  const importRegex = /import\s+(?:[\w{},\s*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const matches = content.matchAll(importRegex);

  for (const match of matches) {
    const importPath = match[1];
    // Only external packages (not relative imports like ./ or @/)
    if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
      // Extract package name (handle scoped packages like @radix-ui/react-slot)
      let packageName = importPath.startsWith("@")
        ? importPath.split("/").slice(0, 2).join("/")
        : importPath.split("/")[0];
      
      // Normalize motion/react or motion/* to just "motion"
      if (packageName === "motion" || importPath.startsWith("motion/")) {
        packageName = "motion";
      }
      
      deps.add(packageName);
    }
  }

  return Array.from(deps);
}

/**
 * Extract shadcn registry dependencies from @/components/ui imports
 */
function extractRegistryDependencies(content) {
  const deps = new Set();
  const importRegex = /import\s+.*?from\s+['"]@\/components\/ui\/([^'"]+)['"]/g;
  const matches = content.matchAll(importRegex);

  for (const match of matches) {
    deps.add(match[1]);
  }

  return Array.from(deps);
}

/**
 * Main build function
 */
async function buildRegistry() {
  console.log("🏗️  Building Asth UI registry...\n");

  try {
    // Clean output directory first to remove old/deleted components
    console.log("🧹 Cleaning output directory...");
    try {
      await fs.rm(OUTPUT_PATH, { recursive: true, force: true });
    } catch (error) {
      // Directory might not exist, that's okay
    }
    
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_PATH, { recursive: true });
    console.log("✨ Output directory cleaned\n");

    const registry = [];
    let totalComponents = 0;

    // Read all registry type directories (ui, blocks, components, hooks, lib)
    const registryTypes = await fs.readdir(REGISTRY_PATH, {
      withFileTypes: true,
    });
    const typeDirs = registryTypes.filter(
      (dirent) =>
        dirent.isDirectory() && REGISTRY_TYPES.hasOwnProperty(dirent.name),
    );

    if (typeDirs.length === 0) {
      console.log("⚠️  No registry folders found in src/registry/");
      console.log(
        "   Create folders like: ui/, blocks/, components/, hooks/, lib/\n",
      );
      return;
    }

    // Process each registry type (ui, blocks, components, etc.)
    for (const typeDir of typeDirs) {
      const registryType = typeDir.name; // e.g., "blocks"
      const registryConfig = REGISTRY_TYPES[registryType];
      const typePath = path.join(REGISTRY_PATH, registryType);

      console.log(`\n� Processing registry type: ${registryType}`);

      // Process files and subdirectories recursively
      await processDirectory(
        typePath,
        registryType,
        registryConfig,
        registry,
        "",
      );
    }

    totalComponents = registry.length;

    // Write registry.json with proper schema following shadcn format
    const registryJson = {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "asth-ui",
      homepage: "https://github.com/asthrix/asth-ui-client",
      items: registry,
    };
    const registryJsonPath = path.join(OUTPUT_PATH, "registry.json");
    await fs.writeFile(
      registryJsonPath,
      JSON.stringify(registryJson, null, 2),
    );

    // Write categories index (from all subdirectories)
    const categories = new Set();
    registry.forEach((item) => {
      const pathParts = item.files[0].path.split("/");
      if (pathParts.length > 2) {
        categories.add(pathParts[1]); // e.g., "headers" from "blocks/headers/header-01.tsx"
      }
    });

    const categoriesData = Array.from(categories).map((cat) => ({
      name: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
    const categoriesJsonPath = path.join(OUTPUT_PATH, "categories.json");
    await fs.writeFile(
      categoriesJsonPath,
      JSON.stringify(categoriesData, null, 2),
    );

    console.log(`\n✨ Registry built successfully!`);
    console.log(`   ${typeDirs.length} registry type(s)`);
    console.log(`   ${totalComponents} component(s) registered`);
    console.log(`   Output: public/r/\n`);
  } catch (error) {
    console.error("❌ Error building registry:", error);
    process.exit(1);
  }
}

/**
 * Process a directory recursively to find all component files
 */
async function processDirectory(
  dirPath,
  registryType,
  registryConfig,
  registry,
  subPath,
) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const currentSubPath = subPath ? `${subPath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      console.log(`  📁 ${currentSubPath}/`);
      await processDirectory(
        fullPath,
        registryType,
        registryConfig,
        registry,
        currentSubPath,
      );
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      // Skip type definition files and test files
      if (entry.name.endsWith(".d.ts") || entry.name.includes(".test.") || entry.name.includes(".spec.")) {
        continue;
      }

      // Process component/hook file
      const fileExtension = entry.name.endsWith(".tsx") ? ".tsx" : ".ts";
      const componentName = entry.name.replace(fileExtension, "");
      const content = await fs.readFile(fullPath, "utf-8");

      // Extract dependencies
      const dependencies = extractDependencies(content);
      const registryDependencies = extractRegistryDependencies(content);

      // Determine the category (subdirectory name if exists)
      const pathParts = currentSubPath.split("/");
      const category = pathParts.length > 1 ? pathParts[0] : "";

      // Build the component path and target
      const componentPath = `${registryType}/${currentSubPath}`;
      const componentTarget = category
        ? `${registryConfig.targetPrefix}/${category}/${componentName}${fileExtension}`
        : `${registryConfig.targetPrefix}/${componentName}${fileExtension}`;

      // Create registry item with dynamic type
      const registryItem = {
        name: componentName,
        type: registryConfig.type,
        description: `${componentName.replace(/-/g, " ")} ${registryConfig.description.toLowerCase()}`,
        files: [
          {
            path: componentPath,
            type: "registry:component",
            target: componentTarget,
          },
        ],
        dependencies: dependencies.length > 0 ? dependencies : undefined,
        registryDependencies:
          registryDependencies.length > 0 ? registryDependencies : undefined,
      };

      // Remove undefined fields
      Object.keys(registryItem).forEach((key) => {
        if (registryItem[key] === undefined) {
          delete registryItem[key];
        }
      });

      // Write individual component JSON file (with full content)
      const componentJsonPath = path.join(
        OUTPUT_PATH,
        `${componentName}.json`,
      );
      const individualItem = {
        ...registryItem,
        files: [
          {
            path: componentPath,
            content: content,
            type: "registry:component",
            target: componentTarget,
          },
        ],
      };
      await fs.writeFile(
        componentJsonPath,
        JSON.stringify(individualItem, null, 2),
      );

      registry.push(registryItem);

      console.log(`     ✅ ${componentName}`);
      if (dependencies.length > 0) {
        console.log(`        Dependencies: ${dependencies.join(", ")}`);
      }
      if (registryDependencies.length > 0) {
        console.log(
          `        Registry deps: ${registryDependencies.join(", ")}`,
        );
      }
    }
  }
}

// Run the build
buildRegistry();
