
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

interface SymptomsStepProps {
  symptoms: {
    chronicPain: boolean;
    sleepDisorder: boolean;
    adhd: boolean;
    migraine: boolean;
  };
  onSymptomChange: (symptom: keyof SymptomsStepProps["symptoms"], value: boolean) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  symptomIntensity: number;
  onSymptomIntensityChange: (value: number) => void;
  symptomDuration: string;
  onSymptomDurationChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const SymptomsStep = ({ 
  symptoms, 
  onSymptomChange,
  description,
  onDescriptionChange,
  symptomIntensity,
  onSymptomIntensityChange,
  symptomDuration,
  onSymptomDurationChange,
  onNext, 
  onBack 
}: SymptomsStepProps) => {
  const canProceed = Object.values(symptoms).some(val => val) && description.length >= 10 && symptomDuration;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Deine Symptome</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Welche Symptome hast du?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="chronicPain" 
                checked={symptoms.chronicPain} 
                onCheckedChange={(checked) => onSymptomChange('chronicPain', checked === true)}
              />
              <Label htmlFor="chronicPain">Chronische Schmerzen</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="sleepDisorder" 
                checked={symptoms.sleepDisorder} 
                onCheckedChange={(checked) => onSymptomChange('sleepDisorder', checked === true)}
              />
              <Label htmlFor="sleepDisorder">Schlafstörung</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="adhd" 
                checked={symptoms.adhd} 
                onCheckedChange={(checked) => onSymptomChange('adhd', checked === true)}
              />
              <Label htmlFor="adhd">AD(H)S</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="migraine" 
                checked={symptoms.migraine} 
                onCheckedChange={(checked) => onSymptomChange('migraine', checked === true)}
              />
              <Label htmlFor="migraine">Migräne</Label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Beschreibung deiner Beschwerden</h3>
          <textarea 
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 min-h-[120px]"
            placeholder="Bitte beschreibe deine Beschwerden genauer. Falls vorhanden, gib auch ICD-Codes oder Befunde an."
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Wie stark sind deine Symptome? (1-10)</h3>
          <div className="px-2">
            <Slider
              value={[symptomIntensity]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => onSymptomIntensityChange(value[0])}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Leicht (1)</span>
              <span>Mittel (5)</span>
              <span>Stark (10)</span>
            </div>
            <div className="text-center mt-4 text-lg font-medium">
              Ausgewählt: {symptomIntensity}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Wie lange bestehen deine Hauptbeschwerden bereits?</h3>
          <RadioGroup value={symptomDuration} onValueChange={onSymptomDurationChange} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="over12" id="over12" />
              <Label htmlFor="over12">Über 12 Monate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="6to12" id="6to12" />
              <Label htmlFor="6to12">6–12 Monate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="under6" id="under6" />
              <Label htmlFor="under6">Weniger als 6 Monate</Label>
            </div>
          </RadioGroup>
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
          Weiter
        </Button>
      </div>
    </div>
  );
};

export default SymptomsStep;
