import { logger } from "@/lib/logger";

import PharmacyOverviewStep from "./PharmacyOverviewStep";
import TreatmentTypeStep from "./TreatmentTypeStep";
import DeliveryOptionsStep from "./DeliveryOptionsStep";
import PreviousPrescriptionStep from "./PreviousPrescriptionStep";
import ConsentStep from "./ConsentStep";
import SymptomsStep from "./SymptomsStep";
import PreviousTreatmentsStep from "./PreviousTreatmentsStep";
import ExclusionCriteriaStep from "./ExclusionCriteriaStep";
import CannabisExperienceStep from "./CannabisExperienceStep";
import CheckoutStep from "./CheckoutStep";
import CompletionStep from "./CompletionStep";
import FeedbackForm from "./FeedbackForm";
import { mockProducts, mockPharmacies } from '@/data/mockData';
import { calculateTotalAmount } from '@/utils/calculationUtils';

interface QuestionnaireStepRendererProps {
  step: number;
  skipQuestionnaire: boolean;
  selectedProducts: Record<string, { quantity: number; pharmacyId: string }>;
  treatmentType: string;
  deliveryOption: string;
  hasPreviousPrescription: boolean | null;
  consents: {
    accuracy: boolean;
    privateMedical: boolean;
    emailConsent: boolean;
    therapeuticProducts: boolean;
    dataUsage: boolean;
    termsAndPrivacy: boolean;
    newsletter: boolean;
  };
  symptoms: {
    chronicPain: boolean;
    sleepDisorder: boolean;
    adhd: boolean;
    migraine: boolean;
  };
  symptomDescription: string;
  symptomIntensity: number;
  symptomDuration: string;
  visitedDoctor: boolean | null;
  doctorTypes: {
    generalPractitioner: boolean;
    specialist: boolean;
    hospital: boolean;
    psychologist: boolean;
    naturopath: boolean;
    selfTherapy: boolean;
  };
  tookMedication: boolean | null;
  medicationDetails: string;
  nonMedicalTherapies: {
    physiotherapy: boolean;
    spa: boolean;
    massage: boolean;
    meditation: boolean;
    other: boolean;
    none: boolean;
  };
  isOver21: boolean | null;
  isPregnantOrNursing: boolean | null;
  highTHCConsumption: boolean | null;
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
  cannabisExperience: {
    hasCannabisExperience: boolean | null;
    hadSideEffects: boolean | null;
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
  };
  onProductSelectChange: (productId: string, quantity: number, pharmacyId: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkipToFeedback: () => void;
  handlers: {
    setTreatmentType: (value: string) => void;
    setDeliveryOption: (value: string) => void;
    setHasPreviousPrescription: (value: boolean) => void;
    handleConsentChange: (key: string, value: boolean) => void;
    handleSymptomChange: (symptom: string, value: boolean) => void;
    setSymptomDescription: (value: string) => void;
    setSymptomIntensity: (value: number) => void;
    setSymptomDuration: (value: string) => void;
    setVisitedDoctor: (value: boolean) => void;
    handleDoctorTypeChange: (type: string, value: boolean) => void;
    setTookMedication: (value: boolean) => void;
    setMedicationDetails: (value: string) => void;
    handleNonMedicalTherapyChange: (therapy: string, value: boolean) => void;
    setIsOver21: (value: boolean) => void;
    setIsPregnantOrNursing: (value: boolean) => void;
    setHighTHCConsumption: (value: boolean) => void;
    handlePreExistingConditionChange: (condition: string, value: boolean) => void;
    handleCannabisExperienceChange: (value: boolean) => void;
    handleSideEffectsChange: (value: boolean) => void;
    handleTreatmentGoalChange: (goal: string, value: boolean) => void;
  };
}

const QuestionnaireStepRenderer = ({
  step,
  skipQuestionnaire,
  selectedProducts,
  treatmentType,
  deliveryOption,
  hasPreviousPrescription,
  consents,
  symptoms,
  symptomDescription,
  symptomIntensity,
  symptomDuration,
  visitedDoctor,
  doctorTypes,
  tookMedication,
  medicationDetails,
  nonMedicalTherapies,
  isOver21,
  isPregnantOrNursing,
  highTHCConsumption,
  preExistingConditions,
  cannabisExperience,
  onProductSelectChange,
  onNext,
  onBack,
  onSkipToFeedback,
  handlers
}: QuestionnaireStepRendererProps) => {
  logger.debug("=== QuestionnaireStepRenderer Debug ===");
  logger.debug("Current step:", step);
  logger.debug("Selected products:", selectedProducts);
  logger.debug("Mock products:", mockProducts);
  logger.debug("Mock pharmacies:", mockPharmacies);

  switch (step) {
    case 0:
      return (
        <PharmacyOverviewStep
          selectedProducts={selectedProducts}
          onProductSelectChange={onProductSelectChange}
          onNext={onNext}
        />
      );
    case 1:
      return (
        <TreatmentTypeStep
          selectedType={treatmentType}
          onSelect={handlers.setTreatmentType}
          onNext={onNext}
        />
      );
    case 2:
      return (
        <DeliveryOptionsStep
          selectedOption={deliveryOption}
          onSelect={handlers.setDeliveryOption}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 3:
      return (
        <PreviousPrescriptionStep
          hasPreviousPrescription={hasPreviousPrescription}
          onSelect={handlers.setHasPreviousPrescription}
          onNext={onNext}
          onBack={onBack}
          onSkipToFeedback={onSkipToFeedback}
        />
      );
    case 4:
      return (
        <ConsentStep
          consents={consents}
          onConsentChange={handlers.handleConsentChange}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 5:
      return (
        <SymptomsStep
          symptoms={symptoms}
          onSymptomChange={handlers.handleSymptomChange}
          description={symptomDescription}
          onDescriptionChange={handlers.setSymptomDescription}
          symptomIntensity={symptomIntensity}
          onSymptomIntensityChange={handlers.setSymptomIntensity}
          symptomDuration={symptomDuration}
          onSymptomDurationChange={handlers.setSymptomDuration}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 6:
      return (
        <PreviousTreatmentsStep
          visitedDoctor={visitedDoctor}
          onVisitedDoctorChange={handlers.setVisitedDoctor}
          doctorTypes={doctorTypes}
          onDoctorTypeChange={handlers.handleDoctorTypeChange}
          tookMedication={tookMedication}
          onTookMedicationChange={handlers.setTookMedication}
          medicationDetails={medicationDetails}
          onMedicationDetailsChange={handlers.setMedicationDetails}
          nonMedicalTherapies={nonMedicalTherapies}
          onNonMedicalTherapyChange={handlers.handleNonMedicalTherapyChange}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 7:
      return (
        <ExclusionCriteriaStep
          isOver21={isOver21}
          onIsOver21Change={handlers.setIsOver21}
          isPregnantOrNursing={isPregnantOrNursing}
          onIsPregnantOrNursingChange={handlers.setIsPregnantOrNursing}
          highTHCConsumption={highTHCConsumption}
          onHighTHCConsumptionChange={handlers.setHighTHCConsumption}
          preExistingConditions={preExistingConditions}
          onPreExistingConditionChange={handlers.handlePreExistingConditionChange}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 8:
      if (skipQuestionnaire) {
        return (
          <FeedbackForm
            onComplete={onNext}
            onBack={onBack}
          />
        );
      } else {
        return (
          <CannabisExperienceStep
            hasCannabisExperience={cannabisExperience.hasCannabisExperience}
            onHasCannabisExperienceChange={handlers.handleCannabisExperienceChange}
            hadSideEffects={cannabisExperience.hadSideEffects}
            onHadSideEffectsChange={handlers.handleSideEffectsChange}
            treatmentGoals={cannabisExperience.treatmentGoals}
            onTreatmentGoalChange={handlers.handleTreatmentGoalChange}
            onNext={onNext}
            onBack={onBack}
          />
        );
      }
    case 9:
      logger.debug("=== Checkout Step Debug ===");
      logger.debug("Passing to CheckoutStep - selectedProducts:", selectedProducts);
      logger.debug("Passing to CheckoutStep - products:", mockProducts);
      logger.debug("Passing to CheckoutStep - pharmacies:", mockPharmacies);
      logger.debug("Total amount calculation result:", calculateTotalAmount(selectedProducts));
      
      return (
        <CheckoutStep
          totalAmount={calculateTotalAmount(selectedProducts)}
          selectedProducts={selectedProducts}
          products={mockProducts}
          pharmacies={mockPharmacies}
          onComplete={onNext}
          onBack={onBack}
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

export default QuestionnaireStepRenderer;
