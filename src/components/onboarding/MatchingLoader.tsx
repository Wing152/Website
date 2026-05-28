"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useOnboardingStore } from "@/store/useOnboardingStore"

const subtexts = [
  "Analyzing your ambitions...",
  "Searching historical archives...",
  "Evaluating psychological profiles...",
  "Connecting with legendary minds...",
  "Synthesizing your personal council...",
  "Preparing the wisdom chamber..."
]

export default function MatchingLoader() {
  const [progress, setProgress] = useState(0)
  const [subtextIndex, setSubtextIndex] = useState(0)
  const router = useRouter()
  const responses = useOnboardingStore(state => state.responses)

  useEffect(() => {
    let isMounted = true

    const runMatching = async () => {
      try {
        const res = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responses })
        })
        const data = await res.json()

        // Store recommendations in session storage for the next page
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('valen-recommendations', JSON.stringify(data))
        }
      } catch (e) {
        console.error("Matching failed", e)
      }
    }

    runMatching()

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          if (isMounted) setTimeout(() => router.push('/recommendations'), 500)
          return 100
        }
        return prev + 1
      })
    }, 70)

    const subtextTimer = setInterval(() => {
      setSubtextIndex(prev => (prev + 1) % subtexts.length)
    }, 1200)

    return () => {
      isMounted = false
      clearInterval(timer)
      clearInterval(subtextTimer)
    }
  }, [router, responses])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-8"
        />

        <h2 className="text-2xl font-bold mb-4">Finding the best role models for you…</h2>

        <div className="h-2 w-full bg-secondary-background rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={subtextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-text-secondary italic"
            >
              {subtexts[subtextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
