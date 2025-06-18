
import { useState } from 'react';
import PharmacySelector from "./PharmacySelector";
import PharmacyCard from "./PharmacyCard";
import ProductGrid from "./ProductGrid";
import OrderSummary from "./OrderSummary";
import { mockProducts, mockPharmacies } from '@/data/mockData';

interface PharmacyOverviewStepProps {
  selectedProducts: Record<string, { quantity: number; pharmacyId: string }>;
  onProductSelectChange: (productId: string, quantity: number, pharmacyId: string) => void;
  onNext: () => void;
}

const PharmacyOverviewStep = ({
  selectedProducts,
  onProductSelectChange,
  onNext
}: PharmacyOverviewStepProps) => {
  const [selectedPharmacies, setSelectedPharmacies] = useState<string[]>([]);
  const [showAllPharmacies, setShowAllPharmacies] = useState(true);

  console.log("=== PharmacyOverviewStep Debug ===");
  console.log("Selected products:", selectedProducts);
  console.log("Mock products:", mockProducts);
  console.log("Mock pharmacies:", mockPharmacies);

  const handlePharmacyToggle = (pharmacyId: string) => {
    setSelectedPharmacies(prev => {
      if (prev.includes(pharmacyId)) {
        return prev.filter(id => id !== pharmacyId);
      } else {
        return [...prev, pharmacyId];
      }
    });
    setShowAllPharmacies(false);
  };

  const handleShowAllToggle = () => {
    setShowAllPharmacies(!showAllPharmacies);
    if (!showAllPharmacies) {
      setSelectedPharmacies([]);
    }
  };

  const getDisplayedPharmacies = () => {
    if (showAllPharmacies) {
      return mockPharmacies;
    }
    return mockPharmacies.filter(pharmacy => selectedPharmacies.includes(pharmacy.id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Apotheken & Sorten auswählen</h2>
        <p className="text-muted-foreground">
          Wähle zuerst eine oder mehrere Apotheken aus und entscheide dann, welche Sorten du bestellen möchtest.
        </p>
      </div>

      {/* Pharmacy Selection */}
      <PharmacySelector
        pharmacies={mockPharmacies}
        selectedPharmacies={selectedPharmacies}
        showAllPharmacies={showAllPharmacies}
        onPharmacyToggle={handlePharmacyToggle}
        onShowAllToggle={handleShowAllToggle}
      />

      {/* Pharmacy Details (Compact) */}
      {getDisplayedPharmacies().length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getDisplayedPharmacies().map((pharmacy) => (
            <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
          ))}
        </div>
      )}

      {/* Available Products */}
      <ProductGrid
        products={mockProducts}
        pharmacies={mockPharmacies}
        selectedProducts={selectedProducts}
        selectedPharmacies={selectedPharmacies}
        showAllPharmacies={showAllPharmacies}
        onProductSelectChange={onProductSelectChange}
      />

      {/* Summary and Continue */}
      <OrderSummary
        selectedProducts={selectedProducts}
        onNext={onNext}
      />
    </div>
  );
};

export default PharmacyOverviewStep;
