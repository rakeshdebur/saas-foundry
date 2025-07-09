"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, MessageCircle, Users, FileText, Settings, PlusCircle, BarChart3 } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage course content and community</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-purple-100 p-2 rounded-md">
                    <stat.icon className="h-5 w-5 text-purple-700" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className={`p-2 rounded-md mr-3 ${activityTypeStyles[activity.type]}`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center justify-center text-center"
                        asChild
                      >
                        <Link href={action.href}>
                          <action.icon className="h-5 w-5 mb-2" />
                          <span className="text-sm">{action.label}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Key metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">User Growth</h3>
                    <div className="h-[200px] flex items-end">
                      {userGrowth.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full max-w-[30px] bg-purple-600 rounded-t-sm mx-1"
                            style={{ height: `${(item.value / 100) * 150}px` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Content Engagement</h3>
                    <div className="space-y-4">
                      {contentEngagement.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm">{item.type}</div>
                            <div className="text-sm text-gray-500">{item.value}%</div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-2 bg-purple-600 rounded-full" style={{ width: `${item.value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Community Activity</h3>
                    <div className="space-y-4">
                      {communityActivity.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm">{item.type}</div>
                          <div className="text-sm font-medium">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Course Management</h2>
              <Button asChild className="bg-purple-700 hover:bg-purple-800">
                <Link href="/admin/courses/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Course
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Course Modules</CardTitle>
                <CardDescription>Manage your course content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseModules.map((module, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between bg-gray-50 p-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-2 rounded-md mr-3">
                            <BookOpen className="h-4 w-4 text-purple-700" />
                          </div>
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-gray-500">{module.lectures.length} lectures</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/courses/module/${index}`}>Edit</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/courses/module/${index}/lectures`}>Lectures</Link>
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-gray-600 mb-4">{module.description}</div>
                        <div className="space-y-2">
                          {module.lectures.slice(0, 3).map((lecture, lectureIndex) => (
                            <div key={lectureIndex} className="flex items-center justify-between">
                              <div className="text-sm">{lecture}</div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/courses/lecture/${index}-${lectureIndex}`}>Edit</Link>
                              </Button>
                            </div>
                          ))}
                          {module.lectures.length > 3 && (
                            <div className="text-sm text-purple-700 font-medium">
                              +{module.lectures.length - 3} more lectures
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Community Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/community/flagged">Flagged Content</Link>
                </Button>
                <Button className="bg-purple-700 hover:bg-purple-800" asChild>
                  <Link href="/admin/community/announcements/new">New Announcement</Link>
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Discussions</CardTitle>
                  <CardDescription>Latest community activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDiscussions.map((discussion, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                              <img
                                src={`/placeholder.svg?height=32&width=32&text=${discussion.author.charAt(0)}`}
                                alt={discussion.author}
                              />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium">{discussion.title}</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                by {discussion.author} • {discussion.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/community/discussions/${index}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{discussion.preview}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Moderation Queue</CardTitle>
                  <CardDescription>Content requiring review</CardDescription>
                </CardHeader>
                <CardContent>
                  {moderationQueue.length > 0 ? (
                    <div className="space-y-4">
                      {moderationQueue.map((item, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              <div
                                className={`p-2 rounded-md mr-3 ${
                                  item.type === "comment" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {item.type === "comment" ? (
                                  <MessageCircle className="h-4 w-4" />
                                ) : (
                                  <FileText className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <h3 className="text-sm font-medium">
                                  {item.type === "comment" ? "Comment" : "Post"} flagged as {item.reason}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                  by {item.reporter} • {item.time}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{item.content}</p>
                          <div className="flex space-x-2 mt-3">
                            <Button variant="outline" size="sm">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No items in moderation queue</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">User Management</h2>
              <Button className="bg-purple-700 hover:bg-purple-800" asChild>
                <Link href="/admin/users/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New User
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>Manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=${user.name.charAt(0)}`}
                            alt={user.name}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`px-2 py-1 rounded-full text-xs mr-4 ${
                            user.role === "Admin"
                              ? "bg-amber-100 text-amber-800"
                              : user.role === "Instructor"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/users/${index}`}>Edit</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

const stats = [
  { label: "Total Courses", value: "6", icon: BookOpen },
  { label: "Total Lectures", value: "42", icon: FileText },
  { label: "Active Users", value: "248", icon: Users },
  { label: "Community Posts", value: "156", icon: MessageCircle },
]

const recentActivity = [
  {
    type: "course",
    icon: BookOpen,
    description: "New lecture added to 'Development Fundamentals'",
    time: "2 hours ago",
  },
  {
    type: "user",
    icon: Users,
    description: "New user registered: Sarah Johnson",
    time: "5 hours ago",
  },
  {
    type: "community",
    icon: MessageCircle,
    description: "New discussion: 'Best AI tools for landing page copy'",
    time: "Yesterday",
  },
  {
    type: "course",
    icon: BookOpen,
    description: "Course 'Business Operations' updated",
    time: "2 days ago",
  },
]

const activityTypeStyles = {
  course: "bg-purple-100 text-purple-700",
  user: "bg-blue-100 text-blue-700",
  community: "bg-green-100 text-green-700",
}

const quickActions = [
  { label: "Add New Course", href: "/admin/courses/new", icon: BookOpen },
  { label: "Add New Lecture", href: "/admin/courses/lecture/new", icon: FileText },
  { label: "Moderate Comments", href: "/admin/community/moderation", icon: MessageCircle },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

const userGrowth = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 75 },
  { month: "Apr", value: 90 },
  { month: "May", value: 95 },
  { month: "Jun", value: 100 },
]

const contentEngagement = [
  { type: "Video Completion", value: 68 },
  { type: "Resource Downloads", value: 42 },
  { type: "Quiz Participation", value: 85 },
]

const communityActivity = [
  { type: "New Discussions (week)", value: 24 },
  { type: "Comments (week)", value: 86 },
  { type: "Active Members", value: 142 },
  { type: "Flagged Content", value: 3 },
]

const courseModules = [
  {
    title: "Foundation & Setup",
    description: "Learn the essential AI tools and set up your development environment",
    lectures: ["AI Tools for Startup Founders", "Technical Environment Setup", "Ideation & Market Research with AI"],
  },
  {
    title: "Design & Planning",
    description: "Create your product roadmap and design your application",
    lectures: ["Building Your Product Roadmap", "AI-Generated UI/UX Design", "Database & Architecture Planning"],
  },
  {
    title: "Development Fundamentals",
    description: "Build the core features of your SaaS application",
    lectures: [
      "Building Landing Pages with AI",
      "User Authentication & Profiles",
      "Core Application Features",
      "Advanced Features & Integration",
    ],
  },
  {
    title: "Refinement & Deployment",
    description: "Test, debug, and deploy your application to production",
    lectures: ["Testing & Debugging with AI", "Deployment to Production", "Analytics & Monitoring"],
  },
]

const recentDiscussions = [
  {
    title: "How to handle authentication with Supabase?",
    author: "Sarah Johnson",
    time: "2 hours ago",
    preview:
      "I'm trying to implement social login with Supabase but running into some issues with the callback URLs...",
  },
  {
    title: "Best AI tools for generating landing page copy?",
    author: "Michael Chen",
    time: "Yesterday",
    preview: "I've been using ChatGPT but wondering if there are better specialized tools for SaaS landing pages...",
  },
  {
    title: "Pricing strategy for B2B SaaS products",
    author: "Alex Rivera",
    time: "2 days ago",
    preview: "I'm launching my first B2B SaaS and struggling with pricing. Should I go with tiered pricing or...",
  },
]

const moderationQueue = [
  {
    type: "comment",
    reason: "inappropriate",
    reporter: "David Wilson",
    time: "3 hours ago",
    content: "This comment contains potentially inappropriate language that needs review.",
  },
  {
    type: "post",
    reason: "spam",
    reporter: "Jessica Lee",
    time: "Yesterday",
    content: "This post appears to be promotional content that violates our community guidelines.",
  },
]

const users = [
  {
    name: "Rakesh Debur",
    email: "rakesh.debur@gmail.com",
    role: "Admin",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Instructor",
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Member",
  },
  {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Member",
  },
  {
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    role: "Member",
  },
]
