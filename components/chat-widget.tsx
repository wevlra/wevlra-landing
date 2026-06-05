"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  RotateCcw,
  Minus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Halo! 👋 Saya asisten virtual WEVLRA. Ada yang ingin Anda tanyakan tentang layanan pembuatan website, aplikasi mobile, atau aplikasi desktop kami?",
}

const QUICK_QUESTIONS = [
  "Berapa harga website?",
  "Berapa lama prosesnya?",
  "Apa saja fitur yang didapat?",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  const scrollViewportRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const viewport = scrollViewportRef.current
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight
      }
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setHasUnread(false)
      return !prev
    })
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: content.trim(),
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setInput("")
      setIsStreaming(true)

      const contextMessages = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }))

      const controller = new AbortController()
      abortControllerRef.current = controller

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: contextMessages }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(errorData?.error ?? `Error ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error("No stream available")

        const decoder = new TextDecoder()
        let buffer = ""
        let shouldBreak = false

        while (true) {
          const { done, value } = await reader.read()
          if (done || shouldBreak) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() ?? ""

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith("data: ")) continue

            const data = trimmed.slice(6)
            if (data === "[DONE]") {
              shouldBreak = true
              break
            }

            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta?.content
              if (delta) {
                setMessages((prev) => {
                  const updated = [...prev]
                  const last = updated[updated.length - 1]
                  if (last.role === "assistant") {
                    updated[updated.length - 1] = {
                      ...last,
                      content: last.content + delta,
                    }
                  }
                  return updated
                })
              }
            } catch {}
          }
        }

        if (!isOpen) setHasUnread(true)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return

        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last.role === "assistant" && !last.content) {
            updated[updated.length - 1] = {
              ...last,
              content:
                "Maaf, terjadi kesalahan. Silakan coba lagi nanti atau hubungi kami via WhatsApp. 🙏",
            }
          }
          return updated
        })
      } finally {
        setIsStreaming(false)
        abortControllerRef.current = null
      }
    },
    [isStreaming, messages, isOpen]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const resetChat = () => {
    abortControllerRef.current?.abort()
    setMessages([WELCOME_MESSAGE])
    setIsStreaming(false)
    setInput("")
  }

  return (
    <TooltipProvider>
      <div
        ref={widgetRef}
        className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
      >
        {/* Chat Panel */}
        <div
          className={cn(
            "chat-widget-panel origin-bottom-right transition-all duration-300 ease-out",
            isOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          )}
        >
          <Card className="chat-widget-card flex w-[calc(100vw-2rem)] flex-col overflow-hidden shadow-lg sm:w-[400px]">
            {/* Header */}
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="font-semibold">WEVLRA Assistant</CardTitle>
              <div className="flex items-center gap-0.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={resetChat}
                      aria-label="Reset chat"
                    >
                      <RotateCcw className="size-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Reset chat</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setIsOpen(false)}
                      aria-label="Tutup chat"
                    >
                      <Minus className="size-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Tutup</TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea
                viewportRef={scrollViewportRef}
                className="h-[350px] sm:h-[400px]"
              >
                <div className="flex flex-col gap-3 p-4">
                  {messages.map((msg) =>
                    msg.content ? (
                      <ChatBubble key={msg.id} message={msg} />
                    ) : null
                  )}

                  {/* Typing indicator */}
                  {isStreaming &&
                    messages[messages.length - 1]?.content === "" && (
                      <div className="flex items-start gap-2.5">
                        <Avatar size="sm">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                            <Bot className="size-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-2xl rounded-tl-sm bg-muted/60 px-3.5 py-2.5">
                          <div className="chat-typing-dots flex gap-1">
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Quick questions (only after welcome) */}
                  {messages.length === 1 && !isStreaming && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Pertanyaan populer:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_QUESTIONS.map((q) => (
                          <Badge
                            key={q}
                            variant="outline"
                            className="cursor-pointer px-2.5 py-1 text-[11px] transition-colors hover:bg-primary/10 hover:text-primary"
                            onClick={() => sendMessage(q)}
                          >
                            {q}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="-mt-4">
              <form
                onSubmit={handleSubmit}
                className="flex w-full items-center gap-2"
              >
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tulis pesan..."
                  rows={1}
                  disabled={isStreaming}
                  className="max-h-24 min-h-9 flex-1 resize-none rounded-xl border-border/60 bg-muted/30 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={!input.trim() || isStreaming}
                      className="shrink-0 rounded-xl"
                      aria-label="Kirim pesan"
                    >
                      <Send className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Kirim</TooltipContent>
                </Tooltip>
              </form>
            </CardFooter>
          </Card>
        </div>

        {/* Floating Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon-lg"
              onClick={toggleOpen}
              className={cn(
                "chat-widget-fab relative size-14 rounded-full shadow-md transition-all duration-300 hover:shadow-lg",
                isOpen && "rotate-0"
              )}
              aria-label={isOpen ? "Tutup chat" : "Buka chat"}
            >
              <MessageCircle
                className={cn(
                  "absolute size-6 transition-all duration-300",
                  isOpen
                    ? "scale-0 rotate-90 opacity-0"
                    : "scale-100 rotate-0 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute size-6 transition-all duration-300",
                  isOpen
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-0 -rotate-90 opacity-0"
                )}
              />

              {/* Unread badge */}
              {hasUnread && !isOpen && (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {isOpen ? "Tutup chat" : "Chat dengan kami"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

/* ─── Chat Bubble ─── */
function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex items-start gap-2.5",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar size="sm" className="mt-0.5 shrink-0">
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-foreground/10 text-foreground"
              : "bg-gradient-to-br from-primary/20 to-primary/10 text-primary"
          )}
        >
          {isUser ? <User className="size-3" /> : <Bot className="size-3" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-muted/60 text-foreground"
        )}
      >
        <ChatContent content={message.content} isUser={isUser} />
      </div>
    </div>
  )
}

/* ─── Render content with Markdown support ─── */
function ChatContent({
  content,
  isUser = false,
}: {
  content: string
  isUser?: boolean
}) {
  if (!content) return null

  // Split content into blocks by double newlines (paragraphs/lists/code blocks)
  const blocks = content.split(/\n\n+/)

  return (
    <div className="space-y-2">
      {blocks.map((block, blockIndex) => {
        // Code block
        if (block.startsWith("```")) {
          const lines = block.split("\n")
          const hasEnd = block.endsWith("```") && lines.length > 1
          const code = lines.slice(1, hasEnd ? -1 : undefined).join("\n")
          return (
            <pre
              key={blockIndex}
              className={cn(
                "my-1.5 overflow-x-auto rounded-lg border p-2.5 font-mono text-xs",
                isUser
                  ? "border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground"
                  : "border-border/40 bg-muted-foreground/10 text-foreground"
              )}
            >
              <code>{code}</code>
            </pre>
          )
        }

        // Check if list
        const lines = block.split("\n")
        const isList =
          lines.length > 0 &&
          lines.every((line) => {
            const trimmed = line.trim()
            return (
              trimmed === "" ||
              trimmed.startsWith("- ") ||
              trimmed.startsWith("* ") ||
              /^\d+\.\s/.test(trimmed)
            )
          }) &&
          lines.some((line) => {
            const trimmed = line.trim()
            return (
              trimmed.startsWith("- ") ||
              trimmed.startsWith("* ") ||
              /^\d+\.\s/.test(trimmed)
            )
          })

        if (isList) {
          const firstNonEmpty = lines.find((l) => l.trim() !== "")
          const isOrdered = firstNonEmpty
            ? /^\d+\.\s/.test(firstNonEmpty.trim())
            : false
          const ListTag = isOrdered ? "ol" : "ul"
          return (
            <ListTag
              key={blockIndex}
              className={cn(
                "my-1.5 space-y-1 pl-5",
                isOrdered ? "list-decimal text-left" : "list-disc text-left"
              )}
            >
              {lines.map((line, lineIndex) => {
                const trimmed = line.trim()
                if (trimmed === "") return null
                const cleanText = line.replace(/^\s*(-\s|\*\s|\d+\.\s)/, "")
                return (
                  <li key={lineIndex} className="leading-relaxed">
                    {renderInlineMarkdown(cleanText, isUser)}
                  </li>
                )
              })}
            </ListTag>
          )
        }

        // Headings
        if (block.startsWith("#")) {
          const match = block.match(/^(#{1,6})\s+(.*)$/)
          if (match) {
            const level = match[1].length
            const text = match[2]
            const classes = cn(
              "my-1.5 text-left font-bold",
              isUser ? "text-primary-foreground" : "text-foreground",
              level === 1 && "text-base",
              level === 2 && "text-sm",
              level >= 3 && "text-xs font-semibold"
            )
            const HeadingTag =
              level === 1
                ? "h1"
                : level === 2
                  ? "h2"
                  : level === 3
                    ? "h3"
                    : "h4"
            return (
              <HeadingTag key={blockIndex} className={classes}>
                {renderInlineMarkdown(text, isUser)}
              </HeadingTag>
            )
          }
        }

        // Plain paragraph
        return (
          <p key={blockIndex} className="text-left leading-relaxed">
            {renderInlineMarkdown(block, isUser)}
          </p>
        )
      })}
    </div>
  )
}

