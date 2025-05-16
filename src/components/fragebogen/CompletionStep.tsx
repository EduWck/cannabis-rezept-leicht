
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface CompletionStepProps {
  treatmentType: string;
}

const CompletionStep = ({ treatmentType }: CompletionStepProps) => {
  return (
    <div className="text-center space-y-5 sm:space-y-6 py-6 sm:py-8">
      <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 flex items-center justify-center mb-4 sm:mb-6">
        <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-cannabis-green-600 dark:text-cannabis-green-400" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold">Vielen Dank!</h2>
      
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
        {treatmentType === "fragebogen" ? (
          <>
            Dein Fragebogen wurde erfolgreich übermittelt und wird jetzt von unserem ärztlichen Team geprüft. 
            Bei medizinischer Eignung erhältst du dein Rezept innerhalb von 4-10 Minuten per E-Mail.
          </>
        ) : treatmentType === "video" ? (
          <>
            Deine Buchung für einen Video-Call wurde erfolgreich abgeschlossen. 
            Du erhältst in Kürze eine E-Mail mit den Details zu deinem Termin.
          </>
        ) : (
          <>
            Deine Terminanfrage wurde erfolgreich übermittelt. 
            Unser Team wird sich innerhalb der nächsten 24 Stunden bei dir melden, um einen Termin zu vereinbaren.
          </>
        )}
      </p>
      
      {treatmentType === "fragebogen" && (
        <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-left max-w-xl mx-auto overflow-hidden">
          <h3 className="text-base sm:text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Was passiert als Nächstes?</h3>
          <ol className="list-decimal list-inside space-y-1 sm:space-y-2 text-blue-700 dark:text-blue-300 text-sm sm:text-base">
            <li>Dein Fragebogen wird von unserem ärztlichen Team geprüft.</li>
            <li>Bei medizinischer Eignung erhältst du dein Rezept per E-Mail.</li>
            <li>Je nach gewählter Option wird deine Bestellung versendet oder du kannst dein Rezept in einer Apotheke deiner Wahl einlösen.</li>
            <li>Nach Erhalt kannst du mit der Therapie beginnen. Bitte halte dich an die empfohlene Dosierung.</li>
          </ol>
        </div>
      )}
      
      <div className="flex justify-center mt-6 sm:mt-8">
        <Link to="/">
          <Button className="py-2.5 sm:py-6 px-6 sm:px-10 text-base sm:text-lg">
            Zurück zur Startseite
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompletionStep;
