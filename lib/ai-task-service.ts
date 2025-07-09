import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define task types
export type TaskType =
  | "email_draft"
  | "social_post"
  | "customer_response"
  | "feature_spec"
  | "meeting_summary"
  | "competitor_analysis"
  | "custom"

export interface TaskContext {
  type: TaskType
  description: string
  deadline?: string
  priority: "low" | "medium" | "high"
  additionalContext?: string
  attachments?: string[]
}

export interface TaskResult {
  content: string
  suggestions?: string[]
  nextSteps?: string[]
}

export interface Task {
  id: string
  userId: string
  context: TaskContext
  status: "pending" | "in_progress" | "completed" | "approved" | "rejected"
  result?: TaskResult
  feedback?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

// Generate system prompt based on task context
function generateSystemPrompt(context: TaskContext): string {
  const basePrompt = `You are an AI Co-founder assistant for a SaaS startup. 
You're helping with the following task: ${context.description}.
Task type: ${context.type}.
Priority: ${context.priority}.
${context.deadline ? `Deadline: ${context.deadline}.` : ""}
${context.additionalContext ? `Additional context: ${context.additionalContext}` : ""}

Provide a high-quality, professional result that a SaaS founder would find valuable.
Format your response appropriately for the task type.`

  // Add specific instructions based on task type
  switch (context.type) {
    case "email_draft":
      return (
        basePrompt +
        `
Create a professional email with a clear subject line, greeting, body, and signature.
Focus on clarity, brevity, and a professional tone.
Include a call to action if appropriate.`
      )

    case "social_post":
      return (
        basePrompt +
        `
Create an engaging social media post optimized for the target audience.
Include relevant hashtags and a call to action.
Keep it concise but impactful.`
      )

    case "customer_response":
      return (
        basePrompt +
        `
Create a helpful, empathetic response to the customer.
Address their concerns directly and provide clear solutions.
Maintain a professional but friendly tone.`
      )

    case "feature_spec":
      return (
        basePrompt +
        `
Create a detailed feature specification including:
- Problem statement
- Proposed solution
- User stories
- Technical requirements
- Success metrics
- Implementation timeline`
      )

    case "meeting_summary":
      return (
        basePrompt +
        `
Summarize the key points from the meeting including:
- Main topics discussed
- Decisions made
- Action items with owners
- Follow-up tasks
- Timeline for next steps`
      )

    case "competitor_analysis":
      return (
        basePrompt +
        `
Provide a comprehensive competitor analysis including:
- Strengths and weaknesses
- Pricing strategy
- Feature comparison
- Market positioning
- Opportunities for differentiation`
      )

    default:
      return basePrompt
  }
}

// Execute a task using AI
export async function executeTask(context: TaskContext): Promise<TaskResult> {
  const systemPrompt = generateSystemPrompt(context)

  try {
    // For demo purposes, we'll simulate the AI response
    if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Return mock responses based on task type
      return getMockTaskResult(context.type, context.description)
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Please complete this task: ${context.description}`,
      temperature: 0.7,
      maxTokens: 2000,
    })

    // Generate follow-up suggestions
    const { text: suggestionsText } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on this completed task: "${text.substring(0, 500)}...", 
      suggest 2-3 follow-up actions or improvements the founder might want to consider.
      Keep each suggestion brief and actionable.`,
      temperature: 0.7,
      maxTokens: 300,
    })

    const suggestions = suggestionsText
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .slice(0, 3)

