import { Sparkles } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ENV } from "@/lib/environment"

export function AICofounderCard() {
  // Use the environment variable with fallback
  const isDemo = ENV.DEMO_MODE === "true"

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-purple-700">AI Co-founder</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center mb-2">
          <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
          <div className="font-medium">Automate daily tasks</div>
        </div>
        <p className="text-xs text-purple-700">
          {isDemo ? "Try out the AI Co-founder in demo mode" : "Your AI assistant is ready to help"}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild size="sm" className="w-full bg-purple-700 hover:bg-purple-800">
          <Link href="/dashboard/ai-cofounder/tasks">Manage Tasks</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
