'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from './code-block'
import { Badge } from '@/components/ui/badge'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  name: string
  dependencies?: string[]
}

export function ComponentPreview({
  children,
  code,
  name,
  dependencies = [],
}: ComponentPreviewProps) {
  return (
    <div className="my-8 rounded-lg border">
      <Tabs defaultValue="preview">
        <div className="border-b px-4">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="p-8">
          <div className="flex min-h-[400px] items-center justify-center">
            {children}
          </div>
        </TabsContent>

        <TabsContent value="code" className="p-0">
          <div className="p-4">
            {dependencies.length > 0 && (
              <div className="mb-4 rounded-lg border bg-muted/50 p-4">
                <p className="mb-2 text-sm font-medium">Dependencies:</p>
                <div className="flex flex-wrap gap-2">
                  {dependencies.map((dep) => (
                    <Badge key={dep} variant="secondary">
                      {dep}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <CodeBlock code={code} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
