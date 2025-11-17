export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  packageName: string;
  packagePrice: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

export function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `AXI-${year}${month}${day}-${random}`;
}

export function getInvoiceDueDate(days: number = 30): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export function calculateInvoiceAmount(
  packagePrice: number,
  taxRate: number = 0.18,
): { subtotal: number; tax: number; total: number } {
  const subtotal = packagePrice;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const PACKAGE_PRICES: Record<string, number> = {
  "AI Starter Package": 30000,
  "AI Growth Package": 75000,
  "AI Enterprise Package": 0,
};

export const PACKAGE_DESCRIPTIONS: Record<string, string[]> = {
  "AI Starter Package": [
    "20 AI-generated social media posts per month",
    "2 AI-optimized blog articles (800–1200 words each)",
    "AI-driven content calendar and scheduling",
    "Basic AI copywriting for ads and emails",
    "Campaign strategy development and setup",
    "AI-personalized email marketing (up to 1,000 subscribers)",
    "Rule-based chatbot for website (FAQ automation up to 50 questions)",
    "Monthly AI-generated performance reports",
    "Monthly 2-hour AI strategy consultation",
    "Email support during business hours",
  ],
  "AI Growth Package": [
    "50 AI-generated social media posts per month",
    "8 AI-optimized blog articles with SEO analysis",
    "Dynamic content personalization for different audience segments",
    "Comprehensive campaign strategy across Google, Facebook, LinkedIn",
    "Advanced audience modeling and targeting",
    "Automated bid optimization and budget allocation",
    "AI-personalized campaigns (up to 5,000 subscribers)",
    "Natural language processing chatbot capabilities",
    "Appointment booking and scheduling integrations",
    "E-commerce support and product recommendations",
    "Multi-language support (2 languages)",
    "Weekly strategy sessions with AI specialists",
  ],
  "AI Enterprise Package": [
    "100+ AI-generated social media posts per month",
    "15 AI-optimized long-form content pieces with advanced SEO",
    "AI-powered customer journey optimization",
    "Advanced predictive analytics and forecasting",
    "Custom AI model training for your brand voice",
    "Advanced NLP chatbot with voice",
    "Integration with enterprise CRM and marketing automation",
    "Multi-language support (5+ languages)",
    "Dedicated AI account manager",
    "24/7 priority support with 1-hour response time",
    "Quarterly business reviews and strategy optimization",
  ],
};
