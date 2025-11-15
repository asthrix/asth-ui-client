export const registryItemTypeSchema = [
  "registry:ui",
  "registry:block",
  "registry:component",
  "registry:example",
  "registry:hook",
  "registry:lib",
  "registry:page",
  "registry:style",
] as const;

export type RegistryItemType = (typeof registryItemTypeSchema)[number];

export interface RegistryFile {
  path: string;
  content?: string;
  type: "registry:component" | "registry:page" | "registry:ui" | "registry:hook" | "registry:lib" | "registry:style";
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  source?: string;
  category?: string;
  subcategory?: string;
}

export type Registry = RegistryItem[];
