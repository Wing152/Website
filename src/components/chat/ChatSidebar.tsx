"use client"

import { mentors } from "@/data/mentors"
import { useChatStore } from "@/store/useChatStore"
import { cn } from "@/lib/utils"
import { MessageSquare, ChevronLeft, Trash2 } from "lucide-react"
import Link from "next/link"

export default function ChatSidebar() {
  const { activeMentorId, setActiveMentor, clearHistory } = useChatStore()

  return (
    <div className="w-80 border-r border-border bg-white flex flex-col h-full hidden lg:flex">
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-6">
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
        <h2 className="text-xl font-bold">Your Council</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {mentors.map((mentor) => (
          <button
            key={mentor.id}
            onClick={() => setActiveMentor(mentor.id)}
            className={cn(
              "w-full flex items-center p-3 rounded-xl transition-all text-left group",
              activeMentorId === mentor.id
                ? "bg-primary/5 border border-primary/20"
                : "hover:bg-secondary-background border border-transparent"
            )}
          >
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center mr-3 font-bold",
              activeMentorId === mentor.id ? "bg-primary text-white" : "bg-secondary-background text-text-secondary"
            )}>
              {mentor.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-bold truncate",
                activeMentorId === mentor.id ? "text-primary" : "text-text-primary"
              )}>
                {mentor.name}
              </p>
              <p className="text-xs text-text-secondary truncate">{mentor.role}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearHistory(mentor.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-accent transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <div className="bg-secondary-background rounded-xl p-4">
          <div className="flex items-center space-x-2 text-primary mb-2">
            <MessageSquare size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">AI Insight</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Switch between mentors to get different perspectives on your current challenges.
          </p>
        </div>
      </div>
    </div>
  )
}
