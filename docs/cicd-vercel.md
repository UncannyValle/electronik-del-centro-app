# CI/CD with Vercel + GitHub Actions

This project uses:
- CI in GitHub Actions for PR validation (`lint`, `typecheck`, `build`)
- Vercel Preview Deployments for every pull request
- Manual promotion of a tested deployment to production

## 1) GitHub Secrets

Set these in your GitHub repository settings:
- `VERCEL_TOKEN` (required): personal/team token from Vercel
- `VERCEL_TEAM_SLUG` (optional): needed only for team-scoped projects

## 2) GitHub Branch Protection (main)

In GitHub, protect `main`:
- Require a pull request before merging
- Require status checks to pass before merging
- Select the `CI / Lint, Typecheck, Build` check
- Restrict who can push directly to `main` (optional but recommended)

## 3) Vercel Project Setup

In Vercel for this project:
- Connect the GitHub repository
- Keep **Preview Deployments** enabled for pull requests
- Go to **Settings -> Environments -> Production -> Branch Tracking**
- Disable **Auto-assign Custom Production Domains** to stage production deployments before go-live
- Optional: enable **Deployment Checks** and require the `CI` workflow before promotion

## 4) Vercel Environment Variables (Dev Store vs Prod Store)

Set Shopify variables by environment so non-`main` branches never hit production store data:
- **Preview**: dev Shopify store endpoint/tokens
- **Production**: production Shopify store endpoint/tokens
- **Development**: usually same as Preview for local development via `vercel env pull`

Variables to define in each environment:
- `SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT`
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_API_VERSION`
- `SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN`
- `SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN`
- `STORE_CONTACT_PHONE`
- `STORE_CONTACT_EMAIL`
- `STORE_CONTACT_ADDRESS_LINE_1`
- `STORE_CONTACT_CITY_STATE_ZIP`
- `STORE_CONTACT_FACEBOOK_URL`
- `STORE_CONTACT_INSTAGRAM_URL`

## 5) Day-to-day Flow

1. Open or update a PR.
2. Vercel creates a Preview Deployment for that PR.
3. Preview deployment uses your **dev** Shopify values.
4. GitHub Actions runs CI (`.github/workflows/ci.yml`).
5. Merge once CI + preview testing pass.
6. Vercel creates a staged production deployment (not live yet).
7. Run **Promote Vercel Deployment** workflow with that deployment URL.

## 6) Alternative Release Gate

Instead of the manual workflow, you can also promote directly from Vercel UI using the **Promote to Production** action on a deployment.
