
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Clock } from "lucide-react";

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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  selectedPharmacyId?: string;
  availablePharmacies: Pharmacy[];
  onQuantityChange: (quantity: number, pharmacyId: string) => void;
}

const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  quantity,
  selectedPharmacyId,
  availablePharmacies,
  onQuantityChange
}: ProductDetailModalProps) => {
  if (!product) return null;

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

  const handleQuantityChange = (newQuantity: number) => {
    const pharmacyId = selectedPharmacyId || availablePharmacies[0]?.id || "";
    onQuantityChange(newQuantity, pharmacyId);
  };

  const step = getQuantityStep(product.type);
  const maxQty = getMaxQuantity(product.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="object-cover w-full h-full"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-cannabis-green-500 text-white text-sm rounded-full">
                {product.type === "flower" ? "Blüte" : "Extrakt"}
              </div>
            </div>
            
            {/* Effects */}
            {product.effects && product.effects.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Wirkungsweise</h4>
                <div className="flex flex-wrap gap-2">
                  {product.effects.map((effect, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Terpenes */}
            {product.terpenes && product.terpenes.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Terpenprofil</h4>
                <div className="flex flex-wrap gap-2">
                  {product.terpenes.map((terpene, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {terpene}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            {/* Price and THC/CBD */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-cannabis-green-50 dark:bg-cannabis-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-cannabis-green-600 dark:text-cannabis-green-400">
                  {product.type === "flower" && product.pricePerGram && `${product.pricePerGram.toFixed(2)} €/g`}
                  {product.type === "extract" && product.pricePerBottle && `${product.pricePerBottle.toFixed(2)} €/Fl.`}
                </div>
                <div className="text-sm text-muted-foreground">Preis</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">THC:</span>
                  <span className="font-bold text-purple-600">{product.thcPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">CBD:</span>
                  <span className="font-bold text-green-600">{product.cbdPercentage}%</span>
                </div>
                {product.type === "extract" && product.bottleSize && (
                  <div className="flex justify-between">
                    <span className="font-medium">Größe:</span>
                    <span>{product.bottleSize}ml</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Beschreibung</h4>
              <p className="text-sm text-muted-foreground">
                {product.detailDescription || product.description}
              </p>
            </div>
            
            {/* Available Pharmacies */}
            <div>
              <h4 className="font-semibold mb-3">Verfügbare Apotheken</h4>
              <div className="space-y-3 max-h-32 overflow-y-auto">
                {availablePharmacies.map((pharmacy) => (
                  <div key={pharmacy.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{pharmacy.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="mr-3">{pharmacy.city}</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="mr-3">{pharmacy.deliveryTime}</span>
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        <span>{pharmacy.rating}</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {product.type === "flower" && product.pricePerGram && `${product.pricePerGram.toFixed(2)} €/g`}
                      {product.type === "extract" && product.pricePerBottle && `${product.pricePerBottle.toFixed(2)} €/Fl.`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quantity Selection */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Menge auswählen</h4>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
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
                  className="text-center w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(Math.min(maxQty, quantity + step))}
                  disabled={quantity >= maxQty}
                >
                  +
                </Button>
                
                <div className="ml-auto">
                  {quantity > 0 && (
                    <div className="text-center">
                      <div className="font-semibold">
                        {product.type === "flower" && product.pricePerGram && (product.pricePerGram * quantity).toFixed(2)} 
                        {product.type === "extract" && product.pricePerBottle && (product.pricePerBottle * quantity).toFixed(2)} €
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getQuantityLabel(product, quantity)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
