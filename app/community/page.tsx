import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MessageCircle, Search, Users } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">SaaSFoundry Community</h1>
            <p className="text-xl text-gray-600">
              Connect with other founders, share your progress, and get help when you need it.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search discussions..." className="pl-10" />
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Latest
            </Button>
            <Button variant="outline" size="sm">
              Popular
            </Button>
            <Button variant="outline" size="sm">
              Unanswered
            </Button>
            <Button className="bg-purple-700 hover:bg-purple-800" size="sm">
              New Discussion
            </Button>
          </div>
        </div>

        {/* Community Content */}
        <Tabs defaultValue="discussions" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3 mb-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {discussions.map((discussion, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-4 flex-shrink-0 overflow-hidden">
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=${discussion.author.charAt(0)}`}
                            alt={discussion.author}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <Link
                              href={`/community/discussion/${index}`}
                              className="text-lg font-medium hover:text-purple-700"
                            >
                              {discussion.title}
                            </Link>
                            <span className="text-xs text-gray-500">{discussion.time}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{discussion.preview}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-4">{discussion.author}</span>
                            <span className="mr-4 flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {discussion.replies} replies
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {discussion.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center pt-4">
                  <Button variant="outline">Load More</Button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Popular Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((topic, index) => (
                        <Button key={index} variant="outline" size="sm" className="rounded-full">
                          {topic}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Active Members */}
                <Card>
                  <CardHeader>
                    <CardTitle>Active Members</CardTitle>
                    <CardDescription>Members who are most active this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeMembers.map((member, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                            <img
                              src={`/placeholder.svg?height=40&width=40&text=${member.name.charAt(0)}`}
                              alt={member.name}
                            />
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.posts} posts</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="w-full">
                      View All Members
                    </Button>
                  </CardFooter>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.map((event, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-500 mb-2">
                            {event.date} • {event.time}
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            RSVP
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-gray-200 mr-4 flex-shrink-0 overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=64&width=64&text=${member.name.charAt(0)}`}
                          alt={member.name}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-lg">{member.name}</div>
                        <div className="text-sm text-gray-500 mb-2">{member.role}</div>
                        <div className="text-sm text-gray-500">Joined {member.joined}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allEvents.map((event, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {event.date} • {event.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="text-sm text-gray-500">
                      <div className="mb-1">Host: {event.host}</div>
                      <div>Attendees: {event.attendees}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                    <Button className="bg-purple-700 hover:bg-purple-800" size="sm">
                      RSVP
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const discussions = [
  {
    title: "How to handle authentication with Supabase?",
    author: "Sarah Johnson",
    time: "2 hours ago",
    preview:
      "I'm trying to implement social login with Supabase but running into some issues with the callback URLs. Has anyone successfully implemented this in a Next.js app?",
    replies: 8,
    views: 42,
  },
  {
    title: "Best AI tools for generating landing page copy?",
    author: "Michael Chen",
    time: "Yesterday",
    preview:
      "I've been using ChatGPT but wondering if there are better specialized tools for SaaS landing pages. What has worked well for you?",
    replies: 15,
    views: 87,
  },
  {
    title: "Pricing strategy for B2B SaaS products",
    author: "Alex Rivera",
    time: "2 days ago",
    preview:
      "I'm launching my first B2B SaaS and struggling with pricing. Should I go with tiered pricing or usage-based? What has worked for your startups?",
    replies: 23,
    views: 156,
  },
  {
    title: "How to implement Stripe subscriptions with Next.js?",
    author: "Jessica Lee",
    time: "3 days ago",
    preview:
      "I'm trying to set up recurring subscriptions with Stripe in my Next.js app. Has anyone done this recently who can share some code examples?",
    replies: 12,
    views: 98,
  },
  {
    title: "Feedback on my SaaS landing page design",
    author: "David Wilson",
    time: "4 days ago",
    preview:
      "I just finished designing my landing page using the techniques from Module 3. Would love to get some feedback from the community before I launch.",
    replies: 19,
    views: 124,
  },
]

const topics = [
  "Next.js",
  "Supabase",
  "AI Tools",
  "Landing Pages",
  "Authentication",
  "Pricing",
  "Marketing",
  "Design",
  "User Acquisition",
  "Deployment",
]

const activeMembers = [
  { name: "Sarah Johnson", posts: 42 },
  { name: "Michael Chen", posts: 38 },
  { name: "Alex Rivera", posts: 31 },
  { name: "Jessica Lee", posts: 27 },
  { name: "David Wilson", posts: 23 },
]

const events = [
  {
    title: "Weekly Office Hours",
    date: "Wed, Apr 28",
    time: "2:00 PM EST",
  },
  {
    title: "Landing Page Workshop",
    date: "Fri, Apr 30",
    time: "1:00 PM EST",
  },
  {
    title: "Founder Showcase",
    date: "Mon, May 3",
    time: "3:00 PM EST",
  },
]

const allMembers = [
  { name: "Sarah Johnson", role: "SaaS Founder", joined: "Jan 2023" },
  { name: "Michael Chen", role: "Product Designer", joined: "Feb 2023" },
  { name: "Alex Rivera", role: "Marketing Specialist", joined: "Mar 2023" },
  { name: "Jessica Lee", role: "SaaS Founder", joined: "Jan 2023" },
  { name: "David Wilson", role: "Developer", joined: "Apr 2023" },
  { name: "Emily Brown", role: "UX Designer", joined: "Feb 2023" },
  { name: "James Taylor", role: "SaaS Founder", joined: "Mar 2023" },
  { name: "Sophia Garcia", role: "Growth Marketer", joined: "Apr 2023" },
  { name: "Daniel Kim", role: "Product Manager", joined: "Jan 2023" },
]

const allEvents = [
  {
    title: "Weekly Office Hours",
    date: "Wed, Apr 28",
    time: "2:00 PM EST",
    description: "Get your questions answered by our instructors in this live Q&A session.",
    host: "John Smith",
    attendees: "24 going",
  },
  {
    title: "Landing Page Workshop",
    date: "Fri, Apr 30",
    time: "1:00 PM EST",
    description: "Learn how to optimize your landing page for conversions with practical examples.",
    host: "Sarah Johnson",
    attendees: "18 going",
  },
  {
    title: "Founder Showcase",
    date: "Mon, May 3",
    time: "3:00 PM EST",
    description: "Selected founders will present their SaaS products and get feedback from the community.",
    host: "Michael Chen",
    attendees: "32 going",
  },
  {
    title: "AI Tools Deep Dive",
    date: "Thu, May 6",
    time: "2:00 PM EST",
    description: "Explore advanced techniques for using AI tools in your product development process.",
    host: "Alex Rivera",
    attendees: "15 going",
  },
  {
    title: "Pricing Strategy Workshop",
    date: "Tue, May 11",
    time: "1:00 PM EST",
    description: "Learn how to structure your pricing to maximize revenue and customer satisfaction.",
    host: "Jessica Lee",
    attendees: "27 going",
  },
  {
    title: "User Acquisition Strategies",
    date: "Fri, May 14",
    time: "3:00 PM EST",
    description: "Discover effective strategies for acquiring your first 100 customers.",
    host: "David Wilson",
    attendees: "21 going",
  },
]
