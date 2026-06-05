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
    try {
      const saved = localStorage.getItem("wevlra_chat_history")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setMessages(parsed)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    if (messages.length === 1 && messages[0].id === WELCOME_MESSAGE.id) {
      localStorage.removeItem("wevlra_chat_history")
      return
    }
    try {
      localStorage.setItem("wevlra_chat_history", JSON.stringify(messages))
    } catch (err) {
      console.error(err)
    }
  }, [messages])

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
        "flex w-full min-w-0 items-start gap-2.5",
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
          "max-w-[80%] min-w-0 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words",
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

type BlockType =
  | "paragraph"
  | "code"
  | "list"
  | "heading"
  | "table"
  | "blockquote"
  | "hr"

interface Block {
  type: BlockType
  lines: string[]
  listType?: "ol" | "ul"
}

function parseBlocks(content: string): Block[] {
  const lines = content.split("\n")
  const blocks: Block[] = []

  let currentBlock: Block | null = null
  let inCodeBlock = false
  let codeLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        codeLines.push(line)
        blocks.push({
          type: "code",
          lines: [...codeLines],
        })
        codeLines = []
        inCodeBlock = false
        currentBlock = null
      } else {
        if (currentBlock) {
          blocks.push(currentBlock)
        }
        inCodeBlock = true
        codeLines.push(line)
        currentBlock = null
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      if (currentBlock) {
        blocks.push(currentBlock)
      }
      blocks.push({
        type: "hr",
        lines: [line],
      })
      currentBlock = null
      continue
    }

    if (trimmed.startsWith(">")) {
      if (currentBlock && currentBlock.type === "blockquote") {
        currentBlock.lines.push(line)
      } else {
        if (currentBlock) {
          blocks.push(currentBlock)
        }
        currentBlock = {
          type: "blockquote",
          lines: [line],
        }
      }
      continue
    }

    if (trimmed.startsWith("#")) {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      blocks.push({
        type: "heading",
        lines: [line],
      })
      continue
    }

    if (trimmed.startsWith("|")) {
      if (currentBlock && currentBlock.type === "table") {
        currentBlock.lines.push(line)
        continue
      }
      const nextLine = lines[i + 1]
      const nextTrimmed = nextLine ? nextLine.trim() : ""
      const isSeparator = /^\|?(?:\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(
        nextTrimmed
      )
      if (isSeparator) {
        if (currentBlock) {
          blocks.push(currentBlock)
        }
        currentBlock = {
          type: "table",
          lines: [line],
        }
        continue
      }
    }

    const isUnordered = trimmed.startsWith("- ") || trimmed.startsWith("* ")
    const isOrdered = /^\d+\.\s/.test(trimmed)

    if (isUnordered || isOrdered) {
      const listType = isOrdered ? "ol" : "ul"

      if (
        currentBlock &&
        currentBlock.type === "list" &&
        currentBlock.listType === listType
      ) {
        currentBlock.lines.push(line)
      } else {
        if (currentBlock) {
          blocks.push(currentBlock)
        }
        currentBlock = {
          type: "list",
          listType,
          lines: [line],
        }
      }
      continue
    }

    if (trimmed === "") {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      continue
    }

    if (currentBlock && currentBlock.type === "paragraph") {
      currentBlock.lines.push(line)
    } else {
      if (currentBlock) {
        blocks.push(currentBlock)
      }
      currentBlock = {
        type: "paragraph",
        lines: [line],
      }
    }
  }

  if (inCodeBlock && codeLines.length > 0) {
    blocks.push({
      type: "code",
      lines: codeLines,
    })
  } else if (currentBlock) {
    blocks.push(currentBlock)
  }

  return blocks
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

  const blocks = parseBlocks(content)

  return (
    <div className="space-y-2">
      {blocks.map((block, blockIndex) => {
        if (block.type === "code") {
          const hasStart = block.lines[0]?.trim().startsWith("```")
          const hasEnd =
            block.lines.length > 1 &&
            block.lines[block.lines.length - 1]?.trim().startsWith("```")
          const code = block.lines
            .slice(hasStart ? 1 : 0, hasEnd ? -1 : undefined)
            .join("\n")
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

        if (block.type === "hr") {
          return (
            <hr
              key={blockIndex}
              className={cn(
                "my-4 border-t",
                isUser ? "border-primary-foreground/20" : "border-border/40"
              )}
            />
          )
        }

        if (block.type === "blockquote") {
          const blockquoteContent = block.lines
            .map((line) => line.trim().replace(/^>\s?/, ""))
            .join("\n")
          return (
            <blockquote
              key={blockIndex}
              className={cn(
                "my-2 border-l-4 pl-3 text-left text-sm italic",
                isUser
                  ? "border-primary-foreground/30 text-primary-foreground/80"
                  : "border-border/40 text-muted-foreground"
              )}
            >
              {renderInlineMarkdown(blockquoteContent, isUser)}
            </blockquote>
          )
        }

        if (block.type === "table") {
          const rows = block.lines.map((line) => {
            const trimmed = line.trim()
            const contentVal = trimmed.replace(/^\|/, "").replace(/\|$/, "")
            return contentVal.split("|").map((cell) => cell.trim())
          })
          const headers = rows[0] || []
          const separators = rows[1] || []
          const dataRows = rows.slice(2)

          const alignments = separators.map((cell) => {
            const c = cell.trim()
            if (c.startsWith(":") && c.endsWith(":")) return "center"
            if (c.endsWith(":")) return "right"
            return "left"
          })

          const getAlignClass = (index: number) => {
            const align = alignments[index] || "left"
            if (align === "center") return "text-center"
            if (align === "right") return "text-right"
            return "text-left"
          }

          return (
            <div
              key={blockIndex}
              className="my-3 overflow-x-auto rounded-lg border border-border/40"
            >
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr
                    className={cn(
                      "border-b font-semibold",
                      isUser
                        ? "border-primary-foreground/20 bg-primary-foreground/10"
                        : "border-border/40 bg-muted/50"
                    )}
                  >
                    {headers.map((header, i) => (
                      <th
                        key={i}
                        className={cn("p-2 font-semibold", getAlignClass(i))}
                      >
                        {renderInlineMarkdown(header, isUser)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={cn(
                        "border-b last:border-0",
                        isUser
                          ? "border-primary-foreground/10 hover:bg-primary-foreground/5"
                          : "border-border/40 hover:bg-muted/30",
                        rowIndex % 2 === 1 &&
                          (isUser ? "bg-primary-foreground/5" : "bg-muted/20")
                      )}
                    >
                      {headers.map((_, colIndex) => {
                        const cellValue = row[colIndex] || ""
                        return (
                          <td
                            key={colIndex}
                            className={cn("p-2", getAlignClass(colIndex))}
                          >
                            {renderInlineMarkdown(cellValue, isUser)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        if (block.type === "list") {
          const ListTag = block.listType === "ol" ? "ol" : "ul"
          return (
            <ListTag
              key={blockIndex}
              className={cn(
                "my-1.5 space-y-1 pl-5",
                block.listType === "ol"
                  ? "list-decimal text-left"
                  : "list-disc text-left"
              )}
            >
              {block.lines.map((line, lineIndex) => {
                const cleanText = line.replace(/^\s*(-\s|\*\s|\d+\.\s)/, "")
                const taskMatch = cleanText.match(/^\[([ xX])\]\s*(.*)/)
                if (taskMatch) {
                  const isChecked = taskMatch[1].toLowerCase() === "x"
                  const remainingText = taskMatch[2] || ""
                  return (
                    <li
                      key={lineIndex}
                      className="-ml-5 flex list-none items-start gap-2 leading-relaxed"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className={cn(
                          "mt-1.5 h-3.5 w-3.5 shrink-0 rounded border-gray-300 bg-zinc-100 text-primary focus:ring-primary focus:ring-offset-background dark:border-zinc-700 dark:bg-zinc-800",
                          isUser && "accent-primary-foreground"
                        )}
                      />
                      <span>{renderInlineMarkdown(remainingText, isUser)}</span>
                    </li>
                  )
                }
                return (
                  <li key={lineIndex} className="leading-relaxed">
                    {renderInlineMarkdown(cleanText, isUser)}
                  </li>
                )
              })}
            </ListTag>
          )
        }

        if (block.type === "heading") {
          const line = block.lines[0] || ""
          const match = line.match(/^(#{1,6})\s+(.*)$/)
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

        const text = block.lines.join("\n")
        return (
          <p key={blockIndex} className="text-left leading-relaxed">
            {renderInlineMarkdown(text, isUser)}
          </p>
        )
      })}
    </div>
  )
}

function renderInlineMarkdown(text: string, isUser: boolean) {
  // Split by bold, italic, strikethrough, inline code, and links
  const parts = text.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
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
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return (
        <span key={i} className="line-through opacity-70">
          {part.slice(2, -2)}
        </span>
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
        let linkUrl = match[2].trim()

        // Strip mailto: from linkText if present
        const displayLinkText = linkText.startsWith("mailto:")
          ? linkText.slice(7)
          : linkText

        // Prepend mailto: to email urls that don't have it
        if (
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(linkUrl) &&
          !linkUrl.startsWith("mailto:") &&
          !linkUrl.startsWith("http")
        ) {
          linkUrl = `mailto:${linkUrl}`
        }

        const isMailtoOrTel =
          linkUrl.startsWith("mailto:") || linkUrl.startsWith("tel:")

        return (
          <a
            key={i}
            href={linkUrl}
            target={isMailtoOrTel ? undefined : "_blank"}
            rel={isMailtoOrTel ? undefined : "noopener noreferrer"}
            className={cn(
              "underline transition-colors",
              isUser
                ? "text-primary-foreground/90 hover:text-primary-foreground"
                : "text-primary hover:text-primary/80"
            )}
          >
            {displayLinkText}
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
  // 2. Email addresses (with optional mailto: prefix)
  // 3. Phone numbers (Indonesian mobile: 08xx/+628xx, landlines: 021xx/+6221xx, or general international numbers)
  const regex =
    /(https?:\/\/[^\s/$.?#].[^\s]*?(?=[.,?!:;()]?(\s|$))|(?:mailto:)?[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+?62\s?8\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}|08\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}|\+?62[-\s]?2[1-9][-\s]?\d{3,4}[-\s]?\d{3,4}|02[1-9][-\s]?\d{3,4}[-\s]?\d{3,4})/g
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
    if (
      /(?:mailto:)?[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(part)
    ) {
      const email = part.startsWith("mailto:") ? part.slice(7) : part
      return (
        <a
          key={i}
          href={`mailto:${email}`}
          className={cn(
            "break-all underline transition-colors",
            isUser
              ? "text-primary-foreground/90 hover:text-primary-foreground"
              : "text-primary hover:text-primary/80"
          )}
        >
          {email}
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
