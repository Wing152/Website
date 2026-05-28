"use client"

import { Progress } from "@/components/ui/Progress"
import { WisdomScores } from "@/types"
import { motion } from "framer-motion"

interface WisdomScoreCardProps {
  scores: WisdomScores
}

export default function WisdomScoreCard({ scores }: WisdomScoreCardProps) {
  const categories = Object.entries(scores) as [keyof WisdomScores, number][]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {categories.map(([category, score], index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">{category}</span>
            <span className="text-lg font-bold text-primary">{score.toFixed(1)}</span>
          </div>
          <Progress value={score * 10} className="h-1.5" />
          <p className="text-[10px] text-text-secondary mt-3 italic">
            {score < 3 ? "Beginner" : score < 7 ? "Intermediate" : "Master"} Level
          </p>
        </motion.div>
      ))}
    </div>
  )
}
