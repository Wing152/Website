"use client"

import { mentors } from "@/data/mentors"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function MentorShowcase() {
  return (
    <section id="mentors" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Your Council Awaits</h2>
            <p className="text-text-secondary">
              Choose from a diverse array of legendary thinkers, each with their own unique perspective and area of expertise.
            </p>
          </div>
          <Link href="/signup">
            <Button variant="outline">View All Mentors</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.slice(0, 3).map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden h-full group">
                <div className="h-48 bg-secondary-background relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                      <span className="text-6xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-500">
                         {mentor.name.charAt(0)}
                      </span>
                   </div>
                   <div className="absolute bottom-4 left-4">
                      <Badge variant="accent">{mentor.category}</Badge>
                   </div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                  <p className="text-sm text-primary font-medium mb-4">{mentor.role}</p>
                  <p className="text-text-secondary text-sm mb-6 line-clamp-3">
                    {mentor.description}
                  </p>
                  <Link href={`/signup`}>
                    <Button className="w-full">Start Conversation</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
