"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BookOpen, Copy, Play, Save, Sparkles, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("gpt-4o")
  const [isGenerating, setIsGenerating] = useState(false)
  const [response, setResponse] = useState("")
  const [savedPrompts, setSavedPrompts] = useState<string[]>([])

  // In a real implementation, this would check the user's subscription status
  const [isPremiumUser, setIsPremiumUser] = useState(true) // For demo purposes, set to true

  // If not a premium user, show upgrade message
  if (!isPremiumUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <div className="text-center mb-8">
            <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Premium Feature</h1>
            <p className="text-gray-600">The AI Playground is available exclusively to Premium subscribers.</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Premium</CardTitle>
              <CardDescription>
                Get access to the AI Playground and all other premium features for just $19/month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Interactive AI Playground</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>All 18-20 lectures</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Full community access</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-purple-700 hover:bg-purple-800">
                <Link href="/pricing">View Pricing Options</Link>
              </Button>
            </CardFooter>
          </Card>
          <div className="mt-6 text-center">
            <Link href="/dashboard" className="text-sm text-purple-700 hover:text-purple-800">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)
    setResponse("")

    // Simulate streaming response
    const fullResponse = await simulateResponse(prompt, model)
    let displayedResponse = ""

    const streamResponse = () => {
      const interval = setInterval(() => {
        if (displayedResponse.length < fullResponse.length) {
          displayedResponse += fullResponse.charAt(displayedResponse.length)
          setResponse(displayedResponse)
        } else {
          clearInterval(interval)
          setIsGenerating(false)
        }
      }, 10)
    }

    streamResponse()
  }

  const simulateResponse = async (prompt: string, model: string): Promise<string> => {
    // This is a simulation - in a real app, you would call an actual LLM API
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

    if (prompt.toLowerCase().includes("landing page")) {
      return `Here's a landing page structure for your SaaS product:

1. Hero Section:
   - Headline: Clear value proposition
   - Subheadline: Expand on benefits
   - CTA Button: "Start Free Trial"
   - Hero Image: Product screenshot or illustration

2. Features Section:
   - 3-4 key features with icons
   - Brief description for each
   - Visual examples if possible

3. Social Proof:
   - Customer testimonials
   - Logos of companies using your product
   - Key metrics or results

4. Pricing Section:
   - Tiered pricing options
   - Feature comparison
   - FAQ about pricing

5. Final CTA:
   - Reinforce value proposition
   - Low-friction signup form
   - Alternative contact method

Remember to keep the design clean, focus on benefits rather than features, and ensure the page loads quickly for optimal conversion rates.`
    } else if (prompt.toLowerCase().includes("supabase")) {
      return `To set up Supabase authentication in your Next.js app:

\`\`\`jsx
// 1. Install dependencies
// npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

// 2. Create a client
// utils/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// 3. Implement sign-up functionality
async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (error) {
    console.error('Error signing up:', error)
    return
  }
  
  return data
}

// 4. Implement sign-in functionality
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    console.error('Error signing in:', error)
    return
  }
  
  return data
}
\`\`\`

For social login, add this to your sign-in function:

\`\`\`jsx
// Sign in with Google
async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  })
  
  if (error) {
    console.error('Error signing in with Google:', error)
    return
  }
  
  return data
}
\`\`\`

Don't forget to set up your callback URL in the Supabase dashboard and create the corresponding route handler in your Next.js app.`
    } else {
      return `Based on your prompt "${prompt}", here's my response:

As an AI assistant, I can help you build your SaaS product by providing guidance on:

1. Product strategy and market positioning
2. Technical architecture and implementation
3. User experience and interface design
4. Marketing and customer acquisition
5. Pricing and business model optimization

To give you more specific advice, I'd need to know more about your particular SaaS idea and what stage you're at in the development process.

Some general recommendations for SaaS founders:
- Focus on solving a specific, painful problem for a well-defined audience
- Start with a minimal viable product (MVP) that addresses the core need
- Get early feedback from potential customers before building too much
- Consider a freemium model to reduce friction in user acquisition
- Invest in good onboarding to improve activation and retention rates

Would you like me to elaborate on any of these points or provide guidance on a specific aspect of your SaaS journey?`
    }
  }

  const handleSavePrompt = () => {
    if (prompt && !savedPrompts.includes(prompt)) {
      setSavedPrompts([...savedPrompts, prompt])
    }
  }

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(response)
  }

  const handleLoadSamplePrompt = (samplePrompt: string) => {
    setPrompt(samplePrompt)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Playground</h1>
              <p className="text-gray-600">Test prompts and resources with different AI models</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prompt</CardTitle>
                <CardDescription>Enter your prompt to test with AI models</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-32">
                        <Select value={model} onValueChange={setModel}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="claude-3">Claude 3</SelectItem>
                            <SelectItem value="mistral">Mistral</SelectItem>
                            <SelectItem value="llama-3">Llama 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="submit"
                        className="bg-purple-700 hover:bg-purple-800 flex-grow"
                        disabled={isGenerating || !prompt.trim()}
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Run Prompt
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSavePrompt}
                        disabled={!prompt.trim() || savedPrompts.includes(prompt)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Enter your prompt here..."
                      className="min-h-[200px]"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Response</CardTitle>
                  <CardDescription>AI-generated response to your prompt</CardDescription>
                </div>
                {response && (
                  <Button variant="outline" size="sm" onClick={handleCopyResponse}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 min-h-[300px] whitespace-pre-wrap font-mono text-sm">
                  {response || (
                    <div className="text-gray-400 italic">
                      {isGenerating ? "Generating response..." : "Response will appear here"}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sample Prompts */}
            <Card>
              <CardHeader>
                <CardTitle>Sample Prompts</CardTitle>
                <CardDescription>Try these prompts related to your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {samplePrompts.map((samplePrompt, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => handleLoadSamplePrompt(samplePrompt.prompt)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{samplePrompt.title}</div>
                      <Badge variant="outline" className="text-xs">
                        {samplePrompt.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{samplePrompt.prompt}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Saved Prompts */}
            <Card>
              <CardHeader>
                <CardTitle>Saved Prompts</CardTitle>
                <CardDescription>Your saved prompts for future use</CardDescription>
              </CardHeader>
              <CardContent>
                {savedPrompts.length > 0 ? (
                  <div className="space-y-2">
                    {savedPrompts.map((savedPrompt, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100"
                        onClick={() => setPrompt(savedPrompt)}
                      >
                        <p className="text-sm line-clamp-2">{savedPrompt}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No saved prompts yet</p>
                    <p className="text-sm">Click the save button to store prompts</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Prompt Resources</CardTitle>
                <CardDescription>Helpful resources for effective prompting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {promptResources.map((resource, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <BookOpen className="h-4 w-4 text-purple-700" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{resource.title}</div>
                        <p className="text-xs text-gray-500">{resource.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Resources
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const samplePrompts = [
  {
    title: "Landing Page Structure",
    category: "Design",
    prompt:
      "Create a structure for a SaaS landing page that maximizes conversions. Include sections for hero, features, pricing, and testimonials.",
  },
  {
    title: "Supabase Authentication",
    category: "Development",
    prompt:
      "Show me how to implement authentication with Supabase in a Next.js application, including social login options.",
  },
  {
    title: "Pricing Strategy",
    category: "Business",
    prompt:
      "What are the best pricing strategies for a B2B SaaS product targeting small businesses? Include examples of tiered pricing structures.",
  },
  {
    title: "User Onboarding Flow",
    category: "UX",
    prompt:
      "Design an effective user onboarding flow for a SaaS product that helps users reach their 'aha moment' quickly.",
  },
  {
    title: "Marketing Copy",
    category: "Marketing",
    prompt:
      "Write compelling marketing copy for a SaaS product that helps founders build and launch their startups without coding experience.",
  },
]

const promptResources = [
  {
    title: "Prompt Engineering Guide",
    description: "Learn the fundamentals of crafting effective prompts",
  },
  {
    title: "SaaS-Specific Prompts",
    description: "Specialized prompts for SaaS development tasks",
  },
  {
    title: "AI Model Comparison",
    description: "Understand the strengths of different AI models",
  },
  {
    title: "Prompt Templates Library",
    description: "Ready-to-use templates for common tasks",
  },
]
