"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Target,
  TrendingUp,
  Users,
  Droplets,
  Leaf,
  Zap,
  Recycle,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Eye,
  Play,
  Bell,
  Award,
  Calendar,
  MapPin,
} from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TranslationWrapper } from "@/components/translation-wrapper"

// Mock data - in real app this would come from API
const mockUserData = {
  name: "Rajesh Kumar",
  farmName: "Green Valley Farm",
  location: "Pune, Maharashtra",
  level: "Eco Apprentice",
  currentPoints: 750,
  pointsToNextLevel: 1000,
  ranking: 23,
  totalUsers: 1247,
  activeChallenges: 3,
  completedChallenges: 12,
  achievements: [
    { id: "water-warrior", name: "Water Warrior", icon: Droplets, earned: true },
    { id: "soil-steward", name: "Soil Steward", icon: Leaf, earned: true },
    { id: "challenge-champion", name: "Challenge Champion", icon: Trophy, earned: false },
    { id: "eco-expert", name: "Eco Expert", icon: Award, earned: false },
  ],
  impactMetrics: {
    waterSaved: 2450, // gallons
    co2Reduced: 180, // lbs
    soilImproved: 3.2, // acres
    pollinatorsSupported: 8, // species
  },
  recentActivities: [
    { id: 1, type: "challenge", title: "Completed Water Conservation Challenge", points: 150, date: "2 days ago" },
    { id: 2, type: "achievement", title: "Earned Water Warrior Badge", points: 100, date: "1 week ago" },
    { id: 3, type: "level", title: "Advanced to Eco Apprentice", points: 0, date: "2 weeks ago" },
  ],
}

const mockWeatherData = {
  location: "Pune, Maharashtra",
  temperature: 28,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  uvIndex: 6,
  forecast: [
    { day: "Today", high: 32, low: 22, condition: "sunny" },
    { day: "Tomorrow", high: 30, low: 20, condition: "cloudy" },
    { day: "Wed", high: 28, low: 18, condition: "rainy" },
  ],
}

const activeChallenges = [
  {
    id: 1,
    title: "Soil Health Improvement",
    description: "Add organic compost to 2 acres of farmland",
    progress: 60,
    points: 200,
    daysLeft: 5,
    category: "soil",
  },
  {
    id: 2,
    title: "Water Conservation",
    description: "Install drip irrigation system",
    progress: 30,
    points: 300,
    daysLeft: 12,
    category: "water",
  },
  {
    id: 3,
    title: "Energy Efficiency",
    description: "Use solar-powered irrigation for 1 week",
    progress: 85,
    points: 150,
    daysLeft: 2,
    category: "energy",
  },
]

