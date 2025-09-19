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
  Clock,
  Target,
  Home,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"


type Game = {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  difficulty: string
  duration: string
  points: number
  players: number
  rating: number
  completed: boolean
  bestScore: number
  objective: string
  skills: string[]
}


const miniGames: Game[] = [
  {
    id: "water-saver",
    title: "Water Saver",
    description: "Manage limited water resources and allocate efficiently across crops",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-400",
    difficulty: "Easy",
    duration: "5-10 min",
    points: 50,
    players: 1247,
    rating: 4.6,
    completed: false,
    bestScore: 0,
    objective: "Distribute water efficiently to maximize yield",
    skills: ["Resource Management", "Strategic Planning", "Water Conservation"],
  },
  {
    id: "soil-builder",
    title: "Soil Builder",
    description: "Improve soil quality by adding compost, rotating crops, and avoiding chemicals",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-400",
    difficulty: "Medium",
    duration: "10-15 min",
    points: 75,
    players: 892,
    rating: 4.8,
    completed: true,
    bestScore: 850,
    objective: "Build healthy soil using sustainable practices",
    skills: ["Soil Science", "Organic Farming", "Crop Rotation"],
  },
  {
    id: "biodiversity-defender",
    title: "Biodiversity Defender",
    description: "Protect farm ecosystem by introducing pollinators and beneficial insects",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-400",
    difficulty: "Medium",
    duration: "8-12 min",
    points: 60,
    players: 634,
    rating: 4.5,
    completed: false,
    bestScore: 0,
    objective: "Balance ecosystem for pest control",
    skills: ["Ecosystem Management", "Pollinator Support", "Natural Pest Control"],
  },
  {
    id: "energy-farmer",
    title: "Energy Farmer",
    description: "Optimize energy usage with renewable sources and efficient irrigation",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-400",
    difficulty: "Hard",
    duration: "15-20 min",
    points: 100,
    players: 456,
    rating: 4.7,
    completed: false,
    bestScore: 0,
    objective: "Maximize energy efficiency in farm operations",
    skills: ["Energy Management", "Renewable Energy", "Cost Optimization"],
  },
]


