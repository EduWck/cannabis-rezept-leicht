
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Star, Clock, Phone, Search, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [comboboxOpen, setComboboxOpen] = useState(false);

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

  const handlePharmacySelect = (pharmacyId: string) => {
    if (!selectedPharmacies.includes(pharmacyId)) {
      setSelectedPharmacies(prev => [...prev, pharmacyId]);
      setShowAllPharmacies(false);
    }
    setComboboxOpen(false);
  };

  const getAvailablePharmacies = () => {
    return pharmacies.filter(pharmacy => !selectedPharmacies.includes(pharmacy.id));
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

  const getTotalProducts = () => {
    return Object.values(selectedProducts).filter(item => item.quantity > 0).length;
  };

  const canProceed = getTotalProducts() > 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Apotheken & Sorten auswählen</h2>
        <p className="text-muted-foreground">
          Wähle zuerst eine oder mehrere Apotheken aus und entscheide dann, welche Sorten du bestellen möchtest.
        </p>
      </div>

      {/* Pharmacy Selection */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Apotheken auswählen</h3>
          
          <div className="space-y-4">
            {/* Show All Toggle */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showAll"
                checked={showAllPharmacies}
                onCheckedChange={handleShowAllToggle}
              />
              <label htmlFor="showAll" className="text-sm font-medium cursor-pointer">
                Alle Apotheken anzeigen
              </label>
            </div>

            {/* Integrated Pharmacy Search & Selection */}
            {!showAllPharmacies && (
              <div className="space-y-3">
                <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={comboboxOpen}
                      className="w-full justify-between"
                    >
                      <div className="flex items-center">
                        <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Apotheke suchen und hinzufügen...</span>
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command className="w-full">
                      <CommandInput 
                        placeholder="Apotheke suchen..." 
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Keine Apotheke gefunden.</CommandEmpty>
                        <CommandGroup>
                          {getAvailablePharmacies().map((pharmacy) => (
                            <CommandItem
                              key={pharmacy.id}
                              value={`${pharmacy.name} ${pharmacy.city}`}
                              onSelect={() => handlePharmacySelect(pharmacy.id)}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <span className="font-medium">{pharmacy.name}</span>
                                  <div className="flex items-center ml-2 text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    <span>{pharmacy.city}</span>
                                  </div>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                  <span className="mr-3">{pharmacy.rating}</span>
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>{pharmacy.deliveryTime}</span>
                                </div>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedPharmacies.includes(pharmacy.id) 
                                    ? "opacity-100" 
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Selected Pharmacies */}
            {!showAllPharmacies && selectedPharmacies.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Ausgewählte Apotheken:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPharmacies.map((pharmacyId) => {
                    const pharmacy = pharmacies.find(p => p.id === pharmacyId);
                    if (!pharmacy) return null;
                    
                    return (
                      <Badge
                        key={pharmacyId}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => handlePharmacyToggle(pharmacyId)}
                      >
                        {pharmacy.name} - {pharmacy.city} ×
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pharmacy Details (Compact) */}
      {getDisplayedPharmacies().length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getDisplayedPharmacies().map((pharmacy) => (
            <Card key={pharmacy.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{pharmacy.name}</h4>
                    <div className="flex items-center text-xs">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      <span>{pharmacy.rating}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{pharmacy.city}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{pharmacy.deliveryTime}</span>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {pharmacy.products.length} Sorten
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Available Products */}
      <div>
        <h3 className="font-semibold text-lg mb-4">
          Verfügbare Sorten ({getFilteredProducts().length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredProducts().map((product) => {
            // Filter available pharmacies based on user selection
            const productPharmacies = pharmacies.filter(p => product.pharmacies.includes(p.id));
            const filteredPharmacies = showAllPharmacies 
              ? productPharmacies 
              : productPharmacies.filter(pharmacy => selectedPharmacies.includes(pharmacy.id));

            return (
              <ProductCard
                key={product.id}
                product={product}
                quantity={selectedProducts[product.id]?.quantity || 0}
                selectedPharmacyId={selectedProducts[product.id]?.pharmacyId}
                availablePharmacies={filteredPharmacies}
                onQuantityChange={(quantity, pharmacyId) => onProductSelectChange(product.id, quantity, pharmacyId)}
              />
            );
          })}
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
                  {getTotalProducts()} Produkt{getTotalProducts() !== 1 ? 'e' : ''} ausgewählt
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
