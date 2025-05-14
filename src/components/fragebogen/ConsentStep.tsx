
import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ConsentStepProps {
  consents: {
    accuracy: boolean;
    privateMedical: boolean;
    emailConsent: boolean;
    therapeuticProducts: boolean;
    dataUsage: boolean;
    termsAndPrivacy: boolean;
    newsletter: boolean;
  };
  onConsentChange: (key: keyof ConsentStepProps["consents"], value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const ConsentStep = ({ consents, onConsentChange, onNext, onBack }: ConsentStepProps) => {
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    // Check if all required consents are true
    const requiredConsents = Object.entries(consents).filter(([key]) => key !== 'newsletter');
    setCanProceed(requiredConsents.every(([_, value]) => value === true));
  }, [consents]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Einwilligungen</h2>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          Bitte lies die folgenden Informationen sorgfältig durch und bestätige deine Einwilligung, um fortzufahren.
          Die Einwilligungen sind notwendig, um dir ein rechtsgültiges Rezept ausstellen zu können.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="accuracy" 
            checked={consents.accuracy} 
            onCheckedChange={(checked) => onConsentChange('accuracy', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="accuracy" className="text-sm font-medium cursor-pointer">Ich bestätige, dass alle meine Angaben wahrheitsgemäß sind.</Label>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Falsche Angaben können rechtliche Konsequenzen haben und führen zum Ausschluss von der Behandlung.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="privateMedical" 
            checked={consents.privateMedical} 
            onCheckedChange={(checked) => onConsentChange('privateMedical', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="privateMedical" className="text-sm font-medium cursor-pointer">Ich verstehe, dass es sich um eine privatärztliche Leistung handelt.</Label>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Die Kosten für die Konsultation und das Rezept werden nicht von der gesetzlichen Krankenversicherung übernommen.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="emailConsent" 
            checked={consents.emailConsent} 
            onCheckedChange={(checked) => onConsentChange('emailConsent', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="emailConsent" className="text-sm font-medium cursor-pointer">Ich stimme dem Versand meines Rezepts per E-Mail zu.</Label>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Das Rezept wird als verschlüsselte PDF-Datei an die von mir angegebene E-Mail-Adresse gesendet.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="therapeuticProducts" 
            checked={consents.therapeuticProducts} 
            onCheckedChange={(checked) => onConsentChange('therapeuticProducts', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="therapeuticProducts" className="text-sm font-medium cursor-pointer">Ich verstehe, dass nur therapeutisch sinnvolle Produkte verschrieben werden.</Label>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Die verschriebenen Produkte werden aufgrund ihrer medizinischen Eignung für meine Symptome ausgewählt.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="dataUsage" 
            checked={consents.dataUsage} 
            onCheckedChange={(checked) => onConsentChange('dataUsage', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="dataUsage" className="text-sm font-medium cursor-pointer">Ich willige in die Nutzung meiner Daten ein.</Label>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Meine Daten werden ausschließlich zum Zweck der medizinischen Beratung und Rezeptausstellung verwendet.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="termsAndPrivacy" 
            checked={consents.termsAndPrivacy} 
            onCheckedChange={(checked) => onConsentChange('termsAndPrivacy', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="termsAndPrivacy" className="text-sm font-medium cursor-pointer">Ich stimme den AGB und der Datenschutzerklärung zu.</Label>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Ich habe die <a href="#" className="text-cannabis-green-600 dark:text-cannabis-green-400 underline">AGB</a> und die <a href="#" className="text-cannabis-green-600 dark:text-cannabis-green-400 underline">Datenschutzerklärung</a> gelesen und akzeptiere diese.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 pt-2 border-t dark:border-gray-700">
          <Checkbox 
            id="newsletter" 
            checked={consents.newsletter} 
            onCheckedChange={(checked) => onConsentChange('newsletter', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="newsletter" className="text-sm font-medium cursor-pointer">Ich möchte den Newsletter erhalten. (Optional)</Label>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Ich möchte über neue Produkte, Angebote und Informationen zu medizinischem Cannabis informiert werden.
            </p>
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

export default ConsentStep;
