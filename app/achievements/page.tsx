"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, Leaf, Zap, Recycle, Trophy, Award, Star, Target, Crown, Shield, Flame, Lock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const achievements = [
  {
    id: "water-warrior",
    name: "Water Warrior",
    description: "Save 1000+ gallons of water through conservation practices",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    earned: true,
    earnedDate: "2025-01-15",
    progress: 100,
    requirement: "1000 gallons saved",
    currentValue: "2450 gallons",
    rarity: "Common",
    points: 100,
  },
  {
    id: "soil-steward",
    name: "Soil Steward",
    description: "Improve soil health across 5+ acres of farmland",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-200",
    earned: true,
    earnedDate: "2025-01-10",
    progress: 100,
    requirement: "5 acres improved",
    currentValue: "3.2 acres",
    rarity: "Common",
    points: 150,
  },
  {
    id: "challenge-champion",
    name: "Challenge Champion",
    description: "Complete 10+ sustainability challenges",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-200",
    earned: false,
    progress: 80,
    requirement: "10 challenges completed",
    currentValue: "8 challenges",
    rarity: "Rare",
    points: 250,
  },
  {
    id: "eco-expert",
    name: "Eco Expert",
    description: "Accumulate 5000+ sustainability points",
    icon: Award,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-200",
    earned: false,
    progress: 15,
    requirement: "5000 points",
    currentValue: "750 points",
    rarity: "Epic",
    points: 500,
  },
  {
    id: "green-pioneer",
    name: "Green Pioneer",
    description: "Complete advanced sustainability challenges",
    icon: Crown,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-200",
    earned: false,
    progress: 0,
    requirement: "5 advanced challenges",
    currentValue: "0 challenges",
    rarity: "Legendary",
    points: 1000,
  },
  {
    id: "biodiversity-defender",
    name: "Biodiversity Defender",
    description: "Support 10+ pollinator species on your farm",
    icon: Shield,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    borderColor: "border-pink-200",
    earned: false,
    progress: 80,
    requirement: "10 species supported",
    currentValue: "8 species",
    rarity: "Rare",
    points: 200,
  },
  {
    id: "energy-master",
    name: "Energy Master",
    description: "Use renewable energy for 90+ days",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-200",
    earned: false,
    progress: 33,
    requirement: "90 days renewable energy",
    currentValue: "30 days",
    rarity: "Epic",
    points: 400,
  },
  {
    id: "waste-warrior",
    name: "Waste Warrior",
    description: "Achieve zero waste farming for 30+ days",
    icon: Recycle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-200",
    earned: false,
    progress: 0,
    requirement: "30 days zero waste",
    currentValue: "0 days",
    rarity: "Epic",
    points: 350,
  },
  {
    id: "innovation-leader",
    name: "Innovation Leader",
    description: "Implement 5+ cutting-edge farming technologies",
    icon: Star,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    borderColor: "border-indigo-200",
    earned: false,
    progress: 40,
    requirement: "5 technologies implemented",
    currentValue: "2 technologies",
    rarity: "Legendary",
    points: 750,
  },
]

const levelSystem = {
  currentLevel: "Eco Apprentice",
  currentPoints: 750,
  levels: [
    { name: "Eco Novice", minPoints: 0, maxPoints: 249, color: "text-gray-600", bgColor: "bg-gray-100" },
    { name: "Eco Apprentice", minPoints: 250, maxPoints: 999, color: "text-green-600", bgColor: "bg-green-100" },
    { name: "Eco Expert", minPoints: 1000, maxPoints: 2499, color: "text-blue-600", bgColor: "bg-blue-100" },
    { name: "Eco Master", minPoints: 2500, maxPoints: 4999, color: "text-purple-600", bgColor: "bg-purple-100" },
    {
      name: "Eco Legend",
      minPoints: 5000,
      maxPoints: Number.POSITIVE_INFINITY,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ],
}

const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case "common":
      return "bg-gray-100 text-gray-800"
    case "rare":
      return "bg-blue-100 text-blue-800"
    case "epic":
      return "bg-purple-100 text-purple-800"
    case "legendary":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AchievementsPage() {
  const earnedAchievements = achievements.filter((achievement) => achievement.earned)
  const inProgressAchievements = achievements.filter((achievement) => !achievement.earned && achievement.progress > 0)
  const lockedAchievements = achievements.filter((achievement) => !achievement.earned && achievement.progress === 0)

  const currentLevel = levelSystem.levels.find(
    (level) => levelSystem.currentPoints >= level.minPoints && levelSystem.currentPoints <= level.maxPoints,
  )
  const nextLevel = levelSystem.levels.find((level) => level.minPoints > levelSystem.currentPoints)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Achievements & Progress</h1>
            <p className="text-gray-600 mt-1">Track your sustainability milestones and unlock rewards</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{earnedAchievements.length}</div>
            <div className="text-sm text-gray-500">Achievements Earned</div>
          </div>
        </div>

        {/* Level Progress */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-orange-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{currentLevel?.name}</h2>
                <p className="text-orange-100">Current Level</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{levelSystem.currentPoints}</div>
                <div className="text-sm text-orange-100">Total Points</div>
              </div>
            </div>
            {nextLevel && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to {nextLevel.name}</span>
                  <span>
                    {levelSystem.currentPoints} / {nextLevel.minPoints}
                  </span>
                </div>
                <Progress value={(levelSystem.currentPoints / nextLevel.minPoints) * 100} className="h-3 bg-white/20" />
                <p className="text-xs text-orange-100">
                  {nextLevel.minPoints - levelSystem.currentPoints} points to next level
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{earnedAchievements.length}</div>
              <div className="text-sm text-gray-600">Earned</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{inProgressAchievements.length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{lockedAchievements.length}</div>
              <div className="text-sm text-gray-600">Locked</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0)}
              </div>
              <div className="text-sm text-gray-600">Points from Achievements</div>
            </CardContent>
          </Card>
        </div>

        {/* Earned Achievements */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Earned Achievements ({earnedAchievements.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedAchievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <Card
                  key={achievement.id}
                  className={`border-2 shadow-md bg-gradient-to-br from-white to-green-50 ${achievement.borderColor}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${achievement.color}`} />
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-green-600 font-semibold">✓ Completed</div>
                      <div className="text-orange-600 font-semibold">+{achievement.points} pts</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Earned on {achievement.earnedDate}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* In Progress Achievements */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">In Progress ({inProgressAchievements.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressAchievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <Card key={achievement.id} className={`border-2 shadow-md ${achievement.borderColor}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${achievement.color}`} />
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{achievement.currentValue}</span>
                        <span>{achievement.requirement}</span>
                      </div>
                    </div>
                    <div className="text-right mt-3">
                      <div className="text-orange-600 font-semibold text-sm">+{achievement.points} pts</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Locked Achievements */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Locked Achievements ({lockedAchievements.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <Card key={achievement.id} className="border-2 border-gray-200 shadow-md bg-gray-50 opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
                        <Lock className="w-6 h-6 text-gray-400" />
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                    </div>
                    <h3 className="font-bold text-gray-600 mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>
                    <div className="text-sm text-gray-500">Requirement: {achievement.requirement}</div>
                    <div className="text-right mt-3">
                      <div className="text-gray-500 font-semibold text-sm">+{achievement.points} pts</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
