import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductDetailModal from "./ProductDetailModal";

interface Product {
  id: string;
  name: string;
  type: "flower" | "extract";
  genetics: "indica" | "sativa" | "hybrid";
  thcPercentage: number;
  cbdPercentage: number;
  pricePerGram?: number;
  pricePerBottle?: number;
  bottleSize?: number;
  description: string;
  detailDescription?: string;
  effects?: string[];
  terpenes?: string[];
  image: string;
  pharmacies: string[];
}

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

interface ProductCardProps {
  product: Product;
  quantity: number;
  selectedPharmacyId?: string;
  availablePharmacies: Pharmacy[];
  onQuantityChange: (quantity: number, pharmacyId: string) => void;
}

const ProductCard = ({
  product,
  quantity,
  selectedPharmacyId,
  availablePharmacies,
  onQuantityChange
}: ProductCardProps) => {
  const [localPharmacyId, setLocalPharmacyId] = useState(
    selectedPharmacyId || availablePharmacies[0]?.id || ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getGeneticsColor = (genetics: string) => {
    switch (genetics) {
      case "indica":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "sativa":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "hybrid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getGeneticsLabel = (genetics: string) => {
    switch (genetics) {
      case "indica":
        return "Indica";
      case "sativa":
        return "Sativa";
      case "hybrid":
        return "Hybrid";
      default:
        return genetics;
    }
  };

  const getQuantityStep = (productType: "flower" | "extract") => {
    return productType === "flower" ? 5 : 1;
  };

  const getMaxQuantity = (productType: "flower" | "extract") => {
    return productType === "flower" ? 100 : 10;
  };

  const getQuantityLabel = (product: Product, quantity: number) => {
    if (product.type === "flower") {
      return `${quantity}g`;
    } else {
      return `${quantity} Flasche${quantity !== 1 ? 'n' : ''} à ${product.bottleSize}ml`;
    }
  };

  const getSubtotal = () => {
    if (product.type === "flower" && product.pricePerGram) {
      return product.pricePerGram * quantity;
    } else if (product.type === "extract" && product.pricePerBottle) {
      return product.pricePerBottle * quantity;
    }
    return 0;
  };

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(newQuantity, localPharmacyId);
  };

  const handlePharmacyChange = (pharmacyId: string) => {
    setLocalPharmacyId(pharmacyId);
    if (quantity > 0) {
      onQuantityChange(quantity, pharmacyId);
    }
  };

  const step = getQuantityStep(product.type);
  const maxQty = getMaxQuantity(product.type);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('.select-trigger')) {
      return;
    }
    setIsModalOpen(true);
  };

  // Enhanced product data with additional details
  const enhancedProduct = {
    ...product,
    detailDescription: product.detailDescription || `${product.description} Diese Sorte wird sorgfältig ausgewählt und kontrolliert angebaut, um gleichbleibende Qualität und Wirksamkeit zu gewährleisten.`,
    effects: product.effects || (product.type === "flower" 
      ? ["Schmerzlinderung", "Entspannung", "Schlaffördernd"] 
      : ["Langanhaltend", "Präzise Dosierung", "Schnelle Wirkung"]),
    terpenes: product.terpenes || ["Myrcen", "Limonen", "Caryophyllen"]
  };

  return (
    <>
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={handleCardClick}>
        <div className="flex flex-col h-full">
          <div className="aspect-[4/3] relative bg-gray-100 dark:bg-gray-800">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 px-2 py-1 bg-cannabis-green-500 text-white text-xs rounded-full">
              {product.type === "flower" ? "Blüte" : "Extrakt"}
            </div>
          </div>
          
          <CardContent className="p-4 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <div className="text-cannabis-green-600 dark:text-cannabis-green-400 font-bold text-sm">
                {product.type === "flower" && product.pricePerGram && `${product.pricePerGram.toFixed(2)} €/g`}
                {product.type === "extract" && product.pricePerBottle && `${product.pricePerBottle.toFixed(2)} €/Fl.`}
              </div>
            </div>

            {/* Genetics Badge */}
            <div className="mb-3">
              <Badge className={`text-xs ${getGeneticsColor(product.genetics)}`}>
                {getGeneticsLabel(product.genetics)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div>
                <span className="font-medium">THC:</span> {product.thcPercentage}%
              </div>
              <div>
                <span className="font-medium">CBD:</span> {product.cbdPercentage}%
              </div>
            </div>
            
            {product.type === "extract" && product.bottleSize && (
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                <span className="font-medium">Flaschengröße:</span> {product.bottleSize}ml
              </div>
            )}
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
              {product.description}
            </p>

            {/* Pharmacy Selection */}
            {availablePharmacies.length > 1 && (
              <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                <label className="text-sm font-medium mb-2 block">Apotheke wählen:</label>
                <Select value={localPharmacyId} onValueChange={handlePharmacyChange}>
                  <SelectTrigger className="w-full select-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePharmacies.map((pharmacy) => (
                      <SelectItem key={pharmacy.id} value={pharmacy.id}>
                        {pharmacy.name} - {pharmacy.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {availablePharmacies.length === 1 && (
              <div className="mb-4">
                <Badge variant="outline" className="text-xs">
                  Nur bei: {availablePharmacies[0].name}
                </Badge>
              </div>
            )}

            {availablePharmacies.length === 0 && (
              <div className="mb-4">
                <Badge variant="destructive" className="text-xs">
                  Nicht in ausgewählten Apotheken verfügbar
                </Badge>
              </div>
            )}
            
            <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3"
                  onClick={() => handleQuantityChange(Math.max(0, quantity - step))}
                  disabled={quantity === 0 || availablePharmacies.length === 0}
                >
                  -
                </Button>
                
                <Input
                  type="number"
                  min={0}
                  max={maxQty}
                  step={step}
                  value={quantity}
                  onChange={(e) => {
                    const newValue = Math.min(maxQty, Math.max(0, parseInt(e.target.value) || 0));
                    const roundedValue = product.type === "flower" 
                      ? Math.round(newValue / step) * step 
                      : newValue;
                    handleQuantityChange(roundedValue);
                  }}
                  className="mx-2 text-center w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  disabled={availablePharmacies.length === 0}
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3"
                  onClick={() => handleQuantityChange(Math.min(maxQty, quantity + step))}
                  disabled={quantity >= maxQty || availablePharmacies.length === 0}
                >
                  +
                </Button>
                
                <div className="ml-auto font-semibold">
                  {getSubtotal().toFixed(2)} €
                </div>
              </div>
              
              {quantity > 0 && (
                <div className="text-xs text-muted-foreground mt-1 text-center">
                  {getQuantityLabel(product, quantity)}
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>

      <ProductDetailModal
        product={enhancedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quantity={quantity}
        selectedPharmacyId={selectedPharmacyId}
        availablePharmacies={availablePharmacies}
        onQuantityChange={onQuantityChange}
      />
    </>
  );
};

export default ProductCard;
