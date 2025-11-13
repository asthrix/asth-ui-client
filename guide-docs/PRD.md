This is an ambitious and fantastic project. You're not just building a component library; you're building a **component delivery system**, which is what sets `shadcn/ui` and its ecosystem apart.

You've done the right research. The YouTube video shows *how to build a registry*, and the Fumadocs site shows *how to document it*. Let's combine these into a single, comprehensive PRD.

This document outlines a production-ready, modern, and "techie" component library website, complete with its own `shadcn` registry.

-----

### **1. Product Requirements Document (PRD)**

**Project Title:** Project *Asth UI* (A Next-Generation UI Block Library & Registry)

**Objective:** To create a developer-focused website (like `ui.aceternity.com` and `tailark.com`) that showcases a library of advanced, production-ready UI blocks. These blocks will be built on `shadcn/ui` and animated with **Framer Motion**. The primary delivery method will be a custom **`shadcn/ui` compatible registry**, allowing users to install components directly via the `shadcn-ui` CLI.

**Target User Personas:**

  * **The Frontend Developer:** Works in Next.js/React. Values clean code, TypeScript, and reusability. Wants to build faster without sacrificing quality.
  * **The Indie Hacker / Startup Founder:** Needs a beautiful, modern, and professional-looking site (like Aceternity's) *yesterday* and can't afford a full-time designer.
  * **The Design Engineer:** Appreciates complex, subtle animations and high-quality interaction design.

-----

### **2. Core Architecture: The "Dual-System"**

Your project has two main parts that work together:

1.  **The "Storefront" (Your Website):** This is the documentation site users will visit.

      * **Stack:** Next.js (App Router), Fumadocs, Tailwind v4, MDX.
      * **Purpose:** To showcase components, provide live previews, and offer documentation. It's your marketing site and your manual.

2.  **The "Warehouse" (Your Registry):** This is the backend API that the `shadcn-ui` CLI will talk to.

      * **Stack:** Next.js (API Routes), JSON.
      * **Purpose:** To serve the raw source code, dependencies, and metadata for your components so the CLI can automatically install them.

\-\> [Website (Storefront)] and [shadcn CLI] -\> [API (Warehouse)]]

-----

### **3. Website Structure: Necessary Pages**

To achieve a "modern, techie, look," the site structure will be clean, with a heavy emphasis on visual demonstration and motion.

