"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Send, Sparkles } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput("")
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="p-4 border-t border-border bg-white">
      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="w-full pl-4 pr-16 py-3 rounded-2xl border border-border bg-secondary-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none min-h-[52px] max-h-40 overflow-y-auto"
        />
        <div className="absolute right-2 bottom-2">
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || disabled}
            className="rounded-xl h-9 w-9"
          >
            <Send size={18} />
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-text-secondary px-2">
          <div className="flex items-center space-x-1">
            <Sparkles size={10} className="text-primary" />
            <span>AI Mentor is active</span>
          </div>
          <span>Shift + Enter for new line</span>
        </div>
      </form>
    </div>
  )
}
