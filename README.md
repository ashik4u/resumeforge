# ResumeForge

ResumeForge is a modern, YAML-first resume builder built with Next.js, TypeScript, Tailwind CSS, Monaco Editor, Zustand, Zod, and Playwright.

## Features

- YAML editor with live parsing and validation
- Visual form editor for structured resume editing
- Design options inspired by RenderCV, including page size, margins, colors, typography, footer, and top note settings
- Live preview with multiple templates: ATS, Modern, Minimal, Executive, and Harvard
- PDF export through Playwright
- Dark mode and responsive workspace layout

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

For PDF export, install Playwright browsers if they are not already present:

```bash
npx playwright install chromium
```

## Project Status

ResumeForge is under active development. Current work includes the editor, template renderer, design settings, and PDF export. AI features are intentionally deferred until the editor is complete.
