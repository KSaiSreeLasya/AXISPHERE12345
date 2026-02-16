import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import Seo from "@/components/Seo";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Luxury Digital Transformation Agency – Axisphere"
        description="Axisphere merges technology, design, and AI innovation to give luxury brands world-class digital transformation and branding results."
        canonicalPath="/about"
        keywords="about u, company mission, marketing agency, luxury brand, AI experts, marketing professionals, company values, brand story, team expertise, marketing innovation"
      />
      <Navigation />
      <main className="pt-24">
        <AboutSection />
      </main>
    </div>
  );
}
