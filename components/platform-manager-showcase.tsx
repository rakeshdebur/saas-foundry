"use client"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Bug,
  CheckCircle,
  CreditCard,
  FileText,
  GitPullRequest,
  LineChart,
  Plus,
  Settings,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react"
import { usePremiumFeature } from "@/hooks/use-premium-feature"

export function PlatformManagerShowcase() {
  const { openPremiumFeatureModal, PremiumFeatureModalComponent } = usePremiumFeature()

  // Handler for premium features that aren't built yet
  const handlePremiumFeature = (featureName: string) => {
    openPremiumFeatureModal(featureName)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            NEW FEATURE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Personalized Platform Manager</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your all-in-one command center to build, manage, and scale your SaaS product
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Streamline Your SaaS Operations</h3>
            <p className="text-gray-700 mb-6">
              The Platform Manager gives you complete control over your SaaS product's features, pricing, issues, and
              customer management—all in one place.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Feature Management</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Plan, prioritize, and track features from idea to deployment
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Pricing Optimization</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Analyze and optimize your pricing strategy with AI-powered recommendations
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Issue Tracking</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage bugs, feature requests, and support tickets in one unified system
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Customer Management</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Understand your customers and identify opportunities for growth
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">AI-Powered Insights</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Get actionable recommendations to improve your product and business
                  </p>
                </div>
              </li>
            </ul>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              onClick={() => handlePremiumFeature("Platform Manager")}
            >
              <Sliders className="h-4 w-4 mr-2" />
              Explore Platform Manager
            </Button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Sliders className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium">Platform Manager</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handlePremiumFeature("Platform Settings")}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
                <Button
                  size="sm"
                  className="h-8 text-xs bg-purple-700 hover:bg-purple-800"
                  onClick={() => handlePremiumFeature("New Feature")}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  New
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <Zap className="h-4 w-4 text-purple-700" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Active Features</div>
                    <div className="text-xl font-bold">24</div>
                  </div>
                </div>
                <div className="text-xs text-green-600 flex items-center">
                  <span>+3 this month</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <CreditCard className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">MRR</div>
                    <div className="text-xl font-bold">$8,742</div>
                  </div>
                </div>
                <div className="text-xs text-green-600 flex items-center">
                  <span>+8.3% vs last month</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div
                className="bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors cursor-pointer"
                onClick={() => handlePremiumFeature("Authentication Bug")}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                      <Bug className="h-3 w-3 text-red-700" />
                    </div>
                    <span className="text-sm font-medium">Authentication fails on Safari</span>
                  </div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Critical</div>
                </div>
                <div className="text-xs text-gray-500">Reported 2 days ago • In Progress</div>
              </div>
              <div
                className="bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors cursor-pointer"
                onClick={() => handlePremiumFeature("Team Collaboration Feature")}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                      <Zap className="h-3 w-3 text-purple-700" />
                    </div>
                    <span className="text-sm font-medium">Team Collaboration Feature</span>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">In Progress</div>
                </div>
                <div className="text-xs text-gray-500">75% complete • ETA: 2 weeks</div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 mb-3">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <div className="text-sm font-medium text-purple-800 mb-1">AI Insight</div>
                  <p className="text-xs text-purple-700">
                    10 Pro plan customers haven't used key features in the last 30 days, indicating a high churn risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handlePremiumFeature("Reports")}
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Reports
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handlePremiumFeature("Roadmap")}
                >
                  <GitPullRequest className="h-3 w-3 mr-1" />
                  Roadmap
                </Button>
              </div>
              <div
                className="flex items-center text-xs text-gray-500 cursor-pointer"
                onClick={() => handlePremiumFeature("Analytics")}
              >
                <LineChart className="h-3 w-3 mr-1" />
                <BarChart3 className="h-3 w-3 mr-1" />
                <span>Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the premium feature modal */}
      <PremiumFeatureModalComponent />
    </section>
  )
}
