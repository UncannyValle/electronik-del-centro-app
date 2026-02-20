# AGENTS.md

## Project Rules
- Stack: Next.js App Router + TypeScript + Tailwind + shadcn/ui patterns.
- Prefer React Server Components for data fetching and composition.
- Keep UI components lightweight and presentational.
- Prefer direct React type/function imports (e.g. `forwardRef`, `type ComponentRef`) over `React.*` namespaced type usage.
- Move non-trivial behavior/state transitions into hooks, reducers, or context modules.
- Avoid `useState` sprawl. Use `useReducer` when state has multiple transitions.
- Use React Context API for cross-route/shared state (cart, user session, preferences).

## Next.js Best Practices
- Default to Server Components; add `"use client"` only where browser APIs or interactivity are required.
- Use async server components for data loading.
- Use route-level `loading.tsx` and `error.tsx` where useful.
- Use `Suspense` boundaries for progressive rendering.
- Keep fetch/cache behavior explicit (`force-cache`, `no-store`, `revalidate`) based on business need.
- Use typed data-access boundaries in `src/lib/` so providers (mock/shopify) can be swapped cleanly.

## Data Layer Pattern
- `src/lib/storefront.ts` is the single boundary for product/cart/checkout data calls.
- Today: mock implementation for local development.
- Later: replace internals with Shopify Storefront API client calls without changing page/component APIs.
- Maintain strict types in `src/lib/types.ts` for portability and predictable UI contracts.

## UI and Styling
- Use shadcn component patterns under `src/components/ui/`.
- Keep theme tokens and palette in `src/app/globals.css` using CSS variables.
- Ensure responsive layout with mobile-first Tailwind classes.
- Navbar: desktop links visible, tablet/mobile links in hamburger menu.

## MCP / Context7 Usage
- Use `next-devtools` MCP for Next.js runtime diagnostics, routing issues, server/client boundary debugging, and App Router behavior validation before making speculative fixes.
- Use `shopify-dev-mcp` for Shopify integration tasks (Storefront API schema/query checks, cart/checkout flows, product/variant data mapping, and auth/config validation).
- MCP priority by domain:
  - Next.js app behavior/performance/debugging: `next-devtools` first.
  - Shopify commerce/data/checkout integration: `shopify-dev-mcp` first.
  - Framework/library documentation or API reference clarification: Context7.
- For framework/library guidance, use Context7 first:
  - Resolve library ID via `mcp__context7__resolve-library-id`.
  - Query focused docs via `mcp__context7__query-docs`.
- For Next.js behavior changes or migration questions, consult Next MCP tooling/docs first when available in-session, then verify with Context7.
- Prefer primary sources (official Next.js/shadcn docs) over secondary articles.
- Keep MCP queries narrow and task-specific to limit noisy context.

## MCP Checklist
- `next-devtools` checklist:
  - Reproduce the issue in the running app first.
  - Inspect route/module boundaries (server vs client) and hydration/runtime errors.
  - Validate App Router behavior (loading, error boundaries, dynamic params, caching).
  - Apply the smallest fix possible, then re-check the same runtime signal.
- `shopify-dev-mcp` checklist:
  - Confirm store config/auth/env setup first.
  - Validate Storefront API query shape against expected product/cart/checkout types.
  - Test cart line mutations and checkout handoff flow with realistic payloads.
  - Keep Shopify-specific logic inside `src/lib/storefront.ts` adapter boundaries.
- Context7 checklist:
  - Resolve the exact library/version first.
  - Query only the specific feature/API needed for the current task.
  - Prefer official docs snippets over blog-style references.
  - Capture the decision in code comments or PR notes when behavior is non-obvious.

## Quality Checks
- Before finalizing changes, run:
  - `pnpm run typecheck`
  - `pnpm run lint`
  - `pnpm run build` (for release-level confidence)
- Do not revert unrelated user changes.
- Keep patches minimal and cohesive.
