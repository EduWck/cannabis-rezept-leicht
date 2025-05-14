
import { ArrowRight } from 'lucide-react';

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
      description: '4,99€ Rezeptgebühr plus die Preise für die ausgewählten Produkte. 10€ Versandkosten bei Bestellungen unter 100€.'
    },
    {
      number: '05',
      title: 'Rezeptfreigabe',
      description: 'Bei medizinischer Eignung erhältst du automatisch binnen 4-10 Minuten eine Bestätigung per E-Mail.'
    }
  ];

  return (
    <section id="fragebogen-details" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="bg-cannabis-green-100 text-cannabis-green-700 px-4 py-1.5 rounded-full text-sm font-medium">Digitaler Prozess</span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mt-4 mb-4">So funktioniert der digitale Fragebogen</h2>
          <p className="text-lg text-dark-gray-light max-w-2xl mx-auto">
            Erhalte dein Rezept in nur wenigen Schritten - schnell, unkompliziert und vollständig legal.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 relative">
            {/* Connecting line */}
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-cannabis-green-200 hidden md:block" style={{ left: '44px' }}></div>
            
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-24 h-24 rounded-full bg-cannabis-green-100 flex items-center justify-center text-cannabis-green-700 font-bold text-xl relative z-10">
                  {step.number}
                </div>
                <div className="flex-grow pt-2">
                  <h3 className="text-xl font-semibold mb-2 text-dark-gray">{step.title}</h3>
                  <p className="text-dark-gray-light">{step.description}</p>
                  
                  {index === steps.length - 1 && (
                    <div className="mt-6">
                      <button className="btn-primary flex items-center">
                        Fragebogen starten <ArrowRight size={16} className="ml-2" />
                      </button>
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
