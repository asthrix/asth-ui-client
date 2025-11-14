export const registryItemTypeSchema = [
  "components:ui",
  "components:block",
  "components:example",
] as const;

export type RegistryItemType = (typeof registryItemTypeSchema)[number];

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: string[];
  source?: string;
  category?: string;
  subcategory?: string;
}

export type Registry = RegistryItem[];
