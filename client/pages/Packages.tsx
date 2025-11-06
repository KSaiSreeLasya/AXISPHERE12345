import Navigation from "@/components/Navigation";
import PricingSection from "@/components/PricingSection";
import Seo from "@/components/Seo";

export default function Packages() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="AI Marketing Packages & Pricing | Axisphere – Starter to Enterprise Plans"
        description="Flexible AI marketing packages combining automation, advanced analytics, and performance marketing to scale your growth and maximize ROI. Tailored plans for every business size."
        canonicalPath="/packages"
        keywords="marketing packages, pricing plans, AI marketing plans, marketing solutions, automation packages, performance marketing pricing, business packages, enterprise marketing, startup marketing, marketing pricing"
      />
      <Navigation />
      <main className="pt-24">
        <PricingSection />
      </main>
    </div>
  );
}
