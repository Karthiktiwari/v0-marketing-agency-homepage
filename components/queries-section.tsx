"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Sparkles, ArrowRight, AlertCircle } from "lucide-react"

interface QueriesSectionProps {
  searchTerm: string
  relatedQueries: string[]
  onNext: () => void
}

export function QueriesSection({ searchTerm, relatedQueries, onNext }: QueriesSectionProps) {
  // Mock Google Trends related queries for demonstration
  const mockTrendsQueries = [
    `${searchTerm} tutorial`,
    `best ${searchTerm} practices`,
    `${searchTerm} vs alternatives`,
    `${searchTerm} guide 2024`,
    `how to use ${searchTerm}`,
  ]

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

        {/* Mock Google Trends Queries */}
        <Card className="border-2 border-green-100 bg-green-50/50 opacity-75">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <CardTitle className="text-green-900">Google Trends Queries</CardTitle>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                <AlertCircle className="h-3 w-3 mr-1" />
                Demo Mode
              </Badge>
            </div>
            <CardDescription>Mock trending searches (Google Trends integration disabled)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTrendsQueries.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="text-gray-800 font-medium">{query}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Mock Data
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                Google Trends integration is disabled. This shows mock data for testing purposes.
              </p>
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
