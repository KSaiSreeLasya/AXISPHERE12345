import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InvoiceDisplay from "@/components/InvoiceDisplay";
import PackageScopeSelector from "@/components/admin/PackageScopeSelector";
import {
  InvoiceData,
  generateInvoiceNumber,
  getInvoiceDueDate,
  calculateInvoiceAmount,
  PACKAGE_PRICES,
} from "@/lib/invoice";

interface AdminInvoiceFormProps {
  packageName: string;
  onSuccess?: () => void;
}

export default function AdminInvoiceForm({
  packageName,
  onSuccess,
}: AdminInvoiceFormProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientCompany: "",
    paidAmount: PACKAGE_PRICES[packageName] || 0,
    notes: "",
  });

  const [selectedScope, setSelectedScope] = useState<string[]>([]);
  const [showInvoice, setShowInvoice] = useState(false);

  const invoiceData = useMemo((): InvoiceData => {
    const { subtotal, tax, total } = calculateInvoiceAmount(
      formData.paidAmount
    );

    const scopeDescription =
      selectedScope.length > 0
        ? `${packageName} - Custom Scope (${selectedScope.length} features)`
        : `${packageName} - Full Package`;

    return {
      invoiceNumber: generateInvoiceNumber(),
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: getInvoiceDueDate(30),
      packageName: scopeDescription,
      packagePrice: formData.paidAmount,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      clientCompany: formData.clientCompany,
      items: [
        {
          description: scopeDescription,
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
  }, [formData, packageName, selectedScope]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "paidAmount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleScopeChange = (features: string[]) => {
    setSelectedScope(features);
  };

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.clientName && formData.clientEmail) {
      setShowInvoice(true);
    }
  };

  const handleBackToForm = () => {
    setShowInvoice(false);
  };

  return showInvoice ? (
    <div>
      <div className="mb-8">
        <Button onClick={handleBackToForm} variant="outline" className="mb-4">
          ← Back to Form
        </Button>
        <h2 className="text-4xl font-bold text-foreground">
          Invoice Generated Successfully
        </h2>
      </div>
      <InvoiceDisplay invoice={invoiceData} selectedScope={selectedScope} />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Generate Invoice for {packageName}
        </h2>
        <p className="text-muted-foreground">
          Fill in the client details and customize the scope to create an
          invoice
        </p>
      </div>

      <form
        onSubmit={handleGenerateInvoice}
        className="bg-card rounded-2xl border border-border p-8 shadow-sm space-y-8"
      >
        {/* Client Details Section */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Client Details
          </h3>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
        </div>

        {/* Scope Selection Section */}
        <div className="border-t border-border pt-8">
          <PackageScopeSelector
            packageName={packageName}
            onScopeChange={handleScopeChange}
          />
        </div>

        {/* Invoice Details Section */}
        <div className="border-t border-border pt-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Invoice Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {PACKAGE_PRICES[packageName]
                  ? PACKAGE_PRICES[packageName].toLocaleString("en-IN")
                  : "Contact Us"}
              </p>
            </div>
          </div>

          <div className="mt-6">
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
        </div>

        {/* Submit Section */}
        <div className="border-t border-border pt-8 flex gap-4">
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
  );
}
