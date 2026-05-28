"use client"

import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-primary uppercase bg-primary/10 rounded-full">
            The Future of Mentorship
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 leading-[1.1]">
            Talk with the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              greatest minds
            </span> in history.
          </h1>
          <p className="max-w-2xl mx-auto text-lg lg:text-xl text-text-secondary mb-10 leading-relaxed">
            Experience personal growth through conversations with AI versions of legendary founders, philosophers, scientists, and visionaries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/#mentors">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 text-lg">
                Explore Mentors
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-border bg-white shadow-2xl overflow-hidden p-2">
             <div className="aspect-[16/9] rounded-xl bg-secondary-background flex items-center justify-center border border-border/50">
                <div className="flex flex-col items-center gap-4">
                   <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary/40 animate-ping" />
                   </div>
                   <p className="text-text-secondary font-medium italic">&quot;The only true wisdom is in knowing you know nothing.&quot; — Socrates</p>
                </div>
             </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 blur-2xl rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 blur-2xl rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
