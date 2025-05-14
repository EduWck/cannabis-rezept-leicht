
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  type: string;
  thcPercentage: number;
  cbdPercentage: number;
  pricePerGram: number;
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
  // Sample products data
  const products: Product[] = [
    {
      id: "p1",
      name: "Bedrocan",
      type: "Sativa",
      thcPercentage: 22,
      cbdPercentage: 0.1,
      pricePerGram: 12.5,
      description: "Eine der beliebtesten medizinischen Sorten mit verlässlichem THC-Gehalt.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "p2",
      name: "Bediol",
      type: "Hybrid",
      thcPercentage: 6.3,
      cbdPercentage: 8,
      pricePerGram: 10.25,
      description: "Ausgewogenes THC-CBD-Verhältnis für eine mildere Wirkung.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "p3",
      name: "Pedanios 22/1",
      type: "Indica",
      thcPercentage: 22,
      cbdPercentage: 1,
      pricePerGram: 13.75,
      description: "Indicalastige Sorte für abendliche Anwendung und Schlafstörungen.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "p4",
      name: "Aurora 20/1",
      type: "Sativa",
      thcPercentage: 20,
      cbdPercentage: 1,
      pricePerGram: 11.90,
      description: "Sativa-dominant mit klarer Wirkung für den Tag.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "p5",
      name: "Tilray 10:10",
      type: "Hybrid",
      thcPercentage: 10,
      cbdPercentage: 10,
      pricePerGram: 9.95,
      description: "Perfekt ausgewogenes THC-CBD Verhältnis für Einsteiger.",
      image: "https://via.placeholder.com/150"
    }
  ];

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      const quantity = selectedProducts[product.id]?.quantity || 0;
      return total + (product.pricePerGram * quantity);
    }, 0);
  };
  
  const totalPrice = getTotalPrice();
  const totalQuantity = Object.values(selectedProducts).reduce((sum, item) => sum + item.quantity, 0);
  const canProceed = totalQuantity > 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Produktauswahl</h2>
      <p className="text-center text-muted-foreground">
        Wähle aus unseren verfügbaren Cannabis-Blüten. Du kannst zwischen 5g und 100g pro Sorte wählen.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {products.map((product) => {
          const quantity = selectedProducts[product.id]?.quantity || 0;
          const subtotal = product.pricePerGram * quantity;
          
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
                    {product.type}
                  </div>
                </div>
                
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="text-cannabis-green-600 dark:text-cannabis-green-400 font-bold">
                      {product.pricePerGram.toFixed(2)} €/g
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
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                        onClick={() => onProductSelectChange(product.id, Math.max(0, quantity - 5))}
                        disabled={quantity === 0}
                      >
                        -
                      </Button>
                      
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        step={5}
                        value={quantity}
                        onChange={(e) => {
                          const newValue = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                          // Round to nearest 5
                          const roundedValue = Math.round(newValue / 5) * 5;
                          onProductSelectChange(product.id, roundedValue);
                        }}
                        className="mx-2 text-center w-20"
                      />
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                        onClick={() => onProductSelectChange(product.id, Math.min(100, quantity + 5))}
                        disabled={quantity >= 100}
                      >
                        +
                      </Button>
                      
                      <div className="ml-auto font-semibold">
                        {subtotal.toFixed(2)} €
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-6">
        <div className="flex justify-between text-lg font-medium">
          <span>Gesamt ({totalQuantity}g):</span>
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
