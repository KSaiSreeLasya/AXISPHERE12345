import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import InvoiceDisplay from "@/components/InvoiceDisplay";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InvoiceData,
  generateInvoiceNumber,
  getInvoiceDueDate,
  calculateInvoiceAmount,
  PACKAGE_PRICES,
} from "@/lib/invoice";

export default function Invoice() {
  const [searchParams] = useSearchParams();
  const packageName = searchParams.get("package") || "AI Starter Package";

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientCompany: "",
    paidAmount: PACKAGE_PRICES[packageName] || 0,
    notes: "",
  });

  const [showInvoice, setShowInvoice] = useState(false);

  const invoiceData = useMemo((): InvoiceData => {
    const { subtotal, tax, total } = calculateInvoiceAmount(
      formData.paidAmount,
    );

    return {
      invoiceNumber: generateInvoiceNumber(),
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: getInvoiceDueDate(30),
      packageName,
      packagePrice: formData.paidAmount,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      clientCompany: formData.clientCompany,
      items: [
        {
          description: `${packageName} - Monthly Subscription`,
          quantity: 1,
          rate: formData.paidAmount,
          amount: formData.paidAmount,
        },
      ],
      subtotal,
      tax,
      total,
      notes: formData.notes,
    };
  }, [formData, packageName]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "paidAmount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.clientName && formData.clientEmail) {
      setShowInvoice(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Generate Invoice | Axisphere – AI Marketing Package Invoice"
        description="Generate and download your invoice for Axisphere's AI marketing packages. Enter your details and create a professional invoice."
        canonicalPath="/invoice"
        keywords="invoice generation, payment invoice, marketing package invoice, download invoice, billing"
      />
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {!showInvoice ? (
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Generate Invoice
                </h1>
                <p className="text-lg text-muted-foreground">
                  Fill in your details to generate and download your invoice for{" "}
                  <span className="font-semibold text-foreground">
                    {packageName}
                  </span>
                </p>
              </div>

              <form
                onSubmit={handleGenerateInvoice}
                className="bg-card rounded-2xl border border-border p-8 shadow-sm space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      name="clientCompany"
                      value={formData.clientCompany}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Package
                  </label>
                  <Select value={packageName}>
                    <SelectTrigger disabled>
                      <SelectValue>{packageName}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI Starter Package">
                        AI Starter Package
                      </SelectItem>
                      <SelectItem value="AI Growth Package">
                        AI Growth Package
                      </SelectItem>
                      <SelectItem value="AI Enterprise Package">
                        AI Enterprise Package
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Paid Amount (₹) *
                  </label>
                  <Input
                    type="number"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="1"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Standard price for {packageName}: ₹
                    {PACKAGE_PRICES[packageName] || "Contact Us"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Additional Notes
                  </label>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any additional notes or special instructions for this invoice..."
                    rows={4}
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1"
                    disabled={!formData.clientName || !formData.clientEmail}
                  >
                    Generate Invoice
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <Button
                  onClick={() => setShowInvoice(false)}
                  variant="outline"
                  className="mb-4"
                >
                  ← Back to Form
                </Button>
                <h1 className="text-4xl font-bold text-foreground">
                  Invoice Generated Successfully
                </h1>
              </div>

              <InvoiceDisplay invoice={invoiceData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
