"use client"
import { useDict } from "@/hooks/useDict"
import { ANIMATION } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import { useRef, useEffect, useState } from "react"
import { Send } from "lucide-react"
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

export const Ask = () => {
  const { ask } = useDict()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/ask' }),
  })
  const isLoading = status === 'streaming' || status === 'submitted'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <motion.article {...ANIMATION} className="my-16 flex flex-col items-center px-4 w-full max-w-md mx-auto">
      <h2 className="mb-10 sm:mb-16 text-xl text-center sm:text-5xl text-foreground">{ask}</h2>

      {messages.length > 0 && (
        <div className="w-full mb-4 flex flex-col gap-3 max-h-[400px] overflow-y-auto px-1">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-foreground text-background rounded-br-sm'
                    : 'bg-accent text-foreground rounded-bl-sm border border-border'
                }`}>
                  {msg.parts.filter(p => p.type === 'text').map((p, i) => p.type === 'text' ? <span key={i}>{p.text}</span> : null)}
                </div>
              </div>
            ))}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-accent border border-border px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground block"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-background focus-within:border-ring transition-colors">
        <input
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          placeholder="Ask anything about Lenix..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </motion.article>
  )
}