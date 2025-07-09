"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, Plus, Trash } from "lucide-react"

export default function EditLecturePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("content")

  // In a real app, you would fetch the lecture data based on the ID
  // For this example, we'll use mock data
  const [lecture, setLecture] = useState({
    title: "Building Landing Pages with AI",
    description: "Learn how to create effective landing pages using AI tools",
    content: `
Welcome to this lecture on building landing pages with AI. In this session, we'll cover the entire process from ideation to deployment.

First, let's talk about the importance of an effective landing page. Your landing page is often the first impression potential customers have of your product. It needs to clearly communicate your value proposition, build trust, and guide visitors toward a specific action.

Now, let's dive into the AI design process. When working with AI tools like V0.dev or Midjourney, it's important to craft effective design prompts. A good prompt should include:

1. The purpose of the landing page
2. Your target audience
3. The key message you want to convey
4. Any specific style or branding requirements

Let me demonstrate how this works with V0.dev...
    `,
    videoUrl: "",
    resources: [
      { title: "Landing Page Template", type: "Code Snippet", url: "" },
      { title: "Design Prompt Examples", type: "PDF", url: "" },
    ],
    quizQuestions: [
      {
        question: "What should a good AI design prompt include?",
        options: [
          "Only technical specifications",
          "Purpose, audience, message, and style requirements",
          "Just the color scheme",
          "Only SEO keywords",
        ],
        correctAnswer: 1,
      },
    ],
  })

  const updateLecture = (field: string, value: any) => {
    setLecture({ ...lecture, [field]: value })
  }

  const addResource = () => {
    setLecture({
      ...lecture,
      resources: [...lecture.resources, { title: "", type: "", url: "" }],
    })
  }

  const updateResource = (index: number, field: string, value: string) => {
    const updatedResources = [...lecture.resources]
    updatedResources[index] = { ...updatedResources[index], [field]: value }
    setLecture({ ...lecture, resources: updatedResources })
  }

  const removeResource = (index: number) => {
    setLecture({
      ...lecture,
      resources: lecture.resources.filter((_, i) => i !== index),
    })
  }

  const addQuizQuestion = () => {
    setLecture({
      ...lecture,
      quizQuestions: [
        ...lecture.quizQuestions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
        },
      ],
    })
  }

  const updateQuizQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...lecture.quizQuestions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setLecture({ ...lecture, quizQuestions: updatedQuestions })
  }

  const updateQuizOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...lecture.quizQuestions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setLecture({ ...lecture, quizQuestions: updatedQuestions })
  }

  const removeQuizQuestion = (index: number) => {
    setLecture({
      ...lecture,
      quizQuestions: lecture.quizQuestions.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real implementation, this would send data to your backend
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin/courses")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin/courses" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to courses
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Edit Lecture</h1>
              <p className="text-gray-600">Update lecture content and resources</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Lecture Details</CardTitle>
              <CardDescription>Basic information about the lecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Lecture Title</Label>
                <Input
                  id="title"
                  placeholder="Enter lecture title"
                  value={lecture.title}
                  onChange={(e) => updateLecture("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Lecture Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter lecture description"
                  value={lecture.description}
                  onChange={(e) => updateLecture("description", e.target.value)}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="content" onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lecture Content</CardTitle>
                  <CardDescription>The main content of your lecture</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter lecture content..."
                    value={lecture.content}
                    onChange={(e) => updateLecture("content", e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="video" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Video Content</CardTitle>
                  <CardDescription>Upload or link to video content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input
                      id="videoUrl"
                      placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                      value={lecture.videoUrl}
                      onChange={(e) => updateLecture("videoUrl", e.target.value)}
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Drag and drop a video file, or click to browse</p>
                    <Button type="button" variant="outline" size="sm">
                      Upload Video
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">Max file size: 500MB</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lecture Resources</CardTitle>
                  <CardDescription>Add downloadable resources for students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lecture.resources.map((resource, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Resource {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeResource(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 px-2"
                        >
                          <Trash className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`resource-${index}-title`} className="text-xs">
                            Resource Title
                          </Label>
                          <Input
                            id={`resource-${index}-title`}
                            placeholder="Enter resource title"
                            value={resource.title}
                            onChange={(e) => updateResource(index, "title", e.target.value)}
                            required
                            className="h-8 text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`resource-${index}-type`} className="text-xs">
                            Resource Type
                          </Label>
                          <Input
                            id={`resource-${index}-type`}
                            placeholder="PDF, Code Snippet, etc."
                            value={resource.type}
                            onChange={(e) => updateResource(index, "type", e.target.value)}
                            required
                            className="h-8 text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`resource-${index}-url`} className="text-xs">
                          Resource URL or File
                        </Label>
                        <div className="flex space-x-2">
                          <Input
                            id={`resource-${index}-url`}
                            placeholder="Enter URL or upload file"
                            value={resource.url}
                            onChange={(e) => updateResource(index, "url", e.target.value)}
                            className="h-8 text-sm"
                          />
                          <Button type="button" variant="outline" size="sm" className="flex-shrink-0">
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" onClick={addResource} className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Resource
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Questions</CardTitle>
                  <CardDescription>Add quiz questions to test student knowledge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lecture.quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="border border-gray-200 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Question {qIndex + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuizQuestion(qIndex)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 px-2"
                        >
                          <Trash className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`question-${qIndex}`} className="text-xs">
                          Question
                        </Label>
                        <Input
                          id={`question-${qIndex}`}
                          placeholder="Enter question"
                          value={question.question}
                          onChange={(e) => updateQuizQuestion(qIndex, "question", e.target.value)}
                          required
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-xs">Answer Options</Label>
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`question-${qIndex}-option-${oIndex}`}
                              name={`question-${qIndex}-correct`}
                              checked={question.correctAnswer === oIndex}
                              onChange={() => updateQuizQuestion(qIndex, "correctAnswer", oIndex)}
                              className="h-4 w-4 text-purple-600"
                            />
                            <Input
                              placeholder={`Option ${oIndex + 1}`}
                              value={option}
                              onChange={(e) => updateQuizOption(qIndex, oIndex, e.target.value)}
                              required
                              className="h-8 text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" onClick={addQuizQuestion} className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" type="button" asChild>
              <Link href="/admin/courses">Cancel</Link>
            </Button>
            <Button type="submit" className="bg-purple-700 hover:bg-purple-800" disabled={isSubmitting}>
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
