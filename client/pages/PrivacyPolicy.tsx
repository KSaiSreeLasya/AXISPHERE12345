import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Privacy Policy | Axisphere – Data Protection & Information Security"
        description="Read Axisphere's privacy policy to understand how we collect, use, and protect your personal information. Your data security is our priority."
        canonicalPath="/privacy-policy"
        keywords="privacy policy, data protection, information security, GDPR, personal data, privacy statement, data privacy, user information protection"
        robots="index, follow, noarchive"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-luxury-50 via-luxury-100 to-luxury-200 dark:from-luxury-950 dark:via-luxury-900 dark:to-luxury-800">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                Privacy Policy
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
            Learn how we collect, use, and protect your information across our
            products and services.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-3xl prose prose-neutral dark:prose-invert">
          <p>
            This Privacy Policy explains how Axisphere Media Worx ("Axisphere",
            "we", "us") collects, uses, and protects your information when you
            use our websites, products, and services (collectively, the
            "Services").
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            Information We Collect
          </h2>
          <ul>
            <li>
              Contact details you provide, such as name, email address, phone
              number, company, and the message you submit via our contact forms.
            </li>
            <li>
              Usage data collected automatically, including IP address,
              device/browser information, and pages visited.
            </li>
            <li>
              Cookies and similar technologies used to remember preferences and
              improve performance.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            How We Use Information
          </h2>
          <ul>
            <li>Respond to inquiries and provide customer support.</li>
            <li>Operate, maintain, and improve the Services.</li>
            <li>Send administrative messages and updates you request.</li>
            <li>
              Protect against, investigate, and deter fraudulent activity.
            </li>
          </ul>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            Sharing of Information
          </h2>
          <p>
            We do not sell your personal information. We may share information
            with service providers who help us operate the Services (for
            example, hosting, analytics, and customer support). These providers
            are bound by obligations to protect your data.
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            Data Retention
          </h2>
          <p>
            We retain personal information only as long as necessary for the
            purposes described above, to comply with legal obligations, resolve
            disputes, and enforce our agreements.
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct,
            delete, or restrict the processing of your personal information. To
            exercise these rights, contact us using the details below.
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">Security</h2>
          <p>
            We use reasonable technical and organizational safeguards to protect
            personal information. No method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            International Transfers
          </h2>
          <p>
            Your information may be processed in countries other than your own.
            When we transfer data, we implement appropriate protections.
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            Children's Privacy
          </h2>
          <p>
            Our Services are not directed to children under 13. We do not
            knowingly collect personal information from children.
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The updated
            version will be indicated by an updated "Last updated" date.
          </p>

          <h2 className="!font-extrabold !text-xl md:!text-2xl">Contact Us</h2>
          <p>
            For questions about this Privacy Policy, contact
            hello@ai-marketing.studio or write to Axisphere Media Worx,
            Bengaluru, India.
          </p>

          <p className="text-sm text-foreground/60">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>
    </div>
  );
}
