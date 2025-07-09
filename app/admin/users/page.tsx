"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, UserPlus, Mail, Ban, CheckCircle } from "lucide-react"

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter users based on search query and active tab
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && user.role.toLowerCase() === activeTab.toLowerCase()
  })

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
              <h1 className="text-2xl font-bold mb-2">User Management</h1>
              <p className="text-gray-600">Manage platform users and permissions</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-purple-700 hover:bg-purple-800" asChild>
              <Link href="/admin/users/new">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
              <TabsTrigger value="instructor">Instructors</TabsTrigger>
              <TabsTrigger value="member">Members</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
            <CardDescription>
              {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                        <img src={`/placeholder.svg?height=40&width=40&text=${user.name.charAt(0)}`} alt={user.name} />
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4">
                      <div className="flex items-center mb-3 md:mb-0">
                        <Badge
                          className={`${
                            user.role === "Admin"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : user.role === "Instructor"
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {user.role}
                        </Badge>
                        <Badge
                          className={`ml-2 ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }`}
                        >
                          {user.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/users/${index}/edit`}>Edit</Link>
                        </Button>
                        {user.status === "Active" ? (
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            <Ban className="h-4 w-4 mr-1" />
                            Suspend
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <UserPlus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No users found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

const users = [
  {
    name: "Rakesh Debur",
    email: "rakesh.debur@gmail.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2 hours ago",
    joinDate: "Jan 15, 2023",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Instructor",
    status: "Active",
    lastLogin: "Yesterday",
    joinDate: "Feb 3, 2023",
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Member",
    status: "Active",
    lastLogin: "3 days ago",
    joinDate: "Mar 12, 2023",
  },
  {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Member",
    status: "Inactive",
    lastLogin: "2 weeks ago",
    joinDate: "Apr 5, 2023",
  },
  {
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    role: "Member",
    status: "Active",
    lastLogin: "1 day ago",
    joinDate: "May 20, 2023",
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "Instructor",
    status: "Active",
    lastLogin: "4 hours ago",
    joinDate: "Jun 8, 2023",
  },
  {
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "Member",
    status: "Active",
    lastLogin: "5 days ago",
    joinDate: "Jul 17, 2023",
  },
]