**A. `/` (Homepage)**

  * **Purpose:** To be a stunning, "Aceternity-style" visual showcase. This is your main conversion page.
  * **Key Features:**
      * **Animated Hero:** A full-screen, animated hero section (e.g., using a 3D spline, animated grid, or a Framer Motion-powered component) with a clear value proposition: "Stunning UI blocks you can install in seconds."
      * **Bento Grid:** A "Bento Grid" layout (like Tailark's) showcasing 6-8 of your most impressive, animated components. This is for visual grazing and to show, not tell.
      * **How it Works (CLI):** A simple, 3-step visual guide showing the `shadcn-ui` CLI command:
        1.  `npx shadcn-ui@latest init` (Initial setup)
        2.  `npx shadcn-ui@latest add -r [your-registry-name] [component-name]` (Your magic\!)
        3.  `import { Component } from '@/components/blocks'`
      * **Footer:** A professional footer with links to Docs, Components, and your social/GitHub links.

**B. `/components` (Component Browser)**

  * **Purpose:** A "Tailark-style" filterable grid of all components.
  * **Key Features:**
      * **Search & Filtering:** A fast, client-side search bar. Filters for categories (e.g., "Hero", "Forms", "Grids", "Animated").
      * **Component Cards:** Each card should have:
          * Component Name
          * Short Description
          * **Live Preview (on hover):** A small, *animated* preview of the component (can be a short looping video/GIF, or a lightweight Framer Motion animation).

**C. `/components/[slug]` (Component Detail Page)**

  * **Purpose:** This is your core documentation page, powered by Fumadocs.
  * **Key Features:**
      * **Page Title & Description.**
      * **The `ComponentPreview` Block (Your "Dynamic Code" feature):** This is the *most important* feature. It must have:
          * **"Preview" Tab:** An interactive, resizable preview of the component.
          * **"Code" Tab:** The syntax-highlighted source code.
      * **Installation Section:** The *exact* CLI command to install this specific component: `npx shadcn-ui@latest add -r [your-name] [component-slug]`.
      * **Dependencies:** A list of other `shadcn/ui` components this block needs (e.g., "Depends on: `Button`, `Card`"). This should be auto-generated.

**D. `/docs` (Documentation Section)**

  * **`/docs/installation` (Get Started):** The main installation guide. How to set up Tailwind v4, Framer Motion, and (most importantly) **how to add your registry to their `components.json` file.**
  * **`/docs/cli`:** A detailed explanation of the CLI, what the registry is, and how it works.
  * **`/docs/theming`:** How to customize the components using CSS variables, just like `shadcn/ui`.

-----

### **4. Core Features & Architecture (The "How")**

This section details the technical implementation of your key features.

**Epic 1: The `shadcn` Component Registry**

  * **User Story:** As a developer, I want to type `npx shadcn-ui@latest add...` to install *your* components, not just the default ones.
  * **Architecture:**
    1.  **`registry` Folder:** You will maintain a `src/registry/` folder containing the *source code* for all your components (e.g., `src/registry/animated-button.tsx`).
    2.  **`registry.json`:** You will write a script (`build-registry.mjs`) that:
          * Scans your `src/registry` folder.
          * Generates a master `registry.json` file. This file lists all components, their dependencies (other `shadcn` components), and file paths.
    3.  **API Routes:** You will create Next.js API Routes (e.g., `/api/registry/...`) that:
          * Serve the `registry.json` file.
          * Serve the raw source code for *each* component (e.g., `/api/registry/animated-button.tsx` would return the text of that file).
    4.  **`components.json`:** Your documentation will instruct users to add your registry to their local `components.json` file, pointing to your API's URL.

**Epic 2: The "Dynamic Code" Preview (The YouTube Video Feature)**

  * **User Story:** As the library owner, I *never* want to copy-paste my component code into my `.mdx` files. I want my documentation to *dynamically* read the source file, so it's always in sync.
  * **Architecture:**
    1.  You will create a **React Server Component (RSC)** named `<DynamicComponentPreview />`.
    2.  This component will be used in your `.mdx` files like this:
        ```mdx
        ---
        title: Animated Button
        ---

        <DynamicComponentPreview componentName="animated-button" />
        ```
    3.  **On the server**, this component will:
          * Take the `componentName` ("animated-button").
          * Read the component's source code from your registry folder: `fs.readFileSync('src/registry/animated-button.tsx', 'utf-8')`.
          * Read the component's *dependencies* from the `registry.json`.
          * Import the component itself for the preview: `import { AnimatedButton } from '@/registry/animated-button'`.
    4.  **On the client**, it will pass this data to the `ComponentPreview` component we designed in our last message (the one with the tabs).
          * The `children` prop gets the `<AnimatedButton />`.
          * The `code` prop gets the raw code string.

**Epic 3: "Aceternity-Level" Aesthetics**

  * **User Story:** As a user, I want to *feel* the quality of the components just by visiting the website.
  * **Architecture:**
    1.  **Framer Motion:** This is non-negotiable. It must be a core dependency.
          * All your "UI Blocks" should have subtle, purposeful animations (e.g., `whileHover`, `animate="inView"`).
          * The website itself must use page transitions and scroll-based animations (`useScroll`, `useTransform`).
    2.  **Typography:** Use a clean, "techie" font like **Geist** (from Vercel) or **Inter**.
    3.  **Layout:** Generous whitespace. The Bento Grid on the homepage is critical for this modern look.
    4.  **Dark Mode:** Flawless dark mode support is mandatory.

This PRD gives you a complete, production-ready blueprint that combines a high-end documentation site with a powerful, automated component delivery system.