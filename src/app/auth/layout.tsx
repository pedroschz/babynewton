import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div className="w-full max-w-md p-8">
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">BabyNewton</h1>
        </Link>
        <div className="glass-card">
          {children}
        </div>
      </div>
    </div>
  )
} 