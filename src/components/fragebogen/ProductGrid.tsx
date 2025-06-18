
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface ProductGridProps {
  products: Product[];
  pharmacies: Pharmacy[];
  selectedProducts: Record<string, { quantity: number; pharmacyId: string }>;
  selectedPharmacies: string[];
  showAllPharmacies: boolean;
  onProductSelectChange: (productId: string, quantity: number, pharmacyId: string) => void;
}

const ProductGrid = ({
  products,
  pharmacies,
  selectedProducts,
  selectedPharmacies,
  showAllPharmacies,
  onProductSelectChange
}: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getFilteredProducts = () => {
    let filteredProducts = products;

    // Filter by pharmacy selection - show all products if no specific pharmacies selected or showAllPharmacies is true
    if (!showAllPharmacies && selectedPharmacies.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.pharmacies.some(pharmacyId => selectedPharmacies.includes(pharmacyId))
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.type.toLowerCase().includes(searchLower) ||
        `thc ${product.thcPercentage}%`.includes(searchLower) ||
        `cbd ${product.cbdPercentage}%`.includes(searchLower)
      );
    }

    return filteredProducts;
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div>
      {/* Strain Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Sorten suchen</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Nach Sortenname, Beschreibung, THC/CBD-Gehalt suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {searchTerm && (
          <p className="text-sm text-muted-foreground mt-1">
            Suche nach: "{searchTerm}"
          </p>
        )}
      </div>

      <h3 className="font-semibold text-lg mb-4">
        Verfügbare Sorten ({filteredProducts.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          // Filter available pharmacies based on user selection
          const productPharmacies = pharmacies.filter(p => product.pharmacies.includes(p.id));
          const filteredPharmacies = showAllPharmacies 
            ? productPharmacies 
            : selectedPharmacies.length > 0 
              ? productPharmacies.filter(pharmacy => selectedPharmacies.includes(pharmacy.id))
              : productPharmacies; // Show all pharmacies if none selected

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

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm 
              ? `Keine Sorten gefunden für "${searchTerm}"`
              : "Keine Sorten verfügbar"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
