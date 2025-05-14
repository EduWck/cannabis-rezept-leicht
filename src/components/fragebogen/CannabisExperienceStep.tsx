
import { Check, X } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CannabisExperienceStepProps {
  hasCannabisExperience: boolean | null;
  onHasCannabisExperienceChange: (value: boolean) => void;
  hadSideEffects: boolean | null;
  onHadSideEffectsChange: (value: boolean) => void;
  treatmentGoals: {
    improveQuality: boolean;
    relieveSymptoms: boolean;
    improveMovement: boolean;
    betterDaily: boolean;
    workCapacity: boolean;
    socialParticipation: boolean;
    reduceMedication: boolean;
    reduceSideEffects: boolean;
  };
  onTreatmentGoalChange: (goal: keyof CannabisExperienceStepProps["treatmentGoals"], value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const CannabisExperienceStep = ({
  hasCannabisExperience,
  onHasCannabisExperienceChange,
  hadSideEffects,
  onHadSideEffectsChange,
  treatmentGoals,
  onTreatmentGoalChange,
  onNext,
  onBack
}: CannabisExperienceStepProps) => {
  const canProceed = hasCannabisExperience !== null &&
                    (hasCannabisExperience === false || hadSideEffects !== null) &&
                    Object.values(treatmentGoals).some(val => val);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Cannabis-Erfahrungen</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Hast du bereits Erfahrungen mit Cannabis gemacht?</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={hasCannabisExperience === true ? "default" : "outline"} 
              className={`py-6 px-8 ${hasCannabisExperience === true ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onHasCannabisExperienceChange(true)}
            >
              <Check className="w-5 h-5" />
              Ja
            </Button>
            
            <Button 
              variant={hasCannabisExperience === false ? "default" : "outline"} 
              className={`py-6 px-8 ${hasCannabisExperience === false ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onHasCannabisExperienceChange(false)}
            >
              <X className="w-5 h-5" />
              Nein
            </Button>
          </div>
        </div>
        
        {hasCannabisExperience && (
          <div>
            <h3 className="text-lg font-medium mb-3">Gab es Nebenwirkungen?</h3>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant={hadSideEffects === true ? "default" : "outline"} 
                className={`py-6 px-8 ${hadSideEffects === true ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
                onClick={() => onHadSideEffectsChange(true)}
              >
                <Check className="w-5 h-5" />
                Ja
              </Button>
              
              <Button 
                variant={hadSideEffects === false ? "default" : "outline"} 
                className={`py-6 px-8 ${hadSideEffects === false ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
                onClick={() => onHadSideEffectsChange(false)}
              >
                <X className="w-5 h-5" />
                Nein
              </Button>
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-medium mb-3">Welche Behandlungsziele verfolgst du mit der Therapie?</h3>
          <p className="text-muted-foreground text-sm mb-3">Bitte wähle alle zutreffenden Ziele aus</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="improveQuality" 
                checked={treatmentGoals.improveQuality} 
                onCheckedChange={(checked) => onTreatmentGoalChange('improveQuality', checked === true)}
              />
              <Label htmlFor="improveQuality">Verbesserung der Lebensqualität</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="relieveSymptoms" 
                checked={treatmentGoals.relieveSymptoms} 
                onCheckedChange={(checked) => onTreatmentGoalChange('relieveSymptoms', checked === true)}
              />
              <Label htmlFor="relieveSymptoms">Linderung von Symptomen</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="improveMovement" 
                checked={treatmentGoals.improveMovement} 
                onCheckedChange={(checked) => onTreatmentGoalChange('improveMovement', checked === true)}
              />
              <Label htmlFor="improveMovement">Verbesserung der Bewegung</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="betterDaily" 
                checked={treatmentGoals.betterDaily} 
                onCheckedChange={(checked) => onTreatmentGoalChange('betterDaily', checked === true)}
              />
              <Label htmlFor="betterDaily">Bessere Alltagsbewältigung</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="workCapacity" 
                checked={treatmentGoals.workCapacity} 
                onCheckedChange={(checked) => onTreatmentGoalChange('workCapacity', checked === true)}
              />
              <Label htmlFor="workCapacity">Steigerung der Arbeitsfähigkeit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="socialParticipation" 
                checked={treatmentGoals.socialParticipation} 
                onCheckedChange={(checked) => onTreatmentGoalChange('socialParticipation', checked === true)}
              />
              <Label htmlFor="socialParticipation">Teilnahme am sozialen Leben</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="reduceMedication" 
                checked={treatmentGoals.reduceMedication} 
                onCheckedChange={(checked) => onTreatmentGoalChange('reduceMedication', checked === true)}
              />
              <Label htmlFor="reduceMedication">Reduktion anderer Medikamente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="reduceSideEffects" 
                checked={treatmentGoals.reduceSideEffects} 
                onCheckedChange={(checked) => onTreatmentGoalChange('reduceSideEffects', checked === true)}
              />
              <Label htmlFor="reduceSideEffects">Reduktion von Nebenwirkungen anderer Medikamente</Label>
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

export default CannabisExperienceStep;
