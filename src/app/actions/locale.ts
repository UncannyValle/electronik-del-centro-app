"use server"

import { cookies } from "next/headers"

import { LOCALE_COOKIE } from "@/lib/i18n/constants"
import { type Locale, SUPPORTED_LOCALES } from "@/lib/i18n/messages"

export async function setLocaleCookieAction(nextLocale: Locale) {
  if (!SUPPORTED_LOCALES.includes(nextLocale)) {
    return
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: LOCALE_COOKIE,
    value: nextLocale,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
}
