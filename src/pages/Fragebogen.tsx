
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/StepIndicator";
import TreatmentTypeStep from "@/components/fragebogen/TreatmentTypeStep";
import DeliveryOptionsStep from "@/components/fragebogen/DeliveryOptionsStep";
import PreviousPrescriptionStep from "@/components/fragebogen/PreviousPrescriptionStep";
import ConsentStep from "@/components/fragebogen/ConsentStep";
import SymptomsStep from "@/components/fragebogen/SymptomsStep";
import PreviousTreatmentsStep from "@/components/fragebogen/PreviousTreatmentsStep";
import ExclusionCriteriaStep from "@/components/fragebogen/ExclusionCriteriaStep";
import CannabisExperienceStep from "@/components/fragebogen/CannabisExperienceStep";
import ProductSelectionStep from "@/components/fragebogen/ProductSelectionStep";
import CheckoutStep from "@/components/fragebogen/CheckoutStep";
import CompletionStep from "@/components/fragebogen/CompletionStep";

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
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form data state
  const [treatmentType, setTreatmentType] = useState<"fragebogen" | "video" | "vorort" | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<"rezept_kurier" | "rezept_versand" | "nur_rezept" | null>(null);
  const [hasPreviousPrescription, setHasPreviousPrescription] = useState<boolean | null>(null);
  const [consents, setConsents] = useState({
    accuracy: false,
    privateMedical: false,
    emailConsent: false,
    therapeuticProducts: false,
    dataUsage: false,
    termsAndPrivacy: false,
    newsletter: false,
  });
  const [symptoms, setSymptoms] = useState({
    painSymptoms: {
      chronicPain: false,
      backPain: false,
      neuropathicPain: false,
      migraines: false,
      arthritisPain: false,
      otherPain: false,
    },
    mentalSymptoms: {
      anxiety: false,
      depression: false,
      insomnia: false,
      ptsd: false,
      adhd: false,
      otherMental: false,
    },
    neurologicalSymptoms: {
      epilepsy: false,
      multiplesclerosis: false,
      parkinson: false,
      tourette: false,
      alzheimer: false,
      otherNeurological: false,
    },
    digestiveSymptoms: {
      crohn: false,
      ibs: false,
      ulcerativeColitis: false,
      nausea: false,
      otherDigestive: false,
    },
    symptomDetails: "",
    symptomDuration: "",
    painLevel: null,
  });
  const [previousTreatments, setPreviousTreatments] = useState({
    visitedDoctor: false,
    treatmentPlace: "",
    medications: [],
    otherTherapies: [],
    treatmentDetails: "",
  });
  const [exclusionCriteria, setExclusionCriteria] = useState({
    isUnder21: false,
    isPregnant: false,
    hasSchizophrenia: false,
    hasHeartCondition: false,
    hasDrugAddiction: false,
    hasOtherMentalDisorder: false,
    detailsOther: "",
  });
  const [cannabisExperience, setCannabisExperience] = useState({
    hasCannabisExperience: null as boolean | null,
    hadSideEffects: null as boolean | null,
    treatmentGoals: {
      improveQuality: false,
      relieveSymptoms: false,
      improveMovement: false,
      betterDaily: false,
      workCapacity: false,
      socialParticipation: false,
      reduceMedication: false,
      reduceSideEffects: false,
    },
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    address: {
      street: "",
      houseNumber: "",
      zipCode: "",
      city: "",
    },
    email: "",
    phone: "",
  });

  // Calculate progress when step changes
  useEffect(() => {
    const newProgress = Math.round((step / TOTAL_STEPS) * 100);
    setProgress(newProgress);
  }, [step]);

  // Handle next step
  const nextStep = () => {
    // Check exclusion criteria before proceeding further
    if (step === 7) {
      const hasExclusions = Object.values(exclusionCriteria).some(value => value === true);
      if (hasExclusions) {
        toast({
          title: "Leider nicht geeignet",
          description: "Aufgrund deiner Angaben können wir dir kein Rezept ausstellen. Bitte konsultiere einen Arzt direkt.",
          variant: "destructive"
        });
        navigate("/", { replace: true });
        return;
      }
    }

    // If payment is completed, show loading dialog
    if (step === 10) {
      setIsDialogOpen(true);
      // Simulate form submission delay
      setTimeout(() => {
        setIsDialogOpen(false);
        setStep(11); // Move to completion step
      }, 2000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  // Handle previous step
  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  // Handle consents changes
  const handleConsentChange = (key: keyof typeof consents, value: boolean) => {
    setConsents(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle cannabis experience changes
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

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <TreatmentTypeStep
            selectedType={treatmentType}
            onTypeChange={setTreatmentType}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DeliveryOptionsStep
            selectedOption={deliveryOption}
            onOptionChange={setDeliveryOption}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <PreviousPrescriptionStep
            hasPreviousPrescription={hasPreviousPrescription}
            onHasPreviousPrescriptionChange={setHasPreviousPrescription}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <ConsentStep
            consents={consents}
            onConsentChange={handleConsentChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <SymptomsStep
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <PreviousTreatmentsStep
            previousTreatments={previousTreatments}
            setPreviousTreatments={setPreviousTreatments}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <ExclusionCriteriaStep
            exclusionCriteria={exclusionCriteria}
            setExclusionCriteria={setExclusionCriteria}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 8:
        return (
          <CannabisExperienceStep
            hasCannabisExperience={cannabisExperience.hasCannabisExperience}
            onHasCannabisExperienceChange={handleCannabisExperienceChange}
            hadSideEffects={cannabisExperience.hadSideEffects}
            onHadSideEffectsChange={handleSideEffectsChange}
            treatmentGoals={cannabisExperience.treatmentGoals}
            onTreatmentGoalChange={handleTreatmentGoalChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 9:
        return (
          <ProductSelectionStep
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 10:
        return (
          <CheckoutStep
            personalDetails={personalDetails}
            setPersonalDetails={setPersonalDetails}
            selectedProducts={selectedProducts}
            deliveryOption={deliveryOption}
            onSubmit={nextStep}
            onBack={prevStep}
          />
        );
      case 11:
        return (
          <CompletionStep treatmentType={treatmentType || "fragebogen"} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          Zurück
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Medizinisches Cannabis - Fragebogen</h1>
      </div>

      {/* Progress bar and step indicator */}
      <div className="mb-8">
        <Progress value={progress} className="mb-2" />
        {step <= 10 && (
          <div className="flex justify-between text-muted-foreground text-sm">
            <span>Schritt {step} von {TOTAL_STEPS}</span>
            <span>{progress}% abgeschlossen</span>
          </div>
        )}
      </div>

      {/* Current step content */}
      <div className="bg-card dark:bg-card border border-border rounded-xl p-8 shadow-lg animate-fade-in">
        {renderStep()}
      </div>

      {/* Loading dialog */}
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
