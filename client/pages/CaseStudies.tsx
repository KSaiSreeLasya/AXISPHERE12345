import Navigation from "@/components/Navigation";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import Seo from "@/components/Seo";

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Award-Winning Luxury Marketing Solutions – Axisphere"
        description="Axisphere delivers certified, award-winning AI marketing solutions backed by industry-recognized standards and world-class innovation."
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
