
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PreviousTreatmentsStepProps {
  visitedDoctor: boolean | null;
  onVisitedDoctorChange: (value: boolean) => void;
  doctorTypes: {
    generalPractitioner: boolean;
    specialist: boolean;
    hospital: boolean;
    psychologist: boolean;
    naturopath: boolean;
    selfTherapy: boolean;
  };
  onDoctorTypeChange: (type: keyof PreviousTreatmentsStepProps["doctorTypes"], value: boolean) => void;
  tookMedication: boolean | null;
  onTookMedicationChange: (value: boolean) => void;
  medicationDetails: string;
  onMedicationDetailsChange: (value: string) => void;
  nonMedicalTherapies: {
    physiotherapy: boolean;
    spa: boolean;
    massage: boolean;
    meditation: boolean;
    other: boolean;
    none: boolean;
  };
  onNonMedicalTherapyChange: (therapy: keyof PreviousTreatmentsStepProps["nonMedicalTherapies"], value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const PreviousTreatmentsStep = ({
  visitedDoctor,
  onVisitedDoctorChange,
  doctorTypes,
  onDoctorTypeChange,
  tookMedication,
  onTookMedicationChange,
  medicationDetails,
  onMedicationDetailsChange,
  nonMedicalTherapies,
  onNonMedicalTherapyChange,
  onNext,
  onBack
}: PreviousTreatmentsStepProps) => {
  const canProceed = visitedDoctor !== null && 
                    (visitedDoctor === false || Object.values(doctorTypes).some(val => val)) &&
                    tookMedication !== null &&
                    (tookMedication === false || medicationDetails.length > 0) &&
                    Object.values(nonMedicalTherapies).some(val => val);

  // Handle "none" checkbox logic for non-medical therapies
  const handleNonMedicalTherapyChange = (therapy: keyof PreviousTreatmentsStepProps["nonMedicalTherapies"], checked: boolean) => {
    if (therapy === 'none' && checked) {
      // If "none" is checked, uncheck all others
      Object.keys(nonMedicalTherapies).forEach(key => {
        if (key !== 'none') {
          onNonMedicalTherapyChange(key as keyof PreviousTreatmentsStepProps["nonMedicalTherapies"], false);
        }
      });
    } else if (therapy !== 'none' && checked) {
      // If any other is checked, uncheck "none"
      onNonMedicalTherapyChange('none', false);
    }
    
    onNonMedicalTherapyChange(therapy, checked);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Vorherige Behandlungen</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Wurde bereits ein Arzt aufgesucht?</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={visitedDoctor === true ? "default" : "outline"} 
              className={`py-6 px-8 ${visitedDoctor === true ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onVisitedDoctorChange(true)}
            >
              <Check className="w-5 h-5" />
              Ja
            </Button>
            
            <Button 
              variant={visitedDoctor === false ? "default" : "outline"} 
              className={`py-6 px-8 ${visitedDoctor === false ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onVisitedDoctorChange(false)}
            >
              <X className="w-5 h-5" />
              Nein
            </Button>
          </div>
          
          {visitedDoctor && (
            <div className="mt-4 ml-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="generalPractitioner" 
                  checked={doctorTypes.generalPractitioner} 
                  onCheckedChange={(checked) => onDoctorTypeChange('generalPractitioner', checked === true)}
                />
                <Label htmlFor="generalPractitioner">Hausarzt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="specialist" 
                  checked={doctorTypes.specialist} 
                  onCheckedChange={(checked) => onDoctorTypeChange('specialist', checked === true)}
                />
                <Label htmlFor="specialist">Facharztpraxis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hospital" 
                  checked={doctorTypes.hospital} 
                  onCheckedChange={(checked) => onDoctorTypeChange('hospital', checked === true)}
                />
                <Label htmlFor="hospital">Krankenhaus</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="psychologist" 
                  checked={doctorTypes.psychologist} 
                  onCheckedChange={(checked) => onDoctorTypeChange('psychologist', checked === true)}
                />
                <Label htmlFor="psychologist">Psychologe</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="naturopath" 
                  checked={doctorTypes.naturopath} 
                  onCheckedChange={(checked) => onDoctorTypeChange('naturopath', checked === true)}
                />
                <Label htmlFor="naturopath">Heilpraktiker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="selfTherapy" 
                  checked={doctorTypes.selfTherapy} 
                  onCheckedChange={(checked) => onDoctorTypeChange('selfTherapy', checked === true)}
                />
                <Label htmlFor="selfTherapy">Eigentherapie</Label>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Wurden Medikamente eingenommen?</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={tookMedication === true ? "default" : "outline"} 
              className={`py-6 px-8 ${tookMedication === true ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onTookMedicationChange(true)}
            >
              <Check className="w-5 h-5" />
              Ja
            </Button>
            
            <Button 
              variant={tookMedication === false ? "default" : "outline"} 
              className={`py-6 px-8 ${tookMedication === false ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
              onClick={() => onTookMedicationChange(false)}
            >
              <X className="w-5 h-5" />
              Nein
            </Button>
          </div>
          
          {tookMedication && (
            <div className="mt-4">
              <Label htmlFor="medicationDetails" className="mb-2 block">Bitte gib Name, Dosis und Einnahmedauer an:</Label>
              <Input
                id="medicationDetails"
                value={medicationDetails}
                onChange={(e) => onMedicationDetailsChange(e.target.value)}
                placeholder="z.B. Ibuprofen 400mg, 3x täglich für 2 Wochen"
                className="w-full"
              />
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Nicht-medikamentöse Therapien:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="physiotherapy" 
                checked={nonMedicalTherapies.physiotherapy} 
                onCheckedChange={(checked) => handleNonMedicalTherapyChange('physiotherapy', checked === true)}
                disabled={nonMedicalTherapies.none}
              />
              <Label htmlFor="physiotherapy">Physiotherapie</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="spa" 
                checked={nonMedicalTherapies.spa} 
                onCheckedChange={(checked) => handleNonMedicalTherapyChange('spa', checked === true)}
                disabled={nonMedicalTherapies.none}
              />
              <Label htmlFor="spa">Kur</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="massage" 
                checked={nonMedicalTherapies.massage} 
                onCheckedChange={(checked) => handleNonMedicalTherapyChange('massage', checked === true)}
                disabled={nonMedicalTherapies.none}
              />
              <Label htmlFor="massage">Massagen</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="meditation" 
                checked={nonMedicalTherapies.meditation} 
                onCheckedChange={(checked) => handleNonMedicalTherapyChange('meditation', checked === true)}
                disabled={nonMedicalTherapies.none}
              />
              <Label htmlFor="meditation">Meditation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="other" 
                checked={nonMedicalTherapies.other} 
                onCheckedChange={(checked) => handleNonMedicalTherapyChange('other', checked === true)}
                disabled={nonMedicalTherapies.none}
              />
              <Label htmlFor="other">Sonstige</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="none" 
                checked={nonMedicalTherapies.none} 
                onCheckedChange={(checked) => handleNonMedicalTherapyChange('none', checked === true)}
              />
              <Label htmlFor="none">Keine weiteren Methoden</Label>
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

export default PreviousTreatmentsStep;
