import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";
import Seo from "@/components/Seo";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="AI Marketing Services & Automation | Axisphere – Growth Strategies"
        description="AI-driven branding, performance marketing, predictive analytics, and marketing automation services to optimize customer acquisition, retention, and ROI. Expert digital marketing solutions."
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
