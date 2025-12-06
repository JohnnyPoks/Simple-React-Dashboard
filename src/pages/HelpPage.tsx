import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  BookOpen,
  HelpCircle,
  Keyboard,
  MessageCircle,
  ExternalLink,
  Bot,
  TrendingUp,
  Shield,
  Settings,
  Zap,
  Video,
  FileText,
  Mail,
  Clock,
} from "lucide-react";
import { toast } from "@/utils/toast";
import ChatModal from "@/components/ChatModal";

const faqItems = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I start the trading bot?",
        answer:
          'Navigate to the Dashboard and click the "Start Bot" button in the Bot Status card. Make sure you have at least one connected trading account before starting.',
      },
      {
        question: "What is the minimum confidence level for signals?",
        answer:
          "By default, the bot only executes trades for signals with 75% or higher confidence. You can adjust this in Settings > Bot > Risk Management.",
      },
      {
        question: "How do I connect my broker account?",
        answer:
          'Go to the Accounts page and click "Add Account". Select your broker, enter your API credentials, and the bot will automatically connect to your trading account.',
      },
    ],
  },
  {
    category: "Trading & Signals",
    items: [
      {
        question: "How are trading signals generated?",
        answer:
          "Signals are generated using multiple technical analysis indicators including RSI, MACD, Bollinger Bands, and proprietary algorithms. Each signal includes a confidence score based on indicator alignment.",
      },
      {
        question: "What does the confidence percentage mean?",
        answer:
          "The confidence percentage indicates how strongly the technical indicators align for a particular trade direction. Higher confidence (80%+) suggests stronger signal validity.",
      },
      {
        question: "Can I manually execute signals?",
        answer:
          'Yes! You can click the "Execute" button next to any pending signal on the Signals page to manually place the trade, even if auto-trading is disabled.',
      },
    ],
  },
  {
    category: "Risk Management",
    items: [
      {
        question: "How does the Martingale strategy work?",
        answer:
          "When enabled, the Martingale strategy doubles your trade amount after each loss. Warning: This is a high-risk strategy that can lead to significant losses. Use with caution.",
      },
      {
        question: "What are Take Profit and Stop Loss limits?",
        answer:
          "These are daily limits. Take Profit stops the bot when you reach your profit target. Stop Loss stops the bot to prevent further losses when the limit is reached.",
      },
      {
        question: "How do I set maximum trade amounts?",
        answer:
          "Go to Settings > Bot > Risk Management. You can set the default trade amount, maximum concurrent trades, and daily trade limits.",
      },
    ],
  },
  {
    category: "Account & Security",
    items: [
      {
        question: "Is my API key secure?",
        answer:
          "Yes, API keys are encrypted and stored securely. We never have access to your broker account credentials and cannot make withdrawals.",
      },
      {
        question: "Can I trade on multiple accounts simultaneously?",
        answer:
          "Yes! You can connect multiple broker accounts in the Accounts page. The bot can distribute trades across all connected accounts based on your settings.",
      },
      {
        question: "What happens if my internet disconnects during a trade?",
        answer:
          "The bot uses WebSocket connections with automatic reconnection. If disconnected, it will attempt to reconnect. Any open trades will continue as they are managed by the broker.",
      },
    ],
  },
];

const keyboardShortcuts = [
  { keys: ["Ctrl", "D"], description: "Toggle dark/light mode" },
  { keys: ["Ctrl", "B"], description: "Toggle sidebar" },
  { keys: ["Ctrl", "S"], description: "Start/Stop bot" },
  { keys: ["Ctrl", "R"], description: "Refresh data" },
  { keys: ["Ctrl", "/"], description: "Open help" },
  { keys: ["Ctrl", "K"], description: "Open command palette" },
  { keys: ["Esc"], description: "Close modal/dialog" },
];

const quickStartSteps = [
  {
    icon: Settings,
    title: "Configure Settings",
    description:
      "Set up your trading preferences, risk limits, and notification settings.",
  },
  {
    icon: Shield,
    title: "Connect Account",
    description:
      "Link your broker account using API credentials from your trading platform.",
  },
  {
    icon: TrendingUp,
    title: "Review Signals",
    description:
      "Monitor incoming signals and their confidence levels before enabling auto-trade.",
  },
  {
    icon: Bot,
    title: "Start Trading",
    description:
      "Enable the bot to start executing trades automatically based on signals.",
  },
];

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const filteredFaq = faqItems
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const handleContactSupport = () => {
    toast.info("Opening support chat...");
    navigate("/contact");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Help & Documentation
          </h1>
          <p className="text-muted-foreground mt-1">
            Find answers, tutorials, and get support
          </p>
        </div>
        <Button onClick={handleContactSupport}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Support
        </Button>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>
            Get up and running with automated trading in 4 simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative p-4 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => toast.info(`Opening: ${step.title}`)}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <step.icon className="h-8 w-8 text-primary mb-3 mt-2" />
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help topics, guides, or FAQs..."
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFaq.length > 0 ? (
                <div className="space-y-6">
                  {filteredFaq.map((category) => (
                    <div key={category.category}>
                      <h3 className="font-semibold mb-3 text-muted-foreground">
                        {category.category}
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {category.items.map((item, index) => (
                          <AccordionItem
                            key={index}
                            value={`${category.category}-${index}`}
                          >
                            <AccordionTrigger className="text-left">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No results found for "{searchQuery}"</p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={handleContactSupport}
                  >
                    Contact support for help
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Keyboard Shortcuts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Keyboard className="h-4 w-4" />
                Keyboard Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {keyboardShortcuts.slice(0, 5).map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, i) => (
                        <span key={i}>
                          <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted border rounded">
                            {key}
                          </kbd>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { icon: Video, label: "Video Tutorials", badge: "New" },
                  { icon: FileText, label: "API Documentation" },
                  { icon: BookOpen, label: "Trading Guide" },
                  { icon: Shield, label: "Security Best Practices" },
                ].map((resource) => (
                  <Button
                    key={resource.label}
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={() => toast.info(`Opening: ${resource.label}`)}
                  >
                    <resource.icon className="h-4 w-4" />
                    {resource.label}
                    {resource.badge && (
                      <Badge variant="default" className="ml-auto text-xs">
                        {resource.badge}
                      </Badge>
                    )}
                    <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageCircle className="h-4 w-4" />
                Need More Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircle className="h-4 w-4" />
                Live Chat
                <Badge variant="secondary" className="ml-auto">
                  Online
                </Badge>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => toast.info("Opening email support...")}
              >
                <Mail className="h-4 w-4" />
                Email Support
              </Button>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                <Clock className="h-3 w-3" />
                Average response time: 2 hours
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default HelpPage;
