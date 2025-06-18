
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Clock } from "lucide-react";

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

  const getGeneticsDescription = (genetics: string) => {
    switch (genetics) {
      case "indica":
        return "Entspannend und beruhigend, ideal für den Abend";
      case "sativa":
        return "Energetisierend und fokussierend, ideal für den Tag";
      case "hybrid":
        return "Ausgewogene Mischung aus entspannenden und energetisierenden Eigenschaften";
      default:
        return "";
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

  const handleQuantityChange = (newQuantity: number) => {
    const pharmacyId = selectedPharmacyId || availablePharmacies[0]?.id || "";
    onQuantityChange(newQuantity, pharmacyId);
  };

  const step = getQuantityStep(product.type);
  const maxQty = getMaxQuantity(product.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left Column - Image and Product Info */}
            <div className="space-y-3">
              <div className="aspect-[4/3] relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-cannabis-green-500 text-white text-sm rounded-full">
                  {product.type === "flower" ? "Blüte" : "Extrakt"}
                </div>
              </div>
              
              {/* Product Info Grid */}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-2 bg-cannabis-green-50 dark:bg-cannabis-green-900/20 rounded">
                  <div className="font-bold text-cannabis-green-600 dark:text-cannabis-green-400 text-xs">
                    {product.type === "flower" && product.pricePerGram && `${product.pricePerGram.toFixed(2)} €/g`}
                    {product.type === "extract" && product.pricePerBottle && `${product.pricePerBottle.toFixed(2)} €/Fl.`}
                  </div>
                  <div className="text-xs text-muted-foreground">Preis</div>
                </div>
                
                <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <div className="font-bold text-purple-600 text-xs">{product.thcPercentage}%</div>
                  <div className="text-xs text-muted-foreground">THC</div>
                </div>
                
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="font-bold text-green-600 text-xs">{product.cbdPercentage}%</div>
                  <div className="text-xs text-muted-foreground">CBD</div>
                </div>
              </div>

              {product.type === "extract" && product.bottleSize && (
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
                  <span className="font-medium">Flaschengröße: {product.bottleSize}ml</span>
                </div>
              )}
              
              {/* Genetics and Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getGeneticsColor(product.genetics)}`}>
                    {getGeneticsLabel(product.genetics)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {getGeneticsDescription(product.genetics)}
                </p>
              </div>
              
              {/* Effects and Terpenes */}
              {(product.effects && product.effects.length > 0) || (product.terpenes && product.terpenes.length > 0) ? (
                <div className="grid grid-cols-1 gap-2">
                  {product.effects && product.effects.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium mb-1">Wirkung</h5>
                      <div className="flex flex-wrap gap-1">
                        {product.effects.slice(0, 4).map((effect, index) => (
                          <Badge key={index} variant="secondary" className="text-xs py-0 px-1">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {product.terpenes && product.terpenes.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium mb-1">Terpene</h5>
                      <div className="flex flex-wrap gap-1">
                        {product.terpenes.slice(0, 4).map((terpene, index) => (
                          <Badge key={index} variant="outline" className="text-xs py-0 px-1">
                            {terpene}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            
            {/* Right Column - Description, Pharmacies and Quantity */}
            <div className="space-y-3 flex flex-col min-h-0">
              {/* Description */}
              <div>
                <h4 className="text-sm font-medium mb-2">Beschreibung</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.detailDescription || product.description}
                </p>
              </div>
              
              {/* Available Pharmacies */}
              <div className="flex-1 min-h-0">
                <h4 className="text-sm font-medium mb-2">Verfügbare Apotheken</h4>
                <div className="space-y-2 overflow-y-auto max-h-60">
                  {availablePharmacies.map((pharmacy) => (
                    <div key={pharmacy.id} className="flex items-center justify-between p-2 border rounded text-xs">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{pharmacy.name}</div>
                        <div className="flex items-center text-muted-foreground mt-0.5 text-xs">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate mr-2">{pharmacy.city}</span>
                          <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate mr-2">{pharmacy.deliveryTime}</span>
                          <Star className="w-3 h-3 mr-1 text-yellow-400 flex-shrink-0" />
                          <span>{pharmacy.rating}</span>
                        </div>
                      </div>
                      <div className="text-xs font-medium ml-2 flex-shrink-0">
                        {product.type === "flower" && product.pricePerGram && `${product.pricePerGram.toFixed(2)} €/g`}
                        {product.type === "extract" && product.pricePerBottle && `${product.pricePerBottle.toFixed(2)} €/Fl.`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selection */}
              <div className="border-t pt-3">
                <h4 className="text-sm font-medium mb-2">Menge auswählen</h4>
                
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(Math.max(0, quantity - step))}
                    disabled={quantity === 0}
                    className="h-8 w-8 p-0 text-xs"
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
                    className="text-center h-8 flex-1 text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(Math.min(maxQty, quantity + step))}
                    disabled={quantity >= maxQty}
                    className="h-8 w-8 p-0 text-xs"
                  >
                    +
                  </Button>
                  
                  {quantity > 0 && (
                    <div className="ml-2 text-right">
                      <div className="font-semibold text-sm">
                        {product.type === "flower" && product.pricePerGram && (product.pricePerGram * quantity).toFixed(2)} 
                        {product.type === "extract" && product.pricePerBottle && (product.pricePerBottle * quantity).toFixed(2)} €
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getQuantityLabel(product, quantity)}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {product.type === "flower" 
                    ? `Schritte: ${step}g (max. ${maxQty}g)`
                    : `Schritte: ${step} Flasche (max. ${maxQty} Flaschen)`
                  }
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
