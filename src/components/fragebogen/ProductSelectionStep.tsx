
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  type: "flower" | "extract";
  thcPercentage: number;
  cbdPercentage: number;
  pricePerGram?: number; // Nur für Cannabis-Blüten
  pricePerBottle?: number; // Nur für Extrakte
  bottleSize?: number; // ml pro Flasche für Extrakte
  description: string;
  image: string;
}

interface ProductSelectionStepProps {
  selectedProducts: Record<string, { quantity: number }>;
  onProductSelectChange: (productId: string, quantity: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProductSelectionStep = ({
  selectedProducts,
  onProductSelectChange,
  onNext,
  onBack
}: ProductSelectionStepProps) => {
  // Aktualisierte Produktdaten ohne CBD Öle
  const products: Product[] = [
    {
      id: "p1",
      name: "Bedrocan",
      type: "flower",
      thcPercentage: 22,
      cbdPercentage: 0.1,
      pricePerGram: 12.5,
      description: "Eine der beliebtesten medizinischen Sorten mit verlässlichem THC-Gehalt.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "p2",
      name: "Bediol",
      type: "flower",
      thcPercentage: 6.3,
      cbdPercentage: 8,
      pricePerGram: 10.25,
      description: "Ausgewogenes THC-CBD-Verhältnis für eine mildere Wirkung.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "p3",
      name: "Pedanios 22/1",
      type: "flower",
      thcPercentage: 22,
      cbdPercentage: 1,
      pricePerGram: 13.75,
      description: "Indicalastige Sorte für abendliche Anwendung und Schlafstörungen.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "p4",
      name: "Aurora 20/1",
      type: "flower",
      thcPercentage: 20,
      cbdPercentage: 1,
      pricePerGram: 11.90,
      description: "Sativa-dominant mit klarer Wirkung für den Tag.",
      image: "https://via.placeholder.com/150"
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
      image: "https://via.placeholder.com/150"
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
      image: "https://via.placeholder.com/150"
    }
  ];

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      const quantity = selectedProducts[product.id]?.quantity || 0;
      if (product.type === "flower" && product.pricePerGram) {
        return total + (product.pricePerGram * quantity);
      } else if (product.type === "extract" && product.pricePerBottle) {
        return total + (product.pricePerBottle * quantity);
      }
      return total;
    }, 0);
  };
  
  const totalPrice = getTotalPrice();
  const totalQuantity = Object.values(selectedProducts).reduce((sum, item) => sum + item.quantity, 0);
  const canProceed = totalQuantity > 0;

  const getQuantityStep = (productType: "flower" | "extract") => {
    return productType === "flower" ? 5 : 1; // Gramm für Blüten, Flaschen für Extrakte
  };

  const getMaxQuantity = (productType: "flower" | "extract") => {
    return productType === "flower" ? 100 : 10; // 100g max für Blüten, 10 Flaschen max für Extrakte
  };

  const getQuantityLabel = (product: Product, quantity: number) => {
    if (product.type === "flower") {
      return `${quantity}g`;
    } else {
      return `${quantity} Flasche${quantity !== 1 ? 'n' : ''} à ${product.bottleSize}ml`;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Produktauswahl</h2>
      <p className="text-center text-muted-foreground">
        Wähle aus unseren verfügbaren Cannabis-Produkten. Für Blüten zwischen 5g und 100g, für Extrakte einzelne Flaschen.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {products.map((product) => {
          const quantity = selectedProducts[product.id]?.quantity || 0;
          const subtotal = product.type === "flower" && product.pricePerGram 
            ? product.pricePerGram * quantity 
            : product.type === "extract" && product.pricePerBottle 
            ? product.pricePerBottle * quantity 
            : 0;
          
          const step = getQuantityStep(product.type);
          const maxQty = getMaxQuantity(product.type);
          
          return (
            <Card key={product.id} className="overflow-hidden">
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
                    <div className="text-cannabis-green-600 dark:text-cannabis-green-400 font-bold">
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
                  
                  <div className="mt-auto">
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                        onClick={() => onProductSelectChange(product.id, Math.max(0, quantity - step))}
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
                          // Für Blüten auf 5er-Schritte runden
                          const roundedValue = product.type === "flower" 
                            ? Math.round(newValue / step) * step 
                            : newValue;
                          onProductSelectChange(product.id, roundedValue);
                        }}
                        className="mx-2 text-center w-20"
                      />
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                        onClick={() => onProductSelectChange(product.id, Math.min(maxQty, quantity + step))}
                        disabled={quantity >= maxQty}
                      >
                        +
                      </Button>
                      
                      <div className="ml-auto font-semibold">
                        {subtotal.toFixed(2)} €
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
        })}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-6">
        <div className="flex justify-between text-lg font-medium">
          <span>Gesamt:</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Zusätzlich: 14,99 € Rezeptgebühr
          {totalPrice < 100 && (
            <span> + 10,00 € Versandkosten (entfallen ab 100 €)</span>
          )}
        </div>
        
        <div className="text-lg font-bold mt-2 flex justify-between">
          <span>Gesamtsumme:</span>
          <span>
            {(totalPrice + 14.99 + (totalPrice < 100 ? 10 : 0)).toFixed(2)} €
          </span>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="py-6 px-8"
        >
          Zurück
        </Button>
        
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
          className="py-6 px-8"
        >
          Weiter zum Checkout
        </Button>
      </div>
    </div>
  );
};

export default ProductSelectionStep;
