"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Globe, Loader2 } from "lucide-react"

interface GoogleTrendsSectionProps {
  searchTerm: string
}

export function GoogleTrendsSection({ searchTerm }: GoogleTrendsSectionProps) {
  const timeseriesRef = useRef<HTMLDivElement>(null)
  const geoMapRef = useRef<HTMLDivElement>(null)
  const [timeRange, setTimeRange] = useState("today 12-m")
  const [isLoading, setIsLoading] = useState(false)
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

  const renderTrendsWidgets = () => {
    if (!searchTerm || !scriptLoaded || typeof window === "undefined" || !window.trends) return

    setIsLoading(true)

    try {
      // Clear previous widgets
      if (timeseriesRef.current) {
        timeseriesRef.current.innerHTML = ""
      }
      if (geoMapRef.current) {
        geoMapRef.current.innerHTML = ""
      }

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        // Render Interest Over Time widget
        if (timeseriesRef.current && window.trends) {
          window.trends.embed.renderExploreWidgetTo(
            timeseriesRef.current,
            "TIMESERIES",
            {
              comparisonItem: [{ keyword: searchTerm, geo: "", time: timeRange }],
              category: 0,
              property: "",
            },
            {
              exploreQuery: `q=${encodeURIComponent(searchTerm)}&date=${encodeURIComponent(timeRange)}`,
              guestPath: "https://trends.google.com:443/trends/embed/",
            },
          )
        }

        // Render Geographic Interest widget
        if (geoMapRef.current && window.trends) {
          window.trends.embed.renderExploreWidgetTo(
            geoMapRef.current,
            "GEO_MAP",
            {
              comparisonItem: [{ keyword: searchTerm, geo: "", time: timeRange }],
              category: 0,
              property: "",
            },
            {
              exploreQuery: `q=${encodeURIComponent(searchTerm)}&date=${encodeURIComponent(timeRange)}`,
              guestPath: "https://trends.google.com:443/trends/embed/",
            },
          )
        }

        // Set loading to false after widgets render
        setTimeout(() => setIsLoading(false), 2000)
      }, 100)
    } catch (error) {
      console.error("Error rendering Google Trends widgets:", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (searchTerm && scriptLoaded) {
      renderTrendsWidgets()
    }
  }, [searchTerm, timeRange, scriptLoaded])

  if (!searchTerm) return null

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Google Trends Analysis</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore search interest patterns and geographic distribution for "{searchTerm}" to understand market demand
          and opportunities.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Interest Over Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <CardTitle>Interest Over Time</CardTitle>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now 1-H">Past hour</SelectItem>
                  <SelectItem value="now 4-H">Past 4 hours</SelectItem>
                  <SelectItem value="now 1-d">Past day</SelectItem>
                  <SelectItem value="now 7-d">Past 7 days</SelectItem>
                  <SelectItem value="today 1-m">Past 30 days</SelectItem>
                  <SelectItem value="today 3-m">Past 3 months</SelectItem>
                  <SelectItem value="today 12-m">Past 12 months</SelectItem>
                  <SelectItem value="today 5-y">Past 5 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>Search interest trends for your keyword over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] relative bg-gray-50 rounded-lg overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg z-10">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Loading trends data...</p>
                  </div>
                </div>
              )}
              <div
                ref={timeseriesRef}
                className="w-full h-full"
                style={{
                  width: "100%",
                  height: "300px",
                  maxWidth: "100%",
                  maxHeight: "300px",
                  overflow: "hidden",
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <CardTitle>Geographic Interest</CardTitle>
            </div>
            <CardDescription>Regional search interest distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] relative bg-gray-50 rounded-lg overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg z-10">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
                    <p className="text-sm text-gray-600">Loading geographic data...</p>
                  </div>
                </div>
              )}
              <div
                ref={geoMapRef}
                className="w-full h-full"
                style={{
                  width: "100%",
                  height: "300px",
                  maxWidth: "100%",
                  maxHeight: "300px",
                  overflow: "hidden",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
