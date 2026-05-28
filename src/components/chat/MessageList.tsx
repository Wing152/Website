"use client"

import { Message } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"
import { MessageSquare } from "lucide-react"

interface MessageListProps {
  messages: Message[]
  isTyping?: boolean
  mentorName: string
}

export default function MessageList({ messages, isTyping, mentorName }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-4">
            <MessageSquare size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Begin your conversation</h3>
          <p className="text-text-secondary text-sm">
            Ask {mentorName} for advice, perspective, or guidance on your current goals.
          </p>
        </div>
      )}

      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex w-full",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[80%] rounded-2xl p-4 shadow-sm",
              message.role === 'user'
                ? "bg-primary text-white"
                : "bg-white border border-border text-text-primary"
            )}>
              {message.role === 'assistant' && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{mentorName}</p>
              )}
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
              <p className={cn(
                "text-[10px] mt-2 opacity-50",
                message.role === 'user' ? "text-right" : "text-left"
              )}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-border rounded-2xl p-4 flex space-x-1">
              <div className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-text-secondary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
