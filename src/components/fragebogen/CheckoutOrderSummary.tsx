import { logger } from "@/lib/logger";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

interface CheckoutOrderSummaryProps {
  selectedProducts: Record<string, { quantity: number; pharmacyId: string }>;
  products: Product[];
  pharmacies: Pharmacy[];
}

const CheckoutOrderSummary = ({ selectedProducts, products, pharmacies }: CheckoutOrderSummaryProps) => {
  logger.debug("=== CheckoutOrderSummary Debug ===");
  logger.debug("Selected products:", selectedProducts);
  logger.debug("Available products:", products);
  logger.debug("Available pharmacies:", pharmacies);

  const getProductPrice = (product: Product) => {
    if (product.type === "flower" && product.pricePerGram) {
      return product.pricePerGram;
    }
    if (product.type === "extract" && product.pricePerBottle) {
      return product.pricePerBottle;
    }
    return 12.5; // Fallback price
  };

  const getProductUnit = (product: Product) => {
    return product.type === "flower" ? "g" : "Flasche";
  };

  const calculateProductTotal = (product: Product, quantity: number) => {
    const price = getProductPrice(product);
    return price * quantity;
  };

  const getProductsSubtotal = () => {
    let subtotal = 0;
    
    Object.entries(selectedProducts).forEach(([productId, selection]) => {
      logger.debug(`Calculating subtotal for product ID: ${productId}`, selection);
      
      const product = products.find(p => p.id === productId);
      logger.debug(`Found product:`, product);
      
      if (product && selection.quantity > 0) {
        const productTotal = calculateProductTotal(product, selection.quantity);
        subtotal += productTotal;
        logger.debug(`Product ${product.name}: ${selection.quantity} x ${getProductPrice(product)} = ${productTotal}`);
      } else {
        logger.debug(`Product ${productId} not found or quantity is 0`);
      }
    });
    
    logger.debug("Final subtotal:", subtotal);
    return subtotal;
  };

  const selectedItems = Object.entries(selectedProducts).filter(([_, selection]) => selection.quantity > 0);
  logger.debug("Selected items after filtering:", selectedItems);

  if (selectedItems.length === 0) {
    logger.debug("No selected items, showing empty state");
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ihre Produktauswahl</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Keine Produkte ausgewählt.
          </p>
        </CardContent>
      </Card>
    );
  }

  const subtotal = getProductsSubtotal();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ihre Produktauswahl</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt</TableHead>
                <TableHead>Apotheke</TableHead>
                <TableHead className="text-center">Menge</TableHead>
                <TableHead className="text-right">Einzelpreis</TableHead>
                <TableHead className="text-right">Gesamtpreis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedItems.map(([productId, selection]) => {
                const product = products.find(p => p.id === productId);
                const pharmacy = pharmacies.find(p => p.id === selection.pharmacyId);
                
                logger.debug(`Rendering product ${productId}:`, product, "pharmacy:", pharmacy);
                
                if (!product) {
                  logger.debug(`Product ${productId} not found, skipping render`);
                  return null;
                }

                const unitPrice = getProductPrice(product);
                const totalPrice = calculateProductTotal(product, selection.quantity);
                const unit = getProductUnit(product);

                return (
                  <TableRow key={productId}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{product.name}</div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {product.type === "flower" ? "Blüte" : "Extrakt"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            THC: {product.thcPercentage}%
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            CBD: {product.cbdPercentage}%
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{pharmacy?.name || "Unbekannte Apotheke"}</div>
                        <div className="text-muted-foreground">{pharmacy?.city}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {selection.quantity} {unit}
                    </TableCell>
                    <TableCell className="text-right">
                      {unitPrice.toFixed(2)} € / {unit}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {totalPrice.toFixed(2)} €
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Zwischensumme Produkte:</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Rezeptgebühr:</span>
              <span>14,99 €</span>
            </div>
            {subtotal < 100 && (
              <div className="flex justify-between text-sm">
                <span>Versandkosten:</span>
                <span>10,00 €</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Gesamtbetrag:</span>
              <span>
                {(subtotal + 14.99 + (subtotal < 100 ? 10 : 0)).toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutOrderSummary;
