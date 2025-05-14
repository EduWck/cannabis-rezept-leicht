
import { Truck, Package, FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DeliveryOptionsStepProps {
  selectedOption: string;
  onSelect: (option: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DeliveryOptionsStep = ({ selectedOption, onSelect, onNext, onBack }: DeliveryOptionsStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Falls ein Rezept ausgestellt wird, wie möchtest du deine Medikamente erhalten?</h2>
      
      <RadioGroup value={selectedOption} onValueChange={onSelect} className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className={`rounded-lg border ${selectedOption === "courier" ? "border-cannabis-green-500 ring-2 ring-cannabis-green-300" : "border-gray-200 dark:border-gray-700"}`}>
          <Label htmlFor="option-courier" className="cursor-pointer block h-full">
            <Card className="border-0 h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <RadioGroupItem value="courier" id="option-courier" className="sr-only" />
                <div className="flex-1 space-y-2 text-center py-4">
                  <div className="mx-auto rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 w-16 h-16 flex items-center justify-center mb-2">
                    <Truck className="w-8 h-8 text-cannabis-green-600 dark:text-cannabis-green-400" />
                  </div>
                  <h3 className="font-medium text-lg">Rezept + Kurier</h3>
                  <p className="text-muted-foreground text-sm">Lieferzeit: 60-90 Minuten</p>
                  <p className="mt-2 text-sm">Schnelle Lieferung durch einen Kurier direkt zu dir nach Hause</p>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div className={`rounded-lg border ${selectedOption === "shipping" ? "border-cannabis-green-500 ring-2 ring-cannabis-green-300" : "border-gray-200 dark:border-gray-700"}`}>
          <Label htmlFor="option-shipping" className="cursor-pointer block h-full">
            <Card className="border-0 h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <RadioGroupItem value="shipping" id="option-shipping" className="sr-only" />
                <div className="flex-1 space-y-2 text-center py-4">
                  <div className="mx-auto rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 w-16 h-16 flex items-center justify-center mb-2">
                    <Package className="w-8 h-8 text-cannabis-green-600 dark:text-cannabis-green-400" />
                  </div>
                  <h3 className="font-medium text-lg">Rezept + Versand</h3>
                  <p className="text-muted-foreground text-sm">Lieferzeit: 1-3 Tage</p>
                  <p className="mt-2 text-sm">Standard-Versand per Post in diskreter Verpackung</p>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div className={`rounded-lg border ${selectedOption === "prescription-only" ? "border-cannabis-green-500 ring-2 ring-cannabis-green-300" : "border-gray-200 dark:border-gray-700"}`}>
          <Label htmlFor="option-prescription-only" className="cursor-pointer block h-full">
            <Card className="border-0 h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <RadioGroupItem value="prescription-only" id="option-prescription-only" className="sr-only" />
                <div className="flex-1 space-y-2 text-center py-4">
                  <div className="mx-auto rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 w-16 h-16 flex items-center justify-center mb-2">
                    <FileText className="w-8 h-8 text-cannabis-green-600 dark:text-cannabis-green-400" />
                  </div>
                  <h3 className="font-medium text-lg">Nur Rezept</h3>
                  <p className="text-muted-foreground text-sm">Keine Lieferung</p>
                  <p className="mt-2 text-sm">Rezept bei einer Apotheke deiner Wahl einlösen</p>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>
      </RadioGroup>

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
          disabled={!selectedOption}
          className="py-6 px-8"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
};

export default DeliveryOptionsStep;
