import { NextResponse } from "next/server"

import { LOCALE_COOKIE } from "@/lib/i18n/constants"
import type { Locale } from "@/lib/i18n/messages"

const SUPPORTED_LOCALES: Locale[] = ["en", "es"]

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { locale?: string } | null
  const locale = body?.locale

  if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: LOCALE_COOKIE,
    value: locale,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })

  return response
}
