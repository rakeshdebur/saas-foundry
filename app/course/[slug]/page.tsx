"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, MessageCircle, Play } from "lucide-react"

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("video")

  // This would normally be fetched from an API based on the slug
  const lecture = {
    title: "Building Landing Pages with AI",
    module: "Development Fundamentals",
    moduleNumber: 3,
    lectureNumber: 7,
    description: "Learn how to create effective landing pages using AI tools",
    videoUrl: "https://example.com/video",
    duration: "32 minutes",
    progress: 45,
    sections: [
      { title: "Introduction", timestamp: "0:00", completed: true },
      { title: "AI Design Process", timestamp: "5:12", completed: true },
      { title: "Implementation", timestamp: "15:30", completed: false },
      { title: "Optimization", timestamp: "25:45", completed: false },
      { title: "Action Items & Resources", timestamp: "30:20", completed: false },
    ],
    resources: [
      { title: "Landing Page Template", type: "Code Snippet" },
      { title: "Design Prompt Examples", type: "PDF" },
      { title: "Performance Checklist", type: "PDF" },
    ],
    transcript: `
      Welcome to this lecture on building landing pages with AI. In this session, we'll cover the entire process from ideation to deployment.
      
      First, let's talk about the importance of an effective landing page. Your landing page is often the first impression potential customers have of your product. It needs to clearly communicate your value proposition, build trust, and guide visitors toward a specific action.
      
      Now, let's dive into the AI design process. When working with AI tools like V0.dev or Midjourney, it's important to craft effective design prompts. A good prompt should include:
      
      1. The purpose of the landing page
      2. Your target audience
      3. The key message you want to convey
      4. Any specific style or branding requirements
      
      Let me demonstrate how this works with V0.dev...
      
      [Demonstration continues]
      
      Once you have your design, the next step is implementation. We'll use Next.js to convert the design into code. The great thing about using AI assistants is that they can help generate much of this code for you.
      
      [Implementation details]
      
      After implementation, we need to optimize our landing page for performance and conversion. This includes:
      
      1. Performance testing using tools like Lighthouse
      2. Setting up A/B testing to compare different versions
      3. Integrating analytics to track user behavior
      
      [Optimization details]
      
      Finally, let's go through the action items for this lecture:
      
      1. Create your own landing page using the techniques we've covered
      2. Use the provided templates and prompts as a starting point
      3. Test your page with real users and gather feedback
      
      In the resources section, you'll find templates, prompt examples, and a performance checklist to help you implement what you've learned.
      
      That's it for this lecture. In the next session, we'll cover user authentication and profiles. See you then!
    `,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-purple-700">SaaSFoundry</h1>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/dashboard/courses" className="text-gray-900 font-medium">
                Courses
              </Link>
              <Link href="/dashboard/community" className="text-gray-500 hover:text-gray-900">
                Community
              </Link>
              <Link href="/dashboard/resources" className="text-gray-500 hover:text-gray-900">
                Resources
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Support
            </Button>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
              JS
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Module {lecture.moduleNumber}: {lecture.module} • Lecture {lecture.lectureNumber}
              </div>
              <h1 className="text-2xl font-bold">{lecture.title}</h1>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="text-sm text-gray-500">{lecture.duration}</div>
              <Progress value={lecture.progress} className="w-32 h-2" />
              <div className="text-sm text-gray-500">{lecture.progress}% complete</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                <Play className="h-5 w-5 mr-2" />
                Play Video
              </Button>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="video" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="space-y-4 pt-4">
                <div className="text-lg font-medium">About this lecture</div>
                <p className="text-gray-700">{lecture.description}</p>

                <div className="text-lg font-medium mt-6">Lecture Sections</div>
                <div className="space-y-2">
                  {lecture.sections.map((section, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center">
                        {section.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3" />
                        )}
                        <div>
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-gray-500">{section.timestamp}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transcript" className="pt-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="prose max-w-none">
                    {lecture.transcript.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="pt-4">
                <div className="space-y-4">
                  {lecture.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded bg-purple-100 flex items-center justify-center mr-4">
                          <BookOpen className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-gray-500">{resource.type}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Lecture
              </Button>
              <Button className="flex items-center bg-purple-700 hover:bg-purple-800">
                Next Lecture
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress */}
            <Card className="p-6">
              <h3 className="font-medium text-lg mb-4">Course Progress</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">23%</div>
                <div className="text-sm text-gray-500">4/18 lectures completed</div>
              </div>
              <Progress value={23} className="h-2 mb-4" />
              <Button className="w-full bg-purple-700 hover:bg-purple-800">Continue Course</Button>
            </Card>

            {/* Module Lectures */}
            <Card className="p-6">
              <h3 className="font-medium text-lg mb-4">Module 3: Development Fundamentals</h3>
              <div className="space-y-3">
                {[
                  { title: "Building Landing Pages with AI", active: true, completed: false },
                  { title: "User Authentication & Profiles", active: false, completed: false },
                  { title: "Core Application Features", active: false, completed: false },
                  { title: "Advanced Features & Integration", active: false, completed: false },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-center ${
                      item.active ? "bg-purple-50 border border-purple-200" : "hover:bg-gray-50"
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <div
                        className={`h-5 w-5 rounded-full border-2 ${
                          item.active ? "border-purple-500" : "border-gray-300"
                        } mr-3 flex-shrink-0`}
                      />
                    )}
                    <span className={`${item.active ? "font-medium text-purple-800" : "text-gray-700"}`}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Discussion */}
            <Card className="p-6">
              <h3 className="font-medium text-lg mb-4">Lecture Discussion</h3>
              <div className="space-y-4 mb-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Sarah Johnson</div>
                    <p className="text-sm text-gray-600 mt-1">
                      Has anyone tried using Midjourney for landing page designs? I'm getting better results than with
                      DALL-E.
                    </p>
                    <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Michael Chen</div>
                    <p className="text-sm text-gray-600 mt-1">
                      @Sarah I've had good results with both, but Midjourney seems better for more creative designs.
                    </p>
                    <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Join Discussion
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
