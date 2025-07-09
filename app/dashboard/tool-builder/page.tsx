"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Plus,
  Database,
  FormInput,
  LayoutDashboard,
  Workflow,
  Copy,
  Trash2,
  ExternalLink,
  Code,
  Save,
  Eye,
  ArrowRight,
} from "lucide-react"
import { usePremiumFeature } from "@/hooks/use-premium-feature"
import { useToast } from "@/components/ui/use-toast"

export default function ToolBuilderPage() {
  const [activeTab, setActiveTab] = useState("my-tools")
  const { openPremiumFeatureModal, PremiumFeatureModalComponent } = usePremiumFeature()
  const { toast } = useToast()

  const [isDemoUser, setIsDemoUser] = useState(false)
  const [demoToolsLoaded, setDemoToolsLoaded] = useState(false)

  // Update the useEffect to automatically set demo mode for new users
  useEffect(() => {
    const demoUser = localStorage.getItem("saasFoundry_demoUser") === "true"
    const demoTools = localStorage.getItem("saasFoundry_demoTools") === "true"

    // If user hasn't explicitly set demo status, set it to true by default
    if (localStorage.getItem("saasFoundry_demoUser") === null) {
      localStorage.setItem("saasFoundry_demoUser", "true")
      setIsDemoUser(true)
    } else {
      setIsDemoUser(demoUser)
    }

    // If demo tools haven't been loaded yet, set them to loaded
    if (!demoTools) {
      localStorage.setItem("saasFoundry_demoTools", "true")
      setDemoToolsLoaded(true)
    } else {
      setDemoToolsLoaded(demoTools)
    }
  }, [])

  // Add this function to handle adding a tool to the platform
  const handleAddToPlatform = (toolName: string) => {
    if (isDemoUser) {
      // For demo users, show a success message
      toast({
        title: "Tool added to your platform!",
        description: `${toolName} has been added to your SaaS platform.`,
        variant: "success",
      })
    } else {
      // For regular users, trigger the premium feature modal
      handlePremiumFeature(`Add to Platform: ${toolName}`)
    }
  }

  // Handler for premium features that aren't built yet
  const handlePremiumFeature = (featureName: string) => {
    openPremiumFeatureModal(featureName)
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {isDemoUser && demoToolsLoaded && (
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
                  You're viewing the Tool Builder in demo mode. You can explore demo tools and add them to your
                  platform.
                </div>
              </div>
            </div>
          </div>
        )}
        {isDemoUser && demoToolsLoaded && (
          <div className="bg-white border border-purple-200 rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-purple-800 mb-3">🚀 Getting Started with Tool Builder</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center text-purple-700 font-medium mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Browse Demo Tools</h3>
                  <p className="text-sm text-gray-600">
                    Explore pre-built demo tools below that are popular among SaaS founders.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center text-purple-700 font-medium mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Try Tool Prompts</h3>
                  <p className="text-sm text-gray-600">
                    Click on any tool prompt in the "Popular Tool Prompts" section to instantly add it to your platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center text-purple-700 font-medium mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Add to Your Platform</h3>
                  <p className="text-sm text-gray-600">
                    Click "Add to Platform" on any demo tool to make it available in your SaaS platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center text-purple-700 font-medium mr-3 mt-0.5">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Customize for Your Needs</h3>
                  <p className="text-sm text-gray-600">
                    In the full version, you'll be able to customize these tools to fit your specific business needs.
                  </p>
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
              <h1 className="text-2xl font-bold mb-2">Tool Builder</h1>
              <p className="text-gray-600">Create custom internal tools without coding</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Button
                className="bg-purple-700 hover:bg-purple-800"
                onClick={() => handlePremiumFeature("Create New Tool")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Tool
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="my-tools" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="my-tools">My Tools</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="my-tools" className="space-y-6">
            {/* Tool Categories */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {toolCategories.map((category, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => handlePremiumFeature(`${category.title} Tools`)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full ${category.bgColor} flex items-center justify-center mb-3`}>
                      <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                    </div>
                    <h3 className="font-medium">{category.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Popular Tool Prompts</h2>
                <Badge className="bg-purple-100 text-purple-700">Demo Feature</Badge>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-sm text-purple-800 mb-4">
                  <span className="font-medium">Quick Start:</span> Click on any prompt below to instantly add that tool
                  to your SaaS platform. These are the most popular tools used by successful SaaS founders.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {toolPrompts.map((prompt, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-md border border-purple-100 hover:border-purple-300 hover:shadow-md cursor-pointer transition-all"
                      onClick={() => handleAddToPlatform(prompt.title)}
                    >
                      <div className="flex items-start">
                        <div
                          className={`w-10 h-10 rounded-full ${prompt.iconBg} flex items-center justify-center mr-3 mt-1`}
                        >
                          <prompt.icon className={`h-5 w-5 ${prompt.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{prompt.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{prompt.description}</p>
                          <div className="mt-2">
                            <span className="inline-flex items-center text-xs font-medium text-purple-700 hover:text-purple-800">
                              Add to platform <ArrowRight className="ml-1 h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Tools */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Tools</h2>
                <Button variant="outline" size="sm" onClick={() => handlePremiumFeature("View All Tools")}>
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(isDemoUser && demoToolsLoaded ? [...demoTools, ...recentTools] : recentTools).map((tool, index) => (
                  <Card
                    key={index}
                    className={`border ${tool.demoTool ? "border-purple-200" : "border-gray-100"} shadow-sm hover:shadow-md transition-shadow duration-200`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${tool.iconBg} flex items-center justify-center mr-2`}>
                            <tool.icon className={`h-4 w-4 ${tool.iconColor}`} />
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          {tool.demoTool && (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">Demo</Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={`${
                              tool.type === "Form"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : tool.type === "Dashboard"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : tool.type === "Workflow"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                            }`}
                          >
                            {tool.type}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center justify-between mb-1">
                          <span>{tool.created}</span>
                          <span>{tool.views} views</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {tool.demoTool ? (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-purple-700 hover:bg-purple-800 w-full"
                          onClick={() => handleAddToPlatform(tool.name)}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add to Platform
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePremiumFeature(`Edit Tool: ${tool.name}`)}
                        >
                          Edit
                        </Button>
                      )}
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            isDemoUser && tool.demoTool
                              ? handleAddToPlatform(tool.name)
                              : handlePremiumFeature(`Preview Tool: ${tool.name}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handlePremiumFeature(`Copy Tool: ${tool.name}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handlePremiumFeature(`Delete Tool: ${tool.name}`)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tool Templates</h2>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="w-64 pl-8"
                  onClick={() => handlePremiumFeature("Search Templates")}
                />
                <div className="absolute left-2.5 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {toolTemplates.map((template, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full ${template.iconBg} flex items-center justify-center mr-2`}
                        >
                          <template.icon className={`h-4 w-4 ${template.iconColor}`} />
                        </div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          template.type === "Form"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : template.type === "Dashboard"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : template.type === "Database"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {template.type}
                      </Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-gray-500 flex items-center justify-between">
                      <span>{template.complexity} complexity</span>
                      <span>{template.usedBy}+ users</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-purple-700 hover:bg-purple-800"
                      onClick={() => handlePremiumFeature(`Use Template: ${template.name}`)}
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Available Integrations</h2>
              <Button variant="outline" onClick={() => handlePremiumFeature("Request Integration")}>
                Request Integration
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center mr-2 overflow-hidden">
                          <img
                            src={`/placeholder.svg?height=32&width=32&text=${integration.name.charAt(0)}`}
                            alt={integration.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          integration.connected
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {integration.connected ? "Connected" : "Available"}
                      </Badge>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-gray-500">
                      <div className="flex flex-wrap gap-2">
                        {integration.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="bg-gray-50">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${
                        integration.connected
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-purple-700 hover:bg-purple-800"
                      }`}
                      onClick={() =>
                        handlePremiumFeature(
                          integration.connected
                            ? `Manage Integration: ${integration.name}`
                            : `Connect: ${integration.name}`,
                        )
                      }
                    >
                      {integration.connected ? "Manage Connection" : "Connect"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tool Builder Settings</CardTitle>
                <CardDescription>Configure your tool builder environment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-database">Default Database Connection</Label>
                  <div className="flex">
                    <Input
                      id="default-database"
                      value="Main Application Database"
                      readOnly
                      className="rounded-r-none"
                      onClick={() => handlePremiumFeature("Database Settings")}
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() => handlePremiumFeature("Database Settings")}
                    >
                      Change
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="access-control">Default Access Control</Label>
                  <div className="flex">
                    <Input
                      id="access-control"
                      value="Team Members Only"
                      readOnly
                      className="rounded-r-none"
                      onClick={() => handlePremiumFeature("Access Control Settings")}
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() => handlePremiumFeature("Access Control Settings")}
                    >
                      Change
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Default Theme</Label>
                  <div className="flex">
                    <Input
                      id="theme"
                      value="Light Mode"
                      readOnly
                      className="rounded-r-none"
                      onClick={() => handlePremiumFeature("Theme Settings")}
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() => handlePremiumFeature("Theme Settings")}
                    >
                      Change
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-3">Advanced Settings</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handlePremiumFeature("Custom Code Settings")}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Custom Code & Scripts
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handlePremiumFeature("API Access Settings")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      API Access & Webhooks
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handlePremiumFeature("Backup Settings")}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Backups & Versioning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Render the premium feature modal */}
      <PremiumFeatureModalComponent />
    </div>
  )
}

// Sample data for the tool builder
const toolCategories = [
  {
    title: "Forms",
    description: "Create custom forms for data collection",
    icon: FormInput,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Databases",
    description: "Build and manage custom databases",
    icon: Database,
    bgColor: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    title: "Dashboards",
    description: "Create visual dashboards and reports",
    icon: LayoutDashboard,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "Workflows",
    description: "Automate processes and tasks",
    icon: Workflow,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-700",
  },
]

const demoTools = [
  {
    name: "Customer Onboarding Wizard",
    description: "Interactive onboarding flow for new customers",
    type: "Workflow",
    icon: Workflow,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    created: "Demo Tool",
    views: 156,
    demoTool: true,
  },
  {
    name: "Feature Request Portal",
    description: "Customer-facing portal for collecting feature requests",
    type: "Form",
    icon: FormInput,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    created: "Demo Tool",
    views: 89,
    demoTool: true,
  },
  {
    name: "Customer Health Score",
    description: "Dashboard to track customer engagement and satisfaction",
    type: "Dashboard",
    icon: LayoutDashboard,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    created: "Demo Tool",
    views: 112,
    demoTool: true,
  },
]

const recentTools = [
  {
    name: "Customer Feedback Form",
    description: "Form for collecting customer feedback and suggestions",
    type: "Form",
    icon: FormInput,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    created: "2 days ago",
    views: 42,
  },
  {
    name: "Support Ticket Manager",
    description: "Database for tracking and managing support tickets",
    type: "Database",
    icon: Database,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    created: "1 week ago",
    views: 128,
  },
  {
    name: "Sales Performance Dashboard",
    description: "Visual dashboard for tracking sales metrics",
    type: "Dashboard",
    icon: LayoutDashboard,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    created: "2 weeks ago",
    views: 87,
  },
]

const toolTemplates = [
  {
    name: "Customer Onboarding",
    description: "Complete customer onboarding workflow with forms and automation",
    type: "Workflow",
    icon: Workflow,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    complexity: "Medium",
    usedBy: 245,
  },
  {
    name: "Feature Request Tracker",
    description: "Database and form for collecting and prioritizing feature requests",
    type: "Database",
    icon: Database,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    complexity: "Low",
    usedBy: 189,
  },
  {
    name: "User Feedback Survey",
    description: "Comprehensive survey form with rating scales and open questions",
    type: "Form",
    icon: FormInput,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    complexity: "Low",
    usedBy: 312,
  },
  {
    name: "Product Analytics Dashboard",
    description: "Visual dashboard for tracking product usage and metrics",
    type: "Dashboard",
    icon: LayoutDashboard,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    complexity: "High",
    usedBy: 176,
  },
  {
    name: "Customer Support Portal",
    description: "Complete support ticket system with customer portal",
    type: "Database",
    icon: Database,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    complexity: "High",
    usedBy: 142,
  },
  {
    name: "Team Task Manager",
    description: "Internal tool for assigning and tracking team tasks",
    type: "Workflow",
    icon: Workflow,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    complexity: "Medium",
    usedBy: 203,
  },
]

const integrations = [
  {
    name: "Stripe",
    description: "Payment processing and subscription management",
    connected: true,
    features: ["Payments", "Subscriptions", "Invoices"],
  },
  {
    name: "Google Analytics",
    description: "Web analytics and user behavior tracking",
    connected: true,
    features: ["Analytics", "User Tracking", "Reports"],
  },
  {
    name: "Slack",
    description: "Team communication and notifications",
    connected: false,
    features: ["Notifications", "Alerts", "Commands"],
  },
  {
    name: "Intercom",
    description: "Customer messaging and support",
    connected: false,
    features: ["Chat", "Support", "Engagement"],
  },
  {
    name: "Zapier",
    description: "Connect with 3,000+ apps and automate workflows",
    connected: false,
    features: ["Automation", "Integration", "Workflows"],
  },
  {
    name: "GitHub",
    description: "Code repository and version control",
    connected: true,
    features: ["Code", "Issues", "Pull Requests"],
  },
]

const toolPrompts = [
  {
    title: "Customer Feedback Collection System",
    description: "Create a form and database to collect and analyze customer feedback",
    icon: FormInput,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "User Onboarding Workflow",
    description: "Build a step-by-step onboarding process for new users",
    icon: Workflow,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    title: "Feature Usage Analytics Dashboard",
    description: "Create a dashboard to track which features are most used",
    icon: LayoutDashboard,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "Customer Support Ticket System",
    description: "Build a database and workflow for managing support tickets",
    icon: Database,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
]
