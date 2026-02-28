"use client"

import { useRouter } from "next/navigation"
import { createContext, type ReactNode, useContext, useState } from "react"

import { LOCALE_COOKIE } from "@/lib/i18n/constants"
import { type Locale, messages } from "@/lib/i18n/messages"

type LocaleContextValue = {
  locale: Locale
  m: (typeof messages)[Locale]
  setLocale: (nextLocale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

type CookieStoreLike = {
  set: (options: {
    name: string
    value: string
    path?: string
    expires?: number
    sameSite?: "lax" | "strict" | "none"
  }) => Promise<void>
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode
  initialLocale: Locale
}) {
  const router = useRouter()
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const persistLocaleCookie = async (nextLocale: Locale) => {
    const cookieStore = (window as Window & { cookieStore?: CookieStoreLike }).cookieStore
    if (cookieStore) {
      await cookieStore.set({
        name: LOCALE_COOKIE,
        value: nextLocale,
        path: "/",
        expires: Date.now() + 1000 * 60 * 60 * 24 * 365,
        sameSite: "lax",
      })
      return
    }

    await fetch("/api/locale", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
      credentials: "same-origin",
      cache: "no-store",
    })
  }

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale)
    void persistLocaleCookie(nextLocale).finally(() => {
      router.refresh()
    })
  }

  const value = {
    locale,
    m: messages[locale],
    setLocale,
  }

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocaleContext() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocaleContext must be used inside LocaleProvider")
  }
  return context
}
