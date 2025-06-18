
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

  return (
    <Card className="overflow-hidden">
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
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Apotheke wählen:</label>
              <Select value={localPharmacyId} onValueChange={handlePharmacyChange}>
                <SelectTrigger className="w-full">
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
          
          <div className="mt-auto">
            <div className="flex items-center mb-2">
              <Button
                variant="outline"
                size="sm"
                className="px-3"
                onClick={() => handleQuantityChange(Math.max(0, quantity - step))}
                disabled={quantity === 0}
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
              />
              
              <Button
                variant="outline"
                size="sm"
                className="px-3"
                onClick={() => handleQuantityChange(Math.min(maxQty, quantity + step))}
                disabled={quantity >= maxQty}
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
  );
};

export default ProductCard;
