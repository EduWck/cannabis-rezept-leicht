
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import QuestionnaireStepRenderer from "@/components/fragebogen/QuestionnaireStepRenderer";
import { useQuestionnaireState } from "@/hooks/useQuestionnaireState";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const TOTAL_STEPS = 10;

const Fragebogen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skipQuestionnaire, setSkipQuestionnaire] = useState(false);
  
  const {
    selectedProducts,
    setSelectedProducts,
    treatmentType,
    setTreatmentType,
    deliveryOption,
    setDeliveryOption,
    hasPreviousPrescription,
    setHasPreviousPrescription,
    consents,
    setConsents,
    symptoms,
    setSymptoms,
    symptomDescription,
    setSymptomDescription,
    symptomIntensity,
    setSymptomIntensity,
    symptomDuration,
    setSymptomDuration,
    visitedDoctor,
    setVisitedDoctor,
    doctorTypes,
    setDoctorTypes,
    tookMedication,
    setTookMedication,
    medicationDetails,
    setMedicationDetails,
    nonMedicalTherapies,
    setNonMedicalTherapies,
    isOver21,
    setIsOver21,
    isPregnantOrNursing,
    setIsPregnantOrNursing,
    highTHCConsumption,
    setHighTHCConsumption,
    preExistingConditions,
    setPreExistingConditions,
    cannabisExperience,
    setCannabisExperience,
    personalDetails,
    setPersonalDetails,
  } = useQuestionnaireState();

  useEffect(() => {
    const newProgress = Math.round((step / TOTAL_STEPS) * 100);
    setProgress(newProgress);
  }, [step]);

  const nextStep = () => {
    if (step === 7) {
      if (isOver21 === false || isPregnantOrNursing === true) {
        toast({
          title: "Leider nicht geeignet",
          description: "Aufgrund deiner Angaben können wir dir kein Rezept ausstellen. Bitte konsultiere einen Arzt direkt.",
          variant: "destructive"
        });
        navigate("/", { replace: true });
        return;
      }
    }

    if (step === 9) {
      setIsDialogOpen(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        setStep(10);
      }, 2000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleProductSelectChange = (productId: string, quantity: number, pharmacyId: string) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: { quantity, pharmacyId }
    }));
  };

  const handleConsentChange = (key: keyof typeof consents, value: boolean) => {
    setConsents(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSymptomChange = (symptom: keyof typeof symptoms, value: boolean) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: value
    }));
  };

  const handleDoctorTypeChange = (type: keyof typeof doctorTypes, value: boolean) => {
    setDoctorTypes(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleNonMedicalTherapyChange = (therapy: keyof typeof nonMedicalTherapies, value: boolean) => {
    setNonMedicalTherapies(prev => ({
      ...prev,
      [therapy]: value
    }));
  };

  const handlePreExistingConditionChange = (condition: keyof typeof preExistingConditions, value: boolean) => {
    setPreExistingConditions(prev => ({
      ...prev,
      [condition]: value
    }));
  };

  const handleCannabisExperienceChange = (value: boolean) => {
    setCannabisExperience(prev => ({
      ...prev,
      hasCannabisExperience: value
    }));
  };

  const handleSideEffectsChange = (value: boolean) => {
    setCannabisExperience(prev => ({
      ...prev,
      hadSideEffects: value
    }));
  };

  const handleTreatmentGoalChange = (goal: keyof typeof cannabisExperience.treatmentGoals, value: boolean) => {
    setCannabisExperience(prev => ({
      ...prev,
      treatmentGoals: {
        ...prev.treatmentGoals,
        [goal]: value
      }
    }));
  };

  const skipToFeedbackForm = () => {
    setSkipQuestionnaire(true);
    setStep(8);
  };

  const handlers = {
    setTreatmentType,
    setDeliveryOption,
    setHasPreviousPrescription,
    handleConsentChange,
    handleSymptomChange,
    setSymptomDescription,
    setSymptomIntensity,
    setSymptomDuration,
    setVisitedDoctor,
    handleDoctorTypeChange,
    setTookMedication,
    setMedicationDetails,
    handleNonMedicalTherapyChange,
    setIsOver21,
    setIsPregnantOrNursing,
    setHighTHCConsumption,
    handlePreExistingConditionChange,
    handleCannabisExperienceChange,
    handleSideEffectsChange,
    handleTreatmentGoalChange,
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          Zurück
        </Button>
        <h1 className="text-3xl font-bold text-foreground">
          {step === 0 ? "Apotheken & Sorten" : "Medizinisches Cannabis - Fragebogen"}
        </h1>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="mb-2" />
        {step <= 9 && (
          <div className="flex justify-between text-muted-foreground text-sm">
            <span>
              Schritt {step} von {skipQuestionnaire ? 5 : TOTAL_STEPS}
              {step === 0 && " (Vorauswahl)"}
            </span>
            <span>{progress}% abgeschlossen</span>
          </div>
        )}
      </div>

      <div className="bg-card dark:bg-card border border-border rounded-xl p-8 shadow-lg animate-fade-in">
        <QuestionnaireStepRenderer
          step={step}
          skipQuestionnaire={skipQuestionnaire}
          selectedProducts={selectedProducts}
          treatmentType={treatmentType}
          deliveryOption={deliveryOption}
          hasPreviousPrescription={hasPreviousPrescription}
          consents={consents}
          symptoms={symptoms}
          symptomDescription={symptomDescription}
          symptomIntensity={symptomIntensity}
          symptomDuration={symptomDuration}
          visitedDoctor={visitedDoctor}
          doctorTypes={doctorTypes}
          tookMedication={tookMedication}
          medicationDetails={medicationDetails}
          nonMedicalTherapies={nonMedicalTherapies}
          isOver21={isOver21}
          isPregnantOrNursing={isPregnantOrNursing}
          highTHCConsumption={highTHCConsumption}
          preExistingConditions={preExistingConditions}
          cannabisExperience={cannabisExperience}
          onProductSelectChange={handleProductSelectChange}
          onNext={nextStep}
          onBack={prevStep}
          onSkipToFeedback={skipToFeedbackForm}
          handlers={handlers}
        />
      </div>

      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bitte warten</AlertDialogTitle>
            <AlertDialogDescription>
              Dein Fragebogen wird jetzt übermittelt. Bitte schließe dieses Fenster nicht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cannabis-green-500"></div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Fragebogen;
