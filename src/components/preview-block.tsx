"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PreviewBlockProps {
  componentName: string;
  category: string;
  preview?: React.ReactNode;
}

export function PreviewBlock({
  componentName,
  category,
  preview,
}: PreviewBlockProps) {
  // Dynamically import the component
  const Component = useMemo(
    () => lazy(() => import(`@/registry/blocks/${category}/${componentName}`)),
    [category, componentName],
  );

  return (
    <Tabs
      items={["Preview", "Code"]}
      defaultIndex={0}
      persist
      groupId={`${category}-${componentName}`}
    >
      <Tab value="Preview">
        <div className=" relative w-full overflow-x-auto rounded-lg border bg-background min-h-96">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[200px] p-8">
                <div className="space-y-4 w-full max-w-3xl">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            }
          >
            {preview || <Component />}
          </Suspense>
        </div>
      </Tab>
      <Tab value="Code">
        <CodeContent category={category} componentName={componentName} />
      </Tab>
    </Tabs>
  );
}

// Component to handle code loading
function CodeContent({
  category,
  componentName,
}: {
  category: string;
  componentName: string;
}) {
  const [code, setCode] = useState<string>("// Loading source code...");

  useEffect(() => {
    async function loadCode() {
      try {
        const response = await fetch(
          `/registry/${category}-${componentName}.tsx`,
        );
        if (response.ok) {
          const sourceCode = await response.text();
          setCode(sourceCode);
        } else {
          setCode("// Error loading source code");
        }
      } catch (error) {
        console.error("Failed to load source code:", error);
        setCode("// Error loading source code");
      }
    }

    loadCode();
  }, [category, componentName]);

  return (
    <div className="not-prose">
      <Suspense
        fallback={
          <div className="rounded-lg border bg-muted p-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        }
      >
        <DynamicCodeBlock
          lang="tsx"
          code={code}
          options={{
            themes: {
              light: "github-light",
              dark: "github-dark",
            },
          }}
        />
      </Suspense>
    </div>
  );
}