    // Generate next steps
    const { text: nextStepsText } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on this completed task: "${text.substring(0, 500)}...", 
      suggest 2-3 specific next steps the founder should take to implement or follow up on this work.
      Format each step as a brief, actionable item.`,
      temperature: 0.7,
      maxTokens: 300,
    })

    const nextSteps = nextStepsText
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .slice(0, 3)

    return {
      content: text,
      suggestions,
      nextSteps,
    }
  } catch (error) {
    console.error("Error executing AI task:", error)
    throw new Error("Failed to execute task. Please try again later.")
  }
}

// Mock task results for demo mode
function getMockTaskResult(type: TaskType, description: string): TaskResult {
  switch (type) {
    case "email_draft":
      return {
        content: `Subject: Partnership Opportunity with SaaSFoundry

Dear [Recipient Name],

I hope this email finds you well. My name is [Your Name], founder of SaaSFoundry, and I'm reaching out because I believe there's a valuable opportunity for collaboration between our companies.

SaaSFoundry helps early-stage SaaS founders build and scale their products faster using AI-powered tools and frameworks. Based on your work at [Company Name], particularly your focus on [specific area], I see strong potential alignment in our missions.

Specifically, I'd like to explore:
1. Integration opportunities between our platforms
2. Co-marketing initiatives targeting SaaS founders
3. Potential for bundled offerings

Would you be available for a brief 20-minute call next week to discuss these possibilities? I'm flexible on Tuesday or Thursday afternoon.

Thank you for considering this partnership. I look forward to potentially working together.

Best regards,

[Your Name]
Founder & CEO, SaaSFoundry
[Your Phone]
[Your Email]
[Website URL]`,
        suggestions: [
          "Personalize the email with specific details about the recipient's company",
          "Include metrics or case studies demonstrating your platform's value",
          "Consider offering a specific incentive for the initial meeting",
        ],
        nextSteps: [
          "Follow up within 3-5 business days if no response",
          "Prepare a brief demo or presentation for the call",
          "Research the recipient's company more thoroughly before the meeting",
        ],
      }
    case "social_post":
      return {
        content: `🚀 Exciting news! We've just launched our AI Co-founder feature at SaaSFoundry!

Now SaaS founders can delegate day-to-day tasks to their AI assistant - from drafting emails to creating feature specs and analyzing competitors.

The best part? Your AI Co-founder learns from your feedback to deliver increasingly personalized results.

Try it today and reclaim hours of your week! Link in bio.

#SaaS #AIforFounders #StartupTools #ProductivityHack #SaaSFoundry`,
        suggestions: [
          "Add a compelling image or short video demonstrating the feature",
          "Include a limited-time offer for early adopters",
          "Create a series of posts highlighting different use cases",
        ],
        nextSteps: [
          "Schedule this post during peak engagement hours",
          "Prepare follow-up content addressing common questions",
          "Monitor comments and engage with responders",
        ],
      }
    case "feature_spec":
      return {
        content: `# Feature Specification: AI Co-founder Task Automation

## Problem Statement
SaaS founders spend excessive time on routine tasks that could be automated, reducing their focus on strategic activities. Current AI solutions lack the context awareness and feedback mechanisms needed to truly function as a reliable co-founder.

## Proposed Solution
Implement an AI Co-founder Task Automation system that allows founders to delegate day-to-day tasks with proper oversight and continuous improvement through feedback.

## User Stories
- As a founder, I want to delegate email drafting to my AI Co-founder so I can focus on strategic activities
- As a founder, I want to review and approve AI-generated content before it's finalized
- As a founder, I want to provide feedback on AI outputs to improve future results
- As a founder, I want my AI Co-founder to learn my preferences and communication style over time
- As a founder, I want to track the status of all delegated tasks in one dashboard

## Technical Requirements
### Core Functionality
- Task delegation interface with multiple task types
- AI execution system using GPT-4o for high-quality outputs
- Review and approval workflow
- Feedback collection and integration
- Task status tracking and history

### Integration Points
- User authentication system
- Analytics for tracking task types and completion rates
- Notification system for task status updates

### Data Storage
- Task definitions and metadata
- Task results and status
- User feedback and preferences
- Historical performance metrics

## Success Metrics
- 30% reduction in time spent on routine tasks
- 80% task approval rate without modifications
- 95% task completion rate
- User satisfaction rating of 4.5/5 or higher
- Average of 10 tasks delegated per active user per week

## Implementation Timeline
### Phase 1 (2 weeks)
- Basic task delegation interface
- Initial AI integration for email drafting and social posts
- Simple review and approval workflow

### Phase 2 (2 weeks)
- Additional task types (feature specs, competitor analysis)
- Feedback collection and storage
- Task history and analytics

### Phase 3 (2 weeks)
- Personalization based on historical feedback
- Advanced task types
- Performance optimization

## Rollout Plan
1. Internal testing with founding team
2. Limited beta with 20 selected customers
3. Refinement based on beta feedback
4. Full launch with onboarding guide and templates
5. Post-launch monitoring and iteration`,
        suggestions: [
          "Consider adding a priority system for tasks",
          "Include a section on security and data privacy considerations",
          "Add specific metrics for measuring AI improvement over time",
        ],
        nextSteps: [
          "Review with technical team to validate implementation timeline",
          "Create wireframes for the user interface",
          "Identify beta testers from current customer base",
        ],
      }
    case "competitor_analysis":
      return {
        content: `# Competitor Analysis: SaaS AI Assistants Market

## Executive Summary
This analysis examines the top competitors in the AI assistant space for SaaS founders, focusing on their features, pricing, and market positioning. Several opportunities for differentiation have been identified.

## Competitor 1: Jasper AI

### Overview
Jasper AI offers AI-powered content creation tools primarily focused on marketing content.

### Features
- Content generation for blogs, social media, and ads
- Templates for different content types
- Brand voice customization
- Team collaboration features

### Pricing
- Creator: $49/month
- Teams: $125/month
- Business: Custom pricing

### Strengths
- Strong marketing content focus
- Extensive template library
- Good collaboration features

### Weaknesses
- Not specialized for SaaS founders
- Limited business strategy capabilities
- No task management features

## Competitor 2: Copy.ai

### Overview
Copy.ai provides AI writing tools for marketing and sales content.

### Features
- Email generation
- Social media content
- Blog post creation
- Sales copy

### Pricing
- Free plan with limited usage
- Pro: $36/month
- Enterprise: Custom pricing

### Strengths
- Affordable entry point
- User-friendly interface
- Good for marketing content

### Weaknesses
- Not tailored to SaaS businesses
- Limited strategic capabilities
- No feedback loop for improvement

## Competitor 3: Notion AI

### Overview
Notion AI integrates AI capabilities into the Notion workspace platform.

### Features
- Content summarization
- Writing assistance
- Idea generation
- Integrated with workspace

### Pricing
- $10/month add-on to Notion plans
- Included in Notion's enterprise plans

### Strengths
- Deeply integrated with productivity tools
- Context-aware within documents
- Collaborative environment

### Weaknesses
- Not specialized for founders
- Limited to content within Notion
- No dedicated task automation

## Market Gaps & Opportunities

1. **Founder-Specific Context**: None of the competitors offer AI solutions specifically designed for SaaS founders with relevant domain knowledge.

2. **Task Automation**: While content generation is common, comprehensive task automation with approval workflows is missing.

3. **Feedback Loop**: No competitor has implemented a robust feedback mechanism to improve AI outputs over time.

4. **Strategic Guidance**: Current solutions focus on content creation rather than strategic business assistance.

5. **Integration Depth**: None offer deep integration with the full stack of SaaS founder tools (analytics, CRM, etc.).

## Recommended Differentiation Strategy

1. **Position as a true co-founder**, not just an assistant, with domain expertise in SaaS businesses

2. **Implement a comprehensive task delegation system** beyond simple content generation

3. **Create a robust feedback loop** that demonstrably improves outputs over time

4. **Develop strategic capabilities** like competitor analysis, market research, and business planning

5. **Build integrations with the SaaS founder stack** to provide context-aware assistance

This approach addresses the key gaps in the current market while leveraging our unique understanding of SaaS founders' needs.`,
        suggestions: [
          "Include a visual competitive positioning map",
          "Add pricing comparison table for easy reference",
          "Consider analyzing emerging players in addition to established competitors",
        ],
        nextSteps: [
          "Use this analysis to refine product positioning in marketing materials",
          "Identify which differentiating features to prioritize in the roadmap",
          "Monitor these competitors for pricing or feature changes",
        ],
      }
    case "meeting_summary":
      return {
        content: `# Meeting Summary: Product Roadmap Planning Session

## Date: May 14, 2023
## Attendees: 
- Sarah (Product)
- Michael (Engineering)
- Priya (Design)
- Alex (Marketing)
- You (CEO)

## Key Topics Discussed

### 1. Q3 Product Priorities
- Team aligned on focusing on three key features:
  - AI Co-founder task automation
  - Analytics dashboard enhancements
  - Improved onboarding experience
- Decision to delay the API integration marketplace until Q4

### 2. Resource Allocation
- Engineering capacity is limited due to technical debt
- Agreement to allocate 70% to new features, 30% to technical debt
- Need to hire one additional frontend developer by end of month

### 3. User Feedback Review
- Reviewed feedback from last user research session
- Key pain points: onboarding complexity, limited analytics, need for automation
- Positive feedback on the UI redesign and community features

### 4. Timeline and Milestones
- AI Co-founder MVP: June 30
- Analytics dashboard enhancements: July 15
- Improved onboarding: August 10
- Public launch of all features: August 31

## Decisions Made
1. Approved the Q3 roadmap focusing on the three priority features
2. Approved budget for additional frontend developer
3. Decided to conduct bi-weekly user testing sessions for the AI Co-founder feature
4. Agreed to revisit the API marketplace in Q4 planning

## Action Items
1. Sarah: Finalize detailed specs for AI Co-founder by May 21
2. Michael: Provide technical architecture document by May 28
3. Priya: Create design mockups for new onboarding flow by May 30
4. Alex: Develop marketing plan for August launch by June 15
5. You: Approve hiring req for frontend developer by end of week

## Next Steps
- Follow-up meeting scheduled for May 28 to review progress
- Weekly status updates to be shared in Slack
- User testing to begin first week of June

## Open Questions
- Pricing strategy for AI Co-founder feature (to be discussed in separate meeting)
- Integration approach with existing analytics tools
- Beta testing selection criteria`,
        suggestions: [
          "Schedule a dedicated meeting to resolve the open questions",
          "Create a shared project board to track action items and deadlines",
          "Consider involving key customers in the beta testing phase",
        ],
        nextSteps: [
          "Distribute this summary to all attendees within 24 hours",
          "Follow up individually with owners of action items",
          "Add key milestones to company calendar",
        ],
      }
    case "customer_response":
      return {
        content: `Subject: Re: Issues with the AI Co-founder feature

Hi Jordan,

Thank you for reaching out about the challenges you're experiencing with our AI Co-founder feature. I appreciate you taking the time to provide such detailed feedback, and I'm sorry to hear it hasn't been meeting your expectations.

I've looked into the specific issues you mentioned:

1. Regarding the task completion delays: You're right, and this isn't the experience we want you to have. We've identified a processing bottleneck that's affecting about 15% of users, including your account. Our engineering team has prioritized this fix and will be deploying an update within the next 48 hours.

2. About the quality of email drafts: Thank you for the examples you shared. I can see why these wouldn't meet your standards. We're continuously training our AI models, and your feedback is incredibly valuable. I've forwarded your specific examples to our AI team to improve the system.

3. On the feedback loop not seeming to work: This is concerning, as the system should definitely be learning from your edits. I've checked your account and found that there was an issue with the feedback storage mechanism. We've fixed this for your account, and your future edits will properly inform the AI's outputs.

As a token of appreciation for your patience and helpful feedback, I've added a 30-day extension to your current subscription at no cost. You should see this reflected in your billing section within the next few hours.

Would you be open to a quick 15-minute call next week so I can personally walk you through some advanced settings that might help tailor the AI outputs more precisely to your needs? I'm available Tuesday or Wednesday afternoon if that works for you.

Thank you again for your patience and for helping us improve. Users like you who provide thoughtful feedback are invaluable to making our product better for everyone.

Best regards,

[Your Name]
Customer Success Manager
SaaSFoundry

P.S. I'll personally follow up with you after the system update to ensure everything is working properly.`,
        suggestions: [
          "Offer to set up templates based on the customer's previous successful emails",
          "Consider adding the customer to the beta program for upcoming AI improvements",
          "Share a brief guide on how to get the best results from the AI Co-founder",
        ],
        nextSteps: [
          "Set a reminder to follow up after the system update as promised",
          "Check if other customers are experiencing similar issues",
          "Document this feedback for the product team's review",
        ],
      }
    default:
      return {
        content: `I've completed the task: "${description}".

This is a placeholder response for a custom task type. In a real implementation, this would be generated based on the specific requirements of your task.

The AI Co-founder would analyze your request and provide a tailored response that meets your specific needs, formatted appropriately for the type of task you've requested.`,
        suggestions: [
          "Consider providing more specific task types for better results",
          "Add more context to your request for more tailored outputs",
          "Try breaking complex tasks into smaller, more focused requests",
        ],
        nextSteps: [
          "Review this output and provide feedback to improve future results",
          "Try a different task type if this doesn't meet your needs",
          "Explore the other capabilities of your AI Co-founder",
        ],
      }
  }
}

// Mock database functions (in a real app, these would connect to your database)
const tasks: Task[] = []

export function createTask(userId: string, context: TaskContext): Task {
  const task: Task = {
    id: `task_${Date.now()}`,
    userId,
    context,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  tasks.push(task)
  return task
}

export function getTask(taskId: string): Task | undefined {
  return tasks.find((task) => task.id === taskId)
}

export function updateTaskStatus(taskId: string, status: Task["status"], result?: TaskResult): Task | undefined {
  const task = tasks.find((task) => task.id === taskId)
  if (!task) return undefined

  task.status = status
  if (result) task.result = result
  task.updatedAt = new Date()

  if (status === "completed") {
    task.completedAt = new Date()
  }

  return task
}

export function addTaskFeedback(taskId: string, feedback: string): Task | undefined {
  const task = tasks.find((task) => task.id === taskId)
  if (!task) return undefined

  task.feedback = feedback
  task.updatedAt = new Date()

  return task
}

export function getUserTasks(userId: string): Task[] {
  return tasks.filter((task) => task.userId === userId)
}
