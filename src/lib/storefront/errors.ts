export type GraphQLErrorLike = {
  message?: string
}

export type GraphQLErrorResponseLike = {
  graphQLErrors?: GraphQLErrorLike[]
}

export type ShopifyRequestErrorLike = {
  errors?: GraphQLErrorResponseLike
}

function readGraphQLErrorMessages(errors?: GraphQLErrorResponseLike): string[] {
  return (errors?.graphQLErrors ?? [])
    .map((error) => error.message?.trim())
    .filter((message): message is string => Boolean(message))
}

export function toStorefrontErrorMessage(
  requestError: ShopifyRequestErrorLike,
  fallbackMessage = "Shopify Storefront request failed.",
): string {
  const messages = readGraphQLErrorMessages(requestError.errors)

  if (messages.length === 0) {
    return fallbackMessage
  }

  return messages.join(", ")
}

export function throwIfStorefrontErrors(
  requestError: ShopifyRequestErrorLike,
  fallbackMessage?: string,
) {
  const messages = readGraphQLErrorMessages(requestError.errors)

  if (messages.length === 0) {
    return
  }

  throw new Error(fallbackMessage ? `${fallbackMessage} ${messages.join(", ")}` : messages.join(", "))
}

export function assertStorefrontData<T>(
  data: T | null | undefined,
  message = "Shopify Storefront request returned no data.",
): T {
  if (!data) {
    throw new Error(message)
  }

  return data
}
