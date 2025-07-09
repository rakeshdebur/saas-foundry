"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Brain,
  BarChart3,
  FileText,
  Users,
  DollarSign,
  Rocket,
  Send,
  Clock,
  PlusCircle,
  ChevronRight,
  CheckSquare,
} from "lucide-react"
import { usePremiumFeature } from "@/hooks/use-premium-feature"
import { useToast } from "@/components/ui/use-toast"

export default function AICofounderPage() {
  const [activeTab, setActiveTab] = useState("advisor")
  const { openPremiumFeatureModal, PremiumFeatureModalComponent } = usePremiumFeature()
  const { toast } = useToast()
  const [isDemoUser, setIsDemoUser] = useState(false)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string; timestamp: string }[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI Co-founder. I can help you with strategy, product development, marketing, and more. What would you like to discuss today?",
      timestamp: "Just now",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  // Check if user is in demo mode
  useEffect(() => {
    const demoUser = localStorage.getItem("saasFoundry_demoUser") === "true"
    setIsDemoUser(demoUser)
  }, [])

  // Handler for premium features
  const handlePremiumFeature = (featureName: string) => {
    openPremiumFeatureModal(featureName)
  }

  // Handle sending a message in the chat
  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat
    const newMessage = {
      role: "user",
      content: message,
      timestamp: "Just now",
    }

    setChatHistory((prev) => [...prev, newMessage])
    setMessage("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "That's a great question about SaaS pricing. Based on your target market and feature set, I'd recommend starting with a simple tiered pricing model: Free, Pro ($29/mo), and Enterprise (custom pricing). This lets you capture different segments while validating willingness to pay.",
        "For your go-to-market strategy, I suggest focusing on content marketing and a small-scale beta program first. Create high-quality content addressing your target users' pain points, and invite 20-30 ideal customers to your beta. Their feedback will be invaluable before a wider launch.",
        "Looking at your user acquisition costs, I notice they're a bit high relative to your lifetime value. Consider optimizing your onboarding flow to improve activation rates, and experiment with referral incentives to lower CAC.",
        "For your technical architecture, a serverless approach would work well given your current scale and budget constraints. This will keep costs low while you validate product-market fit, and you can always migrate to a more robust infrastructure as you grow.",
        "When approaching investors at this stage, focus on demonstrating three things: 1) Clear problem validation, 2) Early user traction, and 3) Your unique insight or advantage. Investors fund teams that deeply understand their market and can execute efficiently.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const aiResponse = {
        role: "assistant",
        content: randomResponse,
        timestamp: "Just now",
      }

      setChatHistory((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {isDemoUser && (
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-purple-800">Demo Mode Active</h3>
                <div className="text-sm text-purple-700">
                  You're viewing the AI Co-founder in demo mode. Try asking questions about SaaS strategy, pricing, or
                  product development.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">AI Co-founder</h1>
              <p className="text-gray-600">Your strategic partner for building your SaaS startup</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Button variant="outline" className="border-purple-200 text-purple-700" asChild>
                <Link href="/dashboard/ai-cofounder/tasks">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Task Manager
                </Link>
              </Button>
              <Button className="bg-purple-700 hover:bg-purple-800">
                <Brain className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="advisor" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="advisor">Strategic Advisor</TabsTrigger>
            <TabsTrigger value="documents">Document Generator</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
            <TabsTrigger value="planning">Startup Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="advisor" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="border border-gray-100 shadow-sm h-full">
                  <CardHeader>
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 text-purple-700 mr-2" />
                      <CardTitle>Strategic Advisor Chat</CardTitle>
                    </div>
                    <CardDescription>Ask questions and get expert guidance for your startup</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[400px] overflow-y-auto p-6 space-y-4 border-t border-b border-gray-100">
                      {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] ${msg.role === "user" ? "bg-purple-100 text-purple-900" : "bg-gray-100 text-gray-900"} rounded-lg p-3`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] bg-gray-100 text-gray-900 rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex items-center space-x-2">
                      <Input
                        placeholder="Ask about strategy, pricing, marketing, product..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} className="bg-purple-700 hover:bg-purple-800">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border border-gray-100 shadow-sm mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Suggested Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {suggestedTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-3 rounded-md border border-gray-200 hover:border-purple-200 cursor-pointer transition-colors"
                        onClick={() => {
                          setMessage(topic.question)
                          setActiveTab("advisor")
                        }}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-8 h-8 rounded-full ${topic.iconBg} flex items-center justify-center mr-3 mt-1`}
                          >
                            <topic.icon className={`h-4 w-4 ${topic.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{topic.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Conversations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentConversations.map((convo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-md border border-gray-200 hover:border-purple-200 cursor-pointer transition-colors"
                        onClick={() => handlePremiumFeature(`View Conversation: ${convo.title}`)}
                      >
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <h3 className="font-medium text-sm">{convo.title}</h3>
                            <p className="text-xs text-gray-500">{convo.date}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Document Generator</h2>
              <Button
                className="bg-purple-700 hover:bg-purple-800"
                onClick={() => handlePremiumFeature("Create New Document")}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {documentTemplates.map((template, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => handlePremiumFeature(`Generate: ${template.title}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full ${template.iconBg} flex items-center justify-center mr-2`}
                        >
                          <template.icon className={`h-4 w-4 ${template.iconColor}`} />
                        </div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        {template.category}
                      </Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center justify-between">
                        <span>{template.timeEstimate}</span>
                        <span>{template.usedBy}+ founders</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-purple-700 hover:bg-purple-800"
                      onClick={() => handlePremiumFeature(`Generate: ${template.title}`)}
                    >
                      Generate Document
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Market Insights</h2>
              <Button variant="outline" onClick={() => handlePremiumFeature("Custom Market Research")}>
                Custom Research
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketInsights.map((insight, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${insight.iconBg} flex items-center justify-center mr-2`}>
                          <insight.icon className={`h-4 w-4 ${insight.iconColor}`} />
                        </div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          insight.trend === "Growing"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : insight.trend === "Stable"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {insight.trend}
                      </Badge>
                    </div>
                    <CardDescription>{insight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium">Market Size</h4>
                          <span className="text-sm font-bold">{insight.marketSize}</span>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium">Growth Rate</h4>
                          <span className="text-sm font-bold">{insight.growthRate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Competitive Landscape</h4>
                          <span className="text-sm font-bold">{insight.competition}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <h4 className="font-medium mb-1">Key Opportunities:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {insight.opportunities.map((opp, i) => (
                            <li key={i}>{opp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handlePremiumFeature(`Full Report: ${insight.title}`)}>
                      View Full Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Startup Planning</h2>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => handlePremiumFeature("View All Plans")}>
                  View All Plans
                </Button>
                <Button
                  className="bg-purple-700 hover:bg-purple-800"
                  onClick={() => handlePremiumFeature("Create New Plan")}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Plan
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {startupPlans.map((plan, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${plan.iconBg} flex items-center justify-center mr-2`}>
                          <plan.icon className={`h-4 w-4 ${plan.iconColor}`} />
                        </div>
                        <CardTitle className="text-lg">{plan.title}</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          plan.status === "In Progress"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : plan.status === "Completed"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                        }`}
                      >
                        {plan.status}
                      </Badge>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Timeline:</span>
                        <span className="font-medium">{plan.timeline}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Key Milestones:</span>
                        <span className="font-medium">{plan.milestones}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Resources Needed:</span>
                        <span className="font-medium">{plan.resources}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handlePremiumFeature(`View Plan: ${plan.title}`)}>
                      View Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Render the premium feature modal */}
      <PremiumFeatureModalComponent />
    </div>
  )
}

// Sample data
const suggestedTopics = [
  {
    title: "Pricing Strategy",
    description: "How should I price my SaaS product?",
    question: "What's the best pricing strategy for an early-stage B2B SaaS product?",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    title: "Go-to-Market Strategy",
    description: "How to launch my product effectively?",
    question: "What's the most effective go-to-market strategy for a bootstrapped SaaS startup?",
    icon: Rocket,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "User Acquisition",
    description: "How to get my first 100 customers?",
    question: "What are the most cost-effective ways to acquire my first 100 customers?",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Technical Architecture",
    description: "What tech stack should I use?",
    question: "What's the best technical architecture for a scalable SaaS product with limited resources?",
    icon: FileText,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    title: "Fundraising",
    description: "When and how to raise capital?",
    question: "At what stage should I consider raising venture capital, and what metrics should I focus on?",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
]

const recentConversations = [
  {
    title: "Product Roadmap Planning",
    date: "Yesterday",
  },
  {
    title: "Pricing Strategy Discussion",
    date: "3 days ago",
  },
  {
    title: "Technical Architecture Review",
    date: "1 week ago",
  },
]

const documentTemplates = [
  {
    title: "Pitch Deck",
    description: "Create a compelling investor pitch deck for your startup",
    category: "Fundraising",
    timeEstimate: "10-15 minutes",
    usedBy: 1250,
    icon: FileText,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "Financial Model",
    description: "Generate a 3-year financial projection for your SaaS business",
    category: "Finance",
    timeEstimate: "15-20 minutes",
    usedBy: 980,
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    title: "Go-to-Market Plan",
    description: "Create a comprehensive plan for launching your product",
    category: "Marketing",
    timeEstimate: "10-15 minutes",
    usedBy: 875,
    icon: Rocket,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    title: "Competitor Analysis",
    description: "Generate a detailed analysis of your competitors",
    category: "Strategy",
    timeEstimate: "15-20 minutes",
    usedBy: 760,
    icon: BarChart3,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Product Roadmap",
    description: "Create a strategic roadmap for your product development",
    category: "Product",
    timeEstimate: "10-15 minutes",
    usedBy: 920,
    icon: FileText,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "User Persona",
    description: "Generate detailed user personas for your target audience",
    category: "Product",
    timeEstimate: "10-15 minutes",
    usedBy: 680,
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
]

const marketInsights = [
  {
    title: "SaaS for Remote Work",
    description: "Tools and platforms supporting distributed teams and remote collaboration",
    trend: "Growing",
    marketSize: "$30.5B",
    growthRate: "15.7% CAGR",
    competition: "Moderate",
    opportunities: [
      "Integration with existing productivity tools",
      "Enhanced security features for enterprise clients",
      "AI-powered collaboration assistants",
    ],
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "AI-Powered Analytics",
    description: "Business intelligence tools leveraging artificial intelligence",
    trend: "Growing",
    marketSize: "$22.8B",
    growthRate: "21.2% CAGR",
    competition: "High",
    opportunities: [
      "Industry-specific analytics solutions",
      "Predictive analytics for SMBs",
      "Natural language interfaces for non-technical users",
    ],
    icon: Brain,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "Vertical SaaS for Healthcare",
    description: "Specialized software solutions for healthcare providers",
    trend: "Growing",
    marketSize: "$15.6B",
    growthRate: "18.3% CAGR",
    competition: "Moderate",
    opportunities: ["Patient engagement platforms", "Telehealth integration", "AI-powered diagnostic tools"],
    icon: FileText,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    title: "No-Code/Low-Code Platforms",
    description: "Tools enabling non-developers to build applications",
    trend: "Growing",
    marketSize: "$13.2B",
    growthRate: "22.7% CAGR",
    competition: "Increasing",
    opportunities: [
      "Enterprise-grade security and compliance",
      "Industry-specific templates and components",
      "Integration with legacy systems",
    ],
    icon: FileText,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
]

const startupPlans = [
  {
    title: "MVP Launch Plan",
    description: "Strategy for building and launching your minimum viable product",
    status: "In Progress",
    timeline: "3 months",
    milestones: "5",
    resources: "2-3 people",
    icon: Rocket,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "Customer Acquisition Plan",
    description: "Strategy for acquiring your first 100 customers",
    status: "Draft",
    timeline: "6 months",
    milestones: "4",
    resources: "1-2 people",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Funding Roadmap",
    description: "Plan for bootstrapping and potential fundraising",
    status: "Draft",
    timeline: "12 months",
    milestones: "3",
    resources: "Founders",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
]
