"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { motion } from "framer-motion"
import Link from "next/link"

interface AuthCardProps {
  type: 'login' | 'signup'
}

export default function AuthCard({ type }: AuthCardProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useAuthStore((state) => state.login)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    if (type === 'login' && email === "error@example.com") {
      setError("Invalid email or password")
      setIsLoading(false)
      return
    }

    login(email, type === 'signup' ? name : email.split('@')[0])
    setIsLoading(false)

    if (type === 'signup') {
      router.push('/onboarding')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="shadow-xl border-border/50">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {type === 'login' ? 'Welcome back' : 'Create an account'}
          </CardTitle>
          <CardDescription>
            {type === 'login'
              ? 'Enter your email to sign in to your account'
              : 'Enter your details to start your journey with Valen'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-xs font-medium text-red-500 bg-red-50 rounded-lg border border-red-100">
                {error}
              </div>
            )}
            {type === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full h-11" type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
            <div className="text-sm text-center text-text-secondary">
              {type === 'login' ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
