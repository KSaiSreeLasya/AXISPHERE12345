import { Mail, Phone, MapPin, Building } from "lucide-react";

import { useEffect, useState } from "react";
import type React from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { getSupabaseClient } from "@/lib/supabase";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    console.log("=== EmailJS Initialization ===");
    console.log("Public Key exists:", !!publicKey);
    console.log("Service ID exists:", !!serviceId);
    console.log("Template ID exists:", !!templateId);

    if (publicKey) {
      try {
        emailjs.init(publicKey);
        console.log("✓ EmailJS initialized successfully");
      } catch (error) {
        console.error("✗ Failed to initialize EmailJS:", error);
      }
    } else {
      console.warn("⚠️ EmailJS Public Key is not set!");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement & HTMLTextAreaElement;
    const { name, value, type } = target;
    const val =
      type === "checkbox" ? (target as HTMLInputElement).checked : value;
    setForm((f) => ({ ...f, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("=== Contact Form Submitted ===");
    console.log("Form data:", form);

    if (!form.name || !form.email) {
      console.warn("⚠️ Form validation failed: Name or email missing");
      Swal.fire({ icon: "warning", title: "Please fill name and email" });
      return;
    }
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.error(
          "✗ Supabase client not configured. Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY"
        );
        Swal.fire({
          icon: "error",
          title: "Server not configured",
          text: "Supabase client is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and restart the dev server.",
        });
        setLoading(false);
        return;
      }
      console.log("✓ Supabase client initialized");

      if (!form.consent) {
        console.warn("⚠️ Consent not accepted");
        await Swal.fire({
          icon: "warning",
          title: "Please accept the Privacy Policy",
        });
        setLoading(false);
        return;
      }
      console.log("✓ Privacy policy consent accepted");

      const metadata: Record<string, any> = {};
      try {
        const params = new URLSearchParams(window.location.search);
        params.forEach((v, k) => (metadata[k] = v));
      } catch {}

      // Send email via EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      console.log("=== Email Sending Process ===");
      console.log("Service ID:", serviceId || "NOT SET");
      console.log("Template ID:", templateId || "NOT SET");

      if (serviceId && templateId) {
        const emailData = {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || "Not provided",
          company: form.company.trim() || "Not provided",
          subject: form.subject.trim() || "General Inquiry",
          message: form.message.trim(),
          time: new Date().toLocaleString(),
        };

        console.log("Sending email with data:", emailData);

        try {
          const response = await emailjs.send(serviceId, templateId, emailData);
          console.log("✓ Email sent successfully:", response);
        } catch (emailError: any) {
          console.error("✗ Email sending failed:", emailError);
          console.error("Error status:", emailError.status);
          console.error("Error text:", emailError.text);
          throw new Error(
            `Email failed to send: ${emailError.text || emailError.message}`
          );
        }
      } else {
        console.warn(
          "⚠️ Skipping email: Missing Service ID or Template ID"
        );
      }

      // Save to Supabase
      console.log("=== Saving to Supabase ===");
      const supabaseData = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        company: form.company.trim() || null,
        subject: form.subject.trim() || null,
        message: form.message.trim(),
        consent: !!form.consent,
        metadata,
      };
      console.log("Supabase data:", supabaseData);

      const { error } = await supabase
        .from("contact_messages")
        .insert(supabaseData);

      if (error) {
        console.error("✗ Supabase error:", error);
        throw error;
      }

      console.log("✓ Data saved to Supabase successfully");
      Swal.fire({
        icon: "success",
        title: "Thanks!",
        text: "Your request was submitted. We'll reach out shortly.",
        confirmButtonColor: "#7c3aed",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        consent: false,
      });
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        err?.text ||
        "We couldn't save your request right now. Please try again.";

      console.error("=== Form Submission Error ===");
      console.error("Error:", err);
      console.error("Error Message:", errorMessage);
      console.error("Full Error Object:", JSON.stringify(err, null, 2));

      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our AI marketing experts and start your journey to
            exponential growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 items-stretch gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="h-full rounded-2xl border border-border/50 bg-card/90 backdrop-blur-sm p-6 shadow-luxury space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                What are your goals?
              </label>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What are your goals?"
                className="w-full rounded-lg border border-input bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Footer controls: consent on its own line, buttons below */}
            <div className="space-y-4">
              <label className="inline-flex items-center gap-2 text-sm text-foreground/80 flex-nowrap whitespace-nowrap">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-input"
                />
                I agree to the{" "}
                <a
                  href="/privacy-policy"
                  className="underline hover:text-gold-600 whitespace-nowrap"
                >
                  Privacy Policy
                </a>
                .
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-6 py-3 font-semibold text-white hover:from-gold-500 hover:to-gold-700 disabled:opacity-60 shadow-glow-gold"
                >
                  {loading ? "Submitting..." : "Schedule My Consultation"}
                </button>
                <button
                  type="reset"
                  className="rounded-full border border-border bg-background px-6 py-3 font-medium text-foreground/80 hover:bg-secondary/50"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>

          {/* Info cards */}
          <div className="grid grid-rows-4 gap-4 h-full">
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm h-full flex flex-col justify-center">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Mail className="h-4 w-4" /> Email
              </div>
              <div className="text-sm text-foreground/80">
                hello@axisphere.media
              </div>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm h-full flex flex-col justify-center">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Phone className="h-4 w-4" /> Call us
              </div>
              <div className="text-sm text-foreground/80">+91 79810 24731</div>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm h-full flex flex-col justify-center">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <MapPin className="h-4 w-4" /> Visit us
              </div>
              <div className="text-sm text-foreground/80">
                Plot no.102, 103, Temple Lane, Mythri Nagar, Mathrusri Nagar,
                Madinaguda,
                <br />
                Serilingampally, K.V.Rangareddy-500049, Telangana, India
              </div>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm h-full flex flex-col justify-center">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Building className="h-4 w-4" /> Business Hours
              </div>
              <div className="text-sm text-foreground/80">
                Mon–Sat, 9:30 AM – 7:00 PM IST
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8">
          <h3 className="text-xl font-semibold mb-3 text-foreground">
            Our Location
          </h3>
          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-luxury">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.9936605406983!2d78.35132958554053!3d17.507816056538655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9273f8b4a06b%3A0x89f1605341133cd3!2s102%2C%20103%2C%20Temple%20Ln%2C%20Phase%202%2C%20Jaya%20Prakash%20Narayan%20Nagar%2C%20Miyapur%2C%20Hyderabad%2C%20Telangana%20500049!5e0!3m2!1shi!2sin!4v1758605947867!5m2!1shi!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
