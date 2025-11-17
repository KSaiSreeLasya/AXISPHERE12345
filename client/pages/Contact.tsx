import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Seo from "@/components/Seo";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Contact Axisphere – Start Your AI-Powered Marketing Journey"
        description="Connect with Axisphere to schedule a consultation and explore powerful AI marketing solutions designed to elevate your brand."
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
