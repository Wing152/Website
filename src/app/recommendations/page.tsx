"use client"

import { mentors } from "@/data/mentors"
import { useChatStore } from "@/store/useChatStore"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/layout/Navbar"

export default function RecommendationsPage() {
  const router = useRouter()
  const setActiveMentor = useChatStore(state => state.setActiveMentor)
  const [recommendations, setRecommendations] = useState<any>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('valen-recommendations')
    if (data) {
      setRecommendations(JSON.parse(data))
    } else {
      // Fallback
      setRecommendations({
        recommendedMentorIds: ['marcus-aurelius', 'leonardo-da-vinci', 'marie-curie'],
        reasoning: "Based on your pursuit of excellence and growth."
      })
    }
  }, [])

  const handleStartChat = (mentorId: string) => {
    setActiveMentor(mentorId)
    router.push('/chat')
  }

  if (!recommendations) return null

  const displayMentors = mentors.filter(m => recommendations.recommendedMentorIds.includes(m.id))

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Your Personalized Council</h1>
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 max-w-3xl mx-auto">
             <p className="text-lg text-primary font-medium italic">
               &quot;{recommendations.reasoning}&quot;
             </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full overflow-hidden flex flex-col hover:shadow-xl transition-shadow border-border/60">
                <div className="h-48 bg-secondary-background relative">
                   <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                      <span className="text-7xl opacity-10 font-bold">{mentor.name.charAt(0)}</span>
                   </div>
                   <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="px-3 py-1">{mentor.category}</Badge>
                   </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-1">{mentor.name}</h3>
                  <p className="text-primary font-medium mb-4">{mentor.role}</p>

                  <p className="text-text-secondary text-sm mb-8 line-clamp-4">
                    {mentor.description}
                  </p>

                  <div className="mt-auto">
                    <Button
                      className="w-full h-12 text-base font-bold"
                      onClick={() => handleStartChat(mentor.id)}
                    >
                      Start Conversation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
