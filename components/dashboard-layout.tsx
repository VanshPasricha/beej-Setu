"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Target,
  Trophy,
  Bell,
  Gamepad2,
  User,
  MessageCircle,
  Menu,
  X,
  Sprout,
  LogOut,
  Settings,
} from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"
import { Chatbot } from "@/components/chatbot"
import { TranslationWrapper } from "@/components/translation-wrapper"
import { LanguageSwitcher } from "@/components/language-switcher"

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard", active: true },
  { id: "challenges", label: "Challenges", icon: Target, href: "/challenges", badge: "3" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/achievements" },
  { id: "schemes", label: "Gov Schemes", icon: Bell, href: "/schemes", badge: "2" },
  { id: "games", label: "Mini Games", icon: Gamepad2, href: "/games" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)

  // Smooth reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.add("visible"))
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-orange-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <TranslationWrapper>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{t("appName")}</h1>
                  <p className="text-xs text-gray-500">{t("tagline")}</p>
                </div>
              </div>
            </TranslationWrapper>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1.5">
            <TranslationWrapper>
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link key={item.id} href={item.href}>
                    <div
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                        item.active
                          ? "bg-orange-100 text-orange-700 border border-orange-200"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="destructive" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                )
              })}
            </TranslationWrapper>
          </nav>

          {/* Language Switcher (Sidebar) */}
          <div className="px-6 pb-4">
            <LanguageSwitcher />
          </div>

          {/* Chatbot Button */}
          <div className="p-4 border-t border-gray-200">
            <Button
              onClick={() => setChatbotOpen(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>AI Assistant</span>
            </Button>
          </div>

          {/* User Menu */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Rajesh Kumar</p>
                <p className="text-xs text-gray-500">Eco Apprentice</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="flex-1">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Desktop topbar */}
        <div className="hidden lg:block bg-white/70 backdrop-blur border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <TranslationWrapper>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900">{t("appName")}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">{t("tagline")}</span>
              </div>
            </TranslationWrapper>
            <LanguageSwitcher inline />
          </div>
        </div>
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <TranslationWrapper>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900">{t("appName")}</span>
              </div>
            </TranslationWrapper>
            <div className="flex items-center">
              <LanguageSwitcher inline />
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 max-w-7xl mx-auto reveal animate-fade-in-up">{children}</main>
      </div>

      <Chatbot />
    </div>
  )
}
