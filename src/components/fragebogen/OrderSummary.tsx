
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
  selectedProducts: Record<string, { quantity: number; pharmacyId: string }>;
  onNext: () => void;
}

const OrderSummary = ({ selectedProducts, onNext }: OrderSummaryProps) => {
  const getTotalProducts = () => {
    return Object.values(selectedProducts).filter(item => item.quantity > 0).length;
  };

  const canProceed = getTotalProducts() > 0;

  if (canProceed) {
    return (
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
    );
  }

  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">
        Bitte wähle mindestens ein Produkt aus, um fortzufahren.
      </p>
    </div>
  );
};

export default OrderSummary;
