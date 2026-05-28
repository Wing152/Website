"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">Valen</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-text-secondary">
          <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/#mentors" className="hover:text-primary transition-colors">Mentors</Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary hidden sm:inline">Hello, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
