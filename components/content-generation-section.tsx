"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, ImageIcon, Video, Download, Loader2, Sparkles } from "lucide-react"

interface ContentGenerationSectionProps {
  sessionId: string
}

// Function to clean HTML content by removing markdown code block markers
const cleanHtmlContent = (content: string): string => {
  // Remove ```html at the beginning and ``` at the end
  return content
    .replace(/^```html\s*/, "")
    .replace(/\s*```$/, "")
    .trim()
}

export function ContentGenerationSection({ sessionId }: ContentGenerationSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [contentType, setContentType] = useState<"blog" | "caption">("blog")
  const [bannerType, setBannerType] = useState<"blog" | "social">("blog")

  const handleGenerateContent = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("https://amplify-test-1002947097936.asia-south2.run.app/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          contentType: contentType,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Handle both possible response formats and clean HTML markers
        const rawContent = data.generatedContent || data.content || data
        const cleanedContent = typeof rawContent === "string" ? cleanHtmlContent(rawContent) : rawContent
        setGeneratedContent(cleanedContent)
      } else {
        // Mock content for demo
        const mockContent =
          contentType === "blog"
            ? `<div class="blog-content">
              <h1>The Ultimate Guide to Digital Marketing Success</h1>
              
              <h2>Introduction</h2>
              <p>In today's competitive digital landscape, businesses need more than just a basic online presence to thrive. This comprehensive guide will walk you through proven strategies that can transform your marketing efforts and drive measurable results.</p>
              
              <h2>Key Strategies for Success</h2>
              
              <h3>1. Content Marketing Excellence</h3>
              <p>Creating valuable, relevant content that resonates with your target audience is the foundation of successful digital marketing. Focus on solving real problems and providing actionable insights.</p>
              
              <h3>2. SEO Optimization</h3>
              <p>Search engine optimization remains crucial for organic visibility. Implement both on-page and off-page SEO techniques to improve your search rankings.</p>
              
              <h3>3. Social Media Engagement</h3>
              <p>Build authentic relationships with your audience through consistent, engaging social media presence across relevant platforms.</p>
              
              <h2>Conclusion</h2>
              <p>Success in digital marketing requires a strategic approach, consistent execution, and continuous optimization. By implementing these proven strategies, you'll be well on your way to achieving your marketing goals.</p>
            </div>`
            : `<div class="caption-content">
              <p>🚀 Ready to transform your digital marketing game?</p>
              
              <p>Our latest guide covers everything you need to know about building a successful online presence that actually converts!</p>
              
              <p>✨ What you'll discover:</p>
              <ul>
                <li>Proven content strategies that engage</li>
                <li>SEO techniques that actually work</li>
                <li>Social media tactics for real growth</li>
                <li>Conversion optimization secrets</li>
              </ul>
              
              <p>Stop guessing and start growing! 📈</p>
              
              <p><strong>#DigitalMarketing #ContentStrategy #SEO #SocialMedia #MarketingTips #BusinessGrowth</strong></p>
            </div>`

        setGeneratedContent(mockContent)
      }
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedContent) return

    // Strip HTML tags for plain text download or keep HTML for .html download
    const isHtml = generatedContent.includes("<")
    const content = isHtml ? generatedContent : generatedContent
    const fileExtension = isHtml ? "html" : contentType === "blog" ? "md" : "txt"

    const element = document.createElement("a")
    const file = new Blob([content], { type: isHtml ? "text/html" : "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${contentType}-content.${fileExtension}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Generate Content & Media</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create high-quality content and visual assets powered by AI analysis of trending topics and audience insights.
        </p>
      </div>

      <Card className="border-2 border-green-100 bg-green-50/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-900">AI Content Generator</CardTitle>
          </div>
          <CardDescription>Generate blogs, captions, and visual content optimized for your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="banner" className="flex items-center space-x-2">
                <ImageIcon className="h-4 w-4" />
                <span>Banner</span>
              </TabsTrigger>
              <TabsTrigger value="video" disabled className="flex items-center space-x-2 opacity-50">
                <Video className="h-4 w-4" />
                <span>Video</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  Coming Soon
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <div className="flex items-center space-x-4">
                <Select value={contentType} onValueChange={(value: "blog" | "caption") => setContentType(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="caption">Social Caption</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate {contentType === "blog" ? "Blog" : "Caption"}
                    </>
                  )}
                </Button>
              </div>

              {generatedContent && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 border shadow-sm max-h-96 overflow-y-auto">
                    <div
                      className="prose prose-green max-w-none"
                      dangerouslySetInnerHTML={{ __html: generatedContent }}
                      style={{
                        backgroundColor: "#fefefe",
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleDownload} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download {contentType === "blog" ? "Blog" : "Caption"}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="banner" className="space-y-6">
              <div className="flex items-center space-x-4">
                <Select value={bannerType} onValueChange={(value: "blog" | "social") => setBannerType(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Banner</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-green-600 hover:bg-green-700">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Generate Banner
                </Button>
              </div>
              <div className="bg-white rounded-lg p-12 border border-dashed border-gray-300 text-center">
                <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Banner generation will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-6">
              <div className="bg-white rounded-lg p-12 border border-dashed border-gray-300 text-center">
                <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Video generation coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
