import Navigation from "@/components/Navigation";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import Seo from "@/components/Seo";

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Case Studies & Client Success Stories | Axisphere – Real Results"
        description="Real-world results from AI-led marketing campaigns, creative excellence, and automated customer journeys delivering measurable impact across industries. See our success stories."
        canonicalPath="/case-studies"
        keywords="case studies, success stories, marketing results, client testimonials, AI marketing results, campaign results, ROI examples, brand success, marketing performance, client achievements"
      />
      <Navigation />
      <main className="pt-24">
        <CaseStudiesSection />
      </main>
    </div>
  );
}
