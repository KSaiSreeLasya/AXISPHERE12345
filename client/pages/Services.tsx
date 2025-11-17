import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";
import Seo from "@/components/Seo";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="AI Automation & Branding for Premium Businesses | Axisphere"
        description="Automate your business workflows, enhance brand quality, and drive engagement with Axisphere's AI-first marketing and automation solutions."
        canonicalPath="/services"
        keywords="AI marketing services, marketing automation, performance marketing, predictive analytics, brand strategy, digital marketing, content marketing, marketing solutions, growth marketing, conversion optimization"
      />
      <Navigation />
      <main className="pt-24">
        <ServicesSection />
      </main>
    </div>
  );
}
