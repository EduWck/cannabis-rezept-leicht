import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/StepIndicator";
import PharmacyOverviewStep from "@/components/fragebogen/PharmacyOverviewStep";
import TreatmentTypeStep from "@/components/fragebogen/TreatmentTypeStep";
import DeliveryOptionsStep from "@/components/fragebogen/DeliveryOptionsStep";
import PreviousPrescriptionStep from "@/components/fragebogen/PreviousPrescriptionStep";
import ConsentStep from "@/components/fragebogen/ConsentStep";
import SymptomsStep from "@/components/fragebogen/SymptomsStep";
import PreviousTreatmentsStep from "@/components/fragebogen/PreviousTreatmentsStep";
import ExclusionCriteriaStep from "@/components/fragebogen/ExclusionCriteriaStep";
import CannabisExperienceStep from "@/components/fragebogen/CannabisExperienceStep";
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

const TOTAL_STEPS = 10;

// Mock data for products and pharmacies (this should come from a data source in real app)
const mockProducts = [
  {
    id: "1",
    name: "Aurora Indica",
    type: "flower" as const,
    thcPercentage: 18,
    cbdPercentage: 1,
    pricePerGram: 12.5,
    description: "Eine beruhigende Indica-Sorte",
    image: "/placeholder.svg",
    pharmacies: ["1", "2"]
  },
  {
    id: "2", 
    name: "Green Crack",
    type: "flower" as const,
    thcPercentage: 22,
    cbdPercentage: 0.5,
    pricePerGram: 14.0,
    description: "Eine energetisierende Sativa-Sorte",
    image: "/placeholder.svg",
    pharmacies: ["1", "3"]
  }
];

const mockPharmacies = [
  {
    id: "1",
    name: "Apotheke am Markt",
    address: "Marktplatz 1",
    city: "Berlin",
    rating: 4.5,
    deliveryTime: "1-2 Tage",
    phone: "+49 30 12345678",
    products: ["1", "2"]
  },
  {
    id: "2",
    name: "Stadt-Apotheke",
    address: "Hauptstraße 25",
    city: "München",
    rating: 4.8,
    deliveryTime: "2-3 Tage", 
    phone: "+49 89 87654321",
    products: ["1"]
  },
  {
    id: "3",
    name: "Zentral-Apotheke",
    address: "Königsallee 15",
    city: "Hamburg",
    rating: 4.2,
    deliveryTime: "1-3 Tage",
    phone: "+49 40 11223344",
    products: ["2"]
  }
];

const Fragebogen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skipQuestionnaire, setSkipQuestionnaire] = useState(false);
  
  const [selectedProducts, setSelectedProducts] = useState<Record<string, { quantity: number; pharmacyId: string }>>({});
  
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
  
  const [symptoms, setSymptoms] = useState({
    chronicPain: false,
    sleepDisorder: false,
    adhd: false,
    migraine: false
  });
  
  const [symptomDescription, setSymptomDescription] = useState("");
  const [symptomIntensity, setSymptomIntensity] = useState(5);
  const [symptomDuration, setSymptomDuration] = useState("");
  
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

  const calculateTotalAmount = () => {
    console.log("Calculating total amount with selectedProducts:", selectedProducts);
    console.log("Available products:", mockProducts);
    
    let productTotal = 0;
    Object.entries(selectedProducts).forEach(([productId, selection]) => {
      const product = mockProducts.find(p => p.id === productId);
      console.log(`Product ${productId}:`, product, "Selection:", selection);
      
      if (product && selection.quantity > 0) {
        // Fix: Use only pricePerGram since all products are flowers
        const price = product.pricePerGram || 12.5; // Fallback price
        const total = selection.quantity * price;
        productTotal += total;
        console.log(`Adding ${selection.quantity} x ${price} = ${total} for product ${product.name}`);
      }
    });
    
    const prescriptionFee = 14.99;
    const shippingFee = productTotal < 100 ? 10.0 : 0;
    const finalTotal = productTotal + prescriptionFee + shippingFee;
    
    console.log("Product total:", productTotal, "Final total:", finalTotal);
    return finalTotal;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <PharmacyOverviewStep
            selectedProducts={selectedProducts}
            onProductSelectChange={handleProductSelectChange}
            onNext={nextStep}
          />
        );
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
          <CheckoutStep
            totalAmount={calculateTotalAmount()}
            selectedProducts={selectedProducts}
            products={mockProducts}
            pharmacies={mockPharmacies}
            onComplete={nextStep}
            onBack={prevStep}
          />
        );
      case 10:
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
        {renderStep()}
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
