import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Seo from "@/components/Seo";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Contact Axisphere | AI Marketing Experts – Free Strategy Consultation"
        description="Start your AI-powered growth journey with a free consultation. Get a tailored marketing strategy for automation, performance optimization, and brand scaling."
        canonicalPath="/contact"
        keywords="contact us, get in touch, consultation, marketing strategy, free quote, business inquiry, support, contact form, customer service, partnership opportunities"
      />
      <Navigation />
      <main className="pt-24">
        <ContactSection />
      </main>
    </div>
  );
}
