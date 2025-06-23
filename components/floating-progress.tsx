"use client"

import { useEffect, useState } from "react"
import { Search, TrendingUp, FileText, Sparkles, CheckCircle, Clock, ArrowRight } from "lucide-react"

interface FloatingProgressProps {
  currentStep: number
  isLoading?: boolean
  searchTerm?: string
}

export function FloatingProgress({ currentStep, isLoading = false, searchTerm }: FloatingProgressProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show floating progress when user scrolls past the hero section
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const steps = [
    {
      id: 0,
      title: "Enter Keyword",
      icon: Search,
      description: "Start with your seed keyword",
      status: currentStep > 0 ? "completed" : currentStep === 0 ? "current" : "pending",
    },
    {
      id: 1,
      title: "Trending Queries",
      icon: TrendingUp,
      description: "AI-generated related queries",
      status: currentStep > 1 ? "completed" : currentStep === 1 ? "current" : "pending",
    },
    {
      id: 2,
      title: "Content Analysis",
      icon: FileText,
      description: "Analyze search results",
      status: currentStep > 2 ? "completed" : currentStep === 2 ? "current" : "pending",
    },
    {
      id: 3,
      title: "Generate Content",
      icon: Sparkles,
      description: "Create optimized content",
      status: currentStep > 3 ? "completed" : currentStep === 3 ? "current" : "pending",
    },
  ]

  if (!isVisible || currentStep === 0) return null

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300">
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg px-6 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          {/* Current Keyword */}
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Working on: <span className="text-blue-600 font-semibold">"{searchTerm}"</span>
            </span>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.status === "current"
              const isCompleted = step.status === "completed"
              const isPending = step.status === "pending"

              return (
                <div key={step.id} className="flex items-center">
                  <div className="relative group">
                    <div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-100 text-green-700"
                          : isActive
                            ? isLoading
                              ? "bg-blue-100 text-blue-700"
                              : "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : isActive && isLoading ? (
                        <Clock className="h-4 w-4 animate-spin" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                      <span className="text-xs font-medium hidden sm:inline">{step.title}</span>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {step.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`w-6 h-0.5 mx-1 transition-colors duration-300 ${
                        currentStep > step.id ? "bg-green-300" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Next Action Indicator */}
          {currentStep < 3 && (
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>Next:</span>
              <div className="flex items-center space-x-1">
                <span className="font-medium">{steps[currentStep + 1]?.title}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-600 h-1 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
