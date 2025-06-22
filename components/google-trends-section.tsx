"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Globe, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GoogleTrendsSectionProps {
  searchTerm: string
}

export function GoogleTrendsSection({ searchTerm }: GoogleTrendsSectionProps) {
  if (!searchTerm) return null

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Google Trends Analysis</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore search interest patterns and geographic distribution for "{searchTerm}" to understand market demand
          and opportunities.
        </p>
        <Badge variant="secondary" className="mt-2">
          <AlertCircle className="h-4 w-4 mr-1" />
          Google Trends Disabled for Testing
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Interest Over Time */}
        <Card className="opacity-75">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <CardTitle>Interest Over Time</CardTitle>
              </div>
              <Select disabled>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Past 12 months" />
                </SelectTrigger>
              </Select>
            </div>
            <CardDescription>Search interest trends for your keyword over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="font-medium">Google Trends Integration Disabled</p>
                <p className="text-sm">Interest over time chart would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="opacity-75">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <CardTitle>Geographic Interest</CardTitle>
            </div>
            <CardDescription>Regional search interest distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <Globe className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="font-medium">Google Trends Integration Disabled</p>
                <p className="text-sm">Geographic interest map would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
