
import { FileText, Video, MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TreatmentTypeStepProps {
  selectedType: string;
  onSelect: (type: string) => void;
  onNext: () => void;
}

const TreatmentTypeStep = ({ selectedType, onSelect, onNext }: TreatmentTypeStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Wähle deine gewünschte Behandlungsart</h2>
      
      <RadioGroup value={selectedType} onValueChange={onSelect} className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className={`rounded-lg border ${selectedType === "fragebogen" ? "border-cannabis-green-500 ring-2 ring-cannabis-green-300" : "border-gray-200 dark:border-gray-700"}`}>
          <Label htmlFor="option-fragebogen" className="cursor-pointer block h-full">
            <Card className="border-0 h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <RadioGroupItem value="fragebogen" id="option-fragebogen" className="sr-only" />
                <div className="flex-1 space-y-2 text-center py-4">
                  <div className="mx-auto rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 w-16 h-16 flex items-center justify-center mb-2">
                    <FileText className="w-8 h-8 text-cannabis-green-600 dark:text-cannabis-green-400" />
                  </div>
                  <h3 className="font-medium text-lg">Online-Fragebogen</h3>
                  <p className="text-muted-foreground text-sm">Schneller digitaler Prozess</p>
                  <p className="font-bold mt-2 text-lg">4,99 €</p>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div className={`rounded-lg border ${selectedType === "video" ? "border-cannabis-green-500 ring-2 ring-cannabis-green-300" : "border-gray-200 dark:border-gray-700"}`}>
          <Label htmlFor="option-video" className="cursor-pointer block h-full">
            <Card className="border-0 h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <RadioGroupItem value="video" id="option-video" className="sr-only" />
                <div className="flex-1 space-y-2 text-center py-4">
                  <div className="mx-auto rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 w-16 h-16 flex items-center justify-center mb-2">
                    <Video className="w-8 h-8 text-cannabis-green-600 dark:text-cannabis-green-400" />
                  </div>
                  <h3 className="font-medium text-lg">Video-Sprechstunde</h3>
                  <p className="text-muted-foreground text-sm">Persönliches Gespräch</p>
                  <p className="font-bold mt-2 text-lg">49,99 €</p>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div className={`rounded-lg border ${selectedType === "vor-ort" ? "border-cannabis-green-500 ring-2 ring-cannabis-green-300" : "border-gray-200 dark:border-gray-700"}`}>
          <Label htmlFor="option-vor-ort" className="cursor-pointer block h-full">
            <Card className="border-0 h-full">
              <CardContent className="p-4 flex flex-col h-full">
                <RadioGroupItem value="vor-ort" id="option-vor-ort" className="sr-only" />
                <div className="flex-1 space-y-2 text-center py-4">
                  <div className="mx-auto rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 w-16 h-16 flex items-center justify-center mb-2">
                    <MapPin className="w-8 h-8 text-cannabis-green-600 dark:text-cannabis-green-400" />
                  </div>
                  <h3 className="font-medium text-lg">Vor-Ort-Termin</h3>
                  <p className="text-muted-foreground text-sm">Persönlicher Termin</p>
                  <p className="font-bold mt-2 text-lg">149,99 €</p>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>
      </RadioGroup>

      <div className="flex justify-center mt-8">
        <Button 
          onClick={onNext} 
          disabled={!selectedType}
          className="w-full md:w-1/2 py-6"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
};

export default TreatmentTypeStep;
