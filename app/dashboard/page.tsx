"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, MessageCircle, Users, Calendar, Play, CheckCircle, Clock } from "lucide-react"
import { AICofounderCard } from "@/components/ai-cofounder-card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("courses")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-purple-700">SaaSFoundry</h1>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/dashboard" className="text-gray-900 font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard/courses" className="text-gray-500 hover:text-gray-900">
                Courses
              </Link>
              <Link href="/community" className="text-gray-500 hover:text-gray-900">
                Community
              </Link>
              <Link href="/playground" className="text-gray-500 hover:text-gray-900">
                Playground
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Support
            </Button>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
              RD
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Rakesh!</h1>
          <p className="text-gray-600">Continue your journey to building your SaaS startup.</p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">23%</div>
                <div className="text-sm text-gray-500">4/18 lectures completed</div>
              </div>
              <Progress value={23} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Next Office Hours</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <div className="font-medium">Wednesday, April 28</div>
                <div className="text-sm text-gray-500">2:00 PM - 3:00 PM EST</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Community Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-500">New discussions today</div>
              </div>
            </CardContent>
          </Card>

          <AICofounderCard />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3 mb-4">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {/* Continue Learning */}
            <div>
              <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-purple-100 rounded-lg p-3 mr-4">
                        <BookOpen className="h-6 w-6 text-purple-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-1">Building Landing Pages with AI</h3>
                        <p className="text-gray-500 text-sm mb-3">Module 3: Development Fundamentals • Lecture 7</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Progress value={45} className="h-2 w-32 mr-3" />
                            <span className="text-sm text-gray-500">45% complete</span>
                          </div>
                          <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Modules */}
            <div>
              <h2 className="text-xl font-bold mb-4">Course Modules</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {courseModules.map((module, index) => (
                  <Card key={index} className={`${module.completed ? "bg-gray-50" : "bg-white"}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        {module.completed ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </span>
                        ) : module.inProgress ? (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            In Progress
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Upcoming</span>
                        )}
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <ul className="space-y-1">
                        {module.lectures.map((lecture, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            {lecture.completed ? (
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <div className="h-3 w-3 mr-1 rounded-full border border-gray-300" />
                            )}
                            <span className={lecture.completed ? "text-gray-500" : "text-gray-700"}>
                              {lecture.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={module.completed ? "outline" : "default"}
                        className={module.completed ? "" : "bg-purple-700 hover:bg-purple-800"}
                        size="sm"
                      >
                        {module.completed ? "Review Module" : "Start Module"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Community Discussions</h2>
            <Card>
              <CardContent className="p-0">
                {communityDiscussions.map((discussion, index) => (
                  <div
                    key={index}
                    className={`p-6 ${index !== communityDiscussions.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gray-200 mr-4 flex-shrink-0 overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=40&width=40&text=${discussion.author.charAt(0)}`}
                          alt={discussion.author}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{discussion.title}</h3>
                          <span className="text-xs text-gray-500">{discussion.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{discussion.preview}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-4">{discussion.author}</span>
                          <span className="mr-4">{discussion.replies} replies</span>
                          <span>{discussion.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-center border-t border-gray-100">
                <Button variant="link">View All Discussions</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Resources & Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center mb-2">
                      <resource.icon className="h-5 w-5 text-purple-700" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

const courseModules = [
  {
    title: "Foundation & Setup",
    description: "Learn the essential AI tools and set up your environment",
    completed: true,
    inProgress: false,
    lectures: [
      { title: "AI Tools for Startup Founders", completed: true },
      { title: "Technical Environment Setup", completed: true },
      { title: "Ideation & Market Research with AI", completed: true },
    ],
  },
  {
    title: "Design & Planning",
    description: "Create your product roadmap and design your application",
    completed: true,
    inProgress: false,
    lectures: [
      { title: "Building Your Product Roadmap", completed: true },
      { title: "AI-Generated UI/UX Design", completed: true },
      { title: "Database & Architecture Planning", completed: true },
    ],
  },
  {
    title: "Development Fundamentals",
    description: "Build the core features of your SaaS application",
    completed: false,
    inProgress: true,
    lectures: [
      { title: "Building Landing Pages with AI", completed: false },
      { title: "User Authentication & Profiles", completed: false },
      { title: "Core Application Features", completed: false },
      { title: "Advanced Features & Integration", completed: false },
    ],
  },
  {
    title: "Refinement & Deployment",
    description: "Test, debug, and deploy your application to production",
    completed: false,
    inProgress: false,
    lectures: [
      { title: "Testing & Debugging with AI", completed: false },
      { title: "Deployment to Production", completed: false },
      { title: "Analytics & Monitoring", completed: false },
    ],
  },
]

const communityDiscussions = [
  {
    title: "How to handle authentication with Supabase?",
    author: "Sarah Johnson",
    time: "2 hours ago",
    preview: "I'm trying to implement social login with Supabase but running into some issues with the callback...",
    replies: 8,
    views: 42,
  },
  {
    title: "Best AI tools for generating landing page copy?",
    author: "Michael Chen",
    time: "Yesterday",
    preview: "I've been using ChatGPT but wondering if there are better specialized tools for SaaS landing pages...",
    replies: 15,
    views: 87,
  },
  {
    title: "Pricing strategy for B2B SaaS products",
    author: "Alex Rivera",
    time: "2 days ago",
    preview: "I'm launching my first B2B SaaS and struggling with pricing. Should I go with tiered pricing or...",
    replies: 23,
    views: 156,
  },
]

const resources = [
  {
    title: "Investor Pitch Deck Template",
    description: "A customizable pitch deck template for raising seed funding",
    icon: BookOpen,
  },
  {
    title: "SaaS Financial Model",
    description: "Excel spreadsheet with financial projections for SaaS startups",
    icon: BookOpen,
  },
  {
    title: "User Interview Script",
    description: "Template for conducting effective user interviews",
    icon: Users,
  },
  {
    title: "Landing Page Components",
    description: "Ready-to-use Next.js components for landing pages",
    icon: BookOpen,
  },
  {
    title: "AI Prompt Library",
    description: "Collection of effective prompts for various AI tools",
    icon: MessageCircle,
  },
  {
    title: "Legal Templates Bundle",
    description: "Terms of service, privacy policy, and other legal documents",
    icon: BookOpen,
  },
]
