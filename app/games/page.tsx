"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Droplets,
  Leaf,
  Shield,
  Zap,
  Play,
  Trophy,
  Star,
  Clock,
  Target,
  Award,
  TrendingUp,
  Users,
  Home,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const miniGames = [
  {
    id: "water-saver",
    title: "Water Saver",
    description: "Manage limited water resources and allocate efficiently across different crops",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    difficulty: "Easy",
    duration: "5-10 min",
    points: 50,
    players: 1247,
    rating: 4.6,
    completed: false,
    bestScore: 0,
    objective: "Distribute water efficiently to maximize crop yield while conserving resources",
    skills: ["Resource Management", "Strategic Planning", "Water Conservation"],
  },
  {
    id: "soil-builder",
    title: "Soil Builder",
    description: "Improve soil quality by adding compost, crop rotation, and avoiding chemicals",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-200",
    difficulty: "Medium",
    duration: "10-15 min",
    points: 75,
    players: 892,
    rating: 4.8,
    completed: true,
    bestScore: 850,
    objective: "Build healthy soil through organic practices and sustainable farming methods",
    skills: ["Soil Science", "Organic Farming", "Crop Rotation"],
  },
  {
    id: "biodiversity-defender",
    title: "Biodiversity Defender",
    description: "Protect farm ecosystem by introducing pollinators and beneficial insects",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-200",
    difficulty: "Medium",
    duration: "8-12 min",
    points: 60,
    players: 634,
    rating: 4.5,
    completed: false,
    bestScore: 0,
    objective: "Create a balanced ecosystem that supports biodiversity and natural pest control",
    skills: ["Ecosystem Management", "Pollinator Support", "Natural Pest Control"],
  },
  {
    id: "energy-farmer",
    title: "Energy Farmer",
    description: "Optimize energy usage with solar panels, renewable sources, and efficient irrigation",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-200",
    difficulty: "Hard",
    duration: "15-20 min",
    points: 100,
    players: 456,
    rating: 4.7,
    completed: false,
    bestScore: 0,
    objective: "Maximize energy efficiency while maintaining optimal farm operations",
    skills: ["Energy Management", "Renewable Energy", "Cost Optimization"],
  },
]

