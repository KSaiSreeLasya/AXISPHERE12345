import { Building2, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PACKAGE_PRICES, PACKAGE_DESCRIPTIONS } from "@/lib/invoice";

interface AdminPackagesSectionProps {
  onPackageSelect: (packageName: string) => void;
}

const packageIcons = {
  "AI Starter Package": Sparkles,
  "AI Growth Package": Rocket,
  "AI Enterprise Package": Building2,
};

export default function AdminPackagesSection({
  onPackageSelect,
}: AdminPackagesSectionProps) {
  const packages = Object.keys(PACKAGE_PRICES);

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">
        Select a Package to Create Invoice
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((packageName) => {
          const Icon = packageIcons[packageName as keyof typeof packageIcons];
          const price = PACKAGE_PRICES[packageName];
          const features = PACKAGE_DESCRIPTIONS[packageName];

          return (
            <div
              key={packageName}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {Icon && <Icon className="w-8 h-8 text-primary" />}
                <h3 className="text-xl font-bold text-foreground">
                  {packageName}
                </h3>
              </div>

              <div className="mb-6">
                {price > 0 ? (
                  <p className="text-3xl font-bold text-primary mb-1">
                    ₹{price.toLocaleString("en-IN")}
                  </p>
                ) : (
                  <p className="text-2xl font-semibold text-muted-foreground mb-1">
                    Custom Pricing
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {features.length} features included
                </p>
              </div>

              <div className="mb-6 flex-1">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Features:
                </h4>
                <ul className="space-y-2">
                  {features.slice(0, 4).map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {features.length > 4 && (
                    <li className="text-sm text-muted-foreground italic pt-1">
                      +{features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>

              <Button
                onClick={() => onPackageSelect(packageName)}
                className="w-full"
              >
                Create Invoice
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
