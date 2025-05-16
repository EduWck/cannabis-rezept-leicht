
import { Clock, Shield, Truck, Euro, Stethoscope, Check, Lock, Star } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Clock className="text-cannabis-green-500" size={24} />,
      title: 'Schneller Zugang',
      description: 'Zu medizinischem Cannabis in nur wenigen Schritten'
    },
    {
      icon: <Shield className="text-cannabis-green-500" size={24} />,
      title: 'Legal und diskret',
      description: 'Vollständig legaler und vertraulicher Service'
    },
    {
      icon: <Truck className="text-cannabis-green-500" size={24} />,
      title: 'Deutschlandweiter Versand',
      description: 'Schnelle Lieferung in 1-3 Werktagen'
    },
    {
      icon: <Euro className="text-cannabis-green-500" size={24} />,
      title: 'Kostenfreier Versand',
      description: 'Ab 100€ Bestellwert versandkostenfrei'
    },
    {
      icon: <Stethoscope className="text-cannabis-green-500" size={24} />,
      title: 'Erfahrene Ärzteteam',
      description: 'Professionelle medizinische Betreuung'
    },
    {
      icon: <Check className="text-cannabis-green-500" size={24} />,
      title: 'Digitale Rezeptausstellung',
      description: 'Bei medizinischer Eignung schnell und unkompliziert'
    },
    {
      icon: <Lock className="text-cannabis-green-500" size={24} />,
      title: 'Datenschutzkonform',
      description: 'DSGVO-konforme sichere Datenverarbeitung'
    },
    {
      icon: <Star className="text-cannabis-green-500" size={24} />,
      title: 'Qualitätsgeprüft',
      description: 'Pharmazeutisch geprüfte Cannabis-Blüten'
    },
  ];

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-3 sm:mb-4">Unsere Vorteile auf einen Blick</h2>
          <p className="text-base sm:text-lg text-dark-gray-light max-w-2xl mx-auto">
            Erfahre, warum unsere Plattform die erste Wahl für Patienten ist, die medizinisches Cannabis benötigen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 flex items-center justify-center">{benefit.icon}</div>
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="font-semibold text-base sm:text-lg text-dark-gray mb-1 sm:mb-2">{benefit.title}</h3>
                  <p className="text-dark-gray-light text-xs sm:text-sm">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
