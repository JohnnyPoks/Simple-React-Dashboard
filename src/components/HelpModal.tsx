import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Play,
} from 'lucide-react';
import { toast } from '@/utils/toast';

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const faqItems = [
  {
    question: 'How do I start the trading bot?',
    answer: 'Navigate to the Dashboard and click the "Start Bot" button in the Bot Status card. Make sure you have at least one connected trading account before starting.',
  },
  {
    question: 'What is the minimum confidence level for signals?',
    answer: 'By default, the bot only executes trades for signals with 75% or higher confidence. You can adjust this in Settings > Bot > Risk Management.',
  },
  {
    question: 'How does the Martingale strategy work?',
    answer: 'When enabled, the Martingale strategy doubles your trade amount after each loss. Warning: This is a high-risk strategy that can lead to significant losses. Use with caution.',
  },
  {
    question: 'Can I trade on multiple accounts simultaneously?',
    answer: 'Yes! You can connect multiple broker accounts in the Accounts page. The bot can distribute trades across all connected accounts based on your settings.',
  },
  {
    question: 'How do I export my trade history?',
    answer: 'Go to the Trades page and click the "Export" button in the toolbar. You can export your data as CSV or JSON format.',
  },
  {
    question: 'What happens if my internet disconnects during a trade?',
    answer: 'The bot uses WebSocket connections with automatic reconnection. If disconnected, it will attempt to reconnect. Any open trades will continue as they are managed by the broker.',
  },
  {
    question: 'How are trading signals generated?',
    answer: 'Signals are generated using multiple technical analysis indicators including RSI, MACD, Bollinger Bands, and proprietary algorithms. Each signal includes a confidence score based on indicator alignment.',
  },
  {
    question: 'Can I set trading hours?',
    answer: 'Yes, you can configure active trading hours in Settings > Bot > Trading Schedule. The bot will only execute trades during these hours.',
  },
];

const keyboardShortcuts = [
  { keys: ['Ctrl', 'D'], description: 'Toggle dark/light mode' },
  { keys: ['Ctrl', 'B'], description: 'Toggle sidebar' },
  { keys: ['Ctrl', 'S'], description: 'Start/Stop bot' },
  { keys: ['Ctrl', 'R'], description: 'Refresh data' },
  { keys: ['Ctrl', '/'], description: 'Open help' },
  { keys: ['Ctrl', 'K'], description: 'Open command palette' },
  { keys: ['Esc'], description: 'Close modal/dialog' },
];

const quickStartSteps = [
  {
    icon: Settings,
    title: 'Configure Settings',
    description: 'Set up your trading preferences, risk limits, and notification settings.',
  },
  {
    icon: Shield,
    title: 'Connect Account',
    description: 'Link your broker account using API credentials from your trading platform.',
  },
  {
    icon: TrendingUp,
    title: 'Review Signals',
    description: 'Monitor incoming signals and their confidence levels before enabling auto-trade.',
  },
  {
    icon: Bot,
    title: 'Start Trading',
    description: 'Enable the bot to start executing trades automatically based on signals.',
  },
];

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaq = faqItems.filter(
    item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSupport = () => {
    toast.info('Opening support chat...');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="h-6 w-6" />
            Help & Documentation
          </DialogTitle>
          <DialogDescription>
            Find answers, learn shortcuts, and get started quickly
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search help topics..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="quickstart" className="mt-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quickstart" className="gap-1">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Start</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-1">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="shortcuts" className="gap-1">
              <Keyboard className="h-4 w-4" />
              <span className="hidden sm:inline">Shortcuts</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Guides</span>
            </TabsTrigger>
          </TabsList>

          {/* Quick Start */}
          <TabsContent value="quickstart">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6 py-4">
                <div className="text-center pb-4 border-b">
                  <h3 className="text-lg font-semibold">Welcome to Quotex Trading Bot!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Follow these steps to start automated trading
                  </p>
                </div>

                <div className="space-y-4">
                  {quickStartSteps.map((step, index) => (
                    <div 
                      key={step.title}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                          {index + 1}
                        </span>
                        <step.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-4">
                  <Button onClick={() => toast.success('Starting setup wizard...')}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Setup Wizard
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq">
            <ScrollArea className="h-[400px] pr-4">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFaq.length === 0 && (
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
            </ScrollArea>
          </TabsContent>

          {/* Keyboard Shortcuts */}
          <TabsContent value="shortcuts">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2 py-4">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
                  >
                    <span className="text-muted-foreground">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, i) => (
                        <span key={i}>
                          <kbd className="px-2 py-1 text-xs font-semibold bg-muted border rounded">
                            {key}
                          </kbd>
                          {i < shortcut.keys.length - 1 && (
                            <span className="mx-1 text-muted-foreground">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Guides */}
          <TabsContent value="guides">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4 py-4">
                {[
                  {
                    title: 'Getting Started Guide',
                    description: 'Complete guide to setting up your first automated trading session',
                    badge: 'Beginner',
                    badgeVariant: 'default' as const,
                  },
                  {
                    title: 'Risk Management Best Practices',
                    description: 'Learn how to protect your capital with proper risk management',
                    badge: 'Important',
                    badgeVariant: 'destructive' as const,
                  },
                  {
                    title: 'Understanding Trading Signals',
                    description: 'How signals are generated and what confidence scores mean',
                    badge: 'Intermediate',
                    badgeVariant: 'secondary' as const,
                  },
                  {
                    title: 'Advanced Bot Configuration',
                    description: 'Fine-tune your bot settings for optimal performance',
                    badge: 'Advanced',
                    badgeVariant: 'outline' as const,
                  },
                  {
                    title: 'API Integration Guide',
                    description: 'Connect your broker accounts using API credentials',
                    badge: 'Technical',
                    badgeVariant: 'outline' as const,
                  },
                  {
                    title: 'Performance Analytics Deep Dive',
                    description: 'Understanding metrics and improving your strategy',
                    badge: 'Analytics',
                    badgeVariant: 'secondary' as const,
                  },
                ].map((guide, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow cursor-pointer"
                    onClick={() => toast.info(`Opening: ${guide.title}`)}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {guide.title}
                          <Badge variant={guide.badgeVariant}>{guide.badge}</Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t mt-4">
          <div className="text-sm text-muted-foreground">
            Can't find what you're looking for?
          </div>
          <Button variant="outline" onClick={handleContactSupport}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HelpModal;
