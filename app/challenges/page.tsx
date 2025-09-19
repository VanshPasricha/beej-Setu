"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Droplets,
  Leaf,
  Zap,
  Recycle,
  Target,
  Clock,
  Trophy,
  Star,
  CheckCircle,
  Play,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const challengeCategories = [
  { id: "water", name: "Water Conservation", icon: Droplets, color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: "soil", name: "Soil Health", icon: Leaf, color: "text-green-600", bgColor: "bg-green-100" },
  { id: "biodiversity", name: "Biodiversity", icon: Target, color: "text-purple-600", bgColor: "bg-purple-100" },
  { id: "energy", name: "Energy Efficiency", icon: Zap, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { id: "waste", name: "Waste Reduction", icon: Recycle, color: "text-orange-600", bgColor: "bg-orange-100" },
  { id: "crop", name: "Crop Management", icon: Star, color: "text-pink-600", bgColor: "bg-pink-100" },
]

const availableChallenges = [
  {
    id: 1,
    title: "Drip Irrigation Setup",
    description: "Install drip irrigation system to reduce water usage by 30%",
    category: "water",
    difficulty: "Medium",
    duration: "14 days",
    points: 300,
    participants: 156,
    requirements: ["2+ acres farmland", "Basic irrigation knowledge"],
    rewards: ["Water Warrior Badge", "300 points", "Irrigation guide PDF"],
    status: "available",
  },
  {
    id: 2,
    title: "Organic Compost Creation",
    description: "Create and apply organic compost to improve soil health",
    category: "soil",
    difficulty: "Easy",
    duration: "21 days",
    points: 200,
    participants: 234,
    requirements: ["Organic waste materials", "Composting space"],
    rewards: ["Soil Steward Badge", "200 points", "Composting toolkit"],
    status: "available",
  },
  {
    id: 3,
    title: "Pollinator Garden",
    description: "Plant native flowers to support local pollinator species",
    category: "biodiversity",
    difficulty: "Easy",
    duration: "30 days",
    points: 250,
    participants: 89,
    requirements: ["0.5+ acres available", "Native flower seeds"],
    rewards: ["Biodiversity Defender Badge", "250 points", "Seed starter kit"],
    status: "available",
  },
  {
    id: 4,
    title: "Solar Water Pumping",
    description: "Use solar-powered pumps for irrigation for one month",
    category: "energy",
    difficulty: "Hard",
    duration: "30 days",
    points: 400,
    participants: 67,
    requirements: ["Solar pump access", "Sunny location"],
    rewards: ["Energy Farmer Badge", "400 points", "Solar maintenance guide"],
    status: "available",
  },
  {
    id: 5,
    title: "Zero Waste Farming",
    description: "Implement zero-waste practices across your entire farm",
    category: "waste",
    difficulty: "Hard",
    duration: "45 days",
    points: 500,
    participants: 34,
    requirements: ["Waste audit completion", "Recycling setup"],
    rewards: ["Waste Warrior Badge", "500 points", "Sustainability certificate"],
    status: "available",
  },
  {
    id: 6,
    title: "Crop Rotation Planning",
    description: "Implement 4-season crop rotation plan",
    category: "crop",
    difficulty: "Medium",
    duration: "120 days",
    points: 350,
    participants: 123,
    requirements: ["Multiple crop varieties", "Planning tools"],
    rewards: ["Crop Master Badge", "350 points", "Rotation planning software"],
    status: "available",
  },
]

const activeChallenges = [
  {
    id: 7,
    title: "Soil Health Improvement",
    description: "Add organic compost to 2 acres of farmland",
    category: "soil",
    progress: 60,
    points: 200,
    daysLeft: 5,
    startDate: "2025-01-10",
    status: "active",
  },
  {
    id: 8,
    title: "Water Conservation",
    description: "Install drip irrigation system",
    category: "water",
    progress: 30,
    points: 300,
    daysLeft: 12,
    startDate: "2025-01-05",
    status: "active",
  },
]

const completedChallenges = [
  {
    id: 9,
    title: "Organic Pest Control",
    description: "Use natural pest control methods for one month",
    category: "biodiversity",
    points: 150,
    completedDate: "2025-01-01",
    status: "completed",
  },
  {
    id: 10,
    title: "Rainwater Harvesting",
    description: "Set up rainwater collection system",
    category: "water",
    points: 250,
    completedDate: "2024-12-20",
    status: "completed",
  },
]

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null)

  const getCategoryIcon = (categoryId: string) => {
    const category = challengeCategories.find((cat) => cat.id === categoryId)
    if (!category) return <Target className="w-4 h-4" />
    const IconComponent = category.icon
    return <IconComponent className={`w-4 h-4 ${category.color}`} />
  }

  const getCategoryBg = (categoryId: string) => {
    const category = challengeCategories.find((cat) => cat.id === categoryId)
    return category?.bgColor || "bg-gray-100"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredChallenges =
    selectedCategory === "all"
      ? availableChallenges
      : availableChallenges.filter((challenge) => challenge.category === selectedCategory)

  const handleJoinChallenge = (challengeId: number) => {
    // In real app, this would make an API call
    console.log("Joining challenge:", challengeId)
    // Show success message and update UI
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sustainability Challenges</h1>
            <p className="text-gray-600 mt-1">Complete challenges to earn points and badges</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">750 pts</div>
            <div className="text-sm text-gray-500">Your total points</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            All Categories
          </Button>
          {challengeCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 ${
                  selectedCategory === category.id ? "bg-orange-500 hover:bg-orange-600" : ""
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
              </Button>
            )
          })}
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available ({availableChallenges.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeChallenges.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedChallenges.length})</TabsTrigger>
          </TabsList>

          {/* Available Challenges */}
          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryBg(challenge.category)}`}
                      >
                        {getCategoryIcon(challenge.category)}
                      </div>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{challenge.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-orange-600 font-semibold">
                        <Trophy className="w-4 h-4" />
                        <span>{challenge.points} pts</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">{challenge.participants} farmers participating</div>

                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => setSelectedChallenge(challenge.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Challenges */}
          <TabsContent value="active" className="space-y-4">
            {activeChallenges.map((challenge) => (
              <Card key={challenge.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryBg(challenge.category)}`}
                      >
                        {getCategoryIcon(challenge.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {challenge.daysLeft} days left
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">{challenge.progress}% complete</span>
                    </div>
                    <Progress value={challenge.progress} className="h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Started {challenge.startDate}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-orange-600 font-semibold">
                        <Trophy className="w-4 h-4" />
                        <span>{challenge.points} pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Update Progress
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Challenges */}
          <TabsContent value="completed" className="space-y-4">
            {completedChallenges.map((challenge) => (
              <Card key={challenge.id} className="border-0 shadow-md bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Completed on {challenge.completedDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-green-600 font-semibold">
                        <Trophy className="w-4 h-4" />
                        <span>+{challenge.points} pts</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 mt-1">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Challenge Detail Modal would go here */}
        {selectedChallenge && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Challenge Details</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedChallenge(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const challenge = availableChallenges.find((c) => c.id === selectedChallenge)
                  if (!challenge) return null

                  return (
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${getCategoryBg(challenge.category)}`}
                        >
                          {getCategoryIcon(challenge.category)}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900">{challenge.title}</h2>
                          <p className="text-gray-600 mt-1">{challenge.description}</p>
                          <div className="flex items-center space-x-4 mt-3">
                            <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{challenge.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-orange-600 font-semibold">
                              <Trophy className="w-4 h-4" />
                              <span>{challenge.points} points</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                        <ul className="space-y-1">
                          {challenge.requirements.map((req, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Rewards</h3>
                        <ul className="space-y-1">
                          {challenge.rewards.map((reward, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <Award className="w-4 h-4 text-orange-500" />
                              <span>{reward}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>{challenge.participants} farmers are currently participating in this challenge</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => handleJoinChallenge(challenge.id)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Join Challenge
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedChallenge(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
