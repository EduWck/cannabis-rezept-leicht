
import { useState } from 'react';

export const useQuestionnaireState = () => {
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

  return {
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
  };
};
