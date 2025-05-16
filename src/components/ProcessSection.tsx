
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Fragebogen ausfüllen',
      description: 'Beantworte Fragen zu deinen Symptomen, deiner Krankengeschichte und bisherigen Therapien.'
    },
    {
      number: '02',
      title: 'Automatische Prüfung',
      description: 'Unsere Software prüft auf Ausschlusskriterien wie Alter unter 21, Schwangerschaft oder psychotische Erkrankungen.'
    },
    {
      number: '03',
      title: 'Produkte auswählen',
      description: 'Wähle aus allen verfügbaren Cannabisblüten. Für jede Sorte kannst du zwischen 5 und 100 Gramm wählen.'
    },
    {
      number: '04',
      title: 'Bezahlung',
      description: '14,99€ Rezeptgebühr plus die Preise für die ausgewählten Produkte. 10€ Versandkosten bei Bestellungen unter 100€.'
    },
    {
      number: '05',
      title: 'Rezeptfreigabe',
      description: 'Bei medizinischer Eignung erhältst du automatisch binnen 4-10 Minuten eine Bestätigung per E-Mail.'
    }
  ];

  return (
    <section id="fragebogen-details" className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-cannabis-green-100 dark:bg-cannabis-green-900/30 text-cannabis-green-700 dark:text-cannabis-green-400 px-4 py-1.5 rounded-full text-sm font-medium mb-2">Digitaler Prozess</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray dark:text-white mb-4">So funktioniert der digitale Fragebogen</h2>
          <p className="text-base sm:text-lg text-dark-gray-light dark:text-gray-300 max-w-2xl mx-auto">
            Erhalte dein Rezept in nur wenigen Schritten - schnell, unkompliziert und vollständig legal.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 relative">
            {/* Connecting line */}
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-cannabis-green-200 dark:bg-cannabis-green-800 hidden md:block" style={{ left: '44px' }}></div>
            
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 flex items-center justify-center text-cannabis-green-700 dark:text-cannabis-green-400 font-bold text-xl relative z-10">
                  {step.number}
                </div>
                <div className="flex-grow pt-2 text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-dark-gray dark:text-white">{step.title}</h3>
                  <p className="text-sm sm:text-base text-dark-gray-light dark:text-gray-300">{step.description}</p>
                  
                  {index === steps.length - 1 && (
                    <div className="mt-6 flex justify-center md:justify-start">
                      <Link to="/fragebogen" className="inline-flex items-center justify-center px-6 py-2.5 bg-cannabis-green-500 text-white font-medium rounded-lg shadow-md hover:bg-cannabis-green-600 transition-all">
                        Fragebogen starten <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
