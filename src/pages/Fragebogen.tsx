
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
import FeedbackForm from "@/components/fragebogen/FeedbackForm";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const TOTAL_STEPS = 11; // Added one for the feedback step

const Fragebogen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skipQuestionnaire, setSkipQuestionnaire] = useState(false); // For returning patients
  
  // Form data state
  const [treatmentType, setTreatmentType] = useState<string>("");
  const [deliveryOption, setDeliveryOption] = useState<string>("");
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
  
  // Symptoms data matching the component props structure
  const [symptoms, setSymptoms] = useState({
    chronicPain: false,
    sleepDisorder: false,
    adhd: false,
    migraine: false
  });
  
  const [symptomDescription, setSymptomDescription] = useState("");
  const [symptomIntensity, setSymptomIntensity] = useState(5);
  const [symptomDuration, setSymptomDuration] = useState("");
  
  // Previous treatments data
  const [visitedDoctor, setVisitedDoctor] = useState<boolean | null>(null);
  const [doctorTypes, setDoctorTypes] = useState({
    generalPractitioner: false,
    specialist: false,
    hospital: false,
    psychologist: false,
    naturopath: false,
    selfTherapy: false,
  });
  
  const [tookMedication, setTookMedication] = useState<boolean | null>(null);
  const [medicationDetails, setMedicationDetails] = useState("");
  
  const [nonMedicalTherapies, setNonMedicalTherapies] = useState({
    physiotherapy: false,
    spa: false,
    massage: false,
    meditation: false,
    other: false,
    none: false,
  });
  
  // Exclusion criteria data matching the component props
  const [isOver21, setIsOver21] = useState<boolean | null>(null);
  const [isPregnantOrNursing, setIsPregnantOrNursing] = useState<boolean | null>(null);
  const [highTHCConsumption, setHighTHCConsumption] = useState<boolean | null>(null);
  const [preExistingConditions, setPreExistingConditions] = useState({
    schizophrenia: false,
    personalityDisorder: false,
    addiction: false,
    cardiovascular: false,
    liverKidney: false,
    anxietyDisorder: false,
    thcAllergy: false,
    none: false,
  });
  
  // Cannabis experience
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
  
  // Product selection
  const [selectedProducts, setSelectedProducts] = useState<Record<string, { quantity: number }>>({});
  
  // Personal information
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

  // Handle symptom changes
  const handleSymptomChange = (symptom: keyof typeof symptoms, value: boolean) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: value
    }));
  };

  // Handle doctor type changes
  const handleDoctorTypeChange = (type: keyof typeof doctorTypes, value: boolean) => {
    setDoctorTypes(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Handle non-medical therapy changes
  const handleNonMedicalTherapyChange = (therapy: keyof typeof nonMedicalTherapies, value: boolean) => {
    setNonMedicalTherapies(prev => ({
      ...prev,
      [therapy]: value
    }));
  };

  // Handle pre-existing condition changes
  const handlePreExistingConditionChange = (condition: keyof typeof preExistingConditions, value: boolean) => {
    setPreExistingConditions(prev => ({
      ...prev,
      [condition]: value
    }));
  };

  // Handle cannabis experience changes
  const handleCannabisExperienceChange = (value: boolean) => {
    setCannabisExperience(prev => ({
      ...prev,
      hasCannabisExperience: value
    }));
  };

  // Handle side effects changes
  const handleSideEffectsChange = (value: boolean) => {
    setCannabisExperience(prev => ({
      ...prev,
      hadSideEffects: value
    }));
  };

  // Handle treatment goal changes
  const handleTreatmentGoalChange = (goal: keyof typeof cannabisExperience.treatmentGoals, value: boolean) => {
    setCannabisExperience(prev => ({
      ...prev,
      treatmentGoals: {
        ...prev.treatmentGoals,
        [goal]: value
      }
    }));
  };

  // Handle product selection changes
  const handleProductSelectChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: { quantity }
    }));
  };

  // Handle skip to feedback form for returning patients
  const skipToFeedbackForm = () => {
    setSkipQuestionnaire(true);
    setStep(8); // Skip directly to feedback form which is step 8
  };

  // Calculate total amount based on selected products
  const calculateTotalAmount = () => {
    // In a real application, this would sum up the prices of all selected products
    // For now, let's return a placeholder value
    return 114.99; // Example total amount including product costs and fees
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <TreatmentTypeStep
            selectedType={treatmentType}
            onSelect={setTreatmentType}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DeliveryOptionsStep
            selectedOption={deliveryOption}
            onSelect={setDeliveryOption}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <PreviousPrescriptionStep
            hasPreviousPrescription={hasPreviousPrescription}
            onSelect={setHasPreviousPrescription}
            onNext={nextStep}
            onBack={prevStep}
            onSkipToFeedback={skipToFeedbackForm}
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
            onSymptomChange={handleSymptomChange}
            description={symptomDescription}
            onDescriptionChange={setSymptomDescription}
            symptomIntensity={symptomIntensity}
            onSymptomIntensityChange={setSymptomIntensity}
            symptomDuration={symptomDuration}
            onSymptomDurationChange={setSymptomDuration}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <PreviousTreatmentsStep
            visitedDoctor={visitedDoctor}
            onVisitedDoctorChange={setVisitedDoctor}
            doctorTypes={doctorTypes}
            onDoctorTypeChange={handleDoctorTypeChange}
            tookMedication={tookMedication}
            onTookMedicationChange={setTookMedication}
            medicationDetails={medicationDetails}
            onMedicationDetailsChange={setMedicationDetails}
            nonMedicalTherapies={nonMedicalTherapies}
            onNonMedicalTherapyChange={handleNonMedicalTherapyChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <ExclusionCriteriaStep
            isOver21={isOver21}
            onIsOver21Change={setIsOver21}
            isPregnantOrNursing={isPregnantOrNursing}
            onIsPregnantOrNursingChange={setIsPregnantOrNursing}
            highTHCConsumption={highTHCConsumption}
            onHighTHCConsumptionChange={setHighTHCConsumption}
            preExistingConditions={preExistingConditions}
            onPreExistingConditionChange={handlePreExistingConditionChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 8:
        // Show feedback form if user has previous prescription and we're skipping questionnaire
        if (skipQuestionnaire) {
          return (
            <FeedbackForm
              onComplete={nextStep}
              onBack={prevStep}
            />
          );
        } else {
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
        }
      case 9:
        return (
          <ProductSelectionStep
            selectedProducts={selectedProducts}
            onProductSelectChange={handleProductSelectChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 10:
        return (
          <CheckoutStep
            totalAmount={calculateTotalAmount()}
            onComplete={nextStep}
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
            <span>Schritt {step} von {skipQuestionnaire ? 5 : TOTAL_STEPS}</span>
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
