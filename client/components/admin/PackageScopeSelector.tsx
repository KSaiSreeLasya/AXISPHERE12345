import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PACKAGE_DESCRIPTIONS } from "@/lib/invoice";

interface PackageScopeSelectorProps {
  packageName: string;
  onScopeChange: (selectedFeatures: string[]) => void;
}

export default function PackageScopeSelector({
  packageName,
  onScopeChange,
}: PackageScopeSelectorProps) {
  const features = PACKAGE_DESCRIPTIONS[packageName] || [];
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(
    new Set(features)
  );

  useEffect(() => {
    setSelectedFeatures(new Set(features));
  }, [packageName, features]);

  const handleFeatureToggle = (feature: string) => {
    const newSelected = new Set(selectedFeatures);
    if (newSelected.has(feature)) {
      newSelected.delete(feature);
    } else {
      newSelected.add(feature);
    }
    setSelectedFeatures(newSelected);
    onScopeChange(Array.from(newSelected));
  };

  const handleSelectAll = () => {
    setSelectedFeatures(new Set(features));
    onScopeChange(features);
  };

  const handleDeselectAll = () => {
    setSelectedFeatures(new Set());
    onScopeChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Scope: Select Features to Include
        </h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="text-xs"
          >
            Select All
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDeselectAll}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 space-y-3 max-h-96 overflow-y-auto">
        {features.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No features available for this package
          </p>
        ) : (
          features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Checkbox
                id={`feature-${idx}`}
                checked={selectedFeatures.has(feature)}
                onCheckedChange={() => handleFeatureToggle(feature)}
                className="mt-1"
              />
              <Label
                htmlFor={`feature-${idx}`}
                className="text-sm text-foreground cursor-pointer flex-1 pt-0.5"
              >
                {feature}
              </Label>
            </div>
          ))
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        {selectedFeatures.size} of {features.length} features selected
      </div>
    </div>
  );
}
