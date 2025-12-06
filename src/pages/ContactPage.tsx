import { useState, useEffect, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactRequest,
  clearContactStatus,
} from "../store/actions";
import {
  selectContactSubmitting,
  selectContactSubmitted,
  selectContactError,
  selectContactTicketId,
  selectCurrentUser,
} from "../store/selectors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  HelpCircle,
  Book,
  Headphones,
  AlertCircle,
  Send,
  Loader2,
  Copy,
  ArrowRight,
} from "lucide-react";
import { toast } from "@/utils/toast";
import ChatModal from "@/components/ChatModal";

// FAQ Data
const faqs = [
  {
    question: "How do I connect my trading account?",
    answer:
      "Navigate to Accounts page, click 'Connect Account', and follow the step-by-step instructions to link your broker account using API credentials.",
  },
  {
    question: "What is the win rate and how is it calculated?",
    answer:
      "Win rate represents the percentage of profitable trades. It's calculated as: (Winning Trades / Total Trades) × 100. Our AI optimizes for consistent 65%+ win rates.",
  },
  {
    question: "How do trading signals work?",
    answer:
      "Our AI analyzes market conditions in real-time, generating CALL (buy) or PUT (sell) signals with confidence ratings. You can auto-execute or manually review each signal.",
  },
  {
    question: "Can I use the platform on mobile devices?",
    answer:
      "Yes! Our dashboard is fully responsive and works on all devices. For the best experience on mobile, we recommend using the latest version of Chrome or Safari.",
  },
  {
    question: "What happens if I exceed my daily loss limit?",
    answer:
      "When you reach your configured daily loss limit, all automated trading stops immediately. You'll receive a notification, and trading resumes automatically the next trading day.",
  },
  {
    question: "How can I upgrade my subscription plan?",
    answer:
      "Go to Settings > Subscription, choose your preferred plan, and complete the payment. Upgrades take effect immediately with prorated billing.",
  },
];

// Contact methods
const contactMethods = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email Support",
    description: "Get a response within 24 hours",
    value: "support@tradingbot.com",
    action: "Send Email",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Live Chat",
    description: "Available Mon-Fri, 9AM-6PM EST",
    value: "Start a conversation",
    action: "Open Chat",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone Support",
    description: "Premium members only",
    value: "+1 (555) 123-4567",
    action: "Call Now",
  },
];

// Subject options
const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing & Payments" },
  { value: "account", label: "Account Management" },
  { value: "feature", label: "Feature Request" },
  { value: "bug", label: "Bug Report" },
];

const ContactPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const submitting = useSelector(selectContactSubmitting);
  const submitted = useSelector(selectContactSubmitted);
  const error = useSelector(selectContactError);
  const ticketId = useSelector(selectContactTicketId);

  // Form state - initialize with user data if available
  const [name, setName] = useState(() => user?.name || "");
  const [email, setEmail] = useState(() => user?.email || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Clear status on unmount
  useEffect(() => {
    return () => {
      dispatch(clearContactStatus());
    };
  }, [dispatch]);

  // Show toast on submission result
  useEffect(() => {
    if (submitted && ticketId) {
      toast.success(`Your message has been sent! Ticket ID: ${ticketId}`);
    }
    if (error) {
      toast.error(error);
    }
  }, [submitted, ticketId, error]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(
      submitContactRequest({
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
      })
    );
  };

  const handleReset = () => {
    dispatch(clearContactStatus());
    setMessage("");
    setSubject("");
  };

  const copyTicketId = () => {
    if (ticketId) {
      navigator.clipboard.writeText(ticketId);
      toast.success("Ticket ID copied to clipboard");
    }
  };

  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-[500px]" />
          <Skeleton className="h-[500px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contact & Support</h1>
        <p className="text-muted-foreground">
          Get help with your trading platform or reach out to our support team
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contactMethods.map((method, index) => (
          <Card
            key={index}
            className="group hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => {
              if (method.title === "Live Chat") {
                setIsChatOpen(true);
              }
            }}
            role={method.title === "Live Chat" ? "button" : undefined}
            tabIndex={method.title === "Live Chat" ? 0 : undefined}
            onKeyDown={(e) => {
              if (method.title === "Live Chat" && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setIsChatOpen(true);
              }
            }}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-primary truncate">
                    {method.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Send a Message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              // Success State
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    We've received your message and will respond shortly.
                  </p>
                </div>

                {ticketId && (
                  <div className="bg-muted/50 rounded-lg p-4 inline-flex items-center gap-3">
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">
                        Your Ticket ID
                      </p>
                      <p className="font-mono font-semibold text-foreground">
                        {ticketId}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyTicketId}
                      className="h-8 w-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <Button onClick={handleReset} variant="outline" className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              // Form
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <span className="text-red-800 dark:text-red-300 text-sm">
                      {error}
                    </span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    disabled={submitting}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={submitting}
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={subject}
                    onValueChange={setSubject}
                    disabled={submitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                    placeholder="Describe your issue or question in detail..."
                    rows={5}
                    required
                    disabled={submitting}
                    className="resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Quick answers to common questions about the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Quick Links */}
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">
                Helpful Resources
              </h4>
              <div className="grid gap-2">
                <Button
                  variant="ghost"
                  className="justify-start h-auto py-2 px-3"
                >
                  <Book className="h-4 w-4 mr-2 text-primary" />
                  <span className="flex-1 text-left text-sm">
                    Documentation & Guides
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start h-auto py-2 px-3"
                >
                  <Headphones className="h-4 w-4 mr-2 text-primary" />
                  <span className="flex-1 text-left text-sm">Video Tutorials</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start h-auto py-2 px-3"
                >
                  <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                  <span className="flex-1 text-left text-sm">
                    Community Forum
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Banner */}
      <Card className="bg-linear-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                Average Response Time
              </h3>
              <p className="text-sm text-muted-foreground">
                Our support team typically responds within{" "}
                <span className="font-medium text-foreground">4-6 hours</span>{" "}
                during business hours. Premium members receive priority support
                with responses in under 2 hours.
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0">
              <span className="relative flex h-2 w-2 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Support Online
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default ContactPage;
