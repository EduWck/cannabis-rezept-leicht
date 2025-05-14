
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StepIndicator from '../components/StepIndicator';

// Questionnaire Steps
import TreatmentTypeStep from '../components/fragebogen/TreatmentTypeStep';
import DeliveryOptionsStep from '../components/fragebogen/DeliveryOptionsStep';
import PreviousPrescriptionStep from '../components/fragebogen/PreviousPrescriptionStep';
import ConsentStep from '../components/fragebogen/ConsentStep';
import SymptomsStep from '../components/fragebogen/SymptomsStep';
import PreviousTreatmentsStep from '../components/fragebogen/PreviousTreatmentsStep';
import ExclusionCriteriaStep from '../components/fragebogen/ExclusionCriteriaStep';
import CannabisExperienceStep from '../components/fragebogen/CannabisExperienceStep';
import ProductSelectionStep from '../components/fragebogen/ProductSelectionStep';
import CheckoutStep from '../components/fragebogen/CheckoutStep';
import CompletionStep from '../components/fragebogen/CompletionStep';

const Fragebogen = () => {
  useEffect(() => {
    document.title = 'Fragebogen - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  // Current step state
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 1: Treatment Type
  const [selectedTreatmentType, setSelectedTreatmentType] = useState('');
  
  // Step 2: Delivery Options
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
  
  // Step 3: Previous Prescription
  const [hasPreviousPrescription, setHasPreviousPrescription] = useState<boolean | null>(null);
  
  // Step 4: Consent
  const [consents, setConsents] = useState({
    accuracy: false,
    privateMedical: false,
    emailConsent: false,
    therapeuticProducts: false,
    dataUsage: false,
    termsAndPrivacy: false,
    newsletter: false,
  });
  
  // Step 5: Symptoms
  const [symptoms, setSymptoms] = useState({
    chronicPain: false,
    sleepDisorder: false,
    adhd: false,
    migraine: false,
  });
  const [symptomDescription, setSymptomDescription] = useState('');
  const [symptomIntensity, setSymptomIntensity] = useState(5);
  const [symptomDuration, setSymptomDuration] = useState('');
  
  // Step 6: Previous Treatments
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
  const [medicationDetails, setMedicationDetails] = useState('');
  const [nonMedicalTherapies, setNonMedicalTherapies] = useState({
    physiotherapy: false,
    spa: false,
    massage: false,
    meditation: false,
    other: false,
    none: false,
  });
  
  // Step 7: Exclusion Criteria
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
  
  // Step 8: Cannabis Experience
  const [hasCannabisExperience, setHasCannabisExperience] = useState<boolean | null>(null);
  const [hadSideEffects, setHadSideEffects] = useState<boolean | null>(null);
  const [treatmentGoals, setTreatmentGoals] = useState({
    improveQuality: false,
    relieveSymptoms: false,
    improveMovement: false,
    betterDaily: false,
    workCapacity: false,
    socialParticipation: false,
    reduceMedication: false,
    reduceSideEffects: false,
  });
  
  // Step 9: Product Selection
  const [selectedProducts, setSelectedProducts] = useState<Record<string, { quantity: number }>>({});
  
  // Handler functions
  const handleConsentChange = (key: keyof typeof consents, value: boolean) => {
    setConsents(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSymptomChange = (symptom: keyof typeof symptoms, value: boolean) => {
    setSymptoms(prev => ({ ...prev, [symptom]: value }));
  };
  
  const handleDoctorTypeChange = (type: keyof typeof doctorTypes, value: boolean) => {
    setDoctorTypes(prev => ({ ...prev, [type]: value }));
  };
  
  const handleNonMedicalTherapyChange = (therapy: keyof typeof nonMedicalTherapies, value: boolean) => {
    setNonMedicalTherapies(prev => ({ ...prev, [therapy]: value }));
  };
  
  const handlePreExistingConditionChange = (condition: keyof typeof preExistingConditions, value: boolean) => {
    setPreExistingConditions(prev => ({ ...prev, [condition]: value }));
  };
  
  const handleTreatmentGoalChange = (goal: keyof typeof treatmentGoals, value: boolean) => {
    setTreatmentGoals(prev => ({ ...prev, [goal]: value }));
  };
  
  const handleProductSelectChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: { quantity }
    }));
  };
  
  const handleNextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePreviousStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => prev - 1);
  };
  
  // Calculate total amount for checkout
  const calculateTotalAmount = () => {
    // This is a simplified calculation - in a real app, you would use the actual product data
    const productTotal = Object.values(selectedProducts).reduce((sum, item) => sum + item.quantity * 10, 0); // Assuming €10 per gram for simplicity
    const rezeptGebühr = 14.99;
    const versandkosten = productTotal < 100 ? 10 : 0;
    
    return productTotal + rezeptGebühr + versandkosten;
  };
  
  // Total steps for the questionnaire
  const totalSteps = 11;
  
  // Define the current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <TreatmentTypeStep 
            selectedType={selectedTreatmentType}
            onSelect={setSelectedTreatmentType}
            onNext={handleNextStep}
          />
        );
      case 1:
        return (
          <DeliveryOptionsStep 
            selectedOption={selectedDeliveryOption}
            onSelect={setSelectedDeliveryOption}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 2:
        return (
          <PreviousPrescriptionStep 
            hasPreviousPrescription={hasPreviousPrescription}
            onSelect={setHasPreviousPrescription}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <ConsentStep 
            consents={consents}
            onConsentChange={handleConsentChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 4:
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
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 5:
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
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 6:
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
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 7:
        return (
          <CannabisExperienceStep 
            hasCannabisExperience={hasCannabisExperience}
            onHasCannabisExperienceChange={setHasCannabisExperience}
            hadSideEffects={hadSideEffects}
            onHadSideEffectsChange={setHadSideEffects}
            treatmentGoals={treatmentGoals}
            onTreatmentGoalChange={handleTreatmentGoalChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 8:
        return (
          <ProductSelectionStep 
            selectedProducts={selectedProducts}
            onProductSelectChange={handleProductSelectChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 9:
        return (
          <CheckoutStep 
            totalAmount={calculateTotalAmount()}
            onComplete={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 10:
        return (
          <CompletionStep treatmentType={selectedTreatmentType} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="page-container">
        <div className="max-w-3xl mx-auto">
          {currentStep < totalSteps - 1 && (
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps - 1} />
          )}
          
          {renderCurrentStep()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fragebogen;
