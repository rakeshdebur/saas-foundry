"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, MessageSquare, ArrowRight, FileText, BarChart3 } from "lucide-react"
import { usePremiumFeature } from "@/hooks/use-premium-feature"

export function AICofounderShowcase() {
  const { openPremiumFeatureModal, PremiumFeatureModalComponent } = usePremiumFeature()
  const [activeMessage, setActiveMessage] = useState(0)

  // Handler for premium features
  const handlePremiumFeature = (featureName: string) => {
    openPremiumFeatureModal(featureName)
  }

  // Sample conversation
  const conversation = [
    {
      question: "What's the best pricing strategy for my SaaS product?",
      answer:
        "Based on your target market and feature set, I'd recommend a tiered pricing model with 3 plans: Basic ($29/mo), Pro ($79/mo), and Enterprise (custom). This maximizes revenue across different customer segments while keeping your pricing simple and transparent.",
    },
    {
      question: "How can I reduce my customer acquisition costs?",
      answer:
        "Your CAC is currently high relative to LTV. I recommend focusing on three areas: 1) Optimize your onboarding to improve activation rates, 2) Implement a referral program to leverage your existing customers, and 3) Double down on content marketing which has shown the best ROI for your specific industry.",
    },
    {
      question: "When should I consider raising venture capital?",
      answer:
        "Given your current growth rate and runway, I'd recommend waiting until you reach $25K MRR with a clear path to $50K. At that point, you'll have stronger metrics to attract better terms. In the meantime, focus on reaching profitability with your current resources to strengthen your position.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            NEW PREMIUM FEATURE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Your AI Co-founder</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get strategic guidance, generate documents, and make data-driven decisions with your AI strategic partner
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Strategic Guidance When You Need It</h3>
            <p className="text-lg text-gray-700 mb-6">
              Building a startup alone is challenging. Your AI Co-founder provides expert guidance on strategy, product,
              marketing, and more—available 24/7.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Strategic Decision Support</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Get data-backed recommendations for pricing, go-to-market, fundraising, and more
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Document Generation</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Create pitch decks, financial models, and business plans in minutes
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Market Intelligence</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Access up-to-date market insights and competitive analysis
                  </p>
                </div>
              </li>
            </ul>
            <Button className="bg-purple-700 hover:bg-purple-800" onClick={() => handlePremiumFeature("AI Co-founder")}>
              <Brain className="h-4 w-4 mr-2" />
              Try AI Co-founder
            </Button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Brain className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium">AI Co-founder Chat</span>
              </div>
              <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Premium</div>
            </div>

            <div className="space-y-4 mb-4">
              <div className="flex justify-end">
                <div className="bg-purple-100 text-purple-900 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">{conversation[activeMessage].question}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">{conversation[activeMessage].answer}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => setActiveMessage((activeMessage - 1 + conversation.length) % conversation.length)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => setActiveMessage((activeMessage + 1) % conversation.length)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-10">Everything You Need to Build Your Startup</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-700" />
                </div>
                <h4 className="text-xl font-bold mb-2">Strategic Advisor</h4>
                <p className="text-gray-600 mb-4">
                  Get expert guidance on pricing, go-to-market strategy, fundraising, and more from your AI strategic
                  partner.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-purple-700"
                  onClick={() => handlePremiumFeature("Strategic Advisor")}
                >
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-700" />
                </div>
                <h4 className="text-xl font-bold mb-2">Document Generator</h4>
                <p className="text-gray-600 mb-4">
                  Create pitch decks, financial models, business plans, and more in minutes with AI-powered templates.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-purple-700"
                  onClick={() => handlePremiumFeature("Document Generator")}
                >
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-700" />
                </div>
                <h4 className="text-xl font-bold mb-2">Market Insights</h4>
                <p className="text-gray-600 mb-4">
                  Access up-to-date market research, competitive analysis, and industry trends to inform your strategy.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-purple-700"
                  onClick={() => handlePremiumFeature("Market Insights")}
                >
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Render the premium feature modal */}
      <PremiumFeatureModalComponent />
    </section>
  )
}
