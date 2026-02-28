import "server-only"

import { cookies, headers } from "next/headers"

import { LOCALE_COOKIE } from "@/lib/i18n/constants"
import { messages, type Locale } from "@/lib/i18n/messages"

function normalizeLocale(locale: string | null | undefined): Locale | null {
  if (!locale) return null
  const short = locale.toLowerCase().split("-")[0]
  return short === "en" ? "en" : short === "es" ? "es" : null
}

function localeFromAcceptLanguage(value: string | null): Locale {
  const normalized = normalizeLocale(value)
  return normalized ?? "es"
}

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value)
  if (cookieLocale) return cookieLocale

  const headerStore = await headers()
  return localeFromAcceptLanguage(headerStore.get("accept-language"))
}

export async function getServerMessages() {
  const locale = await getServerLocale()
  return { locale, m: messages[locale] }
}
