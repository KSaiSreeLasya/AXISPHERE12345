import { Check, Sparkles, Rocket, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "AI Starter Package",
    price: "₹30,000",
    icon: Sparkles,
    highlights: [
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
    targets: [
      "25–40% improvement in engagement rates",
      "15–25% increase in qualified leads",
      "20–30% reduction in content creation time",
      "3–5× faster response time to inquiries",
    ],
  },
  {
    name: "AI Growth Package",
    price: "₹75,000",
    icon: Rocket,
    highlights: [
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
    targets: [
      "40–60% improvement in conversion rates",
      "30–50% increase in lead volume",
      "35–45% reduction in customer acquisition cost",
      "50–70% improvement in customer lifetime value",
    ],
    featured: true,
  },
  {
    name: "AI Enterprise Package",
    price: "contact Us",
    icon: Building2,
    highlights: [
      "100+ AI-generated social media posts per month",
      "15 AI-optimized long‑form content pieces with advanced SEO",
      "AI-powered customer journey optimization",
      "Advanced predictive analytics and forecasting",
      "Custom AI model training for your brand voice",
      "Advanced NLP chatbot with voice",
      "Integration with enterprise CRM and marketing automation",
      "Multi-language support (5+ languages)",
      "Dedicated AI account manager",
      "24/7 priority support with 1‑hour response time",
      "Quarterly business reviews and strategy optimization",
    ],
    targets: [
      "60–80% improvement in marketing ROI",
      "70–90% increase in marketing qualified leads",
      "35–45% reduction in manual marketing tasks",
      "2–3× improvement in customer engagement scores",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Choose Your AI Marketing Package
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Scalable, results-driven solutions designed to grow with your
            business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative h-full flex flex-col rounded-3xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-luxury ${
                p.featured ? "ring-2 ring-gold-500" : "border-border/60"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
              </div>

              <div className="mb-6 text-3xl font-bold">
                {p.price}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  / month
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <Check className="w-4 h-4 text-gold-600" /> {h}
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-xl border border-border/50 bg-secondary/30 p-4 text-sm">
                <div className="mb-2 font-semibold text-foreground">
                  Success Metrics Target
                </div>
                <ul className="space-y-1">
                  {p.targets.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-foreground/80"
                    >
                      <Check className="w-4 h-4 text-platinum-600" /> {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gold-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-gold-600"
                >
                  Get Started
                </a>
                <Link
                  to={`/invoice?package=${encodeURIComponent(p.name)}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-gold-500 bg-transparent px-6 py-3 font-semibold text-gold-600 transition-colors hover:bg-gold-50 dark:hover:bg-gold-950/20"
                >
                  Generate Invoice
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
