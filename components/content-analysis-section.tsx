"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Loader2, ArrowRight, Eye, TrendingUp, Users, Target } from "lucide-react"

interface ContentAnalysisSectionProps {
  sessionId: string
  queries: string[]
  onNext: () => void
}

// Function to clean HTML content by removing markdown code block markers
const cleanHtmlContent = (content: string): string => {
  // Remove \`\`\`html at the beginning and \`\`\` at the end
  return content
    .replace(/^```html\s*/, "")
    .replace(/\s*```$/, "")
    .trim()
}

export function ContentAnalysisSection({ sessionId, queries, onNext }: ContentAnalysisSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState<string | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)

  const handleAnalyze = async () => {
    setIsLoading(true)
    setShowSuccessBanner(false)

    try {
      const response = await fetch("https://amplify-test-1002947097936.asia-south2.run.app/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const cleanedContent = cleanHtmlContent(data.summary || "No analysis data available")
        setAnalysisData(cleanedContent)
      } else {
        // Mock analysis data for demo
        setAnalysisData(`
        <div class="summary">
          <h3>Main Concepts:</h3>
          <ul>
            <li>Digital marketing strategies and best practices</li>
            <li>SEO optimization techniques</li>
            <li>Content marketing trends</li>
            <li>Social media engagement tactics</li>
          </ul>
          
          <h3>Trends and Patterns:</h3>
          <ul>
            <li>Increased focus on AI-powered marketing tools</li>
            <li>Growing importance of video content</li>
            <li>Emphasis on personalization and customer experience</li>
            <li>Rise of voice search optimization</li>
          </ul>
          
          <h3>Popular Sources:</h3>
          <ul>
            <li>HubSpot Marketing Blog</li>
            <li>Moz SEO Learning Center</li>
            <li>Content Marketing Institute</li>
            <li>Social Media Examiner</li>
          </ul>
          
          <h3>Content Gaps or Opportunities:</h3>
          <ul>
            <li>Lack of comprehensive guides for small businesses</li>
            <li>Limited content on emerging platforms</li>
            <li>Opportunity for case study-driven content</li>
            <li>Need for more actionable, step-by-step tutorials</li>
          </ul>
        </div>
      `)
      }
      setShowAnalysis(true)

      // Show success banner and scroll to analysis
      setShowSuccessBanner(true)
      setTimeout(() => {
        const analysisElement = document.getElementById("analysis-content-display")
        if (analysisElement) {
          analysisElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)

      // Hide banner after 3 seconds
      setTimeout(() => setShowSuccessBanner(false), 3000)
    } catch (error) {
      console.error("Error analyzing content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="space-y-8">
      {showSuccessBanner && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span className="font-medium">Analysis completed successfully! 📊</span>
          </div>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Trending Search Content Analysis</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get comprehensive insights from top search results to understand market trends, audience preferences, and
          content opportunities.
        </p>
      </div>

      <Card className="border-2 border-purple-100 bg-purple-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">Content Analysis Report</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              AI-Powered
            </Badge>
          </div>
          <CardDescription>Comprehensive analysis of search results, trends, and content opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          {!showAnalysis ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm font-medium">Trend Analysis</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm font-medium">Audience Insights</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm font-medium">Content Gaps</p>
                  </div>
                  <div className="text-center">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm font-medium">Market Overview</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing Content...
                  </>
                ) : (
                  <>
                    <Eye className="h-5 w-5 mr-2" />
                    View Analysis
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div id="analysis-content-display" className="bg-white rounded-lg p-6 border shadow-sm">
                <div
                  className="prose prose-purple max-w-none"
                  dangerouslySetInnerHTML={{ __html: analysisData || "" }}
                  style={{
                    backgroundColor: "#fefefe",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                  }}
                />
              </div>
              <div className="text-center">
                <Button onClick={onNext} size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Generate Content
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
