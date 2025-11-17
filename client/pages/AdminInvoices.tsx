import { useState } from "react";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import AdminPackagesSection from "@/components/admin/AdminPackagesSection";
import AdminInvoiceForm from "@/components/admin/AdminInvoiceForm";

export default function AdminInvoices() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleBackToPackages = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Admin - Invoice Generation | Axisphere"
        description="Admin dashboard to generate invoices for AI marketing packages with customizable scope."
        canonicalPath="/admin/invoices"
        keywords="admin, invoice generation, package management"
      />
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage packages and generate invoices for clients
            </p>
          </div>

          {selectedPackage ? (
            <div>
              <Button
                onClick={handleBackToPackages}
                variant="outline"
                className="mb-6"
              >
                ← Back to Packages
              </Button>
              <AdminInvoiceForm
                packageName={selectedPackage}
                onSuccess={handleBackToPackages}
              />
            </div>
          ) : (
            <AdminPackagesSection onPackageSelect={handlePackageSelect} />
          )}
        </div>
      </main>
    </div>
  );
}
