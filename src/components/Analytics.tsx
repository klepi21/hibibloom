"use client"

import { useEffect, useState } from "react"
import { useContent, useLang } from "@/content/LangProvider"
import { content, href } from "@/content"

// Same measurement ID in every language.
const GA_ID = content.el.analytics.gaId

/**
 * Google Analytics 4, loaded only after the visitor says yes (GDPR / ePrivacy).
 * Until then no Google script runs and no cookie is set. The choice is kept in
 * localStorage; "Ρυθμίσεις cookies" in the footer reopens the banner.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const KEY = "hb:consent"
const REOPEN = "hb:consent-reopen"

type Choice = "granted" | "denied"

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === "granted" || v === "denied" ? v : null
  } catch {
    return null
  }
}

function loadGa(id: string) {
  if (window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", id, { anonymize_ip: true })

  const s = document.createElement("script")
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(s)
}

function clearGaCookies() {
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim()
    if (!name.startsWith("_ga")) continue
    for (const domain of ["", location.hostname, `.${location.hostname.replace(/^www\./, "")}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`
    }
  }
}

export function Analytics() {
  const { analytics } = useContent()
  const lang = useLang()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!GA_ID) return
    const choice = readChoice()
    if (choice === "granted") loadGa(GA_ID)

    // Shown a beat after load so it never competes with the intro's first frame.
    const t = choice === null ? window.setTimeout(() => setOpen(true), 1200) : undefined

    const reopen = () => setOpen(true)
    window.addEventListener(REOPEN, reopen)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener(REOPEN, reopen)
    }
  }, [])

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(KEY, choice)
    } catch {}
    setOpen(false)
    if (choice === "granted") loadGa(GA_ID)
    else if (window.gtag) {
      // Withdrawn after GA already ran: drop its cookies and reload clean.
      clearGaCookies()
      location.reload()
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label={analytics.title}
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-[560px] rounded-3xl border border-forest/10 bg-cream p-5 text-forest shadow-[0_18px_50px_-12px_rgba(16,26,13,0.35)] sm:p-6"
    >
      <p className="text-[0.92rem] leading-[1.7] text-forest/80">
        {analytics.text}{" "}
        <a href={href("privacy", lang)} className="underline underline-offset-4 hover:text-magenta-600">
          {analytics.more}
        </a>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="rounded-full bg-forest px-5 py-2.5 text-[0.88rem] text-cream transition-colors hover:bg-magenta-600"
        >
          {analytics.accept}
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="rounded-full bg-forest px-5 py-2.5 text-[0.88rem] text-cream transition-colors hover:bg-magenta-600"
        >
          {analytics.decline}
        </button>
      </div>
    </div>
  )
}

export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  if (!GA_ID) return null
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(REOPEN))} className={className}>
      {label}
    </button>
  )
}
