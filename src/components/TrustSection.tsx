
import { Shield, Check, CreditCard } from 'lucide-react';

const TrustSection = () => {
  // Placeholder testimonials
  const testimonials = [
    {
      quote: "Der Prozess war sehr einfach und diskret. Innerhalb von 8 Minuten hatte ich meine Bestätigung. Absolut empfehlenswert.",
      author: "Michael K.",
      date: "15.04.2023"
    },
    {
      quote: "Endlich eine professionelle Lösung für meine chronischen Schmerzen. Der Video-Call war sehr hilfreich und die Ärztin kompetent.",
      author: "Sandra M.",
      date: "22.03.2023"
    },
    {
      quote: "Nach Jahren der erfolglosen Therapien hat mir medizinisches Cannabis endlich geholfen. Der digitale Weg war überraschend unkompliziert.",
      author: "Thomas B.",
      date: "08.05.2023"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-3 sm:mb-4">Vertrauen ist unsere Basis</h2>
          <p className="text-base sm:text-lg text-dark-gray-light max-w-2xl mx-auto">
            Tausende zufriedene Patienten vertrauen bereits auf unseren Service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-5 sm:p-6 rounded-xl h-full">
              <div className="flex mb-4">
                <div className="text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </div>
              <p className="text-dark-gray mb-4 italic text-sm sm:text-base">"{testimonial.quote}"</p>
              <div className="flex justify-between items-center">
                <span className="font-medium text-dark-gray text-sm sm:text-base">{testimonial.author}</span>
                <span className="text-dark-gray-light text-xs sm:text-sm">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gray-50 p-5 sm:p-6 rounded-xl flex flex-col items-center text-center h-full">
            <Shield className="text-cannabis-green-500 mb-3 sm:mb-4" size={28} />
            <h3 className="font-semibold mb-2 text-base sm:text-lg">DSGVO-konform</h3>
            <p className="text-dark-gray-light text-xs sm:text-sm">Alle deine Daten werden verschlüsselt und sicher gespeichert</p>
          </div>
          
          <div className="bg-gray-50 p-5 sm:p-6 rounded-xl flex flex-col items-center text-center h-full">
            <div className="mb-3 sm:mb-4">
              <span className="text-cannabis-green-500 font-bold text-xl sm:text-2xl">21+</span>
            </div>
            <h3 className="font-semibold mb-2 text-base sm:text-lg">Nur für Erwachsene</h3>
            <p className="text-dark-gray-light text-xs sm:text-sm">Rezepte nur für Personen über 21 Jahren möglich</p>
          </div>
          
          <div className="bg-gray-50 p-5 sm:p-6 rounded-xl flex flex-col items-center text-center h-full">
            <CreditCard className="text-cannabis-green-500 mb-3 sm:mb-4" size={28} />
            <h3 className="font-semibold mb-2 text-base sm:text-lg">Sichere Zahlungen</h3>
            <p className="text-dark-gray-light text-xs sm:text-sm">Zahlungsabwicklung über sichere und verschlüsselte Verfahren</p>
          </div>
          
          <div className="bg-gray-50 p-5 sm:p-6 rounded-xl flex flex-col items-center text-center h-full">
            <div className="flex items-center mb-3 sm:mb-4">
              <Check className="text-cannabis-green-500 mr-1" size={20} />
              <span className="font-bold text-cannabis-green-600">Verifiziert</span>
            </div>
            <h3 className="font-semibold mb-2 text-base sm:text-lg">Geprüfte Ärzte</h3>
            <p className="text-dark-gray-light text-xs sm:text-sm">Alle unsere Ärzte sind approbiert und erfahren in Cannabis-Therapie</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
