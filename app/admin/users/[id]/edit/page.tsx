"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Key, Clock, BookOpen, MessageCircle } from "lucide-react"

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const userId = Number.parseInt(params.id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // In a real app, you would fetch the user data based on the ID
  // For this example, we'll use mock data
  const [userData, setUserData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Instructor",
    status: "Active",
    lastLogin: "Yesterday",
    joinDate: "Feb 3, 2023",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleRoleChange = (value: string) => {
    setUserData({
      ...userData,
      role: value,
    })
  }

  const handleStatusChange = (value: string) => {
    setUserData({
      ...userData,
      status: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real implementation, this would send data to your backend
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin/users")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin/users" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to user management
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Edit User: {userData.name}</h1>
              <p className="text-gray-600">Manage user details and permissions</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-4 mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Edit basic user information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter user's full name"
                      value={userData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter user's email address"
                      value={userData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">User Role</Label>
                      <Select value={userData.role} onValueChange={handleRoleChange}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Instructor">Instructor</SelectItem>
                          <SelectItem value="Member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Account Status</Label>
                      <Select value={userData.status} onValueChange={handleStatusChange}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" type="button" asChild>
                    <Link href="/admin/users">Cancel</Link>
                  </Button>
                  <Button type="submit" className="bg-purple-700 hover:bg-purple-800" disabled={isSubmitting}>
                    {isSubmitting ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage user password and security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="flex space-x-2">
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                    <Button variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-purple-700 hover:bg-purple-800">Reset Password</Button>
                  <p className="text-xs text-gray-500 mt-2">This will send a password reset email to the user.</p>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-medium mb-2">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Require 2FA for this user</p>
                      <p className="text-xs text-gray-500">User will be prompted to set up 2FA on next login</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-5 rounded-full bg-gray-300 relative cursor-pointer">
                        <div className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Recent user actions and login history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Login History</h3>
                    <div className="space-y-3">
                      {loginHistory.map((login, index) => (
                        <div key={index} className="flex items-start">
                          <div className="p-2 rounded-md bg-gray-100 mr-3">
                            <Clock className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{login.time}</p>
                            <p className="text-xs text-gray-500">
                              {login.device} • {login.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Content Activity</h3>
                    <div className="space-y-3">
                      {contentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <div
                            className={`p-2 rounded-md mr-3 ${
                              activity.type === "course"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {activity.type === "course" ? (
                              <BookOpen className="h-4 w-4" />
                            ) : (
                              <MessageCircle className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>Manage specific permissions for this user</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Course Permissions</h3>
                    <div className="space-y-2">
                      {coursePermissions.map((permission, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                        >
                          <div>
                            <div className="font-medium text-sm">{permission.name}</div>
                            <div className="text-xs text-gray-500">{permission.description}</div>
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-5 rounded-full ${
                                permission.enabled ? "bg-purple-600" : "bg-gray-300"
                              } relative cursor-pointer`}
                            >
                              <div
                                className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  permission.enabled ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Community Permissions</h3>
                    <div className="space-y-2">
                      {communityPermissions.map((permission, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                        >
                          <div>
                            <div className="font-medium text-sm">{permission.name}</div>
                            <div className="text-xs text-gray-500">{permission.description}</div>
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-5 rounded-full ${
                                permission.enabled ? "bg-purple-600" : "bg-gray-300"
                              } relative cursor-pointer`}
                            >
                              <div
                                className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  permission.enabled ? "translate-x-5" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-purple-700 hover:bg-purple-800">Save Permissions</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

const loginHistory = [
  {
    time: "Yesterday, 3:24 PM",
    device: "Chrome on Windows",
    location: "San Francisco, CA",
  },
  {
    time: "May 2, 2023, 10:15 AM",
    device: "Safari on iPhone",
    location: "San Francisco, CA",
  },
  {
    time: "April 28, 2023, 8:42 AM",
    device: "Chrome on MacOS",
    location: "San Francisco, CA",
  },
]

const contentActivity = [
  {
    type: "course",
    action: "Completed lecture: Building Landing Pages with AI",
    time: "3 days ago",
  },
  {
    type: "community",
    action: "Posted comment in 'Best AI tools for landing page copy'",
    time: "1 week ago",
  },
  {
    type: "course",
    action: "Started module: Development Fundamentals",
    time: "2 weeks ago",
  },
  {
    type: "community",
    action: "Created discussion: 'How to handle authentication with Supabase?'",
    time: "3 weeks ago",
  },
]

const coursePermissions = [
  {
    name: "Create Courses",
    description: "Can create new courses and modules",
    enabled: true,
  },
  {
    name: "Edit All Courses",
    description: "Can edit courses created by other instructors",
    enabled: false,
  },
  {
    name: "Delete Courses",
    description: "Can delete courses from the platform",
    enabled: false,
  },
  {
    name: "Manage Resources",
    description: "Can add and remove course resources",
    enabled: true,
  },
]

const communityPermissions = [
  {
    name: "Moderate Discussions",
    description: "Can edit and delete any discussions or comments",
    enabled: true,
  },
  {
    name: "Pin Discussions",
    description: "Can pin important discussions to the top",
    enabled: true,
  },
  {
    name: "Create Announcements",
    description: "Can create platform-wide announcements",
    enabled: false,
  },
  {
    name: "Ban Users",
    description: "Can temporarily ban users from the community",
    enabled: false,
  },
]
