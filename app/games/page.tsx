"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
  const [gameState, setGameState] = useState<"menu" | "playing">("menu")

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

/* ---------------------- Water Saver (interactive, timer, random droughts) ---------------------- */
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
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    // single interval that updates game state every second
    intervalRef.current = window.setInterval(() => {
      setTime(prev => {
        const next = prev - 1
        if (next <= 0) {
          // end game
          window.clearInterval(intervalRef.current ?? undefined)
        }
        return next
      })

      // random drought with 12% chance
      if (Math.random() < 0.12) {
        setWaterLevel(prev => Math.max(prev - 12, 0))
      }

      // natural decay: crops slowly lose health if not sufficiently watered
      setCrops(prev =>
        prev.map(c => {
          // slight decay if water low
          const decay = c.water < c.maxWater * 0.3 ? 3 : 1
          const newHealth = Math.max(c.health - decay, 0)
          // drain some water naturally
          const newWater = Math.max(c.water - 1, 0)
          return { ...c, health: newHealth, water: newWater }
        }),
      )
    }, 1000)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    // intentionally empty deps: single interval lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (time <= 0) {
      const avgHealth = Math.round(crops.reduce((a, c) => a + c.health, 0) / crops.length)
      alert(`Game Over! Final Score: ${score} — Avg Health: ${avgHealth}%`)
      backToMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const waterCrop = (id: number, amount: number) => {
    if (waterLevel >= amount && time > 0) {
      setWaterLevel(prev => prev - amount)
      setCrops(prev =>
        prev.map(c =>
          c.id === id
            ? { ...c, water: Math.min(c.water + amount, c.maxWater), health: Math.min(c.health + amount * 2, 100) }
            : c,
        ),
      )
      setScore(prev => prev + amount * 12)
    }
  }

  return (
    <DashboardLayout>
      <Button variant="outline" onClick={() => { if (intervalRef.current) window.clearInterval(intervalRef.current); backToMenu() }} className="mb-4">
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
              <Progress value={crop.health} className="mb-2" />
              <p>
                Water: {crop.water} / {crop.maxWater}L
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => waterCrop(crop.id, 5)} disabled={waterLevel < 5 || time <= 0}>
                  +5L
                </Button>
                <Button size="sm" onClick={() => waterCrop(crop.id, 10)} disabled={waterLevel < 10 || time <= 0}>
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

