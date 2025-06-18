
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

  const getTotalPrice = () => {
    if (product.type === "flower" && product.pricePerGram) {
      return product.pricePerGram * quantity;
    } else if (product.type === "extract" && product.pricePerBottle) {
      return product.pricePerBottle * quantity;
    }
    return 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-3">
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Column - Image and Product Info */}
            <div className="space-y-4">
              <div className="aspect-[4/3] relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-cannabis-green-500 text-white text-sm font-medium rounded-full">
                  {product.type === "flower" ? "Blüte" : "Extrakt"}
                </div>
              </div>
              
              {/* Product Info Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-cannabis-green-50 dark:bg-cannabis-green-900/20 rounded-lg">
                  <div className="font-bold text-cannabis-green-600 dark:text-cannabis-green-400 text-sm">
                    {product.type === "flower" && product.pricePerGram && `${product.pricePerGram.toFixed(2)} €/g`}
                    {product.type === "extract" && product.pricePerBottle && `${product.pricePerBottle.toFixed(2)} €/Fl.`}
                  </div>
                  <div className="text-xs text-muted-foreground">Preis</div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="font-bold text-purple-600 text-sm">{product.thcPercentage}%</div>
                  <div className="text-xs text-muted-foreground">THC</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="font-bold text-green-600 text-sm">{product.cbdPercentage}%</div>
                  <div className="text-xs text-muted-foreground">CBD</div>
                </div>
              </div>

              {product.type === "extract" && product.bottleSize && (
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium text-blue-600">Flaschengröße: {product.bottleSize}ml</span>
                </div>
              )}
              
              {/* Genetics and Description */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className={`${getGeneticsColor(product.genetics)}`}>
                    {getGeneticsLabel(product.genetics)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getGeneticsDescription(product.genetics)}
                </p>
              </div>
              
              {/* Effects and Terpenes */}
              {(product.effects && product.effects.length > 0) || (product.terpenes && product.terpenes.length > 0) ? (
                <div className="space-y-3">
                  {product.effects && product.effects.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Wirkung</h5>
                      <div className="flex flex-wrap gap-2">
                        {product.effects.slice(0, 6).map((effect, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {product.terpenes && product.terpenes.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Terpene</h5>
                      <div className="flex flex-wrap gap-2">
                        {product.terpenes.slice(0, 6).map((terpene, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
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
            <div className="flex flex-col h-full">
              {/* Description */}
              <div className="flex-shrink-0 mb-4">
                <h4 className="text-lg font-semibold mb-3">Beschreibung</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.detailDescription || product.description}
                </p>
              </div>
              
              {/* Available Pharmacies */}
              <div className="flex-1 min-h-0 mb-4">
                <h4 className="text-lg font-semibold mb-3">Verfügbare Apotheken</h4>
                <div className="space-y-3 overflow-y-auto max-h-64 pr-2">
                  {availablePharmacies.map((pharmacy) => (
                    <div key={pharmacy.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{pharmacy.name}</div>
                        <div className="flex items-center text-muted-foreground mt-1 text-xs">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate mr-3">{pharmacy.city}</span>
                          <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate mr-3">{pharmacy.deliveryTime}</span>
                          <Star className="w-3 h-3 mr-1 text-yellow-400 flex-shrink-0" />
                          <span>{pharmacy.rating}</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium ml-3 flex-shrink-0">
                        {product.type === "flower" && product.pricePerGram && `${product.pricePerGram.toFixed(2)} €/g`}
                        {product.type === "extract" && product.pricePerBottle && `${product.pricePerBottle.toFixed(2)} €/Fl.`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selection - Fixed at bottom */}
              <div className="flex-shrink-0 border-t bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Menge auswählen</h4>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(Math.max(0, quantity - step))}
                    disabled={quantity === 0}
                    className="h-10 w-10 p-0"
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
                    className="text-center h-10 w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(Math.min(maxQty, quantity + step))}
                    disabled={quantity >= maxQty}
                    className="h-10 w-10 p-0"
                  >
                    +
                  </Button>
                  
                  <div className="flex-1 text-right">
                    {quantity > 0 && (
                      <>
                        <div className="font-bold text-lg text-cannabis-green-600">
                          {getTotalPrice().toFixed(2)} €
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getQuantityLabel(product, quantity)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-2">
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
