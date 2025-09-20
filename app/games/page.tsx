"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Trophy, Star, Clock, Award, TrendingUp, Users, Home, RefreshCcw, Puzzle, Calculator } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const miniGames = [
  {
    id: "match-pairs",
    title: "Match the Following",
    description: "Flip cards to match sustainable farming terms with their meanings",
    icon: Puzzle,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    borderColor: "border-pink-200",
    difficulty: "Easy",
    duration: "5-8 min",
    points: 60,
    players: 1320,
    rating: 4.7,
    completed: false,
    bestScore: 0,
    objective: "Learn sustainability concepts by matching pairs",
    skills: ["Memory", "Concept Mapping", "Sustainability Basics"],
  },
  {
    id: "sum-puzzle",
    title: "Sustainability Sum Puzzle",
    description: "Select actions to exactly reach the target sustainability score",
    icon: Calculator,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    borderColor: "border-teal-200",
    difficulty: "Medium",
    duration: "6-10 min",
    points: 80,
    players: 745,
    rating: 4.6,
    completed: false,
    bestScore: 0,
    objective: "Optimize choices to hit the exact target score",
    skills: ["Planning", "Arithmetic", "Trade-offs"],
  },
]

const achievements = [
  { id: "first-play", name: "First Steps", description: "Play your first mini-game", icon: Play, earned: true },
  { id: "eco-champion", name: "Eco Champion", description: "Complete all mini-games", icon: Play, earned: false },
]

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameState, setGameState] = useState<"menu" | "playing" | "completed">("menu")
  const [session, setSession] = useState(0)

  // Multilingual support (basic)
  const [lang, setLang] = useState<"en" | "hi" | "ml">("en")
  useEffect(() => {
    try {
      const saved = localStorage.getItem("beejsetu-language") as "en" | "hi" | "ml" | null
      if (saved) setLang(saved)
    } catch {}
  }, [])

  const translations: Record<string, Record<string, string>> = {
    en: {
      games_title: "Learning Mini-Games",
      games_subtitle: "Learn sustainable farming through interactive games",
      available_games: "Available Games",
      achievements: "Game Achievements",
      back_to_games: "Back to Games",
      restart: "Restart",
      start_game: "Start Game",
      play_again: "Play Again",
      score: "Score",
      best: "Best",
    },
    hi: {
      games_title: "सीखने वाले मिनी-गेम्स",
      games_subtitle: "इंटरैक्टिव खेलों के माध्यम से टिकाऊ खेती सीखें",
      available_games: "उपलब्ध खेल",
      achievements: "उपलब्धियाँ",
      back_to_games: "खेलों पर वापस",
      restart: "दोबारा शुरू करें",
      start_game: "खेल शुरू करें",
      play_again: "फिर से खेलें",
      score: "स्कोर",
      best: "सर्वश्रेष्ठ",
    },
    ml: {
      games_title: "പഠന മിനി-ഗെയിമുകൾ",
      games_subtitle: "ഇന്ററാക്ടീവ് ഗെയിമുകൾ വഴി സുസ്ഥിര കൃഷി പഠിക്കുക",
      available_games: "ലഭ്യമായ ഗെയിമുകൾ",
      achievements: "നേട്ടങ്ങൾ",
      back_to_games: "ഗെയിമുകളിലേക്ക് മടങ്ങുക",
      restart: "വീണ്ടും തുടങ്ങുക",
      start_game: "ഗെയിം ആരംഭിക്കുക",
      play_again: "വീണ്ടും കളിക്കുക",
      score: "സ്കോർ",
      best: "മികച്ചത്",
    },
  }
  const t = (key: string) => translations[lang]?.[key] ?? translations.en[key] ?? key

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
                {t("back_to_games")}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{game.title}</h1>
                <p className="text-gray-600">{game.objective}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-800">{game.difficulty}</Badge>
              <Button
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={() => setSession((s) => s + 1)}
                aria-label="Restart game"
                title="Restart"
              >
                <RefreshCcw className="w-4 h-4 mr-2" /> {t("restart")}
              </Button>
              <div className="text-right ml-2">
                <div className="text-lg font-bold text-orange-600">{t("score")}: 0</div>
                <div className="text-sm text-gray-500">{t("best")}: {game.bestScore}</div>
              </div>
            </div>
          </div>

          {/* Game Component (only new games are playable) */}
          {selectedGame === "match-pairs" && <MatchPairsGame key={session} />}
          {selectedGame === "sum-puzzle" && <SumPuzzleGame key={session} />}
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
            <h1 className="text-3xl font-bold text-gray-900">{t("games_title")}</h1>
            <p className="text-gray-600 mt-1">{t("games_subtitle")}</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t("available_games")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {miniGames
              .filter((g) => g.id === "match-pairs" || g.id === "sum-puzzle")
              .map((game) => {
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
                      {game.completed ? t("play_again") : t("start_game")}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t("achievements")}</h2>
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

// New Game: Match the Following (Pairs)
function MatchPairsGame() {
  type Card = { id: number; pairId: number; text: string; flipped: boolean; matched: boolean }
  const [lang, setLang] = useState<"en" | "hi" | "ml">("en")
  useEffect(() => {
    try {
      const saved = localStorage.getItem("beejsetu-language") as "en" | "hi" | "ml" | null
      if (saved) setLang(saved)
    } catch {}
  }, [])

  const tr = {
    en: { title: "Match the Following", moves: "Moves", matches: "Matches Found", reset: "Reset", howto: "Flip cards to match terms with their meanings" },
    hi: { title: "मिलान करें", moves: "चालें", matches: "मिले हुए जोड़े", reset: "रीसेट", howto: "कार्ड पलटें और शब्दों का उनके अर्थ से मिलान करें" },
    ml: { title: "മാച്ച് ദ ഫോളോയിങ്", moves: "നടപടികൾ", matches: "കണ്ടെത്തിയ ജോഡികൾ", reset: "റീസെറ്റ്", howto: "വാക്കുകളും അതിന്റെ അർത്ഥവും പൊരുത്തപ്പെടുത്താൻ കാർഡുകൾ തിരിക്കുക" },
  } as const
  const t = (k: keyof typeof tr.en) => tr[lang][k]

  const basePairs: Array<[string, string]> = [
    [lang === "hi" ? "टपक सिंचाई" : lang === "ml" ? "ഡ്രിപ്പ് ഇറിഗേഷൻ" : "Drip Irrigation", lang === "hi" ? "जल की बचत करने वाली सिंचाई" : lang === "ml" ? "ജലം ലാഭിക്കുന്ന ജലസേചനം" : "Water-saving irrigation"],
    [lang === "hi" ? "कम्पोस्ट" : lang === "ml" ? "കമ്പോസ്റ്റ്" : "Compost", lang === "hi" ? "जैविक खाद" : lang === "ml" ? "സാവകാശ വളം" : "Organic fertilizer"],
    [lang === "hi" ? "परागण" : lang === "ml" ? "പരാഗണം" : "Pollination", lang === "hi" ? "फूलों के माध्यम से प्रजनन" : lang === "ml" ? "പുഷ്പങ്ങളുടെ വഴി പ്രജനനം" : "Reproduction via flowers"],
  ]

  const buildDeck = (): Card[] => {
    let id = 1
    const deck: Card[] = []
    basePairs.forEach(([term, meaning], idx) => {
      deck.push({ id: id++, pairId: idx, text: term, flipped: false, matched: false })
      deck.push({ id: id++, pairId: idx, text: meaning, flipped: false, matched: false })
    })
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
  }

  const [deck, setDeck] = useState<Card[]>(buildDeck)
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    setDeck(buildDeck())
    setFlippedIds([])
    setMoves(0)
  }, [lang])

  const onFlip = (id: number) => {
    setDeck((prev) => prev.map((c) => (c.id === id && !c.matched ? { ...c, flipped: !c.flipped } : c)))
    const next = [...flippedIds, id].filter((v, i, a) => a.indexOf(v) === i)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next
      const ca = deck.find((c) => c.id === a)
      const cb = deck.find((c) => c.id === b)
      if (ca && cb && ca.pairId === cb.pairId) {
        setDeck((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)))
        setTimeout(() => {
          setDeck((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c)))
        }, 400)
      } else {
        setTimeout(() => {
          setDeck((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c)))
        }, 600)
      }
      setFlippedIds([])
    } else {
      setFlippedIds(next)
    }
  }

  const reset = () => {
    setDeck(buildDeck())
    setFlippedIds([])
    setMoves(0)
  }

  const matchesFound = deck.filter((c) => c.matched).length / 2

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md">
        <CardContent className="p-4 flex items-center justify_between">
          <div>
            <h2 className="text-xl font-bold">{t("title")}</h2>
            <p className="text-gray-600 text-sm">{t("howto")}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-700">
              {t("moves")}: <span className="font-semibold">{moves}</span>
            </span>
            <span className="text-gray-700">
              {t("matches")}: <span className="font-semibold">{matchesFound}/3</span>
            </span>
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50" onClick={reset}>
              {t("reset")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {deck.map((card) => (
          <Card
            key={card.id}
            className={`cursor-pointer border-0 shadow-md transition-transform ${
              card.matched ? "ring-2 ring-green-400" : "hover:translate-y-[-2px]"
            }`}
            onClick={() => (!card.flipped && !card.matched ? onFlip(card.id) : null)}
          >
            <CardContent className="p-6 h-28 flex items-center justify-center">
              <span className={`text-center ${card.flipped || card.matched ? "text-gray-900" : "text-gray-300"}`}>
                {card.flipped || card.matched ? card.text : "?"}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// New Game: Sustainability Sum Puzzle
function SumPuzzleGame() {
  const [lang, setLang] = useState<"en" | "hi" | "ml">("en")
  useEffect(() => {
    try {
      const saved = localStorage.getItem("beejsetu-language") as "en" | "hi" | "ml" | null
      if (saved) setLang(saved)
    } catch {}
  }, [])

  const tr = {
    en: {
      title: "Sustainability Sum Puzzle",
      target: "Target",
      current: "Current Sum",
      submit: "Submit",
      reset: "Reset",
      success: "Great! Exact target reached.",
      tryagain: "Not exact. Try again!",
    },
    hi: {
      title: "सस्टेनेबिलिटी सम पहेली",
      target: "लक्ष्य",
      current: "वर्तमान योग",
      submit: "जमा करें",
      reset: "रीसेट",
      success: "शानदार! लक्ष्य पूरा हुआ।",
      tryagain: "सटीक नहीं। फिर से कोशिश करें!",
    },
    ml: {
      title: "സുസ്ഥിരത സം പസിൽ",
      target: "ലക്ഷ്യം",
      current: "നിലവിലെ മൊത്തം",
      submit: "സമർപ്പിക്കുക",
      reset: "റീസെറ്റ്",
      success: "ശ്രദ്ധേയമാണ്! ലക്ഷ്യം നേടി.",
      tryagain: "സരിയായി ഇല്ല. വീണ്ടും ശ്രമിക്കൂ!",
    },
  } as const
  const t = (k: keyof typeof tr.en) => tr[lang][k]

  const actions = [
    { id: 1, en: "Drip Irrigation", hi: "टपक सिंचाई", ml: "ഡ്രിപ്പ് ഇറിഗേഷൻ", value: 5 },
    { id: 2, en: "Composting", hi: "कम्पोस्टिंग", ml: "കമ്പോസ്റ്റിംഗ്", value: 3 },
    { id: 3, en: "Mulching", hi: "मल्चिंग", ml: "മൾച്ചിംഗ്", value: 2 },
    { id: 4, en: "Solar Pump", hi: "सौर पंप", ml: "സോളാർ പമ്പ്", value: 7 },
    { id: 5, en: "Rainwater Harvesting", hi: "वर्षा जल संचयन", ml: "മഴവെള്ള ശേഖരണം", value: 8 },
  ]

  const [target, setTarget] = useState<number>(() => 10 + Math.floor(Math.random() * 10))
  const [selected, setSelected] = useState<number[]>([])
  const [message, setMessage] = useState<string | null>(null)

  const toggle = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    setMessage(null)
  }

  const currentSum = selected.reduce((sum, id) => sum + (actions.find((a) => a.id === id)?.value ?? 0), 0)

  const submit = () => {
    if (currentSum === target) {
      setMessage("success")
    } else {
      setMessage("try")
    }
  }

  const reset = () => {
    setSelected([])
    setMessage(null)
    setTarget(10 + Math.floor(Math.random() * 10))
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{t("title")}</h2>
            <p className="text-gray-600 text-sm">
              {t("target")}: <span className="font-semibold">{target}</span>
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-700">
              {t("current")}: <span className="font-semibold">{currentSum}</span>
            </span>
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50" onClick={reset}>
              {t("reset")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((a) => (
          <Card
            key={a.id}
            className={`cursor-pointer border-0 shadow-md ${selected.includes(a.id) ? "ring-2 ring-orange-400" : ""}`}
            onClick={() => toggle(a.id)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-semibold text-gray-900">{a[lang]}</div>
                <div className="text-xs text-gray-500">+{a.value}</div>
              </div>
              <Badge className={selected.includes(a.id) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}>
                {selected.includes(a.id) ? "✓" : "+"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={submit}>
          {t("submit")}
        </Button>
        {message === "success" && (
          <Badge className="bg-green-100 text-green-800">{t("success")}</Badge>
        )}
        {message === "try" && <Badge className="bg-red-100 text-red-800">{t("tryagain")}</Badge>}
      </div>
    </div>
  )
}
