"use client"

import { useState, useEffect } from "react"
import { type Language, translations, getCurrentLanguage } from "@/lib/i18n"

export function useTranslation() {
  const [language, setLanguage] = useState<Language>("en")
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setLanguage(getCurrentLanguage())

    const handleStorageChange = () => {
      setLanguage(getCurrentLanguage())
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language] || translations.en

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }

    // Fallback to English if translation not found
    if (value === undefined) {
      value = translations.en
      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) break
      }
    }

    return value || key
  }

  const changeLanguage = (newLanguage: Language) => {
    setIsTransitioning(true)

    // Small delay to allow fade out animation
    setTimeout(() => {
      localStorage.setItem("beejsetu-language", newLanguage)
      setLanguage(newLanguage)

      // Reset transition state after content updates
      setTimeout(() => {
        setIsTransitioning(false)
      }, 150)
    }, 150)
  }

  return { t, language, changeLanguage, isTransitioning }
}