/* ---------------------- Soil Builder (compost, rotation, events) ---------------------- */
function SoilBuilderGame({ backToMenu, game }: GameProps) {
  const [soilHealth, setSoilHealth] = useState(40)
  const [nutrients, setNutrients] = useState({ nitrogen: 30, phosphorus: 25, potassium: 35 })
  const [compost, setCompost] = useState(50)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(90)
  const [lastRotation, setLastRotation] = useState<string | null>(null) // track last planted crop type
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTime(prev => {
        const next = prev - 1
        if (next <= 0) {
          window.clearInterval(intervalRef.current ?? undefined)
        }
        return next
      })

      // small nutrient depletion over time
      setNutrients(prev => ({
        nitrogen: Math.max(prev.nitrogen - 1, 0),
        phosphorus: Math.max(prev.phosphorus - 0.5, 0),
        potassium: Math.max(prev.potassium - 0.7, 0),
      }))

      // soil health drifts with nutrient average
      setSoilHealth(prev => {
        const avg = (nutrients.nitrogen + nutrients.phosphorus + nutrients.potassium) / 3
        // gentle drift toward nutrients average (makes gameplay dynamic)
        const drift = Math.round((avg - prev) * 0.03)
        return Math.max(Math.min(prev + drift, 100), 0)
      })

      // random rainfall event that slightly boosts phosphorus
      if (Math.random() < 0.08) {
        setNutrients(prev => ({ ...prev, phosphorus: Math.min(prev.phosphorus + 8, 100) }))
        setScore(prev => prev + 30)
      }
    }, 1000)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (time <= 0) {
      const avgN = Math.round((nutrients.nitrogen + nutrients.phosphorus + nutrients.potassium) / 3)
      alert(`Game Over! Score: ${score} — Soil Health: ${soilHealth}% — Avg Nutrients: ${avgN}%`)
      backToMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const addCompost = () => {
    if (compost >= 10 && time > 0) {
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

  const plantRotation = (type: "legume" | "cereal" | "cover") => {
    if (time <= 0) return
    // planting affected by lastRotation: encourage diversity
    if (lastRotation === type) {
      // penalty for repeating same crop quickly
      setSoilHealth(prev => Math.max(prev - 6, 0))
      setScore(prev => Math.max(prev - 30, 0))
    } else {
      // benefits for rotation
      if (type === "legume") {
        setNutrients(prev => ({ ...prev, nitrogen: Math.min(prev.nitrogen + 12, 100) }))
        setSoilHealth(prev => Math.min(prev + 8, 100))
        setScore(prev => prev + 120)
      } else if (type === "cereal") {
        setNutrients(prev => ({ ...prev, potassium: Math.min(prev.potassium + 8, 100) }))
        setSoilHealth(prev => Math.min(prev + 5, 100))
        setScore(prev => prev + 80)
      } else {
        // cover crop
        setNutrients(prev => ({ ...prev, phosphorus: Math.min(prev.phosphorus + 6, 100) }))
        setSoilHealth(prev => Math.min(prev + 10, 100))
        setScore(prev => prev + 100)
      }
    }
    setLastRotation(type)
  }

  return (
    <DashboardLayout>
      <Button variant="outline" onClick={() => { if (intervalRef.current) window.clearInterval(intervalRef.current); backToMenu() }} className="mb-4">
        <Home className="mr-2" /> Back to Games
      </Button>

      <h1 className="text-xl font-semibold">{game.title}</h1>
      <p className="mb-4">{game.objective}</p>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent className="text-center">
            <Leaf className="text-green-600 mb-2" />
            <div>Soil Health: {soilHealth}%</div>
            <Progress value={soilHealth} className="mt-2" />
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
            <div>Time: {time}s</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Nitrogen</h3>
            <Progress value={nutrients.nitrogen} />
            <div className="text-sm mt-2">{Math.round(nutrients.nitrogen)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Phosphorus</h3>
            <Progress value={nutrients.phosphorus} />
            <div className="text-sm mt-2">{Math.round(nutrients.phosphorus)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-2">Potassium</h3>
            <Progress value={nutrients.potassium} />
            <div className="text-sm mt-2">{Math.round(nutrients.potassium)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3 mb-4">
        <Button onClick={addCompost} disabled={compost < 10}>Add Compost (-10)</Button>
        <Button onClick={() => plantRotation("legume")}>Plant Legume</Button>
        <Button onClick={() => plantRotation("cereal")}>Plant Cereal</Button>
        <Button onClick={() => plantRotation("cover")}>Plant Cover Crop</Button>
      </div>

      <div className="text-sm text-gray-600">
        Tip: Rotate crops (legume → cereal → cover) to keep nutrients balanced. Random rainfall events may help phosphorus.
      </div>
    </DashboardLayout>
  )
}

/* ---------------------- Biodiversity Defender (waves, deploy units, cooldowns) ---------------------- */
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
  const [time, setTime] = useState(80)
  const [cooldowns, setCooldowns] = useState({ releaseBees: 0, releaseLadybugs: 0 })
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTime(prev => {
        const next = prev - 1
        if (next <= 0) {
          window.clearInterval(intervalRef.current ?? undefined)
        }
        return next
      })

      // threats slowly increase (waves)
      setThreats(prev => ({
        pests: Math.min(prev.pests + 1, 100),
        diseases: Math.min(prev.diseases + (Math.random() < 0.2 ? 2 : 1), 100),
        chemicals: Math.min(prev.chemicals + (Math.random() < 0.08 ? 3 : 0.5), 100),
      }))

      // cooldowns tick down
      setCooldowns(prev => ({
        releaseBees: Math.max(prev.releaseBees - 1, 0),
        releaseLadybugs: Math.max(prev.releaseLadybugs - 1, 0),
      }))
    }, 1000)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (time <= 0) {
      // evaluate balance
      const beneficialAvg = Math.round((ecosystem.pollinators + ecosystem.beneficialInsects + ecosystem.birds + ecosystem.soilMicrobes) / 4)
      const threatsAvg = Math.round((threats.pests + threats.diseases + threats.chemicals) / 3)
      let finalMsg = `Final Score: ${score} — Beneficial Avg: ${beneficialAvg}% — Threats Avg: ${threatsAvg}%`
      if (beneficialAvg >= 60 && threatsAvg <= 40) finalMsg = "You Win! " + finalMsg
      else finalMsg = "You Lose. " + finalMsg
      alert(finalMsg)
      backToMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const deployDefense = (type: keyof typeof ecosystem) => {
    if (time <= 0) return
    setEcosystem(prev => ({ ...prev, [type]: Math.min(prev[type] + 8, 100) }))
    // reduce threats a bit
    setThreats(prev => ({
      pests: Math.max(prev.pests - 6, 0),
      diseases: Math.max(prev.diseases - 3, 0),
      chemicals: Math.max(prev.chemicals - 2, 0),
    }))
    setScore(prev => prev + 80)
  }

  const specialRelease = (which: "bees" | "ladybugs") => {
    if (time <= 0) return
    if (which === "bees" && cooldowns.releaseBees === 0) {
      setEcosystem(prev => ({ ...prev, pollinators: Math.min(prev.pollinators + 25, 100) }))
      setThreats(prev => ({ ...prev, pests: Math.max(prev.pests - 15, 0) }))
      setScore(prev => prev + 300)
      setCooldowns(prev => ({ ...prev, releaseBees: 25 }))
    } else if (which === "ladybugs" && cooldowns.releaseLadybugs === 0) {
      setEcosystem(prev => ({ ...prev, beneficialInsects: Math.min(prev.beneficialInsects + 25, 100) }))
      setThreats(prev => ({ ...prev, pests: Math.max(prev.pests - 20, 0) }))
      setScore(prev => prev + 350)
      setCooldowns(prev => ({ ...prev, releaseLadybugs: 30 }))
    }
  }

  return (
    <DashboardLayout>
      <Button variant="outline" onClick={() => { if (intervalRef.current) window.clearInterval(intervalRef.current); backToMenu() }} className="mb-4">
        <Home className="mr-2" /> Back to Games
      </Button>

      <h1 className="text-xl font-semibold">{game.title}</h1>
      <p className="mb-4">{game.objective}</p>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold">Pollinators</h3>
            <Progress value={ecosystem.pollinators} className="mb-2" />
            <div>{ecosystem.pollinators}%</div>
            <Button size="sm" onClick={() => deployDefense("pollinators")}>Deploy Pollinators</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Beneficial Insects</h3>
            <Progress value={ecosystem.beneficialInsects} className="mb-2" />
            <div>{ecosystem.beneficialInsects}%</div>
            <Button size="sm" onClick={() => deployDefense("beneficialInsects")}>Release Insects</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Threats (Pests)</h3>
            <Progress value={threats.pests} className="mb-2" />
            <div>{threats.pests}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Time & Score</h3>
            <div>Time: {time}s</div>
            <div>Score: {score}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3 mb-4">
        <Button onClick={() => specialRelease("bees")} disabled={cooldowns.releaseBees > 0}>
          Release Bees {cooldowns.releaseBees > 0 ? `(${cooldowns.releaseBees}s)` : ""}
        </Button>
        <Button onClick={() => specialRelease("ladybugs")} disabled={cooldowns.releaseLadybugs > 0}>
          Release Ladybugs {cooldowns.releaseLadybugs > 0 ? `(${cooldowns.releaseLadybugs}s)` : ""}
        </Button>
        <Button onClick={() => deployDefense("birds")}>Attract Birds</Button>
        <Button onClick={() => deployDefense("soilMicrobes")}>Add Microbes</Button>
      </div>

      <div className="text-sm text-gray-600">
        Watch out for pest waves — use special releases on cooldown to regain control quickly.
      </div>
    </DashboardLayout>
  )
}

/* ---------------------- Energy Farmer (renewables, blackouts, upgrades) ---------------------- */
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
  const [time, setTime] = useState(100)
  const [blackout, setBlackout] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTime(prev => {
        const next = prev - 1
        if (next <= 0) {
          window.clearInterval(intervalRef.current ?? undefined)
        }
        return next
      })

      // Random blackout event
      if (!blackout && Math.random() < 0.06) {
        setBlackout(true)
        setTimeout(() => setBlackout(false), 6000 + Math.floor(Math.random() * 5000)) // blackout lasts 6-11s
      }

      // natural renewable charge drift
      setEnergy(prev => ({
        solar: Math.min(prev.solar + (Math.random() < 0.4 ? 2 : 0), 100),
        wind: Math.min(prev.wind + (Math.random() < 0.25 ? 3 : 0), 100),
        grid: Math.max(prev.grid - 1, 0),
      }))

      // consumption fluctuates
      setConsumption(prev => ({
        irrigation: Math.min(Math.max(prev.irrigation + (Math.random() < 0.3 ? 1 : -1), 10), 80),
        processing: Math.min(Math.max(prev.processing + (Math.random() < 0.25 ? 1 : -1), 5), 60),
        lighting: Math.min(Math.max(prev.lighting + (Math.random() < 0.2 ? 1 : -1), 5), 50),
        cooling: Math.min(Math.max(prev.cooling + (Math.random() < 0.3 ? 1 : -1), 5), 60),
      }))

      // efficiency slightly improves if renewables are high
      setEfficiency(prev => {
        const renewablesAvg = (energy.solar + energy.wind) / 2
        const delta = renewablesAvg > 60 ? 1 : renewablesAvg > 40 ? 0.5 : -0.3
        return Math.max(Math.min(Math.round((prev + delta) * 10) / 10, 100), 0)
      })

      // cost slowly updates based on grid usage
      setCost(prev => {
        const gridUsage = 100 - (energy.solar + energy.wind + energy.grid) / 2
        const newCost = Math.max(Math.round(prev + (gridUsage > 50 ? 10 : -5)), 0)
        return newCost
      })
    }, 1000)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blackout])

  useEffect(() => {
    if (time <= 0) {
      const renewables = Math.round((energy.solar + energy.wind) / 2)
      let result = `Final Score: ${score} — Renewables Avg: ${renewables}% — Monthly Cost: ₹${cost}`
      if (renewables >= 60 && cost <= 1000) result = "You Win! " + result
      else result = "Try Again. " + result
      alert(result)
      backToMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const upgradeRenewable = (type: keyof typeof energy) => {
    if (time <= 0) return
    // pay some 'cost' (reduce score or money); here we use score as a proxy currency
    setEnergy(prev => {
      if (prev[type] >= 100) return prev
      const change = { ...prev, [type]: Math.min(prev[type] + 12, 100), grid: Math.max(prev.grid - 6, 0) }
      return change
    })
    setEfficiency(prev => Math.min(prev + 6, 100))
    setCost(prev => Math.max(prev - 120, 0))
    setScore(prev => prev + 200)
  }

  const emergencyReduceConsumption = () => {
    if (time <= 0) return
    setConsumption(prev => ({
      irrigation: Math.max(prev.irrigation - 12, 5),
      processing: Math.max(prev.processing - 10, 5),
      lighting: Math.max(prev.lighting - 8, 5),
      cooling: Math.max(prev.cooling - 10, 5),
    }))
    setScore(prev => prev + 120)
  }

  return (
    <DashboardLayout>
      <Button variant="outline" onClick={() => { if (intervalRef.current) window.clearInterval(intervalRef.current); backToMenu() }} className="mb-4">
        <Home className="mr-2" /> Back to Games
      </Button>

      <h1 className="text-xl font-semibold">{game.title}</h1>
      <p className="mb-4">{game.objective}</p>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold">Solar</h3>
            <Progress value={energy.solar} />
            <div>{energy.solar}%</div>
            <Button size="sm" onClick={() => upgradeRenewable("solar")}>Upgrade Solar</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Wind</h3>
            <Progress value={energy.wind} />
            <div>{energy.wind}%</div>
            <Button size="sm" onClick={() => upgradeRenewable("wind")}>Upgrade Wind</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Grid</h3>
            <Progress value={energy.grid} />
            <div>{energy.grid}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Status</h3>
            <div>Time: {time}s</div>
            <div>Cost: ₹{cost}</div>
            <div>Score: {score}</div>
            <div>{blackout ? "Blackout Active!" : "Grid Stable"}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Consumption</h4>
        {Object.entries(consumption).map(([system, percent]) => (
          <div key={system} className="flex justify-between mb-1">
            <span className="capitalize">{system}</span>
            <span>{percent}%</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={emergencyReduceConsumption}>Emergency Reduce Consumption</Button>
        <Button onClick={() => upgradeRenewable("wind")}>Upgrade Wind</Button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Random blackouts may force you to rely on renewables — upgrade them to reduce monthly cost and increase efficiency.
      </div>
    </DashboardLayout>
  )
}
