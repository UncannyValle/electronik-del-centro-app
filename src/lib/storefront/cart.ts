import "server-only"

// Reserved for cart operations. Keep reads in server components and expose
// mutations through app/api/storefront/* when client interactivity expands.
export const storefrontCart = {
  // Placeholder to keep domain boundaries explicit as cart APIs are introduced.
}
