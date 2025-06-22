"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search, Sparkles, TrendingUp, FileText, Loader2 } from "lucide-react"
import { QueriesSection } from "@/components/queries-section"
import { ContentAnalysisSection } from "@/components/content-analysis-section"
import { ContentGenerationSection } from "@/components/content-generation-section"
import { GoogleTrendsSection } from "@/components/google-trends-section"
import Link from "next/link"

const ROTATING_SUGGESTIONS = [
"best paneer recipes for dinner",
"healthy yogurt brands for weight loss",
"iphone 15 deals near me",
"top running shoes for flat feet",
"car wash offers in Bangalore",
"natural skincare routine for glowing skin",
"home gym equipment under 10000",
"easy meal kits for busy professionals",
"electric scooters for city commute",
"best specialty coffee brands in India"
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [relatedQueries, setRelatedQueries] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)

  // Rotate suggestions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestionIndex((prev) => (prev + 1) % ROTATING_SUGGESTIONS.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleAmplify = async () => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)

    try {
      // Call the real API endpoint
      const response = await fetch("https://amplify-test-1002947097936.asia-south2.run.app/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: newSessionId,
          seedTerm: searchTerm,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setRelatedQueries(data.relatedQueries || [])
        setCurrentStep(1)
      }
    } catch (error) {
      console.error("Error generating queries:", error)
      // For demo purposes, set mock data
      setRelatedQueries([
        `${searchTerm} best practices`,
        `${searchTerm} trends 2024`,
        `${searchTerm} case studies`,
        `${searchTerm} strategies`,
        `${searchTerm} tools and techniques`,
      ])
      setCurrentStep(1)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
  }

  const steps = [
    { id: 0, title: "Enter Keyword", icon: Search },
    { id: 1, title: "Trending Queries", icon: TrendingUp },
    { id: 2, title: "Content Analysis", icon: FileText },
    { id: 3, title: "Generate Content", icon: Sparkles },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Amplify</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
              <Button variant="outline">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Multi-Agent AI for
              <span className="text-blue-600 block">Intelligent Content</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your marketing strategy with our AI-powered content generation platform. From keyword research
              to content creation, amplify your digital presence with intelligent automation.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="flex gap-4 p-2 bg-white rounded-2xl shadow-lg border">
                <Input
                  type="text"
                  placeholder="Enter your seed keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                  onKeyPress={(e) => e.key === "Enter" && handleAmplify()}
                />
                <Button
                  onClick={handleAmplify}
                  disabled={!searchTerm.trim() || isLoading}
                  size="lg"
                  className="px-8 bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Amplify
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Rotating Suggestions */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {ROTATING_SUGGESTIONS.slice(currentSuggestionIndex, currentSuggestionIndex + 3).map(
                    (suggestion, index) => (
                      <button
                        key={`${currentSuggestionIndex}-${index}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
                      >
                        {suggestion}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            {currentStep > 0 && (
              <div className="flex justify-center items-center space-x-4 mb-12">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep >= step.id
                  const isCurrent = currentStep === step.id

                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                          isActive
                            ? isCurrent
                              ? "bg-blue-600 text-white"
                              : "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-8 h-0.5 mx-2 ${currentStep > step.id ? "bg-green-300" : "bg-gray-200"}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-4 pb-20">
          {currentStep >= 1 && (
            <div className="space-y-12">
              {/* Queries Section */}
              <QueriesSection
                searchTerm={searchTerm}
                relatedQueries={relatedQueries}
                onNext={() => {
                  setCurrentStep(2)
                  // Auto-scroll to content analysis section
                  setTimeout(() => {
                    const element = document.getElementById("content-analysis-section")
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  }, 100)
                }}
              />

              {currentStep >= 2 && (
                <div id="content-analysis-section">
                  <ContentAnalysisSection
                    sessionId={sessionId}
                    queries={relatedQueries}
                    onNext={() => {
                      setCurrentStep(3)
                      // Auto-scroll to content generation section
                      setTimeout(() => {
                        const element = document.getElementById("content-generation-section")
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                      }, 100)
                    }}
                  />
                </div>
              )}

              {currentStep >= 3 && (
                <div id="content-generation-section">
                  <ContentGenerationSection sessionId={sessionId} />
                </div>
              )}

              {/* Google Trends Section */}
              <GoogleTrendsSection searchTerm={searchTerm} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold">Amplify</h3>
              </div>
              <p className="text-gray-400">Intelligent content generation powered by multi-agent AI systems.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Amplify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
