"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Brain,
  AlertCircle,
  Lightbulb,
} from "lucide-react"

export default function SaasHealthDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isConnected, setIsConnected] = useState(false)

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
              <h1 className="text-2xl font-bold mb-2">SaaS Health Dashboard</h1>
              <p className="text-gray-600">Monitor, analyze, and optimize your SaaS business</p>
            </div>
            {!isConnected && (
              <Button className="mt-4 md:mt-0 bg-purple-700 hover:bg-purple-800" onClick={() => setIsConnected(true)}>
                Connect Data Sources
              </Button>
            )}
          </div>
        </div>

        {!isConnected ? (
          <Card className="mb-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Brain className="h-16 w-16 text-purple-200 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Connect Your Data Sources</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Connect your business tools to get AI-powered insights and recommendations for your SaaS startup.
                </p>
                <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto mb-8">
                  {dataSources.map((source, index) => (
                    <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mr-3">
                        <source.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <span>{source.name}</span>
                    </div>
                  ))}
                </div>
                <Button className="bg-purple-700 hover:bg-purple-800" onClick={() => setIsConnected(true)}>
                  Connect Data Sources
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <metric.icon className="h-5 w-5 text-purple-700" />
                      </div>
                      <div
                        className={`flex items-center text-sm ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {metric.change > 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-500">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Growth Chart */}
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Revenue Growth</CardTitle>
                    <CardDescription>Monthly recurring revenue over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-end">
                      {growthData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full max-w-[50px] bg-purple-600 rounded-t-sm mx-1"
                            style={{ height: `${(item.value / 5000) * 200}px` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Acquisition */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle>Customer Acquisition</CardTitle>
                      <CardDescription>New customers vs churn</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">New Customers</div>
                            <div className="text-sm text-gray-500">24 this month</div>
                          </div>
                          <Progress value={80} className="h-2 bg-gray-100" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">Churn Rate</div>
                            <div className="text-sm text-gray-500">5.2%</div>
                          </div>
                          <Progress value={26} className="h-2 bg-gray-100" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">Net Growth</div>
                            <div className="text-sm text-gray-500">+18 customers</div>
                          </div>
                          <Progress value={60} className="h-2 bg-gray-100" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle>Key Performance Indicators</CardTitle>
                      <CardDescription>Critical metrics for your SaaS</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {kpis.map((kpi, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="text-sm font-medium">{kpi.label}</div>
                            <div className="text-sm font-bold">{kpi.value}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-6">
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Financial Health</CardTitle>
                    <CardDescription>Key financial metrics and runway</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Runway</h3>
                        <div className="flex items-center mb-1">
                          <div className="text-2xl font-bold mr-2">8.5 months</div>
                          <div className="text-sm text-amber-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Action needed
                          </div>
                        </div>
                        <Progress value={35} className="h-3 bg-gray-100" />
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Critical (3mo)</span>
                          <span>Warning (6mo)</span>
                          <span>Good (12mo)</span>
                          <span>Excellent (18mo+)</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-sm font-medium mb-2">Monthly Burn Rate</div>
                          <div className="text-xl font-bold">$12,500</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-sm font-medium mb-2">Cash on Hand</div>
                          <div className="text-xl font-bold">$106,250</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-sm font-medium mb-2">MRR</div>
                          <div className="text-xl font-bold">$4,750</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-sm font-medium mb-2">ARR</div>
                          <div className="text-xl font-bold">$57,000</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                    <CardDescription>Revenue by plan and customer segment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Revenue by Plan</div>
                        <div className="flex h-4 mb-1">
                          <div className="bg-purple-700 h-full rounded-l-sm w-[60%]"></div>
                          <div className="bg-purple-500 h-full w-[25%]"></div>
                          <div className="bg-purple-300 h-full rounded-r-sm w-[15%]"></div>
                        </div>
                        <div className="flex text-xs text-gray-500 justify-between">
                          <div>Premium (60%)</div>
                          <div>Standard (25%)</div>
                          <div>Basic (15%)</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Revenue by Customer Segment</div>
                        <div className="flex h-4 mb-1">
                          <div className="bg-blue-700 h-full rounded-l-sm w-[45%]"></div>
                          <div className="bg-blue-500 h-full w-[30%]"></div>
                          <div className="bg-blue-300 h-full rounded-r-sm w-[25%]"></div>
                        </div>
                        <div className="flex text-xs text-gray-500 justify-between">
                          <div>SMB (45%)</div>
                          <div>Mid-Market (30%)</div>
                          <div>Enterprise (25%)</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customers" className="space-y-6">
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Customer Health</CardTitle>
                    <CardDescription>Engagement and satisfaction metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-sm font-medium mb-2">Active Users</div>
                          <div className="text-xl font-bold">78%</div>
                          <div className="text-xs text-gray-500">of total users</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-sm font-medium mb-2">NPS Score</div>
                          <div className="text-xl font-bold">42</div>
                          <div className="text-xs text-green-600">Good</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="text-sm font-medium mb-2">Avg. Session</div>
                          <div className="text-xl font-bold">18 min</div>
                          <div className="text-xs text-gray-500">per user</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-3">Customer Segments by Health</h3>
                        <div className="space-y-3">
                          {customerHealth.map((segment, index) => (
                            <div key={index}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="text-sm">{segment.name}</div>
                                <div className="text-sm text-gray-500">{segment.count} customers</div>
                              </div>
                              <div className="flex h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full" style={{ width: `${segment.healthy}%` }}></div>
                                <div className="bg-yellow-500 h-full" style={{ width: `${segment.warning}%` }}></div>
                                <div className="bg-red-500 h-full" style={{ width: `${segment.atrisk}%` }}></div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <div>Healthy ({segment.healthy}%)</div>
                                <div>Warning ({segment.warning}%)</div>
                                <div>At Risk ({segment.atrisk}%)</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Feature Usage</CardTitle>
                    <CardDescription>Most and least used features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {featureUsage.map((feature, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">{feature.name}</div>
                            <div className="text-sm text-gray-500">{feature.usage}% usage</div>
                          </div>
                          <Progress value={feature.usage} className="h-2 bg-gray-100" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <Card className="border-purple-200 bg-purple-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 text-purple-700 mr-2" />
                      <CardTitle>AI-Generated Insights</CardTitle>
                    </div>
                    <CardDescription>Personalized recommendations based on your SaaS metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-purple-100">
                          <div className="flex items-start">
                            <div
                              className={`p-2 rounded-md mr-3 flex-shrink-0 ${
                                insight.type === "critical"
                                  ? "bg-red-100 text-red-700"
                                  : insight.type === "warning"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {insight.type === "critical" ? (
                                <AlertCircle className="h-5 w-5" />
                              ) : insight.type === "warning" ? (
                                <AlertCircle className="h-5 w-5" />
                              ) : (
                                <Lightbulb className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">{insight.title}</h3>
                              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {insight.actions.map((action, actionIndex) => (
                                  <Button key={actionIndex} variant="outline" size="sm">
                                    {action}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>Competitive Analysis</CardTitle>
                    <CardDescription>How you compare to similar SaaS companies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {competitiveMetrics.map((metric, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">{metric.name}</div>
                            <div className="flex items-center">
                              <div className="text-sm font-medium mr-2">{metric.yourValue}</div>
                              <div
                                className={`text-xs ${
                                  metric.comparison === "better"
                                    ? "text-green-600"
                                    : metric.comparison === "worse"
                                      ? "text-red-600"
                                      : "text-gray-600"
                                }`}
                              >
                                {metric.comparison === "better"
                                  ? `${metric.difference} better than avg`
                                  : metric.comparison === "worse"
                                    ? `${metric.difference} worse than avg`
                                    : "on par with avg"}
                              </div>
                            </div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full relative">
                            <div className="absolute top-0 left-0 h-full w-full flex items-center">
                              <div className="w-px h-3 bg-gray-400 absolute" style={{ left: "25%" }}></div>
                              <div className="w-px h-3 bg-gray-400 absolute" style={{ left: "50%" }}></div>
                              <div className="w-px h-3 bg-gray-400 absolute" style={{ left: "75%" }}></div>
                            </div>
                            <div
                              className="h-2 bg-purple-600 rounded-full absolute top-0 left-0"
                              style={{ width: `${metric.percentile}%` }}
                            ></div>
                            <div
                              className="h-4 w-4 rounded-full bg-white border-2 border-purple-600 absolute top-1/2 transform -translate-y-1/2"
                              style={{ left: `${metric.percentile}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <div>Bottom 25%</div>
                            <div>Median</div>
                            <div>Top 25%</div>
                            <div>Top 10%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}

const dataSources = [
  { name: "Stripe", icon: DollarSign },
  { name: "Google Analytics", icon: BarChart3 },
  { name: "Mixpanel", icon: BarChart3 },
  { name: "Intercom", icon: Users },
  { name: "QuickBooks", icon: DollarSign },
  { name: "HubSpot", icon: Users },
]

const metrics = [
  { label: "Monthly Recurring Revenue", value: "$4,750", change: 12, icon: DollarSign },
  { label: "Customer Acquisition Cost", value: "$125", change: -8, icon: Users },
  { label: "Lifetime Value", value: "$1,850", change: 5, icon: TrendingUp },
  { label: "Churn Rate", value: "5.2%", change: -2, icon: Users },
]

const growthData = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1800 },
  { month: "Mar", value: 2200 },
  { month: "Apr", value: 2600 },
  { month: "May", value: 3800 },
  { month: "Jun", value: 4750 },
]

const kpis = [
  { label: "LTV:CAC Ratio", value: "14.8:1" },
  { label: "Avg. Revenue Per User", value: "$38/mo" },
  { label: "Customer Acquisition Cost", value: "$125" },
  { label: "Payback Period", value: "3.3 months" },
  { label: "Gross Margin", value: "82%" },
]

const customerHealth = [
  { name: "Enterprise", count: 5, healthy: 80, warning: 20, atrisk: 0 },
  { name: "Mid-Market", count: 18, healthy: 65, warning: 25, atrisk: 10 },
  { name: "SMB", count: 42, healthy: 55, warning: 30, atrisk: 15 },
]

const featureUsage = [
  { name: "Dashboard", usage: 92 },
  { name: "Reports", usage: 78 },
  { name: "User Management", usage: 65 },
  { name: "API Integration", usage: 45 },
  { name: "Advanced Analytics", usage: 28 },
]

const aiInsights = [
  {
    type: "critical",
    title: "Runway Alert: Action Required",
    description:
      "At current burn rate, your runway is 8.5 months. Consider reducing non-essential expenses or exploring funding options.",
    actions: ["Review Expenses", "Funding Options", "Pricing Strategy"],
  },
  {
    type: "warning",
    title: "Advanced Analytics Feature Underutilized",
    description:
      "Only 28% of users are using Advanced Analytics. This feature has high development cost but low adoption.",
    actions: ["Improve Onboarding", "Feature Education", "User Feedback"],
  },
  {
    type: "opportunity",
    title: "Upsell Opportunity: Enterprise Segment",
    description:
      "Enterprise customers have 80% healthy status and lowest churn. Consider focusing acquisition efforts on this segment.",
    actions: ["Enterprise Marketing", "Feature Development", "Case Studies"],
  },
]

const competitiveMetrics = [
  {
    name: "Churn Rate",
    yourValue: "5.2%",
    comparison: "better",
    difference: "1.3%",
    percentile: 65,
  },
  {
    name: "LTV:CAC Ratio",
    yourValue: "14.8:1",
    comparison: "better",
    difference: "8.2x",
    percentile: 92,
  },
  {
    name: "Gross Margin",
    yourValue: "82%",
    comparison: "on par",
    difference: "0%",
    percentile: 50,
  },
  {
    name: "Revenue Growth Rate",
    yourValue: "18%",
    comparison: "worse",
    difference: "7%",
    percentile: 35,
  },
]
