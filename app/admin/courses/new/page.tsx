"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Trash } from "lucide-react"

export default function NewCoursePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [modules, setModules] = useState([{ title: "", description: "", lectures: [{ title: "", description: "" }] }])

  const addModule = () => {
    setModules([...modules, { title: "", description: "", lectures: [{ title: "", description: "" }] }])
  }

  const removeModule = (moduleIndex: number) => {
    setModules(modules.filter((_, index) => index !== moduleIndex))
  }

  const addLecture = (moduleIndex: number) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lectures.push({ title: "", description: "" })
    setModules(updatedModules)
  }

  const removeLecture = (moduleIndex: number, lectureIndex: number) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lectures[lectureIndex] = updatedModules[moduleIndex].lectures.filter(
      (_, index) => index !== lectureIndex,
    )
    setModules(updatedModules)
  }

  const updateModule = (moduleIndex: number, field: string, value: string) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex][field as keyof (typeof updatedModules)[0]] = value
    setModules(updatedModules)
  }

  const updateLecture = (moduleIndex: number, lectureIndex: number, field: string, value: string) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lectures[lectureIndex][field as keyof (typeof updatedModules)[0]["lectures"][0]] = value
    setModules(updatedModules)
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
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to admin dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Create New Course</h1>
              <p className="text-gray-600">Add a new course to the platform</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>Basic information about the course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  placeholder="Enter course title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter course description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>Add modules and lectures to your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Module {moduleIndex + 1}</h3>
                    {modules.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeModule(moduleIndex)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Remove Module
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`module-${moduleIndex}-title`}>Module Title</Label>
                      <Input
                        id={`module-${moduleIndex}-title`}
                        placeholder="Enter module title"
                        value={module.title}
                        onChange={(e) => updateModule(moduleIndex, "title", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`module-${moduleIndex}-description`}>Module Description</Label>
                      <Textarea
                        id={`module-${moduleIndex}-description`}
                        placeholder="Enter module description"
                        value={module.description}
                        onChange={(e) => updateModule(moduleIndex, "description", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Lectures</Label>
                      </div>

                      <div className="space-y-4">
                        {module.lectures.map((lecture, lectureIndex) => (
                          <div key={lectureIndex} className="border border-gray-100 rounded-md p-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">Lecture {lectureIndex + 1}</h4>
                              {module.lectures.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeLecture(moduleIndex, lectureIndex)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 px-2"
                                >
                                  <Trash className="h-3 w-3 mr-1" />
                                  Remove
                                </Button>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`lecture-${moduleIndex}-${lectureIndex}-title`} className="text-xs">
                                Lecture Title
                              </Label>
                              <Input
                                id={`lecture-${moduleIndex}-${lectureIndex}-title`}
                                placeholder="Enter lecture title"
                                value={lecture.title}
                                onChange={(e) => updateLecture(moduleIndex, lectureIndex, "title", e.target.value)}
                                required
                                className="h-8 text-sm"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`lecture-${moduleIndex}-${lectureIndex}-description`} className="text-xs">
                                Lecture Description
                              </Label>
                              <Textarea
                                id={`lecture-${moduleIndex}-${lectureIndex}-description`}
                                placeholder="Enter lecture description"
                                value={lecture.description}
                                onChange={(e) =>
                                  updateLecture(moduleIndex, lectureIndex, "description", e.target.value)
                                }
                                required
                                className="text-sm min-h-[60px]"
                              />
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addLecture(moduleIndex)}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Lecture
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addModule} className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                Add Module
              </Button>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" type="button" asChild>
                <Link href="/admin">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-purple-700 hover:bg-purple-800" disabled={isSubmitting}>
                {isSubmitting ? "Creating Course..." : "Create Course"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  )
}
