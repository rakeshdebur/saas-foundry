import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Target, Rocket, Lightbulb, PieChart, LifeBuoy, CheckCircle } from "lucide-react"

export default function StarterKit() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold text-purple-700">SaaSFoundry</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild size="sm" className="bg-purple-700 hover:bg-purple-800">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Free Resource</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">SaaS Founder Starter Kit</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Everything you need to kickstart your SaaS journey — from idea validation to customer acquisition
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 sm:hover:bg-gray-100 active:bg-gray-200"
            >
              <Link href="#download">
                <Download className="mr-2 h-4 w-4" />
                Download Free Kit
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white bg-purple-700/30 hover:bg-purple-600 sm:hover:bg-purple-600 active:bg-purple-700"
            >
              <Link href="/signup">Join SaaSFoundry</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Kit Overview */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What's Inside the Kit?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive starter kit gives you the frameworks, templates, and resources you need to build your SaaS
            startup from scratch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {kitComponents.map((component, index) => (
            <Card key={index} className="border-t-4" style={{ borderTopColor: component.color }}>
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${component.color}20` }}
                >
                  <component.icon className="h-6 w-6" style={{ color: component.color }} />
                </div>
                <CardTitle className="text-xl">{component.title}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {component.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven Frameworks for SaaS Success</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn and apply the same frameworks used by successful SaaS founders to validate ideas, acquire customers,
              and scale your business.
            </p>
          </div>

          <Tabs defaultValue="pirate" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pirate">Pirate Metrics (AARRR)</TabsTrigger>
              <TabsTrigger value="bullseye">Bullseye Framework</TabsTrigger>
              <TabsTrigger value="lean">Lean Support System</TabsTrigger>
            </TabsList>
            <TabsContent value="pirate" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-purple-600" />
                    Pirate Metrics Framework (AARRR)
                  </CardTitle>
                  <CardDescription>Track the metrics that matter most for your SaaS business growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-4">
                    {pirateMetrics.map((metric, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg mb-2 text-purple-700">{metric.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                        <div className="text-xs font-medium text-gray-500">Key metrics:</div>
                        <ul className="text-sm mt-1 space-y-1">
                          {metric.metrics.map((m, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    The Pirate Metrics framework helps you focus on the key metrics that drive SaaS growth at each stage
                    of the customer journey.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="bullseye" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-purple-600" />
                    Bullseye Framework for Traction
                  </CardTitle>
                  <CardDescription>
                    Systematically find the most effective marketing channels for your SaaS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full border-8 border-purple-100 flex items-center justify-center">
                          <div className="w-48 h-48 rounded-full border-8 border-purple-200 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full border-8 border-purple-300 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                                <Target className="h-8 w-8" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm">
                        <span className="font-medium text-sm">Outer Ring: Possibilities</span>
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[12rem] bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm">
                        <span className="font-medium text-sm">Middle Ring: Test</span>
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm">
                        <span className="font-medium text-sm">Inner Ring: Focus</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg mb-2 text-purple-700">Step 1: Brainstorm</h3>
                        <p className="text-sm text-gray-600">
                          Identify all possible marketing channels that could work for your SaaS. Consider all 19
                          traction channels from the framework.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg mb-2 text-purple-700">Step 2: Test</h3>
                        <p className="text-sm text-gray-600">
                          Run small, inexpensive tests on the most promising channels to gather real data on what works
                          for your specific business.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg mb-2 text-purple-700">Step 3: Focus</h3>
                        <p className="text-sm text-gray-600">
                          Double down on the channel that shows the most promise. Concentrate resources until you've
                          maximized its potential.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    The Bullseye Framework helps you systematically discover the marketing channels that will drive the
                    most growth for your SaaS business.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="lean" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LifeBuoy className="h-5 w-5 mr-2 text-purple-600" />
                    Lean Customer Support System
                  </CardTitle>
                  <CardDescription>
                    Build an efficient support system that scales with your SaaS business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg mb-2 text-purple-700">Self-Service Support</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Create resources that allow customers to solve problems on their own.
                        </p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Knowledge base with searchable articles</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Video tutorials for common tasks</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>In-app tooltips and onboarding</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg mb-2 text-purple-700">AI-Assisted Support</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Leverage AI to handle routine inquiries and provide instant responses.
                        </p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>AI chatbot trained on your documentation</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Automated email responses for common questions</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Smart routing of complex issues to human agents</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg mb-2 text-purple-700">Human Touch</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Reserve human support for high-value customers and complex issues.
                        </p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Tiered support based on customer value</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Scheduled onboarding calls for new customers</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Proactive outreach for at-risk accounts</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-medium text-purple-800 mb-2">The 80/20 Principle in Support</h4>
                      <p className="text-sm text-purple-700">
                        Design your support system so that 80% of customer issues can be resolved through self-service
                        and AI assistance, allowing your human team to focus on the 20% of complex issues that truly
                        require their expertise.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    A lean support system combines self-service resources, AI assistance, and targeted human support to
                    provide excellent customer service without overwhelming your team.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get Your Free Starter Kit</h2>
            <p className="text-lg text-gray-600 mb-8">
              Download our comprehensive SaaS Founder Starter Kit and begin your journey to building a successful SaaS
              business today.
            </p>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-purple-800">What You'll Get:</h3>
                    <ul className="space-y-3">
                      {kitIncludes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-center">Enter Your Email</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="john@example.com"
                        />
                      </div>
                      <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white active:bg-purple-900">
                        <Download className="mr-2 h-4 w-4" />
                        Download Free Kit
                      </Button>
                      <p className="text-xs text-center text-gray-500">
                        We'll also send you our weekly SaaS founder tips. You can unsubscribe anytime.
                      </p>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join SaaSFoundry CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your SaaS?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join SaaSFoundry to access our full platform of courses, tools, and resources designed to help you build,
            launch, and grow your SaaS startup.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 sm:hover:bg-gray-100 active:bg-gray-200"
            >
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white bg-purple-700/30 hover:bg-purple-600 sm:hover:bg-purple-600 active:bg-purple-700"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">SaaSFoundry</h3>
              <p className="max-w-xs">
                Helping founders build successful SaaS businesses with AI-powered tools, resources, and community.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Platform</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/features" className="hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="hover:text-white">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog" className="hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/starter-kit" className="hover:text-white">
                      Starter Kit
                    </Link>
                  </li>
                  <li>
                    <Link href="/templates" className="hover:text-white">
                      Templates
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} SaaSFoundry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data
const kitComponents = [
  {
    title: "SaaS Business Planning",
    description: "Essential templates and frameworks to plan your SaaS business",
    color: "#8b5cf6", // purple-500
    icon: Lightbulb,
    items: [
      "Business model canvas template",
      "SaaS financial model spreadsheet",
      "Competitive analysis framework",
      "Pricing strategy worksheet",
      "Product roadmap template",
    ],
  },
  {
    title: "Customer Acquisition",
    description: "Tools and strategies to find and convert your first customers",
    color: "#ec4899", // pink-500
    icon: Target,
    items: [
      "Bullseye framework worksheet",
      "Customer persona templates",
      "Cold email templates that convert",
      "Landing page conversion checklist",
      "SEO keyword research guide",
    ],
  },
  {
    title: "Product Development",
    description: "Resources to build your MVP and iterate based on feedback",
    color: "#3b82f6", // blue-500
    icon: Rocket,
    items: [
      "MVP feature prioritization template",
      "User story framework",
      "Product feedback collection system",
      "Technical stack decision guide",
      "No-code tool comparison chart",
    ],
  },
]

const pirateMetrics = [
  {
    name: "Acquisition",
    description: "How users find your SaaS",
    metrics: ["Traffic sources", "CAC", "Conversion rate", "Cost per click"],
  },
  {
    name: "Activation",
    description: "First valuable experience",
    metrics: ["Signup completion", "Onboarding success", "Feature adoption"],
  },
  {
    name: "Retention",
    description: "Users keep coming back",
    metrics: ["Churn rate", "DAU/MAU", "Session frequency", "Feature usage"],
  },
  {
    name: "Referral",
    description: "Users invite others",
    metrics: ["Referral rate", "Viral coefficient", "NPS score", "Shares"],
  },
  {
    name: "Revenue",
    description: "Users pay for your SaaS",
    metrics: ["MRR/ARR", "LTV", "Conversion to paid", "Expansion revenue"],
  },
]

const kitIncludes = [
  "50+ page SaaS Founder's Playbook PDF",
  "12 ready-to-use templates and worksheets",
  "5 financial modeling spreadsheets",
  "Customer acquisition strategy guide",
  "Lean support system setup instructions",
  "Video tutorials on key SaaS metrics",
  "Access to our starter resource library",
]
