"use client"

import { useLanguage, type Lang } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const { lang, setLang, t } = useLanguage()

  const Option = ({ code, label }: { code: Lang; label: string }) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={`px-2.5 py-1 text-xs font-medium transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 ${
        lang === code ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className={inline ? "inline-flex items-center gap-2" : "flex items-center gap-2"}>
      <Globe className="w-4 h-4 text-gray-600" />
      <span className="text-sm text-gray-700 hidden md:inline">{t("language", "Language")}</span>
      <div className="flex items-center gap-1 bg-white/70 backdrop-blur rounded-full p-1 border border-gray-200 shadow-sm">
        <Option code="en" label={t("english", "English")} />
        <Option code="hi" label={t("hindi", "Hindi")} />
        <Option code="ml" label={t("malayalam", "Malayalam")} />
      </div>
    </div>
  )
}
