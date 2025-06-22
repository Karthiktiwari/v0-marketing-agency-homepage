import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sparkles, Github, Linkedin, Mail, ExternalLink, Lightbulb, Target, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Amplify</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="/about" className="text-blue-600 font-medium">
                About
              </a>
              <Button variant="outline">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Amplify</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Revolutionizing content creation through intelligent multi-agent AI systems that understand, analyze, and
              generate high-quality marketing content.
            </p>
          </div>

          {/* Project Overview */}
          <Card className="border-2 border-blue-100 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Project Overview</CardTitle>
              <CardDescription className="text-lg">
                The vision behind Amplify and its innovative approach to AI-powered content generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <Lightbulb className="h-12 w-12 mx-auto text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Innovation</h3>
                  <p className="text-gray-600 text-sm">
                    Multi-agent AI architecture that orchestrates specialized models for optimal content generation
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <Target className="h-12 w-12 mx-auto text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Precision</h3>
                  <p className="text-gray-600 text-sm">
                    Data-driven insights from Google Trends and search analysis for targeted content creation
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <Users className="h-12 w-12 mx-auto text-blue-600" />
                  <h3 className="font-semibold text-gray-900">User-Centric</h3>
                  <p className="text-gray-600 text-sm">
                    Intuitive workflow designed for marketers, agencies, and content creators of all levels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Architecture */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Technical Architecture</CardTitle>
              <CardDescription>Built with modern technologies and AI-first principles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Core Technologies</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">AI/ML</Badge>
                      <span className="text-gray-700">Google ADK & Gemini LLMs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">Frontend</Badge>
                      <span className="text-gray-700">Next.js, React, TypeScript</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">UI/UX</Badge>
                      <span className="text-gray-700">Tailwind CSS, shadcn/ui</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">APIs</Badge>
                      <span className="text-gray-700">Google Trends, Search APIs</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Multi-agent AI orchestration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Real-time Google Trends integration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Intelligent content analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Automated content generation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Responsive, mobile-first design</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inspiration & Vision */}
          <Card className="border-2 border-purple-100 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-900">Inspiration & Vision</CardTitle>
              <CardDescription>The driving force behind Amplify's creation and future goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Amplify was born from the recognition that content creators and marketers spend countless hours
                researching trends, analyzing competitors, and crafting content that resonates with their audience. The
                vision was to create an intelligent system that could automate these time-consuming processes while
                maintaining the quality and creativity that human insight provides.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By leveraging the power of multi-agent AI systems, Amplify doesn't just generate content—it understands
                context, analyzes market trends, and creates content that's both relevant and engaging. The platform
                represents a new paradigm in AI-assisted content creation, where technology amplifies human creativity
                rather than replacing it.
              </p>
              <div className="bg-white rounded-lg p-6 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Future Roadmap</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Advanced video content generation capabilities</li>
                  <li>• Multi-language support and localization</li>
                  <li>• Integration with major social media platforms</li>
                  <li>• Advanced analytics and performance tracking</li>
                  <li>• Collaborative workspace for teams</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Creator Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Connect & Collaborate</CardTitle>
              <CardDescription>
                Get in touch to discuss the project, provide feedback, or explore collaboration opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Professional Links</h3>
                  <div className="space-y-3">
                    <a
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <Github className="h-5 w-5 text-gray-700" />
                      <span className="text-gray-700">GitHub Profile</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </a>
                    <a
                      href="https://linkedin.com/in/yourprofile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">LinkedIn Profile</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </a>
                    <a
                      href="mailto:your.email@example.com"
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Email Contact</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </a>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Project Repository</h3>
                  <div className="bg-gray-50 rounded-lg p-6 border">
                    <div className="flex items-center space-x-3 mb-3">
                      <Github className="h-6 w-6 text-gray-700" />
                      <span className="font-medium text-gray-900">amplify-ai-platform</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Open source multi-agent AI platform for intelligent content generation
                    </p>
                    <Button variant="outline" className="w-full">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold">Amplify</h3>
            </div>
            <p className="text-gray-400 mb-6">Intelligent content generation powered by multi-agent AI systems.</p>
            <Separator className="my-8 bg-gray-800" />
            <p className="text-gray-400">&copy; 2024 Amplify. Built with passion for AI and content creation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
