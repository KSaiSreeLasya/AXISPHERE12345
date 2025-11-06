import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import Seo from "@/components/Seo";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="About Axisphere | Luxury AI Marketing Agency – Our Mission & Values"
        description="Discover how Axisphere blends AI and creativity to craft premium brand experiences, intelligent marketing systems, and sustainable long-term growth for luxury brands."
        canonicalPath="/about"
        keywords="about us, company mission, marketing agency, luxury brand, AI experts, marketing professionals, company values, brand story, team expertise, marketing innovation"
      />
      <Navigation />
      <main className="pt-24">
        <AboutSection />
      </main>
    </div>
  );
}
