# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Fix lint issues
pnpm lint:fix

# Generate Payload types
pnpm generate:types

# Run all tests
pnpm test

# Run integration tests only
pnpm test:int

# Run e2e tests only
pnpm test:e2e

# Install dependencies
pnpm install
```

## Project Architecture

This is a **Payload CMS v3** website template built with **Next.js 15** (App Router) and **TypeScript**. The project combines a headless CMS backend with a frontend website in a single Next.js application.

### Tech Stack
- **CMS**: Payload CMS v3 with PostgreSQL database
- **Frontend**: Next.js 15 with App Router, React 19
- **Styling**: TailwindCSS with shadcn/ui components
- **Rich Text**: Lexical editor
- **Package Manager**: pnpm

### Key Directories

- `src/app/(frontend)/` - Frontend website pages and layouts
- `src/app/(payload)/` - Payload admin panel and API routes
- `src/collections/` - Payload CMS collections (Pages, Posts, Media, Categories, Users)
- `src/blocks/` - Layout building blocks for content
- `src/components/` - Reusable React components
- `src/utilities/` - Utility functions and helpers
- `src/hooks/` - Custom React hooks and Payload hooks
- `src/fields/` - Custom Payload field configurations

### Collections Architecture

1. **Pages** - Layout builder enabled pages with drafts and live preview
2. **Posts** - Blog posts with layout builder, categories, and SEO
3. **Media** - File uploads with image resizing and focal point support
4. **Categories** - Nested taxonomy for organizing posts
5. **Users** - Authentication-enabled admin users

### Plugins Configuration

The project uses several Payload plugins configured in `src/plugins/index.ts`:
- **SEO Plugin** - Meta tags and social media optimization
- **Search Plugin** - Full-text search for posts
- **Form Builder** - Contact forms and lead generation
- **Redirects** - URL redirection management
- **Nested Docs** - Hierarchical category structure

### Database & Environment

- **Database**: PostgreSQL via `@payloadcms/db-postgres`
- **Required ENV vars**: `DATABASE_URI`, `PAYLOAD_SECRET`
- **Development**: Uses `push: true` for rapid schema changes
- **Production**: Requires migrations (`pnpm payload migrate`)

### Frontend Features

- **Layout Builder**: Drag-and-drop content blocks (Hero, Content, Media, CTA, Archive)
- **Draft Preview**: Preview unpublished content
- **Live Preview**: Real-time editing preview in admin
- **Dark Mode**: Theme switching with CSS variables
- **SEO**: Meta tags, OpenGraph, structured data
- **Search**: Server-side search functionality

### Testing Setup

- **Integration Tests**: Vitest for API and backend testing
- **E2E Tests**: Playwright for frontend testing
- **Test Environment**: Configured with `test.env` file

### Build Process

The build process includes:
1. Next.js build with TypeScript compilation
2. Payload type generation
3. Sitemap generation via `next-sitemap`
4. Image optimization with Sharp

### Path Aliases

- `@/*` - Maps to `src/*`
- `@payload-config` - Maps to `src/payload.config.ts`

When working with this codebase, always check existing patterns in similar components/collections before implementing new features. The project follows Payload CMS conventions and Next.js App Router patterns.