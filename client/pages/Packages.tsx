import Navigation from "@/components/Navigation";
import PricingSection from "@/components/PricingSection";
import Seo from "@/components/Seo";

export default function Packages() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="AI Marketing Packages – Axisphere | Smart, Pro & Elite Plans"
        description="Choose from Axisphere's tailored AI marketing packages designed to automate your growth, optimize workflows, and deliver high-impact brand transformation."
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
