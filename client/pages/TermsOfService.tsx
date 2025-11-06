import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Terms of Service | Axisphere – User Agreement & Legal Terms"
        description="Review Axisphere's terms of service to understand your rights and responsibilities when using our AI marketing platform and services."
        canonicalPath="/terms"
        keywords="terms of service, user agreement, legal terms, service conditions, terms and conditions, website terms, user rights, service agreement"
        robots="index, follow, noarchive"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-luxury-50 via-luxury-100 to-luxury-200 dark:from-luxury-950 dark:via-luxury-900 dark:to-luxury-800">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <Link
              to="/"
              className="shrink-0 rounded-full border border-border/70 bg-background/60 px-5 py-2 text-sm font-semibold text-foreground hover:bg-foreground/10"
            >
              Home
            </Link>
          </div>
          <p className="mt-4 max-w-3xl text-foreground/80">
            Please read these terms carefully before using our products and
            services.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-3xl prose prose-neutral dark:prose-invert">
          <p>
            These Terms of Service ("Terms") govern your access to and use of
            the websites, products, and services provided by Axisphere Media
            Worx ("Axisphere", "we", "us"). By using the Services, you agree to
            these Terms.
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            1. Use of Services
          </h2>
          <ul>
            <li>
              Use the Services only for lawful purposes and per these Terms.
            </li>
            <li>
              You are responsible for your conduct and any content you provide.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">2. Accounts</h2>
          <ul>
            <li>
              Some features require an account with accurate, up-to-date
              information.
            </li>
            <li>
              Safeguard your credentials; you are responsible for all activity
              under your account.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            3. Intellectual Property
          </h2>
          <ul>
            <li>
              All materials are owned by Axisphere or licensors and protected by
              law.
            </li>
            <li>
              No copying, modifying, distributing, selling, or leasing without
              permission.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            4. Prohibited Conduct
          </h2>
          <ul>
            <li>Attempting to access non-public areas of the Services.</li>
            <li>
              Interfering with the integrity or performance of the Services.
            </li>
            <li>
              Uploading malicious code or violating applicable laws or
              regulations.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            5. Third-Party Services
          </h2>
          <ul>
            <li>
              Integrations may exist with third-party tools; their terms apply
              to your use.
            </li>
            <li>
              We are not responsible for third-party content or practices.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            6. Disclaimers
          </h2>
          <ul>
            <li>
              Services provided "as is" and "as available"; no warranties.
            </li>
            <li>
              We disclaim warranties of merchantability, fitness for a purpose,
              and non-infringement.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            7. Limitation of Liability
          </h2>
          <ul>
            <li>
              No liability for indirect, incidental, special, consequential, or
              punitive damages.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            8. Indemnification
          </h2>
          <ul>
            <li>
              You agree to indemnify Axisphere and affiliates for claims arising
              from your use or violations.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            9. Termination
          </h2>
          <ul>
            <li>
              We may suspend or terminate access for violations or legal
              requirements.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            10. Governing Law
          </h2>
          <ul>
            <li>
              Indian law governs; exclusive jurisdiction in Bengaluru,
              Karnataka.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            11. Changes to Terms
          </h2>
          <ul>
            <li>We may update these Terms; continued use means acceptance.</li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">12. Contact</h2>
          <ul>
            <li>Questions? Contact hello@ai-marketing.studio.</li>
          </ul>

          <p className="text-sm text-foreground/60">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>
    </div>
  );
}
