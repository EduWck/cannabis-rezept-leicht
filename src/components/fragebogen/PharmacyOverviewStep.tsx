
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Star, Clock, Phone } from "lucide-react";
import ProductCard from "./ProductCard";

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

  const getFilteredProducts = () => {
    if (showAllPharmacies) {
      return products;
    }
    return products.filter(product => 
      product.pharmacies.some(pharmacyId => selectedPharmacies.includes(pharmacyId))
    );
  };

  const getDisplayedPharmacies = () => {
    if (showAllPharmacies) {
      return pharmacies;
    }
    return pharmacies.filter(pharmacy => selectedPharmacies.includes(pharmacy.id));
  };

  const getTotalQuantity = () => {
    return Object.values(selectedProducts).reduce((sum, item) => sum + item.quantity, 0);
  };

  const canProceed = getTotalQuantity() > 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Apotheken & Sorten auswählen</h2>
        <p className="text-muted-foreground">
          Wähle zuerst eine oder mehrere Apotheken aus und entscheide dann, welche Sorten du bestellen möchtest.
        </p>
      </div>

      {/* Pharmacy Filter */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Apotheken auswählen</h3>
          
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="showAll"
              checked={showAllPharmacies}
              onCheckedChange={handleShowAllToggle}
            />
            <label htmlFor="showAll" className="text-sm font-medium cursor-pointer">
              Alle Apotheken anzeigen
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="flex items-center space-x-2">
                <Checkbox
                  id={pharmacy.id}
                  checked={showAllPharmacies || selectedPharmacies.includes(pharmacy.id)}
                  onCheckedChange={() => handlePharmacyToggle(pharmacy.id)}
                  disabled={showAllPharmacies}
                />
                <label htmlFor={pharmacy.id} className="text-sm cursor-pointer">
                  {pharmacy.name}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Pharmacies Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getDisplayedPharmacies().map((pharmacy) => (
          <Card key={pharmacy.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pharmacy.address}, {pharmacy.city}
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm">{pharmacy.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>Lieferzeit: {pharmacy.deliveryTime}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{pharmacy.phone}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Badge variant="secondary">
                  {pharmacy.products.length} Sorten verfügbar
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Products */}
      <div>
        <h3 className="font-semibold text-lg mb-4">
          Verfügbare Sorten ({getFilteredProducts().length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredProducts().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={selectedProducts[product.id]?.quantity || 0}
              selectedPharmacyId={selectedProducts[product.id]?.pharmacyId}
              availablePharmacies={pharmacies.filter(p => product.pharmacies.includes(p.id))}
              onQuantityChange={(quantity, pharmacyId) => onProductSelectChange(product.id, quantity, pharmacyId)}
            />
          ))}
        </div>
      </div>

      {/* Summary and Continue */}
      {canProceed && (
        <Card className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20 border-cannabis-green-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Auswahl getroffen</h4>
                <p className="text-sm text-muted-foreground">
                  {getTotalQuantity()} Produkt{getTotalQuantity() !== 1 ? 'e' : ''} ausgewählt
                </p>
              </div>
              <Button onClick={onNext} className="px-8">
                Weiter zum Fragebogen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!canProceed && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Bitte wähle mindestens ein Produkt aus, um fortzufahren.
          </p>
        </div>
      )}
    </div>
  );
};

export default PharmacyOverviewStep;
