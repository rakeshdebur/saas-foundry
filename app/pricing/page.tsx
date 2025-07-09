import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">
              Choose the plan that works for your startup journey. No hidden fees or complicated tiers.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Free Tier</h2>
            <p className="text-gray-600 mb-6">Get started with the basics</p>
            <div className="text-4xl font-bold mb-6">
              $0<span className="text-xl text-gray-500 font-normal">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Module 1 (3 lectures)</span>
                  <p className="text-sm text-gray-500 mt-1">Foundation & Setup module to get you started</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Basic community access</span>
                  <p className="text-sm text-gray-500 mt-1">Read-only access to community discussions</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Limited resource access</span>
                  <p className="text-sm text-gray-500 mt-1">Access to basic templates and guides</p>
                </div>
              </li>
            </ul>

            <Button asChild className="w-full" variant="outline">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Premium Tier */}
          <div className="bg-purple-700 text-white border border-purple-800 rounded-xl p-8 shadow-lg relative">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              RECOMMENDED
            </div>
            <h2 className="text-2xl font-bold mb-2">Premium</h2>
            <p className="text-purple-200 mb-6">Full access to all content</p>
            <div className="text-4xl font-bold mb-6">
              $19<span className="text-xl text-purple-200 font-normal">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">All 18-20 lectures</span>
                  <p className="text-sm text-purple-200 mt-1">Complete course with all modules and lectures</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Interactive AI Playground</span>
                  <p className="text-sm text-purple-200 mt-1">Test prompts and resources with different AI models</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Full community access</span>
                  <p className="text-sm text-purple-200 mt-1">Participate in discussions and get peer support</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Weekly office hours</span>
                  <p className="text-sm text-purple-200 mt-1">Live Q&A sessions with instructors</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">All templates & resources</span>
                  <p className="text-sm text-purple-200 mt-1">Access to all code snippets, templates, and guides</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Priority support</span>
                  <p className="text-sm text-purple-200 mt-1">Get help when you need it most</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Project reviews</span>
                  <p className="text-sm text-purple-200 mt-1">Get feedback on your startup implementation</p>
                </div>
              </li>
            </ul>

            <Button asChild className="w-full bg-white text-purple-700 hover:bg-purple-100">
              <Link href="/signup">Start 7-Day Free Trial</Link>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">Contact our team for more information about our platform and pricing.</p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
  },
  {
    question: "What is the AI Playground feature?",
    answer:
      "The AI Playground is an interactive environment where you can test prompts with different AI models, save useful prompts, and access a library of SaaS-specific prompt templates. It's designed to help you practice prompt engineering and get better results from AI tools.",
  },
  {
    question: "Is there a lifetime access option?",
    answer:
      "Yes, we offer a one-time payment option for lifetime access to the course. Contact our support team for more information.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee if you're not satisfied with the course content.",
  },
  {
    question: "How often is the course content updated?",
    answer:
      "We update the course content regularly to keep up with the latest AI tools and technologies. Premium subscribers get access to all updates.",
  },
  {
    question: "Do I need coding experience to take this course?",
    answer:
      "No, this course is designed for non-technical founders. We guide you through every step of the process using AI tools to handle the technical aspects.",
  },
]
