"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Inbox,
  Loader2,
  Mail,
  MessageSquare,
  PlusCircle,
  RefreshCw,
  Send,
  ThumbsDown,
  ThumbsUp,
  Users,
  X,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  type Task,
  type TaskContext,
  type TaskType,
  createTask,
  executeTask,
  getUserTasks,
  updateTaskStatus,
  addTaskFeedback,
} from "@/lib/ai-task-service"
import { trackEvent } from "@/lib/analytics"

export default function AICofounderTasksPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("pending")
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [isDemoUser, setIsDemoUser] = useState(false)
  const [newTask, setNewTask] = useState<Partial<TaskContext>>({
    type: "email_draft",
    description: "",
    priority: "medium",
  })

  // Mock user ID
  const userId = "user_1"

  // Check if user is in demo mode
  useEffect(() => {
    const demoUser = localStorage.getItem("saasFoundry_demoUser") === "true"
    setIsDemoUser(demoUser)

    // If demo user, load demo tasks
    if (demoUser) {
      loadDemoTasks()
    } else {
      // In a real app, this would be an API call
      const userTasks = getUserTasks(userId)
      setTasks(userTasks)
    }
  }, [userId])

  // Load demo tasks
  const loadDemoTasks = () => {
    const demoTasks: Task[] = [
      {
        id: "task_demo_1",
        userId: userId,
        context: {
          type: "email_draft",
          description: "Draft a follow-up email to potential investors after our pitch meeting",
          priority: "high",
          additionalContext:
            "We presented our SaaS analytics platform and they seemed interested in our growth metrics.",
        },
        status: "completed",
        result: {
          content: `Subject: Follow-Up on SaaSFoundry Analytics Platform Presentation

Dear [Investor Name],

Thank you for taking the time to meet with our team yesterday to discuss SaaSFoundry's analytics platform. We appreciated your insightful questions and feedback on our approach to helping SaaS founders make data-driven decisions.

As promised during our conversation, I'm sharing additional information about:

1. Our current growth metrics (attached) - highlighting our 27% MoM user growth
2. Customer case studies demonstrating ROI for early-stage SaaS companies
3. Technical architecture overview showing our scalability approach

We were particularly encouraged by your interest in our AI-powered forecasting capabilities. As you suggested, we're exploring additional integration options with popular SaaS tools to enhance this feature further.

I'd be happy to arrange a follow-up call with our technical team to dive deeper into any aspects of our platform that interest you most. Would you have 30 minutes available next week, perhaps Tuesday or Wednesday afternoon?

Thank you again for your consideration and valuable feedback.

Best regards,

[Your Name]
Founder & CEO, SaaSFoundry
[Your Phone]
[Your Email]`,
          suggestions: [
            "Consider adding specific metrics from your pitch that resonated most with the investors",
            "Include a brief timeline of your upcoming product roadmap milestones",
            "Mention any notable new customers or partnerships since the meeting",
          ],
          nextSteps: [
            "Follow up with a phone call if no response within 3-4 business days",
            "Prepare detailed answers to technical questions raised during the pitch",
            "Connect with the investor on LinkedIn with a personalized message",
          ],
        },
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date(Date.now() - 82800000), // 23 hours ago
        completedAt: new Date(Date.now() - 82800000), // 23 hours ago
      },
      {
        id: "task_demo_2",
        userId: userId,
        context: {
          type: "feature_spec",
          description: "Create a feature specification for our new user onboarding flow",
          priority: "medium",
          additionalContext: "We need to improve our activation rate by guiding users to set up their first project.",
        },
        status: "pending",
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
      },
      {
        id: "task_demo_3",
        userId: userId,
        context: {
          type: "competitor_analysis",
          description: "Analyze our top 3 competitors and identify gaps in their offerings",
          priority: "medium",
          additionalContext: "Focus on pricing strategies, feature sets, and customer support approaches.",
        },
        status: "rejected",
        result: {
          content: `# Competitive Analysis: SaaS Analytics Market

## Executive Summary
This analysis examines the top 3 competitors in the SaaS analytics space, focusing on their pricing strategies, feature sets, and customer support approaches. We've identified several key opportunities for differentiation.

## Competitor 1: MetricsPro

### Pricing Strategy
- Freemium model with limited features
- Paid tiers: $49/mo (Starter), $149/mo (Growth), $399/mo (Enterprise)
- Annual discount: 15%

### Feature Set
- Standard analytics dashboard
- Basic user journey tracking
- Revenue forecasting (premium only)
- Limited API access
- Email reports

### Customer Support
- Email support only for Starter plan
- Chat support for Growth plan
- Dedicated account manager for Enterprise plan
- Response time: 24-48 hours average

### Strengths
- Well-established brand with 5+ years in market
- Strong integration ecosystem
- Comprehensive documentation

### Weaknesses
- Outdated UI/UX
- Limited customization options
- No AI-powered insights
- Slow feature release cycle

## Competitor 2: InsightIQ

### Pricing Strategy
- No free tier
- Paid tiers: $99/mo (Basic), $249/mo (Pro), $599/mo (Business)
- Usage-based pricing for data processing

### Feature Set
- Advanced analytics dashboard
- Comprehensive user tracking
- A/B testing tools
- Extensive API access
- Custom report builder
- Basic AI recommendations

### Customer Support
- Chat support for all plans
- Phone support for Pro and above
- Training webinars for Business plan
- Response time: 6-12 hours average

### Strengths
- Modern, intuitive interface
- Strong data visualization capabilities
- Regular feature updates

### Weaknesses
- High starting price point
- Steep learning curve
- Limited export options
- No dedicated mobile app

## Competitor 3: DataSense

### Pricing Strategy
- 14-day free trial
- Simple pricing: $199/mo flat rate
- Enterprise: custom pricing

### Feature Set
- Real-time analytics dashboard
- User behavior analysis
- Revenue attribution
- Predictive analytics
- Custom event tracking
- Full API access

### Customer Support
- 24/7 chat support
- Priority phone support for Enterprise
- Extensive knowledge base
- Response time: 1-4 hours average

### Strengths
- Simplicity of pricing
- Fastest response times
- Best-in-class data accuracy
- Strong mobile experience

### Weaknesses
- Limited customization
- Fewer integrations than competitors
- Higher price point for small businesses
- Less robust reporting features

## Market Gaps & Opportunities

1. **AI-Powered Insights**: Only InsightIQ offers basic AI capabilities, leaving room for advanced AI-driven analytics and recommendations.

2. **Pricing Flexibility**: None offer truly flexible pricing that scales with startup growth stages.

3. **Onboarding Experience**: All three have relatively complex onboarding processes that could be simplified.

4. **Vertical-Specific Solutions**: None offer tailored analytics for specific SaaS verticals.

5. **Integration Depth**: While breadth of integrations exists, depth of insights from these integrations is lacking.

## Recommended Differentiation Strategy

Based on this analysis, we recommend focusing on:

1. Developing advanced AI-powered insights as our core differentiator
2. Creating a more flexible pricing model that grows with startups
3. Building the simplest, most intuitive onboarding experience
4. Offering vertical-specific templates and insights
5. Providing deeper integration capabilities with popular SaaS tools

This approach addresses the key gaps in the current market while playing to our technical strengths in AI and user experience design.`,
          suggestions: [
            "Consider adding a visual comparison chart of features across competitors",
            "Include specific customer quotes or reviews from competitor products",
            "Add a section on emerging trends in the analytics space",
          ],
          nextSteps: [
            "Prioritize the top 3 differentiators for your product roadmap",
            "Create a competitive positioning statement based on this analysis",
            "Develop marketing messaging that highlights your advantages",
          ],
        },
        feedback:
          "This is a good start, but I need more specific details about each competitor's analytics capabilities and how they handle data visualization. Also, please add information about their market share and target customer segments.",
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        updatedAt: new Date(Date.now() - 172800000), // 2 days ago
        completedAt: new Date(Date.now() - 172800000), // 2 days ago
      },
    ]

    setTasks(demoTasks)

    // Select the first task by default
    if (demoTasks.length > 0) {
      setSelectedTask(demoTasks[0])
    }
  }

  // Create a new task
  const handleCreateTask = async () => {
    if (!newTask.description) {
      toast({
        title: "Task description required",
        description: "Please provide a description for the task.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Create the task
      const task = createTask(userId, newTask as TaskContext)

      // Execute the task with AI
      const result = await executeTask(task.context)

      // Update the task with the result
      const updatedTask = updateTaskStatus(task.id, "completed", result)

      // Update the tasks list
      setTasks((prevTasks) => [...prevTasks, updatedTask!])

      // Track event
      trackEvent("ai_task_created", {
        task_type: newTask.type,
        priority: newTask.priority,
      })

      // Show success message
      toast({
        title: "Task completed",
        description: "Your AI Co-founder has completed the task.",
      })

      // Close the dialog
      setIsCreatingTask(false)

      // Reset the new task form
      setNewTask({
        type: "email_draft",
        description: "",
        priority: "medium",
      })

      // Select the new task
      setSelectedTask(updatedTask!)
    } catch (error) {
      console.error("Error creating task:", error)
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Approve a task
  const handleApproveTask = (taskId: string) => {
    const updatedTask = updateTaskStatus(taskId, "approved")
    if (updatedTask) {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? updatedTask : task)))
      setSelectedTask(updatedTask)

      // Track event
      trackEvent("ai_task_approved", {
        task_type: updatedTask.context.type,
      })

      toast({
        title: "Task approved",
        description: "The task has been approved and marked as complete.",
      })
    }
  }

  // Reject a task
  const handleRejectTask = (taskId: string) => {
    if (!feedback) {
      toast({
        title: "Feedback required",
        description: "Please provide feedback before rejecting the task.",
        variant: "destructive",
      })
      return
    }

    const updatedTask = updateTaskStatus(taskId, "rejected")
    if (updatedTask) {
      addTaskFeedback(taskId, feedback)
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...updatedTask, feedback } : task)))
      setSelectedTask({ ...updatedTask, feedback })

      // Track event
      trackEvent("ai_task_rejected", {
        task_type: updatedTask.context.type,
        feedback_length: feedback.length,
      })

      setFeedback("")
      toast({
        title: "Task rejected",
        description: "The task has been rejected with feedback.",
      })
    }
  }

  // Regenerate a task
  const handleRegenerateTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    setIsLoading(true)

    try {
      // Execute the task with AI
      const result = await executeTask(task.context)

      // Update the task with the result
      const updatedTask = updateTaskStatus(task.id, "completed", result)

      // Update the tasks list
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === taskId ? updatedTask! : t)))

      // Update selected task
      setSelectedTask(updatedTask!)

      // Track event
      trackEvent("ai_task_regenerated", {
        task_type: task.context.type,
      })

      // Show success message
      toast({
        title: "Task regenerated",
        description: "Your AI Co-founder has regenerated the task.",
      })
    } catch (error) {
      console.error("Error regenerating task:", error)
      toast({
        title: "Error",
        description: "Failed to regenerate task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((task) => {
    switch (activeTab) {
      case "pending":
        return task.status === "pending" || task.status === "in_progress"
      case "completed":
        return task.status === "completed" || task.status === "approved"
      case "rejected":
        return task.status === "rejected"
      default:
        return true
    }
  })

  // Get task icon based on type
  const getTaskIcon = (type: TaskType) => {
    switch (type) {
      case "email_draft":
        return <Mail className="h-4 w-4" />
      case "social_post":
        return <MessageSquare className="h-4 w-4" />
      case "customer_response":
        return <Users className="h-4 w-4" />
      case "feature_spec":
        return <FileText className="h-4 w-4" />
      case "meeting_summary":
        return <Calendar className="h-4 w-4" />
      case "competitor_analysis":
        return <Users className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Get task status badge
  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Completed
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {isDemoUser && (
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-purple-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-purple-800">Demo Mode Active</h3>
                <div className="text-sm text-purple-700">
                  You're viewing the AI Co-founder Task Manager in demo mode. Try creating a new task or reviewing
                  existing ones.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <Link
            href="/dashboard/ai-cofounder"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to AI Co-founder
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">AI Co-founder Tasks</h1>
              <p className="text-gray-600">Delegate tasks to your AI Co-founder and review the results</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-purple-700 hover:bg-purple-800" onClick={() => setIsCreatingTask(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="border border-gray-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Task List</CardTitle>
                <CardDescription>Manage tasks assigned to your AI Co-founder</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="pending" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>

                  <div className="p-4">
                    {filteredTasks.length === 0 ? (
                      <div className="text-center py-8">
                        <Inbox className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No tasks found</p>
                        <Button variant="link" className="mt-2 text-purple-700" onClick={() => setIsCreatingTask(true)}>
                          Create a new task
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-3 rounded-md border cursor-pointer transition-colors ${
                              selectedTask?.id === task.id
                                ? "border-purple-300 bg-purple-50"
                                : "border-gray-200 hover:border-purple-200"
                            }`}
                            onClick={() => setSelectedTask(task)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                  {getTaskIcon(task.context.type)}
                                </div>
                                <span className="font-medium text-sm truncate max-w-[150px]">
                                  {task.context.description.length > 30
                                    ? `${task.context.description.substring(0, 30)}...`
                                    : task.context.description}
                                </span>
                              </div>
                              {getStatusBadge(task.status)}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                              <span className="capitalize">{task.context.priority} Priority</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            {selectedTask ? (
              <Card className="border border-gray-100 shadow-sm h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Brain className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {selectedTask.context.type
                            .split("_")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </CardTitle>
                        <CardDescription>{selectedTask.context.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(selectedTask.status)}
                      <Button variant="ghost" size="icon" onClick={() => setSelectedTask(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-100 pb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Created: {new Date(selectedTask.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="capitalize">{selectedTask.context.priority} Priority</span>
                    </div>
                  </div>

                  {selectedTask.result ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Result</h3>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 whitespace-pre-wrap">
                          {selectedTask.result.content}
                        </div>
                      </div>

                      {selectedTask.result.suggestions && selectedTask.result.suggestions.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Suggestions</h3>
                          <ul className="space-y-2">
                            {selectedTask.result.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                                  <span className="text-xs text-blue-700">{index + 1}</span>
                                </div>
                                <span className="text-sm">{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedTask.result.nextSteps && selectedTask.result.nextSteps.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Next Steps</h3>
                          <ul className="space-y-2">
                            {selectedTask.result.nextSteps.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                                  <CheckCircle className="h-3 w-3 text-green-700" />
                                </div>
                                <span className="text-sm">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedTask.feedback && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Your Feedback</h3>
                          <div className="bg-red-50 p-4 rounded-md border border-red-200 text-sm">
                            {selectedTask.feedback}
                          </div>
                        </div>
                      )}

                      {selectedTask.status === "completed" && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Your Feedback</h3>
                            <Textarea
                              placeholder="Provide feedback on this result..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Button
                              variant="outline"
                              onClick={() => handleRegenerateTask(selectedTask.id)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4 mr-2" />
                              )}
                              Regenerate
                            </Button>

                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                className="border-red-200 text-red-700 hover:bg-red-50"
                                onClick={() => handleRejectTask(selectedTask.id)}
                                disabled={isLoading}
                              >
                                <ThumbsDown className="h-4 w-4 mr-2" />
                                Reject
                              </Button>

                              <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveTask(selectedTask.id)}
                                disabled={isLoading}
                              >
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-700 mx-auto mb-4" />
                        <p className="text-gray-500">Processing task...</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-gray-100 shadow-sm h-full">
                <div className="flex items-center justify-center h-full py-16">
                  <div className="text-center max-w-md px-4">
                    <Brain className="h-12 w-12 text-purple-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Select a task or create a new one</h3>
                    <p className="text-gray-500 mb-6">
                      Delegate tasks to your AI Co-founder and review the results. Your AI can draft emails, create
                      social posts, respond to customers, and more.
                    </p>
                    <Button className="bg-purple-700 hover:bg-purple-800" onClick={() => setIsCreatingTask(true)}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create New Task
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* New Task Dialog */}
      <Dialog open={isCreatingTask} onOpenChange={setIsCreatingTask}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Delegate a task to your AI Co-founder. Provide clear instructions for best results.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="task-type" className="text-sm font-medium">
                Task Type
              </label>
              <Select
                value={newTask.type}
                onValueChange={(value) => setNewTask({ ...newTask, type: value as TaskType })}
              >
                <SelectTrigger id="task-type">
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email_draft">Email Draft</SelectItem>
                  <SelectItem value="social_post">Social Media Post</SelectItem>
                  <SelectItem value="customer_response">Customer Response</SelectItem>
                  <SelectItem value="feature_spec">Feature Specification</SelectItem>
                  <SelectItem value="meeting_summary">Meeting Summary</SelectItem>
                  <SelectItem value="competitor_analysis">Competitor Analysis</SelectItem>
                  <SelectItem value="custom">Custom Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="task-description" className="text-sm font-medium">
                Task Description
              </label>
              <Textarea
                id="task-description"
                placeholder="Describe what you want your AI Co-founder to do..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="task-priority" className="text-sm font-medium">
                  Priority
                </label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value as "low" | "medium" | "high" })}
                >
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="task-deadline" className="text-sm font-medium">
                  Deadline (Optional)
                </label>
                <Input
                  id="task-deadline"
                  type="date"
                  value={newTask.deadline || ""}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="task-context" className="text-sm font-medium">
                Additional Context (Optional)
              </label>
              <Textarea
                id="task-context"
                placeholder="Provide any additional information that might help..."
                value={newTask.additionalContext || ""}
                onChange={(e) => setNewTask({ ...newTask, additionalContext: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingTask(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-700 hover:bg-purple-800" onClick={handleCreateTask} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Create Task
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
