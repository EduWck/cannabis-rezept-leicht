
import { useState } from 'react';
import PharmacySelector from "./PharmacySelector";
import PharmacyCard from "./PharmacyCard";
import ProductGrid from "./ProductGrid";
import OrderSummary from "./OrderSummary";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  deliveryTime: string;
  phone: string;
  products: string[];
}

interface Product {
  id: string;
  name: string;
  type: "flower" | "extract";
  thcPercentage: number;
  cbdPercentage: number;
  pricePerGram?: number;
  pricePerBottle?: number;
  bottleSize?: number;
  description: string;
  image: string;
  pharmacies: string[];
}

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

  // Test data for pharmacies
  const pharmacies: Pharmacy[] = [
    {
      id: "pharmacy1",
      name: "Green Leaf Apotheke",
      address: "Hauptstraße 15",
      city: "Berlin",
      rating: 4.8,
      deliveryTime: "1-2 Werktage",
      phone: "+49 30 12345678",
      products: ["p1", "p2", "p3", "p5"]
    },
    {
      id: "pharmacy2", 
      name: "MediCanna Apotheke",
      address: "Bahnhofstraße 42",
      city: "München",
      rating: 4.6,
      deliveryTime: "2-3 Werktage",
      phone: "+49 89 87654321",
      products: ["p4", "p1", "p6", "p5"]
    },
    {
      id: "pharmacy3",
      name: "Natura Apotheke", 
      address: "Gartenweg 8",
      city: "Hamburg",
      rating: 4.7,
      deliveryTime: "1-3 Werktage",
      phone: "+49 40 11223344",
      products: ["p2", "p6", "p7"]
    },
    {
      id: "pharmacy4",
      name: "CityMed Apotheke",
      address: "Marktplatz 3",
      city: "Köln", 
      rating: 4.5,
      deliveryTime: "2-4 Werktage",
      phone: "+49 221 55667788",
      products: ["p1", "p4", "p3"]
    }
  ];

  // Test data for products
  const products: Product[] = [
    {
      id: "p1",
      name: "Bedrocan",
      type: "flower",
      thcPercentage: 22,
      cbdPercentage: 0.1,
      pricePerGram: 12.5,
      description: "Eine der beliebtesten medizinischen Sorten mit verlässlichem THC-Gehalt.",
      image: "https://via.placeholder.com/150",
      pharmacies: ["pharmacy1", "pharmacy2", "pharmacy4"]
    },
    {
      id: "p2",
      name: "Bediol",
      type: "flower",
      thcPercentage: 6.3,
      cbdPercentage: 8,
      pricePerGram: 10.25,
      description: "Ausgewogenes THC-CBD-Verhältnis für eine mildere Wirkung.",
      image: "https://via.placeholder.com/150",
      pharmacies: ["pharmacy1", "pharmacy3"]
    },
    {
      id: "p3",
      name: "Pedanios 22/1",
      type: "flower",
      thcPercentage: 22,
      cbdPercentage: 1,
      pricePerGram: 13.75,
      description: "Indicalastige Sorte für abendliche Anwendung und Schlafstörungen.",
      image: "https://via.placeholder.com/150",
      pharmacies: ["pharmacy1", "pharmacy4"]
    },
    {
      id: "p4",
      name: "Aurora 20/1",
      type: "flower",
      thcPercentage: 20,
      cbdPercentage: 1,
      pricePerGram: 11.90,
      description: "Sativa-dominant mit klarer Wirkung für den Tag.",
      image: "https://via.placeholder.com/150",
      pharmacies: ["pharmacy2", "pharmacy4"]
    },
    {
      id: "p5",
      name: "THC Extrakt 25%",
      type: "extract",
      thcPercentage: 25,
      cbdPercentage: 0.5,
      pricePerBottle: 89.95,
      bottleSize: 10,
      description: "Hochkonzentrierter THC-Extrakt für erfahrene Anwender (10ml Flasche).",
      image: "https://via.placeholder.com/150",
      pharmacies: ["pharmacy1", "pharmacy2"]
    },
    {
      id: "p6",
      name: "CBD Extrakt 15%",
      type: "extract",
      thcPercentage: 0.2,
      cbdPercentage: 15,
      pricePerBottle: 65.50,
      bottleSize: 15,
      description: "CBD-reicher Extrakt zur Entspannung und Schmerzlinderung (15ml Flasche).",
      image: "https://via.placeholder.com/150",
      pharmacies: ["pharmacy2", "pharmacy3"]
    },
    {
      id: "p7",
      name: "CBD Blüte 18%",
      type: "flower",
      thcPercentage: 0.2,
      cbdPercentage: 18,
      pricePerGram: 9.50,
      description: "CBD-reiche Blüte ohne psychoaktive Wirkung.",
      image: "https://via.placeholder.com/150",
      pharmacies: ["pharmacy3"]
    }
  ];

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
      return pharmacies;
    }
    return pharmacies.filter(pharmacy => selectedPharmacies.includes(pharmacy.id));
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
        pharmacies={pharmacies}
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
        products={products}
        pharmacies={pharmacies}
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
