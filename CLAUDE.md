# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Payload CMS 3.0 template deployed to Cloudflare Workers with D1 (SQLite) database and R2 storage. Uses Next.js 15 with React 19.

## Common Commands

```bash
# Development
pnpm dev                    # Start development server (auto-binds Cloudflare services)
pnpm devsafe               # Clean start (removes .next and .open-next first)

# Build & Deploy
pnpm build                 # Build Next.js app
pnpm deploy                # Run migrations + build + deploy to Cloudflare
pnpm preview               # Build and preview locally with Cloudflare bindings

# Type Generation (run after schema changes)
pnpm generate:types        # Generate both Cloudflare and Payload types
pnpm generate:importmap    # Regenerate component import map after adding components

# Validate TypeScript
pnpm exec tsc --noEmit     # Check for type errors without emitting files

# Database
pnpm payload migrate:create    # Create new migration after schema changes

# Testing
pnpm test                  # Run all tests (integration + e2e)
pnpm test:int              # Run integration tests only (vitest)
pnpm test:e2e              # Run e2e tests only (playwright)

# Run single test
pnpm exec vitest run tests/int/api.int.spec.ts       # Single integration test
pnpm exec playwright test tests/e2e/frontend.e2e.spec.ts  # Single e2e test

# Cloudflare CLI
pnpm wrangler login        # Authenticate with Cloudflare
```

## Architecture

### Cloudflare Stack
- **Database**: D1 SQLite via `@payloadcms/db-d1-sqlite`
- **Storage**: R2 bucket via `@payloadcms/storage-r2`
- **Runtime**: Cloudflare Workers via `@opennextjs/cloudflare`
- **Config**: `wrangler.jsonc` defines D1 and R2 bindings

### Project Structure
```
src/
├── app/
│   ├── (frontend)/          # Frontend routes
│   └── (payload)/           # Payload admin routes & API
├── collections/             # Collection configs (Users, Media)
├── payload.config.ts        # Main Payload config
└── payload-types.ts         # Auto-generated types
tests/
├── int/                     # Integration tests (vitest, jsdom)
└── e2e/                     # E2E tests (playwright)
```

### Cloudflare Context Loading
The Payload config dynamically loads Cloudflare context based on environment:
- CLI commands (`generate`, `migrate`) and dev mode: Uses `wrangler` getPlatformProxy
- Production: Uses `@opennextjs/cloudflare` getCloudflareContext

## Payload CMS Critical Patterns

### Local API Access Control
```typescript
// ❌ SECURITY BUG: Access control bypassed even with user passed
await payload.find({ collection: 'posts', user: someUser })

// ✅ SECURE: Enforces user permissions
await payload.find({ collection: 'posts', user: someUser, overrideAccess: false })
```

### Transaction Safety in Hooks
```typescript
// ❌ Breaks atomicity
await req.payload.create({ collection: 'audit-log', data: { docId: doc.id } })

// ✅ Same transaction
await req.payload.create({ collection: 'audit-log', data: { docId: doc.id }, req })
```

### Preventing Hook Loops
```typescript
// Use context flags to prevent infinite loops
if (context.skipHooks) return
await req.payload.update({ ..., context: { skipHooks: true }, req })
```

## Key Constraints

- **No sharp on Workers**: Image crop/focalPoint disabled in Media collection
- **GraphQL**: Limited support pending Cloudflare workerd fixes
- **Bundle size**: Requires paid Workers plan (>3MB limit)
- **Point fields**: Not supported in SQLite

## Additional Context

Extensive Payload CMS patterns and rules are documented in `.cursor/rules/`:
- `access-control.md`, `access-control-advanced.md` - Permission patterns
- `collections.md`, `fields.md` - Schema configuration
- `hooks.md` - Lifecycle hooks
- `components.md` - Custom React components
- `security-critical.mdc` - Critical security patterns