type GameProps = {
  backToMenu: () => void
  game: Game
}


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

    switch (game.id) {
      case "water-saver":
        return <WaterSaverGame backToMenu={backToMenu} game={game} />
      case "soil-builder":
        return <SoilBuilderGame backToMenu={backToMenu} game={game} />
      case "biodiversity-defender":
        return <BiodiversityDefender backToMenu={backToMenu} game={game} />
      case "energy-farmer":
        return <EnergyFarmer backToMenu={backToMenu} game={game} />
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Mini-Games</h1>
            <p className="text-gray-600 mt-1">Learn sustainability through interactive games</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{miniGames.filter(game => game.completed).length}</div>
            <div className="text-sm">Games Completed</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {miniGames.map((game) => {
            const Icon = game.icon
            return (
              <Card key={game.id} className={`cursor-pointer border-2 ${game.borderColor} hover:shadow-lg`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className={`rounded-full p-3 ${game.bgColor}`}>
                      <Icon className={`w-8 h-8 ${game.color}`} />
                    </div>
                    <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="font-semibold text-lg">{game.title}</h2>
                  <p className="text-sm mb-2">{game.description}</p>
                  <p className="text-xs mb-2 text-gray-500">Objective: {game.objective}</p>
                  <Button onClick={() => startGame(game.id)} size="sm" className="w-full">
                    <Play className="inline mr-2" /> {game.completed ? "Play Again" : "Start"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}


function WaterSaverGame({ backToMenu, game }: GameProps) {
  const [waterLevel, setWaterLevel] = useState(100)
  const [crops, setCrops] = useState([
    { id: 1, name: "Tomatoes", water: 0, maxWater: 30, health: 50 },
    { id: 2, name: "Wheat", water: 0, maxWater: 25, health: 50 },
    { id: 3, name: "Corn", water: 0, maxWater: 35, health: 50 },
    { id: 4, name: "Rice", water: 0, maxWater: 40, health: 50 },
  ])
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(60)

  const waterCrop = (id: number, amount: number) => {
    if (waterLevel >= amount) {
      setWaterLevel(prev => prev - amount)
      setCrops(prev =>
        prev.map(c =>
          c.id === id ? { ...c, water: Math.min(c.water + amount, c.maxWater), health: Math.min(c.health + amount * 2, 100) } : c,
        ))
      setScore(prev => prev + amount * 10)
    }
  }

  return (
    <DashboardLayout>
      <Button variant="outline" onClick={backToMenu} className="mb-4">
        <Home className="mr-2" /> Back to Games
      </Button>
      <h1 className="text-xl font-semibold">{game.title}</h1>
      <p className="mb-4">{game.objective}</p>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <Droplets className="mb-1 text-blue-600" />
          <p>Water Left: {waterLevel}L</p>
        </div>
        <div>
          <Trophy className="mb-1 text-yellow-600" />
          <p>Score: {score}</p>
        </div>
        <div>
          <Clock className="mb-1 text-purple-600" />
          <p>Time Left: {time}s</p>
        </div>
        <div>
          <Target className="mb-1 text-green-600" />
          <p>Avg Health: {Math.round(crops.reduce((a, c) => a + c.health, 0) / crops.length)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {crops.map(crop => (
          <Card key={crop.id}>
            <CardContent>
              <h2 className="font-semibold text-center mb-2">{crop.name}</h2>
              <p>Health: {crop.health}%</p>
              <p>
                Water: {crop.water} / {crop.maxWater}L
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => waterCrop(crop.id, 5)} disabled={waterLevel < 5}>
                  +5L
                </Button>
                <Button size="sm" onClick={() => waterCrop(crop.id, 10)} disabled={waterLevel < 10}>
                  +10L
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}

function SoilBuilderGame({ backToMenu, game }: GameProps) {
  const [soilHealth, setSoilHealth] = useState(40)
  const [nutrients, setNutrients] = useState({ nitrogen: 30, phosphorus: 25, potassium: 35 })
  const [compost, setCompost] = useState(50)
  const [score, setScore] = useState(0)

  const addCompost = () => {
    if (compost >= 10) {
      setCompost(prev => prev - 10)
      setSoilHealth(prev => Math.min(prev + 15, 100))
      setNutrients(prev => ({
        nitrogen: Math.min(prev.nitrogen + 5, 100),
        phosphorus: Math.min(prev.phosphorus + 3, 100),
        potassium: Math.min(prev.potassium + 4, 100),
      }))
      setScore(prev => prev + 150)
    }
  }

  return (
    <DashboardLayout>
      <Button variant="outline" onClick={backToMenu} className="mb-4">
        <Home className="mr-2" /> Back to Games
      </Button>
      <h1 className="text-xl font-semibold">{game.title}</h1>
      <p className="mb-4">{game.objective}</p>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent className="text-center">
            <Leaf className="text-green-600 mb-2" />
            <div>Soil Health: {soilHealth}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <Trophy className="text-yellow-600 mb-2" />
            <div>Score: {score}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <div className="mb-2 rounded-full bg-brown-100 text-brown-600 p-2">C</div>
            <div>Compost: {compost}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <Target className="text-purple-600 mb-2" />
            <div>Avg Nutrients: {Math.round((nutrients.nitrogen + nutrients.phosphorus + nutrients.potassium) / 3)}%</div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={addCompost} disabled={compost < 10} className="mb-4">
        Add Compost (-10 units)
      </Button>
    </DashboardLayout>
  )
}

function BiodiversityDefender({ backToMenu, game }: GameProps) {
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
    setEcosystem(prev => ({
      ...prev,
      [type]: Math.min(prev[type as keyof typeof prev] + 5, 100),
    }))
    setThreats(prev => ({
      pests: Math.max(prev.pests - 3, 0),
      diseases: Math.max(prev.diseases - 2, 0),
      chemicals: Math.max(prev.chemicals - 1, 0),
    }))
    setScore(prev => prev + 100)
  }

  return (
    <DashboardLayout>
      <Button variant="outline" onClick={backToMenu} className="mb-4">
        <Home className="mr-2" /> Back to Games
      </Button>
      <h1 className="text-xl font-semibold">{game.title}</h1>
      <p className="mb-4">{game.objective}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent>
            <h2 className="font-semibold mb-2">Beneficial Species</h2>
            {Object.entries(ecosystem).map(([species, count]) => (
              <div key={species} className="flex justify-between mb-2">
                <span>{species.replace(/([A-Z])/g, " $1")}</span>
                <span>{count}%</span>
                <Progress value={count} className="w-1/2" />
                <Button size="sm" onClick={() => deployDefense(species)}>
                  +
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="font-semibold mb-2">Threats</h2>
            {Object.entries(threats).map(([threat, level]) => (
              <div key={threat} className="flex justify-between mb-2">
                <span>{threat}</span>
                <span>{level}%</span>
                <Progress value={level} className="w-1/2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>Score: {score}</div>
    </DashboardLayout>
  )
}

function EnergyFarmer({ backToMenu, game }: GameProps) {
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
    setEnergy(prev => ({
      ...prev,
      [type]: Math.min(prev[type as keyof typeof prev] + 10, 100),
      grid: Math.max(prev.grid - 5, 0),
    }))
    setEfficiency(prev => Math.min(prev + 5, 100))
    setCost(prev => Math.max(prev - 100, 0))
    setScore(prev => prev + 200)
  }

  return (
    <DashboardLayout>
      <Button variant="outline" onClick={backToMenu} className="mb-4">
        <Home className="mr-2" /> Back to Games
      </Button>
      <h1 className="text-xl font-semibold">{game.title}</h1>
      <p className="mb-4">{game.objective}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {Object.entries(energy).map(([source, value]) => (
          <div key={source}>
            <h2 className="font-semibold">{source.toUpperCase()}</h2>
            <Progress value={value} className="mb-2 rounded" />
            <div>{value}% efficiency</div>
            {source !== "grid" && (
              <Button size="sm" onClick={() => upgradeRenewable(source)}>
                Upgrade
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4">Monthly Energy Cost: ₹{cost}</div>

      <div>
        <h2 className="font-semibold mb-2">Energy Consumption</h2>
        {Object.entries(consumption).map(([system, percent]) => (
          <div key={system} className="flex justify-between">
            <span>{system}</span>
            <span>{percent}%</span>
          </div>
        ))}
      </div>
      <Button onClick={() => upgradeRenewable("solar")}>Upgrade Solar Panel</Button>
    </DashboardLayout>
  )
}

