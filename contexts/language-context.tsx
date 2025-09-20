"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Lang = "en" | "hi" | "ml"

export type LanguageContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, fallback?: string) => string
}

const DEFAULT_LANG: Lang = "en"
const STORAGE_KEY = "beejsetu-language"

const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    appName: "BeejSetu",
    tagline: "Bridge to Sustainable Farming",
    language: "Language",
    english: "English",
    hindi: "Hindi",
    malayalam: "Malayalam",
  },
  hi: {
    appName: "बीजसेतु",
    tagline: "सतत् कृषि की सेतु",
    language: "भाषा",
    english: "अंग्रेज़ी",
    hindi: "हिन्दी",
    malayalam: "मलयालम",
  },
  ml: {
    appName: "ബീജ്സേതു",
    tagline: "സുസ്ഥിര കൃഷിയിലേക്ക് പാലം",
    language: "ഭാഷ",
    english: "ഇംഗ്ലീഷ്",
    hindi: "ഹിന്ദി",
    malayalam: "മലയാളം",
  },
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) || DEFAULT_LANG
      setLangState(saved)
      if (typeof document !== "undefined") document.documentElement.lang = saved
    } catch {}
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l
  }

  const t = useMemo(() => {
    return (key: string, fallback?: string) => STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? fallback ?? key
  }, [lang])

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, t }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
