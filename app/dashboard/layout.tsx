import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar />
        <SidebarInset className="w-full">
          {/* Header */}
          <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-purple-700 lg:hidden">SaaSFoundry</h1>
                <nav className="hidden md:flex lg:hidden ml-10 space-x-8">
                  <Link href="/dashboard" className="text-gray-900 font-medium">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/courses" className="text-gray-500 hover:text-gray-900">
                    Courses
                  </Link>
                  <Link href="/community" className="text-gray-500 hover:text-gray-900">
                    Community
                  </Link>
                  <Link href="/dashboard/health" className="text-gray-500 hover:text-gray-900">
                    Health Dashboard
                  </Link>
                  <Link href="/dashboard/platform-manager" className="text-gray-500 hover:text-gray-900">
                    Platform Manager
                  </Link>
                  <Link href="/dashboard/tool-builder" className="text-gray-500 hover:text-gray-900 font-medium">
                    Tool Builder
                  </Link>
                  <Link href="/playground" className="text-gray-500 hover:text-gray-900">
                    Playground
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Support
                </Button>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
                  RD
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Navigation */}
          <div className="md:hidden bg-white border-b border-gray-200 overflow-x-auto">
            <div className="flex space-x-4 p-3">
              <Link
                href="/dashboard"
                className="whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/courses"
                className="whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Courses
              </Link>
              <Link
                href="/community"
                className="whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Community
              </Link>
              <Link
                href="/dashboard/health"
                className="whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Health
              </Link>
              <Link
                href="/dashboard/platform-manager"
                className="whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Platform
              </Link>
              <Link
                href="/dashboard/tool-builder"
                className="whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 font-medium"
              >
                Tools
              </Link>
            </div>
          </div>

          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
