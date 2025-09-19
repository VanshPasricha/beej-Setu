"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sprout, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
]

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [showLanguageSelection, setShowLanguageSelection] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("beejsetu-language")
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage)
      setShowLanguageSelection(false)
    }
  }, [])

  const handleLanguageSelect = (languageCode: string) => {
    setIsAnimating(true)

    setTimeout(() => {
      setSelectedLanguage(languageCode)
      localStorage.setItem("beejsetu-language", languageCode)
      setShowLanguageSelection(false)
      setIsAnimating(false)
    }, 300)
  }

  const handleChangeLanguage = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowLanguageSelection(true)
      setIsAnimating(false)
    }, 200)
  }

  if (showLanguageSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-orange-100 flex items-center justify-center p-4">
        <Card
          className={`w-full max-w-md shadow-xl border-0 transition-all duration-500 ease-out transform ${
            isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                <Sprout className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">BeejSetu</h1>
              <p className="text-gray-600">Bridge to Sustainable Farming</p>
            </div>

            <div className="mb-6">
              <Globe className="w-8 h-8 text-orange-500 mx-auto mb-3 transition-transform duration-300 hover:rotate-12" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Choose Your Language</h2>
              <p className="text-sm text-gray-600">Select your preferred language to continue</p>
            </div>

            <div className="space-y-3">
              {languages.map((lang, index) => (
                <Button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  variant="outline"
                  className={`w-full h-14 text-left justify-between hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-md transform ${
                    isAnimating ? "translate-x-4 opacity-0" : "translate-x-0 opacity-100"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div>
                    <div className="font-medium text-gray-900">{lang.nativeName}</div>
                    <div className="text-sm text-gray-500">{lang.name}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-orange-100 flex items-center justify-center p-4">
      <Card
        className={`w-full max-w-md shadow-xl border-0 transition-all duration-500 ease-out transform ${
          isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
            <Sprout className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BeejSetu</h1>
          <p className="text-gray-600 mb-8">Welcome to Sustainable Agriculture</p>

          <div className="space-y-4">
            <Link href="/auth">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-md"
              onClick={handleChangeLanguage}
            >
              Change Language
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
