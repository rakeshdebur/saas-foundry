import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  Code,
  BarChart,
  MessageCircle,
  Zap,
  Download,
  CheckCircle,
  Target,
  PieChart,
  LifeBuoy,
  Lightbulb,
} from "lucide-react"
import { PlatformManagerShowcase } from "@/components/platform-manager-showcase"
import { ToolBuilderShowcase } from "@/components/tool-builder-showcase"
import { AICofounderShowcase } from "@/components/ai-cofounder-showcase"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Build Your SaaS Startup with AI</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Learn how to leverage AI tools to build, launch, and grow your SaaS product faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-purple-600">
              <Link href="/starter-kit">
                <Download className="mr-2 h-4 w-4" />
                Get Free Starter Kit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Build a Successful SaaS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools, resources, and guidance you need to turn your SaaS idea
              into reality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Manager Showcase */}
      <PlatformManagerShowcase />

      {/* Tool Builder Showcase */}
      <ToolBuilderShowcase />

      {/* AI Co-founder Showcase */}
      <AICofounderShowcase />

      {/* Free Starter Kit CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white">
                <h2 className="text-3xl font-bold mb-4">Free SaaS Founder Starter Kit</h2>
                <p className="mb-6">
                  Get instant access to our comprehensive starter kit with templates, frameworks, and resources to
                  kickstart your SaaS journey.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <div className="rounded-full bg-white/20 p-1 mr-3">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span>50+ page SaaS Founder's Playbook</span>
                  </li>
                  <li className="flex items-center">
                    <div className="rounded-full bg-white/20 p-1 mr-3">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span>12 ready-to-use templates</span>
                  </li>
                  <li className="flex items-center">
                    <div className="rounded-full bg-white/20 p-1 mr-3">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span>Customer acquisition frameworks</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  <Link href="/starter-kit">
                    <Download className="mr-2 h-4 w-4" />
                    Download Free Kit
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2 p-10">
                <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="rounded-full bg-purple-100 p-1 mr-3 mt-1">
                      <Target className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">Bullseye Framework</h4>
                      <p className="text-sm text-gray-600">Find your best customer acquisition channels</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-purple-100 p-1 mr-3 mt-1">
                      <PieChart className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">Pirate Metrics</h4>
                      <p className="text-sm text-gray-600">Track the metrics that matter for growth</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-purple-100 p-1 mr-3 mt-1">
                      <LifeBuoy className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">Lean Support</h4>
                      <p className="text-sm text-gray-600">Build an efficient customer support system</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-purple-100 p-1 mr-3 mt-1">
                      <Lightbulb className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">Business Planning</h4>
                      <p className="text-sm text-gray-600">Templates to plan your SaaS business</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from founders who have successfully built their SaaS startups using our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building Your SaaS?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of founders and start building your SaaS startup today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-purple-600">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data

const features = [
  {
    title: "Comprehensive Curriculum",
    description: "Step-by-step guidance on building your SaaS from idea to launch using AI tools.",
    icon: BookOpen,
  },
  {
    title: "AI-Powered Development",
    description: "Learn how to leverage AI to write code, design interfaces, and build features faster.",
    icon: Code,
  },
  {
    title: "Active Community",
    description: "Connect with other founders, share insights, and get feedback on your startup.",
    icon: Users,
  },
  {
    title: "Growth Strategies",
    description: "Proven marketing and sales strategies to acquire and retain customers.",
    icon: BarChart,
  },
  {
    title: "Expert Support",
    description: "Get help from experienced founders and developers when you need it.",
    icon: MessageCircle,
  },
  {
    title: "Ready-to-Use Templates",
    description: "Access code snippets, design templates, and business documents to accelerate your progress.",
    icon: Zap,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Founder, AnalyticsPro",
    quote:
      "SaaSFoundry helped me build and launch my analytics platform in just 8 weeks. The AI tools and guidance were invaluable.",
  },
  {
    name: "Michael Chen",
    role: "CEO, TaskFlow",
    quote:
      "As a non-technical founder, I was able to build a fully functional MVP without hiring developers. This platform is a game-changer.",
  },
  {
    name: "Alex Rivera",
    role: "Founder, FeedbackLoop",
    quote:
      "The community and expert support helped me refine my idea and build a product that customers actually want. Highly recommended!",
  },
]