const governmentSchemes = [
  {
    id: 1,
    title: "PM-KISAN Scheme",
    description: "Direct income support to farmers",
    deadline: "March 31, 2025",
    status: "eligible",
    amount: "₹6,000/year",
  },
  {
    id: 2,
    title: "Soil Health Card Scheme",
    description: "Free soil testing and recommendations",
    deadline: "April 15, 2025",
    status: "new",
    amount: "Free",
  },
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [selectedMetric, setSelectedMetric] = useState("water")

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="w-6 h-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="w-6 h-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="w-6 h-6 text-blue-500" />
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "water":
        return <Droplets className="w-4 h-4 text-blue-600" />
      case "soil":
        return <Leaf className="w-4 h-4 text-green-600" />
      case "energy":
        return <Zap className="w-4 h-4 text-yellow-600" />
      case "waste":
        return <Recycle className="w-4 h-4 text-purple-600" />
      default:
        return <Target className="w-4 h-4 text-gray-600" />
    }
  }

  // Navigation handlers for the three buttons
  const handleStartChallenge = () => {
    router.push("/challenges")
  }

  const handlePlayGames = () => {
    router.push("/mini-games")
  }

  const handleCheckSchemes = () => {
    router.push("/gov-schemes")
  }

  return (
    <DashboardLayout>
      <TranslationWrapper>
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">Welcome back, {mockUserData.name}!</h1>
                <p className="text-orange-100 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {mockUserData.farmName} • {mockUserData.location}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{mockUserData.currentPoints}</div>
                <div className="text-sm text-orange-100">Total Points</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t("currentLevel")}</p>
                    <p className="text-xl font-bold text-gray-900">{mockUserData.level}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <Progress
                    value={(mockUserData.currentPoints / mockUserData.pointsToNextLevel) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {mockUserData.pointsToNextLevel - mockUserData.currentPoints} points to next level
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t("ranking")}</p>
                    <p className="text-xl font-bold text-gray-900">#{mockUserData.ranking}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Out of {mockUserData.totalUsers.toLocaleString()} farmers</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t("activeChallenges")}</p>
                    <p className="text-xl font-bold text-gray-900">{mockUserData.activeChallenges}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">{mockUserData.completedChallenges} completed this month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Impact Score</p>
                    <p className="text-xl font-bold text-gray-900">8.7/10</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-3 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +0.3 this week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Challenges */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Challenges</span>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 border border-gray-100 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(challenge.category)}
                          <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {challenge.daysLeft} days left
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <Progress value={challenge.progress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{challenge.progress}% complete</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-orange-600">+{challenge.points} pts</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Weather Widget */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <span>Weather</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center mb-2">
                      {getWeatherIcon(mockWeatherData.condition)}
                      <span className="text-3xl font-bold ml-2">{mockWeatherData.temperature}°C</span>
                    </div>
                    <p className="text-sm text-gray-600">{mockWeatherData.condition}</p>
                    <p className="text-xs text-gray-500">{mockWeatherData.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span>{mockWeatherData.humidity}% Humidity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="w-4 h-4 text-gray-500" />
                      <span>{mockWeatherData.windSpeed} km/h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <span>UV {mockWeatherData.uvIndex}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-purple-500" />
                      <span>Good visibility</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold mb-2">3-Day Forecast</h4>
                    <div className="space-y-2">
                      {mockWeatherData.forecast.map((day, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{day.day}</span>
                          <div className="flex items-center space-x-2">
                            {getWeatherIcon(day.condition)}
                            <span>
                              {day.high}°/{day.low}°
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Government Schemes */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-green-500" />
                      <span>Schemes & Updates</span>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      2 New
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {governmentSchemes.map((scheme) => (
                    <div key={scheme.id} className="p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-sm text-gray-900">{scheme.title}</h4>
                        <Badge variant={scheme.status === "new" ? "destructive" : "secondary"} className="text-xs">
                          {scheme.status === "new" ? "New" : "Eligible"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{scheme.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {scheme.deadline}
                        </span>
                        <span className="font-semibold text-green-600">{scheme.amount}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View All Schemes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Impact Metrics */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Your Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Droplets className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {mockUserData.impactMetrics.waterSaved.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Gallons Water Saved</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{mockUserData.impactMetrics.co2Reduced}</div>
                  <div className="text-sm text-gray-600">lbs CO₂ Reduced</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{mockUserData.impactMetrics.soilImproved}</div>
                  <div className="text-sm text-gray-600">Acres Soil Improved</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {mockUserData.impactMetrics.pollinatorsSupported}
                  </div>
                  <div className="text-sm text-gray-600">Pollinator Species</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleStartChallenge}
              className="h-16 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <Play className="w-5 h-5" />
              <span>Start New Challenge</span>
            </Button>
            <Button
              onClick={handlePlayGames}
              variant="outline"
              className="h-16 border-green-300 text-green-700 hover:bg-green-50 flex items-center justify-center space-x-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <Target className="w-5 h-5" />
              <span>Play Mini Games</span>
            </Button>
            <Button
              onClick={handleCheckSchemes}
              variant="outline"
              className="h-16 border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center justify-center space-x-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <Bell className="w-5 h-5" />
              <span>Check Schemes</span>
            </Button>
          </div>
        </div>
      </TranslationWrapper>
    </DashboardLayout>
  )
}
