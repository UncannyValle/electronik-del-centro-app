# Electronik Del Centro

Starter ecommerce storefront built with Next.js App Router, Tailwind, and shadcn-style components.

## Run locally

```bash
pnpm install
pnpm run dev
```

## Structure

- `src/app/`: routes and layouts (server-first)
- `src/components/`: UI and layout components
- `src/context/cart-context.tsx`: cart state via React Context + useReducer
- `src/lib/storefront.ts`: mock storefront boundary designed for Shopify replacement
- `src/lib/mock-data.ts`: temporary dummy data
