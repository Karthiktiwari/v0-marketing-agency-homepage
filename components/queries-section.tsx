"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Sparkles, ArrowRight, Loader2 } from "lucide-react"

interface QueriesSectionProps {
  searchTerm: string
  relatedQueries: string[]
  onNext: () => void
}

export function QueriesSection({ searchTerm, relatedQueries, onNext }: QueriesSectionProps) {
  const relatedQueriesRef = useRef<HTMLDivElement>(null)
  const [isLoadingTrends, setIsLoadingTrends] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Load Google Trends script
  useEffect(() => {
    if (scriptLoaded) return

    const script = document.createElement("script")
    script.src = "https://ssl.gstatic.com/trends_nrtr/4116_RC01/embed_loader.js"
    script.type = "text/javascript"
    script.addEventListener("load", () => setScriptLoaded(true))
    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [scriptLoaded])

  const renderRelatedQueriesWidget = () => {
    if (!searchTerm || !scriptLoaded || typeof window === "undefined" || !window.trends) return

    setIsLoadingTrends(true)

    try {
      // Clear previous widget
      if (relatedQueriesRef.current) {
        relatedQueriesRef.current.innerHTML = ""
      }

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        // Render Related Queries widget
        if (relatedQueriesRef.current && window.trends) {
          window.trends.embed.renderExploreWidgetTo(
            relatedQueriesRef.current,
            "RELATED_TOPICS",
            {
              comparisonItem: [{ keyword: searchTerm, geo: "", time: "today 12-m" }],
              category: 0,
              property: "",
            },
            {
              exploreQuery: `q=${encodeURIComponent(searchTerm)}&date=today%2012-m`,
              guestPath: "https://trends.google.com:443/trends/embed/",
            },
          )
        }

        // Set loading to false after a delay
        setTimeout(() => setIsLoadingTrends(false), 2000)
      }, 100)
    } catch (error) {
      console.error("Error rendering Google Trends related queries:", error)
      setIsLoadingTrends(false)
    }
  }

  useEffect(() => {
    if (searchTerm && scriptLoaded) {
      renderRelatedQueriesWidget()
    }
  }, [searchTerm, scriptLoaded])

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Trending & Relevant Queries</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover AI-optimized queries and trending searches related to "{searchTerm}" to maximize your content's reach
          and engagement.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Optimized Queries */}
        <Card className="border-2 border-blue-100 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-900">AI-Optimized Queries</CardTitle>
            </div>
            <CardDescription>Intelligent query suggestions powered by our multi-agent AI system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {relatedQueries.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="text-gray-800 font-medium">{query}</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    AI Generated
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Google Trends Related Queries */}
        <Card className="border-2 border-green-100 bg-green-50/50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-900">Google Trends Related Topics</CardTitle>
            </div>
            <CardDescription>Real-time trending topics from Google Trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px] relative bg-gray-50 rounded-lg overflow-hidden">
              {isLoadingTrends && (
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg border z-10">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
                    <p className="text-sm text-gray-600">Loading related topics...</p>
                  </div>
                </div>
              )}
              <div
                ref={relatedQueriesRef}
                className="w-full h-full"
                style={{
                  width: "100%",
                  height: "400px",
                  maxWidth: "100%",
                  maxHeight: "400px",
                  overflow: "hidden",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button onClick={onNext} size="lg" className="bg-blue-600 hover:bg-blue-700">
          Proceed to Content Analysis
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </section>
  )
}
