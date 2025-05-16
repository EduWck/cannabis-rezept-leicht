
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  // FAQ items with questions and answers
  const faqs = [
    {
      question: 'Wer darf ein Rezept für medizinisches Cannabis erhalten?',
      answer: 'Medizinisches Cannabis kann für verschiedene Indikationen verschrieben werden, darunter chronische Schmerzen, Spastiken bei MS, Übelkeit/Erbrechen bei Chemotherapie, Appetitsteigerung bei HIV/AIDS und weitere. Du musst mindestens 21 Jahre alt sein und darfst keine psychotischen Erkrankungen haben oder schwanger sein. Die genaue Eignung wird im Rahmen des Fragebogens oder Arztgesprächs geprüft.'
    },
    {
      question: 'Wie schnell erfolgt die Freigabe meines Rezepts?',
      answer: 'Bei Nutzung des digitalen Fragebogens erfolgt die Rezeptfreigabe bei medizinischer Eignung automatisch innerhalb von 4-10 Minuten nach Bezahlung. Bei einem Video-Call erhältst du die Rezeptfreigabe direkt im Anschluss an das Arztgespräch. Bei einem Vor-Ort-Termin wird das Rezept direkt in der Praxis ausgestellt.'
    },
    {
      question: 'Wie sicher sind meine persönlichen Daten?',
      answer: 'Wir legen größten Wert auf Datenschutz und Sicherheit. Alle persönlichen und medizinischen Daten werden nach DSGVO-Standards verschlüsselt gespeichert und verarbeitet. Der Zugriff auf deine Daten ist nur für berechtigte medizinische Fachkräfte möglich, die der ärztlichen Schweigepflicht unterliegen.'
    },
    {
      question: 'Wie erfolgt der Versand meiner Medikamente?',
      answer: 'Nach erfolgreicher Rezeptausstellung wird dein Rezept an eine kooperierende Apotheke übermittelt. Diese verschickt deine Medikamente in neutraler Verpackung per Expressversand. Die Lieferung erfolgt in der Regel innerhalb von 1-3 Werktagen. Ab einem Bestellwert von 100 Euro ist der Versand kostenfrei, darunter fallen 10 Euro Versandkosten an.'
    },
    {
      question: 'Welche Zahlungsmethoden werden akzeptiert?',
      answer: 'Wir akzeptieren verschiedene sichere Zahlungsmethoden, darunter Kreditkarte, PayPal und Sofortüberweisung. Alle Zahlungen werden verschlüsselt abgewickelt und sind sicher. Die Bezahlung erfolgt immer vorab, bevor das Rezept ausgestellt wird.'
    },
    {
      question: 'Was passiert, wenn ich medizinisch nicht für ein Rezept geeignet bin?',
      answer: 'Falls unsere Ärzte feststellen, dass eine Cannabis-Therapie für dich nicht geeignet ist, erhältst du eine entsprechende Mitteilung mit einer Begründung. In diesem Fall erstatten wir dir die Rezeptgebühr vollständig zurück. Die Produktkosten werden dir nicht berechnet, wenn kein Rezept ausgestellt wird.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-3 sm:mb-4">Häufig gestellte Fragen</h2>
          <p className="text-base sm:text-lg text-dark-gray-light max-w-2xl mx-auto">
            Hier findest du Antworten auf die häufigsten Fragen zu unserem Service.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
            >
              <button
                className="w-full text-left p-4 sm:p-6 focus:outline-none flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="font-semibold text-dark-gray text-sm sm:text-base pr-4">{faq.question}</h3>
                {openIndex === index ? 
                  <ChevronUp className="text-cannabis-green-500 flex-shrink-0" size={20} /> : 
                  <ChevronDown className="text-cannabis-green-500 flex-shrink-0" size={20} />
                }
              </button>
              <div 
                className={`px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] pb-4 sm:pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-dark-gray-light text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
