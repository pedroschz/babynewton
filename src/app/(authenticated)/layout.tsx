"use client"

import { Navigation } from "@/components/Navigation"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      <main className="py-8">
        {children}
      </main>
    </div>
  )
} 