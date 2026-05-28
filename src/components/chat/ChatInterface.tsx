"use client"

import { useChatStore } from "@/store/useChatStore"
import { useAuthStore } from "@/store/useAuthStore"
import { mentors } from "@/data/mentors"
import { useChatStream } from "@/hooks/use-chat-stream"
import { calculateScoreIncrement, updateWisdomScores } from "@/lib/scoring"
import ChatSidebar from "./ChatSidebar"
import MessageList from "./MessageList"
import ChatInput from "./ChatInput"
import { Message } from "@/types"
import { useEffect, useState } from "react"

export default function ChatInterface() {
  const { activeMentorId, sessions, addMessage } = useChatStore()
  const { user, updateUser } = useAuthStore()
  const { streamCompletion, isTyping } = useChatStream()
  const [streamingContent, setStreamingContent] = useState("")

  const mentor = mentors.find(m => m.id === activeMentorId) || mentors[0]
  const session = sessions[mentor.id] || { messages: [] }

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    }

    addMessage(mentor.id, userMessage)

    let fullResponse = ""
    setStreamingContent("")

    await streamCompletion(
      [...session.messages, userMessage].map(m => ({ role: m.role, content: m.content })),
      mentor.systemPrompt,
      (chunk) => {
        fullResponse += chunk
        setStreamingContent(fullResponse)
      }
    )

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: fullResponse,
      timestamp: Date.now()
    }

    addMessage(mentor.id, assistantMessage)
    setStreamingContent("")

    // Update Wisdom Score
    if (user) {
      const increment = calculateScoreIncrement(fullResponse)
      const newScores = updateWisdomScores(user.wisdomScores, mentor.category, increment)
      updateUser({ wisdomScores: newScores })
    }
  }

  // Combine static messages with streaming content
  const displayMessages = [...session.messages]
  if (streamingContent) {
    displayMessages.push({
      id: 'streaming',
      role: 'assistant',
      content: streamingContent,
      timestamp: Date.now()
    })
  }

  return (
    <div className="flex h-screen bg-secondary-background overflow-hidden">
      <ChatSidebar />
      <div className="flex-1 flex flex-col h-full bg-background relative">
        <div className="h-16 border-b border-border bg-white flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
             <div className="lg:hidden h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {mentor.name.charAt(0)}
             </div>
             <div>
                <h3 className="font-bold text-text-primary leading-none">{mentor.name}</h3>
                <p className="text-[10px] text-text-secondary mt-1">{mentor.role}</p>
             </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-text-secondary font-medium">Mentor Online</span>
          </div>
        </div>

        <MessageList
          messages={displayMessages}
          isTyping={isTyping && !streamingContent}
          mentorName={mentor.name}
        />

        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  )
}
