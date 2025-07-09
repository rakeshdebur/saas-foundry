import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Filter, Search, Star } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">SaaS Founder Courses</h1>
          <p className="text-gray-500 mt-2">Structured learning paths to take you from idea to $10M ARR</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="enrolled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.enrolled)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.progress === 100)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.recommended)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path) => (
            <Card key={path.id} className="border-2 hover:border-purple-500 transition-all">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                  <Badge variant={path.premium ? "default" : "outline"}>{path.premium ? "Premium" : "Free"}</Badge>
                </div>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {path.courseCount} courses
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {path.duration}
                  </div>
                </div>
                <div className="space-y-2">
                  {path.courses.map((course, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs">
                        {index + 1}
                      </div>
                      <span className="text-sm">{course}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={path.premium ? "default" : "outline"}>
                  {path.premium ? "Upgrade to Access" : "Start Learning Path"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Recently Updated</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            .filter((course) => course.recentlyUpdated)
            .map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{course.rating}</span>
              <span className="text-xs text-gray-500">({course.reviewCount} reviews)</span>
            </div>
          </div>
          <Badge variant={course.premium ? "default" : "outline"}>{course.premium ? "Premium" : "Free"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <p className="text-gray-500 text-sm mb-4">{course.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {course.modules} modules
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
        </div>
        {course.enrolled && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={course.enrolled ? "outline" : course.premium ? "default" : "outline"}>
          {course.enrolled ? "Continue Learning" : course.premium ? "Upgrade to Access" : "Start Course"}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data
const courses = [
  {
    id: 1,
    title: "SaaS Problem Validation Masterclass",
    description: "Learn how to identify, validate, and refine your SaaS business idea with proven frameworks.",
    modules: 8,
    duration: "4 hours",
    rating: 4.8,
    reviewCount: 124,
    premium: false,
    enrolled: true,
    progress: 65,
    recommended: true,
    recentlyUpdated: false,
    stage: "ideation",
  },
  {
    id: 2,
    title: "Market Sizing & Opportunity Analysis",
    description: "Techniques to accurately size your market and evaluate the true opportunity for your SaaS.",
    modules: 6,
    duration: "3.5 hours",
    rating: 4.7,
    reviewCount: 98,
    premium: false,
    enrolled: true,
    progress: 100,
    recommended: false,
    recentlyUpdated: false,
    stage: "ideation",
  },
  {
    id: 3,
    title: "SaaS MVP Development Strategy",
    description: "Build your minimum viable product efficiently with the right features and technology stack.",
    modules: 10,
    duration: "6 hours",
    rating: 4.9,
    reviewCount: 156,
    premium: true,
    enrolled: false,
    progress: 0,
    recommended: true,
    recentlyUpdated: true,
    stage: "validation",
  },
  {
    id: 4,
    title: "Customer Acquisition for Early-Stage SaaS",
    description: "Proven strategies to acquire your first 100 customers without breaking the bank.",
    modules: 12,
    duration: "8 hours",
    rating: 4.6,
    reviewCount: 87,
    premium: true,
    enrolled: false,
    progress: 0,
    recommended: false,
    recentlyUpdated: false,
    stage: "traction",
  },
  {
    id: 5,
    title: "SaaS Pricing Optimization",
    description: "Frameworks for pricing your SaaS product to maximize revenue and customer satisfaction.",
    modules: 7,
    duration: "4.5 hours",
    rating: 4.8,
    reviewCount: 112,
    premium: true,
    enrolled: false,
    progress: 0,
    recommended: true,
    recentlyUpdated: true,
    stage: "traction",
  },
  {
    id: 6,
    title: "Building a SaaS Growth Engine",
    description: "Systematic approaches to scaling your SaaS from $0 to $1M ARR with repeatable processes.",
    modules: 14,
    duration: "10 hours",
    rating: 4.9,
    reviewCount: 203,
    premium: true,
    enrolled: false,
    progress: 0,
    recommended: false,
    recentlyUpdated: true,
    stage: "growth",
  },
  {
    id: 7,
    title: "SaaS Metrics & Analytics Mastery",
    description: "Learn to track, analyze, and optimize the key metrics that drive SaaS business success.",
    modules: 9,
    duration: "5.5 hours",
    rating: 4.7,
    reviewCount: 76,
    premium: true,
    enrolled: false,
    progress: 0,
    recommended: false,
    recentlyUpdated: false,
    stage: "growth",
  },
  {
    id: 8,
    title: "Customer Success & Retention Strategies",
    description: "Proven methods to reduce churn and increase lifetime value through customer success.",
    modules: 8,
    duration: "5 hours",
    rating: 4.8,
    reviewCount: 91,
    premium: true,
    enrolled: false,
    progress: 0,
    recommended: true,
    recentlyUpdated: false,
    stage: "growth",
  },
  {
    id: 9,
    title: "Scaling SaaS Operations",
    description: "Operational frameworks to scale your team, processes, and infrastructure beyond $1M ARR.",
    modules: 11,
    duration: "7 hours",
    rating: 4.9,
    reviewCount: 68,
    premium: true,
    enrolled: false,
    progress: 0,
    recommended: false,
    recentlyUpdated: true,
    stage: "scaling",
  },
]

const learningPaths = [
  {
    id: 1,
    title: "Zero to Product-Market Fit",
    description: "Complete journey from idea validation to achieving product-market fit for your SaaS",
    courseCount: 4,
    duration: "18 hours",
    premium: false,
    courses: [
      "SaaS Problem Validation Masterclass",
      "Market Sizing & Opportunity Analysis",
      "Customer Interview Techniques",
      "MVP Development Strategy",
    ],
  },
  {
    id: 2,
    title: "SaaS Growth Accelerator",
    description: "Comprehensive strategies to scale your SaaS from initial traction to $1M ARR",
    courseCount: 5,
    duration: "32 hours",
    premium: true,
    courses: [
      "Customer Acquisition for Early-Stage SaaS",
      "SaaS Pricing Optimization",
      "Building a SaaS Growth Engine",
      "SaaS Metrics & Analytics Mastery",
      "Customer Success & Retention Strategies",
    ],
  },
  {
    id: 3,
    title: "SaaS Scale-Up Mastery",
    description: "Advanced strategies for scaling your SaaS from $1M to $10M ARR and beyond",
    courseCount: 6,
    duration: "40 hours",
    premium: true,
    courses: [
      "Scaling SaaS Operations",
      "Enterprise Sales Playbook",
      "International Expansion Strategy",
      "SaaS M&A Preparation",
      "Building a Category-Defining SaaS",
      "Venture Capital & Fundraising",
    ],
  },
  {
    id: 4,
    title: "Technical Founder's Roadmap",
    description: "Essential business skills for technical founders building a SaaS company",
    courseCount: 4,
    duration: "22 hours",
    premium: true,
    courses: [
      "Business Fundamentals for Technical Founders",
      "From CTO to CEO: Leadership Transition",
      "Building & Managing Technical Teams",
      "Product Strategy for Technical Founders",
    ],
  },
]
