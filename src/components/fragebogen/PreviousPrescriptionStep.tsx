
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface PreviousPrescriptionStepProps {
  hasPreviousPrescription: boolean | null;
  onSelect: (value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  onSkipToFeedback?: () => void; // New prop for skipping to feedback
}

const PreviousPrescriptionStep = ({ 
  hasPreviousPrescription, 
  onSelect, 
  onNext, 
  onBack,
  onSkipToFeedback
}: PreviousPrescriptionStepProps) => {
  
  const handleNext = () => {
    if (hasPreviousPrescription === true && onSkipToFeedback) {
      toast({
        title: "Behandlungsfeedback",
        description: "Bitte geben Sie uns Feedback zu Ihrer aktuellen Behandlung.",
      });
      onSkipToFeedback();
    } else if (hasPreviousPrescription === true) {
      toast({
        title: "Hinweis",
        description: "Deine Daten werden automatisch geladen, du musst sie nicht erneut eingeben.",
      });
      onNext();
    } else {
      onNext();
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Hast du bereits ein Rezept über unsere Plattform erhalten?</h2>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
        <Button 
          variant={hasPreviousPrescription === true ? "default" : "outline"} 
          className={`py-8 px-12 text-xl ${hasPreviousPrescription === true ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
          onClick={() => onSelect(true)}
        >
          <Check className="w-6 h-6" />
          Ja
        </Button>
        
        <Button 
          variant={hasPreviousPrescription === false ? "default" : "outline"} 
          className={`py-8 px-12 text-xl ${hasPreviousPrescription === false ? 'bg-cannabis-green-500 hover:bg-cannabis-green-600' : ''} flex items-center gap-2`}
          onClick={() => onSelect(false)}
        >
          <X className="w-6 h-6" />
          Nein
        </Button>
      </div>
      
      <div className="flex justify-between mt-12">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="py-6 px-8"
        >
          Zurück
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={hasPreviousPrescription === null}
          className="py-6 px-8"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
};

export default PreviousPrescriptionStep;