const achievements = [
  { id: "first-play", name: "First Steps", description: "Play your first mini-game", icon: Play, earned: true },
  { id: "water-master", name: "Water Master", description: "Score 800+ in Water Saver", icon: Droplets, earned: false },
  {
    id: "soil-expert",
    name: "Soil Expert",
    description: "Complete Soil Builder with perfect score",
    icon: Leaf,
    earned: true,
  },
  { id: "eco-champion", name: "Eco Champion", description: "Complete all mini-games", icon: Trophy, earned: false },
]

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameState, setGameState] = useState<"menu" | "playing" | "completed">("menu")

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

  const startGame = (gameId: string) => {
    setSelectedGame(gameId)
    setGameState("playing")
  }

  const backToMenu = () => {
    setSelectedGame(null)
    setGameState("menu")
  }

  if (gameState === "playing" && selectedGame) {
    const game = miniGames.find((g) => g.id === selectedGame)
    if (!game) return null

    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Game Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={backToMenu}>
                <Home className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{game.title}</h1>
                <p className="text-gray-600">{game.objective}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-orange-600">Score: 0</div>
              <div className="text-sm text-gray-500">Best: {game.bestScore}</div>
            </div>
          </div>

          {/* Game Component */}
          {selectedGame === "water-saver" && <WaterSaverGame />}
          {selectedGame === "soil-builder" && <SoilBuilderGame />}
          {selectedGame === "biodiversity-defender" && <BiodiversityDefenderGame />}
          {selectedGame === "energy-farmer" && <EnergyFarmerGame />}
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Mini-Games</h1>
            <p className="text-gray-600 mt-1">Learn sustainable farming through interactive games</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">285</div>
            <div className="text-sm text-gray-500">Total Points Earned</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Play className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{miniGames.filter((g) => g.completed).length}</div>
              <div className="text-sm text-gray-600">Games Completed</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">285</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{achievements.filter((a) => a.earned).length}</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.6</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Mini-Games Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {miniGames.map((game) => {
              const IconComponent = game.icon
              return (
                <Card
                  key={game.id}
                  className={`border-2 shadow-md hover:shadow-lg transition-all cursor-pointer ${game.borderColor} ${
                    game.completed ? "bg-gradient-to-br from-white to-green-50" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${game.bgColor}`}>
                        <IconComponent className={`w-8 h-8 ${game.color}`} />
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                        {game.completed && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{game.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{game.description}</p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-800">Learning Objective:</h4>
                      <p className="text-xs text-gray-600">{game.objective}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-800">Skills Developed:</h4>
                      <div className="flex flex-wrap gap-1">
                        {game.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{game.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-orange-500" />
                        <span>{game.points} points</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{game.players.toLocaleString()} played</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{game.rating}/5</span>
                      </div>
                    </div>

                    {game.completed && game.bestScore > 0 && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-700 font-semibold">Best Score:</span>
                          <span className="text-green-800 font-bold">{game.bestScore}</span>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => startGame(game.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {game.completed ? "Play Again" : "Start Game"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Game Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <Card
                  key={achievement.id}
                  className={`border-0 shadow-md ${
                    achievement.earned ? "bg-gradient-to-br from-white to-orange-50 border-orange-200" : "opacity-60"
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        achievement.earned ? "bg-orange-100" : "bg-gray-100"
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${achievement.earned ? "text-orange-600" : "text-gray-400"}`}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{achievement.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                    {achievement.earned && <Badge className="bg-orange-100 text-orange-800 mt-2 text-xs">Earned</Badge>}
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

// Water Saver Game Component
function WaterSaverGame() {
  const [waterLevel, setWaterLevel] = useState(100)
  const [crops, setCrops] = useState([
    { id: 1, name: "Tomatoes", water: 0, maxWater: 30, health: 50 },
    { id: 2, name: "Wheat", water: 0, maxWater: 25, health: 50 },
    { id: 3, name: "Corn", water: 0, maxWater: 35, health: 50 },
    { id: 4, name: "Rice", water: 0, maxWater: 40, health: 50 },
  ])
  const [score, setScore] = useState(0)
  const [gameTime, setGameTime] = useState(60)

  const waterCrop = (cropId: number, amount: number) => {
    if (waterLevel >= amount) {
      setWaterLevel((prev) => prev - amount)
      setCrops((prev) =>
        prev.map((crop) =>
          crop.id === cropId
            ? {
                ...crop,
                water: Math.min(crop.water + amount, crop.maxWater),
                health: Math.min(crop.health + amount * 2, 100),
              }
            : crop,
        ),
      )
      setScore((prev) => prev + amount * 10)
    }
  }

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-blue-600">{waterLevel}L</div>
            <div className="text-sm text-gray-600">Water Left</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-orange-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-purple-600">{gameTime}s</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-600">
              {Math.round(crops.reduce((sum, crop) => sum + crop.health, 0) / crops.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Health</div>
          </CardContent>
        </Card>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {crops.map((crop) => (
          <Card key={crop.id} className="border-0 shadow-md">
            <CardContent className="p-4">
              <h3 className="font-semibold text-center mb-3">{crop.name}</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Health</span>
                    <span>{crop.health}%</span>
                  </div>
                  <Progress value={crop.health} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Water</span>
                    <span>
                      {crop.water}/{crop.maxWater}L
                    </span>
                  </div>
                  <Progress value={(crop.water / crop.maxWater) * 100} className="h-2" />
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs"
                    onClick={() => waterCrop(crop.id, 5)}
                    disabled={waterLevel < 5}
                  >
                    +5L
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                    onClick={() => waterCrop(crop.id, 10)}
                    disabled={waterLevel < 10}
                  >
                    +10L
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="border-0 shadow-md bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How to Play:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Distribute water efficiently among your crops</li>
            <li>• Each crop has different water needs</li>
            <li>• Keep crop health above 70% for maximum points</li>
            <li>• Don't waste water - you have limited supply!</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// Soil Builder Game Component
function SoilBuilderGame() {
  const [soilHealth, setSoilHealth] = useState(40)
  const [nutrients, setNutrients] = useState({ nitrogen: 30, phosphorus: 25, potassium: 35 })
  const [compost, setCompost] = useState(50)
  const [score, setScore] = useState(0)

  const addCompost = () => {
    if (compost >= 10) {
      setCompost((prev) => prev - 10)
      setSoilHealth((prev) => Math.min(prev + 15, 100))
      setNutrients((prev) => ({
        nitrogen: Math.min(prev.nitrogen + 5, 100),
        phosphorus: Math.min(prev.phosphorus + 3, 100),
        potassium: Math.min(prev.potassium + 4, 100),
      }))
      setScore((prev) => prev + 150)
    }
  }

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-600">{soilHealth}%</div>
            <div className="text-sm text-gray-600">Soil Health</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-orange-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-brown-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-brown-600 font-bold">C</span>
            </div>
            <div className="text-xl font-bold text-brown-600">{compost}</div>
            <div className="text-sm text-gray-600">Compost</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-purple-600">
              {Math.round((nutrients.nitrogen + nutrients.phosphorus + nutrients.potassium) / 3)}%
            </div>
            <div className="text-sm text-gray-600">Avg Nutrients</div>
          </CardContent>
        </Card>
      </div>

      {/* Soil Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span>Soil Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Health</span>
                <span>{soilHealth}%</span>
              </div>
              <Progress value={soilHealth} className="h-3" />
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={addCompost}
              disabled={compost < 10}
            >
              Add Compost (-10 units)
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Nutrient Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Nitrogen (N)</span>
                <span>{nutrients.nitrogen}%</span>
              </div>
              <Progress value={nutrients.nitrogen} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Phosphorus (P)</span>
                <span>{nutrients.phosphorus}%</span>
              </div>
              <Progress value={nutrients.phosphorus} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Potassium (K)</span>
                <span>{nutrients.potassium}%</span>
              </div>
              <Progress value={nutrients.potassium} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="border-0 shadow-md bg-green-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-900 mb-2">How to Play:</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Add compost to improve soil health and nutrients</li>
            <li>• Balance all three nutrients (N-P-K) for optimal growth</li>
            <li>• Maintain soil health above 80% for maximum points</li>
            <li>• Use organic methods to build sustainable soil</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// Biodiversity Defender Game Component
function BiodiversityDefenderGame() {
  const [ecosystem, setEcosystem] = useState({
    pollinators: 20,
    beneficialInsects: 15,
    birds: 10,
    soilMicrobes: 25,
  })
  const [threats, setThreats] = useState({
    pests: 30,
    diseases: 20,
    chemicals: 15,
  })
  const [score, setScore] = useState(0)

  const deployDefense = (type: string) => {
    setEcosystem((prev) => ({
      ...prev,
      [type]: Math.min(prev[type as keyof typeof prev] + 5, 100),
    }))
    setThreats((prev) => ({
      pests: Math.max(prev.pests - 3, 0),
      diseases: Math.max(prev.diseases - 2, 0),
      chemicals: Math.max(prev.chemicals - 1, 0),
    }))
    setScore((prev) => prev + 100)
  }

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-purple-600">
              {Math.round(
                (ecosystem.pollinators + ecosystem.beneficialInsects + ecosystem.birds + ecosystem.soilMicrobes) / 4,
              )}
              %
            </div>
            <div className="text-sm text-gray-600">Ecosystem Health</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-orange-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-600">{ecosystem.pollinators}</div>
            <div className="text-sm text-gray-600">Pollinators</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-red-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-red-600 font-bold">!</span>
            </div>
            <div className="text-xl font-bold text-red-600">
              {Math.round((threats.pests + threats.diseases + threats.chemicals) / 3)}%
            </div>
            <div className="text-sm text-gray-600">Threat Level</div>
          </CardContent>
        </Card>
      </div>

      {/* Ecosystem Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-green-700">Beneficial Species</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(ecosystem).map(([species, count]) => (
              <div key={species} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{species.replace(/([A-Z])/g, " $1")}</span>
                    <span>{count}%</span>
                  </div>
                  <Progress value={count} className="h-2" />
                </div>
                <Button
                  size="sm"
                  className="ml-3 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => deployDefense(species)}
                >
                  +
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-red-700">Threats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(threats).map(([threat, level]) => (
              <div key={threat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{threat}</span>
                  <span>{level}%</span>
                </div>
                <Progress value={level} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="border-0 shadow-md bg-purple-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-purple-900 mb-2">How to Play:</h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Build populations of beneficial species to defend your farm</li>
            <li>• Pollinators help with crop reproduction</li>
            <li>• Beneficial insects control pests naturally</li>
            <li>• Balance the ecosystem to minimize threats</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// Energy Farmer Game Component
function EnergyFarmerGame() {
  const [energy, setEnergy] = useState({
    solar: 30,
    wind: 10,
    grid: 60,
  })
  const [consumption, setConsumption] = useState({
    irrigation: 40,
    processing: 30,
    lighting: 20,
    cooling: 25,
  })
  const [efficiency, setEfficiency] = useState(65)
  const [cost, setCost] = useState(1200)
  const [score, setScore] = useState(0)

  const upgradeRenewable = (type: string) => {
    setEnergy((prev) => ({
      ...prev,
      [type]: Math.min(prev[type as keyof typeof prev] + 10, 100),
      grid: Math.max(prev.grid - 5, 0),
    }))
    setEfficiency((prev) => Math.min(prev + 5, 100))
    setCost((prev) => Math.max(prev - 100, 0))
    setScore((prev) => prev + 200)
  }

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-yellow-600">{efficiency}%</div>
            <div className="text-sm text-gray-600">Efficiency</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-orange-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-green-600 font-bold">₹</span>
            </div>
            <div className="text-xl font-bold text-green-600">₹{cost}</div>
            <div className="text-sm text-gray-600">Monthly Cost</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-blue-600">{energy.solar + energy.wind}%</div>
            <div className="text-sm text-gray-600">Renewable</div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-yellow-700">Energy Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(energy).map(([source, percentage]) => (
              <div key={source} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{source} Energy</span>
                    <span>{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
                {source !== "grid" && (
                  <Button
                    size="sm"
                    className="ml-3 bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={() => upgradeRenewable(source)}
                  >
                    Upgrade
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-700">Energy Consumption</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(consumption).map(([system, usage]) => (
              <div key={system}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{system}</span>
                  <span>{usage}%</span>
                </div>
                <Progress value={usage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="border-0 shadow-md bg-yellow-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">How to Play:</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Upgrade renewable energy sources to reduce costs</li>
            <li>• Balance energy production with consumption</li>
            <li>• Achieve 80%+ efficiency for maximum points</li>
            <li>• Minimize grid dependency for sustainability</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
