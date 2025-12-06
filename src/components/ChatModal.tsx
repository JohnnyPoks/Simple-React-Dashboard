import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Send,
  Loader2,
  MessageSquare,
  Bot,
  User,
  RefreshCw,
  Check,
  AlertCircle,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Message Types
interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "support";
  timestamp: Date;
  status: "sending" | "sent" | "failed";
  tempId?: string;
}

// Dummy auto-reply messages
const autoReplies = [
  "Thanks for reaching out! I'm reviewing your message and will get back to you shortly.",
  "Great question! Let me look into that for you.",
  "I understand your concern. Our team is here to help!",
  "That's a common question. Here's what you need to know...",
  "Thanks for your patience! I'm checking our resources for the best answer.",
  "I appreciate you bringing this to our attention. Let me investigate.",
  "Good news! I have some helpful information for you.",
  "I'm here to assist you with that. Let me explain...",
];

// Initial dummy messages
const initialMessages: ChatMessage[] = [
  {
    id: "msg-1",
    content: "Hi there! 👋 Welcome to TradingBot support. How can I help you today?",
    sender: "support",
    timestamp: new Date(Date.now() - 60000),
    status: "sent",
  },
  {
    id: "msg-2",
    content: "I'm John, and I'll be happy to assist you with any questions about trading, account setup, or platform features.",
    sender: "support",
    timestamp: new Date(Date.now() - 55000),
    status: "sent",
  },
];

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);

      // Handle escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
        // Focus trap
        if (e.key === "Tab" && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Generate temporary ID
  const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Auto-reply simulation
  const triggerAutoReply = useCallback(() => {
    setIsTyping(true);

    // Random delay for typing indicator
    const typingDelay = 1500 + Math.random() * 2000;

    setTimeout(() => {
      setIsTyping(false);
      
      // Add auto-reply
      const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      const replyMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        content: randomReply,
        sender: "support",
        timestamp: new Date(),
        status: "sent",
      };

      setMessages((prev) => [...prev, replyMessage]);
    }, typingDelay);
  }, []);
  
  // Simulate sending message with optimistic UI
  const sendMessage = useCallback(async (content: string, tempId?: string) => {
    const messageId = tempId || generateTempId();
    
    // Optimistically add message
    const newMessage: ChatMessage = {
      id: messageId,
      content,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
      tempId: messageId,
    };

    setMessages((prev) => {
      // If retrying, replace the failed message
      if (tempId) {
        return prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "sending" as const } : msg
        );
      }
      return [...prev, newMessage];
    });

    // Simulate API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 90% success rate for demo
          if (Math.random() > 0.1) {
            resolve(true);
          } else {
            reject(new Error("Network error"));
          }
        }, 800 + Math.random() * 400);
      });

      // Update message status to sent
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, id: `msg-${Date.now()}`, status: "sent" as const, tempId: undefined }
            : msg
        )
      );

      // Trigger auto-reply
      triggerAutoReply();
    } catch {
      // Mark message as failed
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "failed" as const } : msg
        )
      );
    }
  }, [triggerAutoReply]);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    sendMessage(inputValue.trim());
    setInputValue("");
  };

  // Handle retry
  const handleRetry = (messageId: string, content: string) => {
    sendMessage(content, messageId);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
    >
      {/* Backdrop - only show when not minimized */}
      {!isMinimized && (
        <div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          "relative w-full bg-background shadow-2xl flex flex-col animate-in duration-200",
          isMinimized 
            ? "fixed bottom-4 right-4 w-80 h-14 rounded-xl fade-in-0 slide-in-from-bottom-2" 
            : "max-w-md h-[600px] max-h-[90vh] rounded-t-2xl sm:rounded-2xl fade-in-0 zoom-in-95"
        )}
        style={{ overflow: 'hidden' }}
      >
        {/* Header */}
        <header className={cn(
          "flex items-center justify-between border-b bg-card shrink-0",
          isMinimized ? "p-2 cursor-pointer" : "p-4"
        )}
        onClick={isMinimized ? () => setIsMinimized(false) : undefined}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className={cn("border-2 border-primary", isMinimized ? "h-8 w-8" : "h-10 w-10")}>
                <AvatarImage src="https://ui-avatars.com/api/?name=Support&background=3b82f6&color=fff" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <span className={cn(
                "absolute bg-green-500 border-2 border-background rounded-full",
                isMinimized ? "bottom-0 right-0 w-2 h-2" : "bottom-0 right-0 w-3 h-3"
              )} />
            </div>
            <div>
              <h2 id="chat-modal-title" className={cn("font-semibold text-foreground", isMinimized && "text-sm")}>
                Live Support
              </h2>
              {!isMinimized && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online now
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              className="h-8 w-8 rounded-full"
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              <Minimize2 className={cn("h-4 w-4 transition-transform", isMinimized && "rotate-180")} />
            </Button>
            {!isMinimized && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </header>

        {/* Messages - hidden when minimized */}
        {!isMinimized && (
          <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0">
            <div className="p-4 space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <Avatar className="h-8 w-8 shrink-0">
                  {message.sender === "support" ? (
                    <>
                      <AvatarImage src="https://ui-avatars.com/api/?name=Sarah&background=3b82f6&color=fff" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        JP
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 mt-1",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px]",
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatTime(message.timestamp)}
                    </span>

                    {/* Status indicators for user messages */}
                    {message.sender === "user" && (
                      <>
                        {message.status === "sending" && (
                          <Loader2 className="h-3 w-3 animate-spin text-primary-foreground/70" />
                        )}
                        {message.status === "sent" && (
                          <Check className="h-3 w-3 text-primary-foreground/70" />
                        )}
                        {message.status === "failed" && (
                          <AlertCircle className="h-3 w-3 text-red-300" />
                        )}
                      </>
                    )}
                  </div>

                  {/* Retry button for failed messages */}
                  {message.status === "failed" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRetry(message.id, message.content)}
                      className="mt-1 h-6 px-2 text-xs text-red-300 hover:text-red-200 hover:bg-red-500/20"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src="https://ui-avatars.com/api/?name=Sarah&background=3b82f6&color=fff" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    JP
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}

        {/* Quick Actions - hidden when minimized */}
        {!isMinimized && (
          <div className="px-4 py-2 border-t bg-muted/30 shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {["Trading Help", "Account Issue", "Technical Support", "Billing"].map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="shrink-0 cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => setInputValue(`I need help with: ${topic}`)}
              >
                {topic}
              </Badge>
            ))}
            </div>
          </div>
        )}

        {/* Input - hidden when minimized */}
        {!isMinimized && (
          <footer className="p-4 border-t bg-card shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              aria-label="Chat message input"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Messages are encrypted. Response time: ~2 minutes
            </p>
          </footer>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Chat Trigger Button Component
interface ChatTriggerProps {
  onClick: () => void;
  variant?: "floating" | "inline";
  className?: string;
}

export const ChatTrigger = ({ onClick, variant = "inline", className }: ChatTriggerProps) => {
  if (variant === "floating") {
    return (
      <Button
        onClick={onClick}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-40",
          className
        )}
        aria-label="Open live chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Button onClick={onClick} variant="outline" className={cn("gap-2", className)}>
      <MessageSquare className="h-4 w-4" />
      Live Chat
      <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
        Online
      </Badge>
    </Button>
  );
};

export default ChatModal;
