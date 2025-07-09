"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Database, FormInput, LayoutDashboard, Workflow, Puzzle, ArrowRight, Sliders } from "lucide-react"
import { usePremiumFeature } from "@/hooks/use-premium-feature"

export function ToolBuilderShowcase() {
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
            PREMIUM FEATURE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">No-Code Tool Builder</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create custom internal tools without coding to streamline your operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Build Tools Your Team Needs</h3>
            <p className="text-gray-700 mb-6">
              The Tool Builder lets you create custom internal tools to manage your data, automate workflows, and
              streamline your operations—all without writing a single line of code.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Custom Forms</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Create beautiful forms to collect data from customers or team members
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Database Management</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Build custom databases to store and manage your business data
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Visual Dashboards</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Create insightful dashboards to visualize your key metrics
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Workflow Automation</span>
                  <p className="text-sm text-gray-600 mt-1">Automate repetitive tasks and business processes</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Third-party Integrations</span>
                  <p className="text-sm text-gray-600 mt-1">Connect with your favorite tools and services</p>
                </div>
              </li>
            </ul>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              onClick={() => handlePremiumFeature("Tool Builder")}
            >
              <Sliders className="h-4 w-4 mr-2" />
              Try Tool Builder
            </Button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Puzzle className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium">Tool Builder</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Premium</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {toolTypes.map((tool, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors cursor-pointer"
                  onClick={() => handlePremiumFeature(`Create ${tool.name}`)}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                      <tool.icon className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <h4 className="text-sm font-medium mb-3">Popular Templates</h4>
              <div className="space-y-2">
                {templates.map((template, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white rounded border border-gray-100 hover:border-purple-200 transition-colors cursor-pointer"
                    onClick={() => handlePremiumFeature(`Use Template: ${template.name}`)}
                  >
                    <div className="flex items-center">
                      <template.icon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{template.name}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Build custom tools in minutes, not weeks. No coding required.
              </p>
              <Button
                variant="outline"
                className="text-purple-700 border-purple-200 hover:bg-purple-50"
                onClick={() => handlePremiumFeature("Tool Builder Templates")}
              >
                Browse All Templates
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the premium feature modal */}
      <PremiumFeatureModalComponent />
    </section>
  )
}

const toolTypes = [
  {
    name: "Form Builder",
    description: "Create custom forms",
    icon: FormInput,
  },
  {
    name: "Database Builder",
    description: "Build custom databases",
    icon: Database,
  },
  {
    name: "Dashboard Builder",
    description: "Create visual dashboards",
    icon: LayoutDashboard,
  },
  {
    name: "Workflow Builder",
    description: "Automate processes",
    icon: Workflow,
  },
]

const templates = [
  {
    name: "Customer Feedback Form",
    icon: FormInput,
  },
  {
    name: "Support Ticket System",
    icon: Database,
  },
  {
    name: "Sales Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Customer Onboarding Process",
    icon: Workflow,
  },
]
