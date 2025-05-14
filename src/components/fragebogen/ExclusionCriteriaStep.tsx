
import { Check, X } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ExclusionCriteriaStepProps {
  isOver21: boolean | null;
  onIsOver21Change: (value: boolean) => void;
  isPregnantOrNursing: boolean | null;
  onIsPregnantOrNursingChange: (value: boolean) => void;
  highTHCConsumption: boolean | null;
  onHighTHCConsumptionChange: (value: boolean) => void;
  preExistingConditions: {
    schizophrenia: boolean;
    personalityDisorder: boolean;
    addiction: boolean;
    cardiovascular: boolean;
    liverKidney: boolean;
    anxietyDisorder: boolean;
    thcAllergy: boolean;
    none: boolean;
  };
  onPreExistingConditionChange: (condition: keyof ExclusionCriteriaStepProps["preExistingConditions"], value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExclusionCriteriaStep = ({
  isOver21,
  onIsOver21Change,
  isPregnantOrNursing,
  onIsPregnantOrNursingChange,
  highTHCConsumption,
  onHighTHCConsumptionChange,
  preExistingConditions,
  onPreExistingConditionChange,
  onNext,
  onBack
}: ExclusionCriteriaStepProps) => {
  // Handle "none" checkbox logic for pre-existing conditions
  const handlePreExistingConditionChange = (condition: keyof ExclusionCriteriaStepProps["preExistingConditions"], checked: boolean) => {
    if (condition === 'none' && checked) {
      // If "none" is checked, uncheck all others
      Object.keys(preExistingConditions).forEach(key => {
        if (key !== 'none') {
          onPreExistingConditionChange(key as keyof ExclusionCriteriaStepProps["preExistingConditions"], false);
        }
      });
    } else if (condition !== 'none' && checked) {
      // If any other is checked, uncheck "none"
      onPreExistingConditionChange('none', false);
    }
    
    onPreExistingConditionChange(condition, checked);
  };
  
  const canProceed = isOver21 === true && 
                     isPregnantOrNursing !== null && 
                     highTHCConsumption !== null && 
                     Object.values(preExistingConditions).some(val => val);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Ausschlusskriterien</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Bist du über 21 Jahre alt?</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={isOver21 === true ? "default" : "outline"} 
              className={`py-6 px-8 ${isOver21 === true ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onIsOver21Change(true)}
            >
              <Check className="w-5 h-5" />
              Ja
            </Button>
            
            <Button 
              variant={isOver21 === false ? "default" : "outline"} 
              className={`py-6 px-8 ${isOver21 === false ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onIsOver21Change(false)}
            >
              <X className="w-5 h-5" />
              Nein
            </Button>
          </div>
          
          {isOver21 === false && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded">
              Leider können wir dir kein Rezept ausstellen, wenn du unter 21 Jahre alt bist.
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Bist du schwanger oder stillst du?</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={isPregnantOrNursing === true ? "default" : "outline"} 
              className={`py-6 px-8 ${isPregnantOrNursing === true ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onIsPregnantOrNursingChange(true)}
            >
              <Check className="w-5 h-5" />
              Ja
            </Button>
            
            <Button 
              variant={isPregnantOrNursing === false ? "default" : "outline"} 
              className={`py-6 px-8 ${isPregnantOrNursing === false ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onIsPregnantOrNursingChange(false)}
            >
              <X className="w-5 h-5" />
              Nein
            </Button>
          </div>
          
          {isPregnantOrNursing === true && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded">
              Während der Schwangerschaft oder Stillzeit wird kein Cannabis verschrieben.
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Hast du in den letzten 30 Tagen mehr als 1.000 mg THC konsumiert?</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={highTHCConsumption === true ? "default" : "outline"} 
              className={`py-6 px-8 ${highTHCConsumption === true ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onHighTHCConsumptionChange(true)}
            >
              <Check className="w-5 h-5" />
              Ja
            </Button>
            
            <Button 
              variant={highTHCConsumption === false ? "default" : "outline"} 
              className={`py-6 px-8 ${highTHCConsumption === false ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onHighTHCConsumptionChange(false)}
            >
              <X className="w-5 h-5" />
              Nein
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Bestehende Vorerkrankungen (bitte alle zutreffenden auswählen):</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="schizophrenia" 
                checked={preExistingConditions.schizophrenia} 
                onCheckedChange={(checked) => handlePreExistingConditionChange('schizophrenia', checked === true)}
                disabled={preExistingConditions.none}
              />
              <Label htmlFor="schizophrenia">Schizophrenie oder Halluzinationen</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="personalityDisorder" 
                checked={preExistingConditions.personalityDisorder} 
                onCheckedChange={(checked) => handlePreExistingConditionChange('personalityDisorder', checked === true)}
                disabled={preExistingConditions.none}
              />
              <Label htmlFor="personalityDisorder">Persönlichkeitsstörung</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="addiction" 
                checked={preExistingConditions.addiction} 
                onCheckedChange={(checked) => handlePreExistingConditionChange('addiction', checked === true)}
                disabled={preExistingConditions.none}
              />
              <Label htmlFor="addiction">Suchterkrankung</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="cardiovascular" 
                checked={preExistingConditions.cardiovascular} 
                onCheckedChange={(checked) => handlePreExistingConditionChange('cardiovascular', checked === true)}
                disabled={preExistingConditions.none}
              />
              <Label htmlFor="cardiovascular">Herz-Kreislauf-Probleme</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="liverKidney" 
                checked={preExistingConditions.liverKidney} 
                onCheckedChange={(checked) => handlePreExistingConditionChange('liverKidney', checked === true)}
                disabled={preExistingConditions.none}
              />
              <Label htmlFor="liverKidney">Leber-/Nierenerkrankung</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="anxietyDisorder" 
                checked={preExistingConditions.anxietyDisorder} 
                onCheckedChange={(checked) => handlePreExistingConditionChange('anxietyDisorder', checked === true)}
                disabled={preExistingConditions.none}
              />
              <Label htmlFor="anxietyDisorder">Schwere Angststörungen</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="thcAllergy" 
                checked={preExistingConditions.thcAllergy} 
                onCheckedChange={(checked) => handlePreExistingConditionChange('thcAllergy', checked === true)}
                disabled={preExistingConditions.none}
              />
              <Label htmlFor="thcAllergy">Allergie gegen THC/CBD</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="none" 
                checked={preExistingConditions.none} 
                onCheckedChange={(checked) => handlePreExistingConditionChange('none', checked === true)}
              />
              <Label htmlFor="none">Keine der genannten</Label>
            </div>
          </div>
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

export default ExclusionCriteriaStep;
