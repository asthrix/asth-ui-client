import fs from "node:fs";
import path from "node:path";
import { ComponentPreview } from "./component-preview";

interface DynamicPreviewProps {
  componentName: string;
}

export async function DynamicPreview({ componentName }: DynamicPreviewProps) {
  try {
    // Read component source
    const componentPath = path.join(
      process.cwd(),
      "src/registry/blocks",
      `${componentName}.tsx`,
    );

    if (!fs.existsSync(componentPath)) {
      return (
        <div className="my-8 rounded-lg border border-destructive p-8 text-center">
          <p className="text-destructive">
            Component not found: {componentName}
          </p>
        </div>
      );
    }

    const code = fs.readFileSync(componentPath, "utf-8");

    // Read registry for dependencies
    const registryPath = path.join(
      process.cwd(),
      "public/registry/registry.json",
    );

    let dependencies: string[] = [];
    if (fs.existsSync(registryPath)) {
      const registry = JSON.parse(
        fs.readFileSync(registryPath, "utf-8"),
      ) as Array<{
        name: string;
        registryDependencies?: string[];
      }>;
      const item = registry.find((r) => r.name === componentName);
      dependencies = item?.registryDependencies || [];
    }

    // Dynamically import the component
    const Component = (await import(`@/registry/blocks/${componentName}`))
      .default;

    return (
      <ComponentPreview
        name={componentName}
        code={code}
        dependencies={dependencies}
      >
        <Component>Click me!</Component>
      </ComponentPreview>
    );
  } catch (error) {
    console.error("Error loading preview:", error);
    return (
      <div className="my-8 rounded-lg border border-destructive p-8 text-center">
        <p className="text-destructive">
          Error loading preview: {String(error)}
        </p>
      </div>
    );
  }
}
