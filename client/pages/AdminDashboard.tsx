import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { LogOut, Check, Sparkles, Rocket, Building2 } from "lucide-react";
import { PACKAGE_PRICES } from "@/lib/invoice";

const packages = [
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
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleCreateInvoice = (packageName: string) => {
    navigate(`/invoice?package=${encodeURIComponent(packageName)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Admin Dashboard | Axisphere"
        description="Admin dashboard for creating invoices"
        canonicalPath="/admin/dashboard"
      />
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Welcome, {user?.email}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Create Invoice
            </h2>
            <p className="text-lg text-muted-foreground">
              Select a package and create an invoice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            {packages.map((p) => (
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

                <ul className="space-y-3 mb-8 flex-grow">
                  {p.highlights.slice(0, 8).map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                  {p.highlights.length > 8 && (
                    <li className="text-sm text-muted-foreground italic">
                      + {p.highlights.length - 8} more features...
                    </li>
                  )}
                </ul>

                <Button
                  onClick={() => handleCreateInvoice(p.name)}
                  className="w-full bg-gold-500 hover:bg-gold-600"
                >
                  Create Invoice
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
