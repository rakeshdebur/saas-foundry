"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Flag, Search, AlertCircle, CheckCircle, XCircle, PlusCircle } from "lucide-react"

export default function CommunityManagementPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to admin dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Community Management</h1>
              <p className="text-gray-600">Manage discussions, comments, and user interactions</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search discussions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/community/flagged">
                <Flag className="h-4 w-4 mr-2" />
                Flagged Content
              </Link>
            </Button>
            <Button className="bg-purple-700 hover:bg-purple-800" size="sm" asChild>
              <Link href="/admin/community/announcements/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Announcement
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="discussions" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3 mb-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Discussions</CardTitle>
                <CardDescription>Manage community discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussions.map((discussion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between bg-gray-50 p-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                            <img
                              src={`/placeholder.svg?height=40&width=40&text=${discussion.author.charAt(0)}`}
                              alt={discussion.author}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{discussion.title}</h3>
                            <p className="text-sm text-gray-500">
                              by {discussion.author} • {discussion.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {discussion.category}
                          </Badge>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {discussion.replies}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-4">{discussion.preview}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/community/discussions/${index}`}>View</Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            Pin
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          >
                            Hide
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Queue</CardTitle>
                <CardDescription>Content requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moderationItems.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between bg-gray-50 p-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <div
                            className={`p-2 rounded-md mr-3 ${
                              item.type === "comment" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.type === "comment" ? (
                              <MessageCircle className="h-4 w-4" />
                            ) : (
                              <MessageCircle className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {item.type === "comment" ? "Comment" : "Discussion"} flagged as {item.reason}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Reported by {item.reporter} • {item.time}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={
                            item.status === "pending"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="bg-gray-50 p-3 rounded-md mb-4">
                          <p className="text-sm text-gray-600">{item.content}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-amber-600 hover:text-amber-700">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Warn User
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <XCircle className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Settings</CardTitle>
                <CardDescription>Configure community features and moderation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Moderation Settings</h3>
                    <div className="space-y-2">
                      {moderationSettings.map((setting, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                        >
                          <div>
                            <div className="font-medium">{setting.name}</div>
                            <div className="text-sm text-gray-500">{setting.description}</div>
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-5 rounded-full ${
                                setting.enabled ? "bg-purple-600" : "bg-gray-300"
                              } relative cursor-pointer`}
                            >
                              <div
                                className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  setting.enabled ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Community Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                        >
                          <div className="font-medium">{category.name}</div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add Category
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

const discussions = [
  {
    title: "How to handle authentication with Supabase?",
    author: "Sarah Johnson",
    time: "2 hours ago",
    category: "Development",
    replies: 8,
    preview:
      "I'm trying to implement social login with Supabase but running into some issues with the callback URLs. Has anyone successfully implemented this in a Next.js app?",
  },
  {
    title: "Best AI tools for generating landing page copy?",
    author: "Michael Chen",
    time: "Yesterday",
    category: "AI Tools",
    replies: 15,
    preview:
      "I've been using ChatGPT but wondering if there are better specialized tools for SaaS landing pages. What has worked well for you?",
  },
  {
    title: "Pricing strategy for B2B SaaS products",
    author: "Alex Rivera",
    time: "2 days ago",
    category: "Business",
    replies: 23,
    preview:
      "I'm launching my first B2B SaaS and struggling with pricing. Should I go with tiered pricing or usage-based? What has worked for your startups?",
  },
  {
    title: "How to implement Stripe subscriptions with Next.js?",
    author: "Jessica Lee",
    time: "3 days ago",
    category: "Development",
    replies: 12,
    preview:
      "I'm trying to set up recurring subscriptions with Stripe in my Next.js app. Has anyone done this recently who can share some code examples?",
  },
]

const moderationItems = [
  {
    type: "comment",
    reason: "inappropriate",
    reporter: "David Wilson",
    time: "3 hours ago",
    status: "pending",
    content:
      "This comment contains potentially inappropriate language that needs review. The user has used terms that may violate our community guidelines.",
  },
  {
    type: "discussion",
    reason: "spam",
    reporter: "Jessica Lee",
    time: "Yesterday",
    status: "pending",
    content:
      "This post appears to be promotional content that violates our community guidelines. It contains multiple links to external products and services.",
  },
  {
    type: "comment",
    reason: "harassment",
    reporter: "Michael Chen",
    time: "2 days ago",
    status: "reviewed",
    content:
      "This comment was reported for harassment but has been reviewed and found to be within community guidelines.",
  },
]

const moderationSettings = [
  {
    name: "Auto-moderation",
    description: "Automatically flag content with potentially inappropriate language",
    enabled: true,
  },
  {
    name: "Require approval for new users",
    description: "First post from new users requires moderator approval",
    enabled: false,
  },
  {
    name: "Allow community flagging",
    description: "Let community members flag inappropriate content",
    enabled: true,
  },
  {
    name: "Profanity filter",
    description: "Automatically filter out profanity in posts and comments",
    enabled: true,
  },
]

const categories = [
  { name: "Development" },
  { name: "AI Tools" },
  { name: "Business" },
  { name: "Design" },
  { name: "Marketing" },
]
