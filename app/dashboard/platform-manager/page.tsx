"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BarChart3,
  Bug,
  ChevronRight,
  CreditCard,
  Flag,
  Plus,
  TrendingUp,
  Users,
  Zap,
  Brain,
  Lightbulb,
} from "lucide-react"
import { usePremiumFeature } from "@/hooks/use-premium-feature"

export default function PlatformManagerPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { openPremiumFeatureModal, PremiumFeatureModalComponent } = usePremiumFeature()

  // Handler for premium features that aren't built yet
  const handlePremiumFeature = (featureName: string) => {
    openPremiumFeatureModal(featureName)
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Platform Manager</h1>
              <p className="text-gray-600">Manage and optimize your SaaS product in one place</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                All systems operational
              </Badge>
              <Button
                className="bg-purple-700 hover:bg-purple-800"
                onClick={() => handlePremiumFeature("New Feature Creation")}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Feature
              </Button>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5%
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">vs. last month</div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">MRR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">$8,742</div>
                <div className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8.3%
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">vs. last month</div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Open Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">24</div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    7 Critical
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    12 Medium
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">5 resolved this week</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-6 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => handlePremiumFeature(action.title)}
                >
                  <CardContent className="p-4 flex items-center">
                    <div className={`w-10 h-10 rounded-full ${action.bgColor} flex items-center justify-center mr-3`}>
                      <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div
                        className={`w-8 h-8 rounded-full ${activity.bgColor} flex items-center justify-center mr-3 flex-shrink-0`}
                      >
                        <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className="text-xs text-gray-500 ml-2">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        {activity.tags && (
                          <div className="flex space-x-2 mt-1">
                            {activity.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-100 px-6 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => handlePremiumFeature("Activity History")}
                >
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            {/* Platform Health */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>System performance and stability metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">API Response Time</h3>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-2xl font-bold">127ms</div>
                      <div className="text-sm text-green-600">Good</div>
                    </div>
                    <Progress value={25} className="h-2 bg-gray-100" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0ms</span>
                      <span>500ms</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Error Rate</h3>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-2xl font-bold">0.12%</div>
                      <div className="text-sm text-green-600">Good</div>
                    </div>
                    <Progress value={12} className="h-2 bg-gray-100" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>1%</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Uptime</h3>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-2xl font-bold">99.98%</div>
                      <div className="text-sm text-green-600">Excellent</div>
                    </div>
                    <Progress value={99.98} className="h-2 bg-gray-100" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>95%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            {/* Feature Management */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Feature Management</h2>
                <p className="text-gray-600">Track, prioritize, and deploy new features</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handlePremiumFeature("Feature Flags")}>
                  <Flag className="h-4 w-4 mr-2" />
                  Feature Flags
                </Button>
                <Button
                  className="bg-purple-700 hover:bg-purple-800"
                  size="sm"
                  onClick={() => handlePremiumFeature("New Feature Creation")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Feature
                </Button>
              </div>
            </div>

            {/* Feature Roadmap */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Feature Roadmap</CardTitle>
                <CardDescription>Upcoming features and development status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {featureRoadmap.map((stage, index) => (
                    <div key={index}>
                      <h3 className="text-sm font-medium mb-3 flex items-center">
                        <div className={`w-4 h-4 rounded-full ${stage.dotColor} mr-2 flex items-center justify-center`}>
                          {stage.status === "In Progress" && (
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                          )}
                        </div>
                        {stage.title}
                        <Badge
                          variant="outline"
                          className={`ml-2 ${
                            stage.status === "In Progress"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : stage.status === "Planned"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }`}
                        >
                          {stage.status}
                        </Badge>
                      </h3>
                      <div className="space-y-3">
                        {stage.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors cursor-pointer"
                            onClick={() => handlePremiumFeature(`Feature Details: ${feature.name}`)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{feature.name}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="outline"
                                  className={`${
                                    feature.priority === "High"
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : feature.priority === "Medium"
                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                        : "bg-green-50 text-green-700 border-green-200"
                                  }`}
                                >
                                  {feature.priority}
                                </Badge>
                                {feature.eta && (
                                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                    {feature.eta}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                            {feature.progress !== undefined && (
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{feature.progress}%</span>
                                </div>
                                <Progress value={feature.progress} className="h-1.5 bg-gray-100" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feature Analytics */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Feature Analytics</CardTitle>
                <CardDescription>Usage and adoption metrics for your features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureAnalytics.map((feature, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium">{feature.name}</h4>
                          {feature.isNew && (
                            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">New</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{feature.usage}% usage</div>
                      </div>
                      <Progress value={feature.usage} className="h-2 bg-gray-100" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{feature.trend}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 px-2 text-xs"
                          onClick={() => handlePremiumFeature(`Feature Analytics: ${feature.name}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same, but we'll add the premium feature handlers to buttons */}
          {/* ... */}

          {/* Pricing tab */}
          <TabsContent value="pricing" className="space-y-6">
            {/* Pricing Management */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Pricing Management</h2>
                <p className="text-gray-600">Optimize your pricing strategy for growth</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handlePremiumFeature("Billing Settings")}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing Settings
                </Button>
                <Button
                  className="bg-purple-700 hover:bg-purple-800"
                  size="sm"
                  onClick={() => handlePremiumFeature("New Pricing Plan")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Plan
                </Button>
              </div>
            </div>

            {/* Current Pricing Plans */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Current Pricing Plans</CardTitle>
                <CardDescription>Your active pricing tiers and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricingPlans.map((plan, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${
                        plan.recommended
                          ? "border-purple-200 bg-purple-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      } transition-colors`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        {plan.recommended && (
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Popular</Badge>
                        )}
                      </div>
                      <div className="mb-3">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-gray-500 text-sm">/{plan.interval}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Active Customers</span>
                          <span className="font-medium">{plan.customers}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>MRR</span>
                          <span className="font-medium">${plan.mrr}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Churn Rate</span>
                          <span
                            className={`font-medium ${
                              plan.churn < 3 ? "text-green-600" : plan.churn < 5 ? "text-yellow-600" : "text-red-600"
                            }`}
                          >
                            {plan.churn}%
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs h-8"
                          onClick={() => handlePremiumFeature(`Edit Plan: ${plan.name}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs h-8"
                          onClick={() => handlePremiumFeature(`Plan Analytics: ${plan.name}`)}
                        >
                          Analytics
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Optimization */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-purple-700 mr-2" />
                  <CardTitle>AI Pricing Recommendations</CardTitle>
                </div>
                <CardDescription>Data-driven suggestions to optimize your pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingRecommendations.map((rec, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div
                          className={`p-2 rounded-md mr-3 flex-shrink-0 ${
                            rec.impact === "high"
                              ? "bg-green-100 text-green-700"
                              : rec.impact === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          <Lightbulb className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{rec.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <span className="mr-3">Potential Impact:</span>
                            <Badge
                              variant="outline"
                              className={`${
                                rec.impact === "high"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : rec.impact === "medium"
                                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                    : "bg-blue-50 text-blue-700 border-blue-200"
                              }`}
                            >
                              {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePremiumFeature(`Implement: ${rec.title}`)}
                            >
                              Implement
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePremiumFeature(`Learn More: ${rec.title}`)}
                            >
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add similar handlers to the remaining tabs */}
          {/* ... */}
        </Tabs>
      </main>

      {/* Render the premium feature modal */}
      <PremiumFeatureModalComponent />
    </div>
  )
}

// Sample data for the dashboard
const quickActions = [
  {
    title: "Add Feature",
    description: "Create a new feature",
    icon: Zap,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    title: "Track Issue",
    description: "Log a bug or request",
    icon: Bug,
    bgColor: "bg-red-100",
    iconColor: "text-red-700",
  },
  {
    title: "Update Pricing",
    description: "Modify pricing plans",
    icon: CreditCard,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "View Analytics",
    description: "Check performance metrics",
    icon: BarChart3,
    bgColor: "bg-green-100",
    iconColor: "text-green-700",
  },
]

// Rest of the data remains the same
const recentActivity = [
  {
    title: "New Feature Deployed",
    time: "2 hours ago",
    description: "The 'Team Collaboration' feature has been deployed to production.",
    icon: Zap,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-700",
    tags: ["Feature", "Deployment"],
  },
  {
    title: "Critical Bug Fixed",
    time: "Yesterday",
    description: "Fixed issue with user authentication in the mobile app.",
    icon: Bug,
    bgColor: "bg-red-100",
    iconColor: "text-red-700",
    tags: ["Bug", "Mobile"],
  },
  {
    title: "New Customer",
    time: "2 days ago",
    description: "Acme Corp signed up for the Enterprise plan.",
    icon: Users,
    bgColor: "bg-green-100",
    iconColor: "text-green-700",
    tags: ["Customer", "Enterprise"],
  },
  {
    title: "Pricing Updated",
    time: "3 days ago",
    description: "Updated Pro plan pricing from $49 to $59 per month.",
    icon: CreditCard,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-700",
    tags: ["Pricing", "Pro Plan"],
  },
]

const featureRoadmap = [
  {
    title: "In Development",
    status: "In Progress",
    dotColor: "bg-blue-500",
    features: [
      {
        name: "Team Collaboration",
        description: "Allow users to collaborate on projects in real-time",
        priority: "High",
        progress: 75,
        eta: "2 weeks",
      },
      {
        name: "Advanced Analytics",
        description: "Provide deeper insights into user behavior and trends",
        priority: "Medium",
        progress: 40,
        eta: "1 month",
      },
    ],
  },
  {
    title: "Planned",
    status: "Planned",
    dotColor: "bg-purple-500",
    features: [
      {
        name: "Mobile App",
        description: "Native mobile applications for iOS and Android",
        priority: "High",
        eta: "Q3 2023",
      },
      {
        name: "API Improvements",
        description: "Enhanced API with better documentation and examples",
        priority: "Medium",
        eta: "Q3 2023",
      },
    ],
  },
  {
    title: "Recently Completed",
    status: "Completed",
    dotColor: "bg-green-500",
    features: [
      {
        name: "SSO Integration",
        description: "Single sign-on with Google, Microsoft, and SAML",
        priority: "High",
      },
      {
        name: "Data Export",
        description: "Export data in CSV, JSON, and Excel formats",
        priority: "Low",
      },
    ],
  },
]

const featureAnalytics = [
  {
    name: "Dashboard",
    usage: 92,
    trend: "Consistent usage",
    isNew: false,
  },
  {
    name: "Team Collaboration",
    usage: 78,
    trend: "↑ 15% this month",
    isNew: false,
  },
  {
    name: "Data Export",
    usage: 45,
    trend: "↑ 8% this month",
    isNew: false,
  },
  {
    name: "SSO Integration",
    usage: 28,
    trend: "↑ 22% this month",
    isNew: true,
  },
]

const pricingPlans = [
  {
    name: "Basic",
    price: 19,
    interval: "month",
    description: "Essential features for individuals and small teams",
    recommended: false,
    customers: 342,
    mrr: "6,498",
    churn: 4.2,
  },
  {
    name: "Pro",
    price: 59,
    interval: "month",
    description: "Advanced features for growing businesses",
    recommended: true,
    customers: 187,
    mrr: "11,033",
    churn: 2.8,
  },
  {
    name: "Enterprise",
    price: 299,
    interval: "month",
    description: "Complete solution for large organizations",
    recommended: false,
    customers: 28,
    mrr: "8,372",
    churn: 1.5,
  },
]

const pricingRecommendations = [
  {
    title: "Increase Pro Plan Price",
    description:
      "Based on usage patterns and competitor analysis, you could increase the Pro plan price by 10-15% with minimal impact on conversion.",
    impact: "high",
  },
  {
    title: "Add Annual Billing Option",
    description:
      "Offering an annual billing option with a 15-20% discount could improve cash flow and reduce churn by 25-30%.",
    impact: "medium",
  },
  {
    title: "Create Feature-Based Add-ons",
    description:
      "Consider unbundling some premium features as add-ons to create more flexible pricing options for customers with specific needs.",
    impact: "medium",
  },
]

const activeIssues = [
  {
    id: "ISS-423",
    title: "Authentication fails on Safari",
    description: "Users are unable to log in using Safari on macOS Monterey.",
    type: "bug",
    priority: "Critical",
    status: "In Progress",
    reported: "2 days ago",
    comments: 8,
  },
  {
    id: "ISS-422",
    title: "Dashboard loading slowly",
    description: "Dashboard takes >5 seconds to load for users with large datasets.",
    type: "bug",
    priority: "High",
    status: "Open",
    reported: "3 days ago",
    comments: 5,
  },
  {
    id: "ISS-421",
    title: "Add export to PDF feature",
    description: "Users want to export reports as PDF files.",
    type: "feature",
    priority: "Medium",
    status: "Open",
    reported: "5 days ago",
    comments: 12,
  },
  {
    id: "ISS-420",
    title: "Clarify pricing on checkout page",
    description: "Users are confused about billing frequency on the checkout page.",
    type: "support",
    priority: "Low",
    status: "In Progress",
    reported: "1 week ago",
    comments: 3,
  },
]

const supportTickets = [
  {
    subject: "Unable to upgrade subscription",
    preview: "I'm trying to upgrade from Basic to Pro, but keep getting an error message...",
    customer: "John Smith",
    time: "1 hour ago",
    priority: "High",
    status: "New",
  },
  {
    subject: "How to add team members?",
    preview: "I just upgraded to the Team plan and want to add my colleagues...",
    customer: "Sarah Johnson",
    time: "3 hours ago",
    priority: "Medium",
    status: "In Progress",
  },
  {
    subject: "Feature request: Calendar integration",
    preview: "It would be great if your platform could integrate with Google Calendar...",
    customer: "Michael Chen",
    time: "Yesterday",
    priority: "Low",
    status: "In Progress",
  },
  {
    subject: "Billing question",
    preview: "I was charged twice this month for my subscription. Can you help me resolve this?",
    customer: "Emily Rodriguez",
    time: "2 days ago",
    priority: "High",
    status: "Pending",
  },
]

const customerSegmentsByPlan = [
  {
    name: "Enterprise",
    count: 28,
    percentage: 5,
    color: "#8b5cf6",
    indicatorClass: "bg-purple-600",
  },
  {
    name: "Pro",
    count: 187,
    percentage: 34,
    color: "#3b82f6",
    indicatorClass: "bg-blue-600",
  },
  {
    name: "Basic",
    count: 342,
    percentage: 61,
    color: "#10b981",
    indicatorClass: "bg-green-600",
  },
]

const customerSegmentsByActivity = [
  {
    name: "Power Users",
    count: 124,
    percentage: 22,
    color: "#8b5cf6",
    indicatorClass: "bg-purple-600",
  },
  {
    name: "Regular Users",
    count: 285,
    percentage: 51,
    color: "#3b82f6",
    indicatorClass: "bg-blue-600",
  },
  {
    name: "Occasional Users",
    count: 148,
    percentage: 27,
    color: "#10b981",
    indicatorClass: "bg-green-600",
  },
]

const recentCustomers = [
  {
    name: "Acme Corporation",
    email: "john@acmecorp.com",
    plan: "Enterprise",
    joined: "2 days ago",
    mrr: 299,
  },
  {
    name: "Startup Innovators",
    email: "sarah@startupinnovators.com",
    plan: "Pro",
    joined: "3 days ago",
    mrr: 59,
  },
  {
    name: "Freelance Designer",
    email: "mike@designstudio.com",
    plan: "Basic",
    joined: "1 week ago",
    mrr: 19,
  },
  {
    name: "Tech Solutions Inc",
    email: "emily@techsolutions.com",
    plan: "Pro",
    joined: "1 week ago",
    mrr: 59,
  },
]

const aiInsights = [
  {
    type: "critical",
    title: "High Churn Risk Detected",
    description: "10 Pro plan customers haven't used key features in the last 30 days, indicating a high churn risk.",
    actions: ["View At-Risk Customers", "Send Re-engagement Email", "Schedule Check-in Call"],
  },
  {
    type: "warning",
    title: "Feature Adoption Issue",
    description: "The new 'Data Export' feature has only 28% adoption rate. Consider improving onboarding or UI.",
    actions: ["Improve Feature Visibility", "Create Tutorial", "Send Feature Highlight Email"],
  },
  {
    type: "opportunity",
    title: "Upsell Opportunity",
    description:
      "15 Basic plan customers are consistently hitting usage limits. They're prime candidates for upgrading to Pro.",
    actions: ["View Upgrade Candidates", "Create Targeted Offer", "Adjust Usage Limits"],
  },
]
