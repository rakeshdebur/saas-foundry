import type React from "react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-purple-700">SaaSFoundry</h1>
            <div className="ml-4 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">Admin</div>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/admin" className="text-gray-900 font-medium">
                Admin
              </Link>
              <Link href="/admin/courses" className="text-gray-500 hover:text-gray-900">
                Courses
              </Link>
              <Link href="/admin/community" className="text-gray-500 hover:text-gray-900">
                Community
              </Link>
            </nav>
          </div>
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
            RD
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
