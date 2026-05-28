"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { useChatStore } from "@/store/useChatStore"
import { mentors } from "@/data/mentors"
import Navbar from "@/components/layout/Navbar"
import WisdomScoreCard from "@/components/dashboard/WisdomScoreCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import Link from "next/link"
import { MessageSquare, Trophy, Calendar, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { sessions } = useChatStore()

  if (!user) return null

  const activeSessions = Object.values(sessions).sort((a, b) => b.lastUpdated - a.lastUpdated)
  const recentMentors = activeSessions.map(s => mentors.find(m => m.id === s.mentorId)).filter(Boolean)

  return (
    <main className="min-h-screen bg-secondary-background/30 pb-20">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-2">Welcome back, {user.name}</h1>
          <p className="text-text-secondary">Your personal growth journey is in progress. Continue your conversations.</p>
        </motion.div>

        {/* Wisdom Scores */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className="text-accent" size={20} />
            <h2 className="text-xl font-bold">Wisdom Levels</h2>
          </div>
          <WisdomScoreCard scores={user.wisdomScores} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Conversations */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-2">
                 <MessageSquare className="text-primary" size={20} />
                 <h2 className="text-xl font-bold">Recent Mentors</h2>
               </div>
               {recentMentors.length > 0 && (
                 <Link href="/chat" className="text-sm text-primary font-medium hover:underline">View all</Link>
               )}
            </div>

            {recentMentors.length > 0 ? (
              <div className="space-y-4">
                {recentMentors.slice(0, 3).map((mentor, index) => (
                  <motion.div
                    key={mentor?.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:border-primary/30 transition-all cursor-pointer overflow-hidden group">
                      <CardContent className="p-0">
                        <Link href="/chat" className="flex items-center p-6">
                           <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">
                              {mentor?.name.charAt(0)}
                           </div>
                           <div className="flex-1">
                              <h3 className="font-bold text-lg">{mentor?.name}</h3>
                              <p className="text-sm text-text-secondary">{mentor?.role}</p>
                           </div>
                           <ArrowRight size={20} className="text-text-secondary group-hover:text-primary transition-colors group-hover:translate-x-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="bg-white border-dashed border-2 flex flex-col items-center justify-center py-12 text-center">
                 <div className="w-16 h-16 rounded-full bg-secondary-background flex items-center justify-center mb-4">
                    <MessageSquare size={24} className="text-text-secondary" />
                 </div>
                 <h3 className="font-bold mb-2">No active conversations</h3>
                 <p className="text-sm text-text-secondary mb-6 max-w-xs mx-auto">
                    Start your first conversation with a mentor to begin your journey.
                 </p>
                 <Link href="/recommendations">
                    <Button>Explore Mentors</Button>
                 </Link>
              </Card>
            )}
          </div>

          {/* Activity & Stats */}
          <div className="space-y-6">
             <div className="flex items-center space-x-2">
                <Calendar className="text-secondary" size={20} />
                <h2 className="text-xl font-bold">Activity</h2>
             </div>
             <Card>
                <CardHeader>
                   <CardTitle className="text-base">Progress Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-start space-x-4">
                      <div className="h-2 w-2 rounded-full bg-success mt-1.5" />
                      <div>
                         <p className="text-sm font-medium">Account Created</p>
                         <p className="text-xs text-text-secondary">Your journey began today</p>
                      </div>
                   </div>
                   <div className="flex items-start space-x-4">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                      <div>
                         <p className="text-sm font-medium">Onboarding Completed</p>
                         <p className="text-xs text-text-secondary">Personality profile synthesized</p>
                      </div>
                   </div>
                   {recentMentors.length > 0 && (
                      <div className="flex items-start space-x-4">
                         <div className="h-2 w-2 rounded-full bg-accent mt-1.5" />
                         <div>
                            <p className="text-sm font-medium">First Discussion</p>
                            <p className="text-xs text-text-secondary">You started exploring wisdom</p>
                         </div>
                      </div>
                   )}
                </CardContent>
             </Card>

             <Card className="bg-primary text-white">
                <CardContent className="p-6">
                   <h3 className="font-bold mb-2">Daily Quote</h3>
                   <p className="text-sm italic opacity-90 leading-relaxed">
                      &quot;Waste no more time arguing about what a good man should be. Be one.&quot; — Marcus Aurelius
                   </p>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
