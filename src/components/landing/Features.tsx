"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { motion } from "framer-motion"
import { MessageSquare, Zap, Target, BookOpen, TrendingUp, Users } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Legendary Personalities",
    description: "Chat with meticulously crafted AI versions of history's greatest thinkers."
  },
  {
    icon: Zap,
    title: "Real-time Intelligence",
    description: "Powered by Llama 3 and Groq for lightning-fast, intelligent responses."
  },
  {
    icon: Target,
    title: "Personalized Coaching",
    description: "AI that adapts to your specific goals, struggles, and ambitions."
  },
  {
    icon: BookOpen,
    title: "Wisdom Score",
    description: "Track your intellectual growth across different domains of knowledge."
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Visual dashboards that show your evolution and interaction patterns."
  },
  {
    icon: Users,
    title: "Multi-Mentor Council",
    description: "Build your own board of directors from across time and space."
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-secondary-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Engineered for Growth</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Valen combines state-of-the-art AI with the timeless wisdom of history&apos;s greatest minds to accelerate your personal and professional evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