function renderInlineMarkdown(text: string, isUser: boolean) {
  // Split by bold, italic, inline code, and links
  const parts = text.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  )

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      )
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className={cn(
            "rounded border px-1.5 py-0.5 font-mono text-xs",
            isUser
              ? "border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground"
              : "border-border/40 bg-muted-foreground/10 text-foreground"
          )}
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (match) {
        const linkText = match[1]
        const linkUrl = match[2]
        return (
          <a
            key={i}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "underline transition-colors",
              isUser
                ? "text-primary-foreground/90 hover:text-primary-foreground"
                : "text-primary hover:text-primary/80"
            )}
          >
            {linkText}
          </a>
        )
      }
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {renderTextWithAutoLinks(line, isUser)}
        {j < arr.length - 1 && <br />}
      </span>
    ))
  })
}

function renderTextWithAutoLinks(text: string, isUser: boolean) {
  // Regex to detect:
  // 1. URLs (excluding trailing punctuation)
  // 2. Email addresses
  // 3. Phone numbers (Indonesian mobile: 08xx/+628xx, landlines: 021xx/+6221xx, or general international numbers)
  const regex =
    /(https?:\/\/[^\s/$.?#].[^\s]*?(?=[.,?!:;()]?(\s|$))|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+?62\s?8\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}|08\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}|\+?62[-\s]?2[1-9][-\s]?\d{3,4}[-\s]?\d{3,4}|02[1-9][-\s]?\d{3,4}[-\s]?\d{3,4})/g
  const parts = text.split(regex)

  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "break-all underline transition-colors",
            isUser
              ? "text-primary-foreground/90 hover:text-primary-foreground"
              : "text-primary hover:text-primary/80"
          )}
        >
          {part}
        </a>
      )
    }
    if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className={cn(
            "break-all underline transition-colors",
            isUser
              ? "text-primary-foreground/90 hover:text-primary-foreground"
              : "text-primary hover:text-primary/80"
          )}
        >
          {part}
        </a>
      )
    }
    if (
      /^(\+?62\s?8\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}|08\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}|\+?62[-\s]?2[1-9][-\s]?\d{3,4}[-\s]?\d{3,4}|02[1-9][-\s]?\d{3,4}[-\s]?\d{3,4})$/.test(
        part
      )
    ) {
      const cleanNumber = part.replace(/[-\s]/g, "")
      const dialNumber = cleanNumber.startsWith("0")
        ? "+62" + cleanNumber.slice(1)
        : cleanNumber.startsWith("+")
          ? cleanNumber
          : "+" + cleanNumber

      return (
        <a
          key={i}
          href={`tel:${dialNumber}`}
          className={cn(
            "break-all underline transition-colors",
            isUser
              ? "text-primary-foreground/90 hover:text-primary-foreground"
              : "text-primary hover:text-primary/80"
          )}
        >
          {part}
        </a>
      )
    }
    return part
  })
}
