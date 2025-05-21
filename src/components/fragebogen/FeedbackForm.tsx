
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FeedbackFormProps {
  onComplete: () => void;
  onBack: () => void;
}

const FeedbackForm = ({ onComplete, onBack }: FeedbackFormProps) => {
  const [currentMedication, setCurrentMedication] = useState("");
  const [effectivenessRating, setEffectivenessRating] = useState<string | null>(null);
  const [sideEffects, setSideEffects] = useState<Record<string, boolean>>({
    drowsiness: false,
    dizziness: false,
    dryMouth: false,
    increasedAppetite: false,
    anxiety: false,
    paranoia: false,
    none: false,
  });
  const [improvements, setImprovements] = useState("");

  const handleSideEffectChange = (effect: string, checked: boolean) => {
    if (effect === "none" && checked) {
      // If "none" is selected, uncheck all other options
      setSideEffects(prev => {
        const newState = { ...prev };
        Object.keys(newState).forEach(key => {
          newState[key] = key === "none";
        });
        return newState;
      });
    } else if (checked && sideEffects.none) {
      // If any other option is selected and "none" was previously selected,
      // uncheck "none"
      setSideEffects(prev => ({
        ...prev,
        [effect]: checked,
        none: false,
      }));
    } else {
      // Update only the changed effect
      setSideEffects(prev => ({
        ...prev,
        [effect]: checked,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h2 className="text-2xl font-bold text-center">Feedback zu Ihrer aktuellen Behandlung</h2>
      <p className="text-center text-gray-500 mb-8">
        Um Ihre aktuelle Behandlung zu verbessern, benötigen wir einige Informationen über Ihre Erfahrungen mit der bisherigen Medikation.
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="currentMedication" className="text-base font-medium">
                Beschreiben Sie Ihre aktuelle Medikation (Produkte, Dosierung, Häufigkeit)
              </Label>
              <Textarea
                id="currentMedication"
                value={currentMedication}
                onChange={(e) => setCurrentMedication(e.target.value)}
                className="mt-2"
                rows={4}
                placeholder="z.B. Cannabisblüte THC18, 0.1g zweimal täglich..."
              />
            </div>
            
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Wie bewerten Sie die Wirksamkeit Ihrer aktuellen Behandlung?
              </Label>
              <RadioGroup
                value={effectivenessRating || ""}
                onValueChange={setEffectivenessRating}
                className="grid grid-cols-1 gap-4 sm:grid-cols-5"
              >
                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="1" id="r1" className="self-center" />
                  <Label htmlFor="r1">Nicht wirksam</Label>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="2" id="r2" className="self-center" />
                  <Label htmlFor="r2">Kaum wirksam</Label>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="3" id="r3" className="self-center" />
                  <Label htmlFor="r3">Mäßig wirksam</Label>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="4" id="r4" className="self-center" />
                  <Label htmlFor="r4">Gut wirksam</Label>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="5" id="r5" className="self-center" />
                  <Label htmlFor="r5">Sehr wirksam</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Haben Sie Nebenwirkungen erlebt? (Mehrfachauswahl möglich)
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="drowsiness" 
                    checked={sideEffects.drowsiness}
                    onCheckedChange={(checked) => handleSideEffectChange("drowsiness", checked === true)}
                  />
                  <Label htmlFor="drowsiness">Schläfrigkeit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dizziness" 
                    checked={sideEffects.dizziness}
                    onCheckedChange={(checked) => handleSideEffectChange("dizziness", checked === true)}
                  />
                  <Label htmlFor="dizziness">Schwindel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dryMouth" 
                    checked={sideEffects.dryMouth}
                    onCheckedChange={(checked) => handleSideEffectChange("dryMouth", checked === true)}
                  />
                  <Label htmlFor="dryMouth">Mundtrockenheit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="increasedAppetite" 
                    checked={sideEffects.increasedAppetite}
                    onCheckedChange={(checked) => handleSideEffectChange("increasedAppetite", checked === true)}
                  />
                  <Label htmlFor="increasedAppetite">Gesteigerter Appetit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="anxiety" 
                    checked={sideEffects.anxiety}
                    onCheckedChange={(checked) => handleSideEffectChange("anxiety", checked === true)}
                  />
                  <Label htmlFor="anxiety">Angstzustände</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="paranoia" 
                    checked={sideEffects.paranoia}
                    onCheckedChange={(checked) => handleSideEffectChange("paranoia", checked === true)}
                  />
                  <Label htmlFor="paranoia">Paranoia</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="none" 
                    checked={sideEffects.none}
                    onCheckedChange={(checked) => handleSideEffectChange("none", checked === true)}
                  />
                  <Label htmlFor="none">Keine Nebenwirkungen</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="improvements" className="text-base font-medium">
                Haben Sie Vorschläge zur Verbesserung Ihrer Behandlung?
              </Label>
              <Textarea
                id="improvements"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                className="mt-2"
                rows={4}
                placeholder="Ihre Vorschläge und Wünsche für die zukünftige Behandlung..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-8">
        <Button 
          type="button"
          variant="outline" 
          onClick={onBack}
          className="py-6 px-8"
        >
          Zurück
        </Button>
        
        <Button 
          type="submit"
          className="py-6 px-8"
          disabled={!effectivenessRating}
        >
          Weiter zur Produktauswahl
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
