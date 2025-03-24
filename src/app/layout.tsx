import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'BabyNewton - AI Math Education',
  description: 'Transform mathematical problems into engaging video explanations with AI-powered animations and voiceovers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen bg-white font-sans antialiased">
        <Navigation />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Toaster />
      </body>
    </html>
  )
} 