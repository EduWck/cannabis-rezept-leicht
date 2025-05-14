
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">Unsere Vorteile auf einen Blick</h2>
          <p className="text-lg text-dark-gray-light max-w-2xl mx-auto">
            Erfahre, warum unsere Plattform die erste Wahl für Patienten ist, die medizinisches Cannabis benötigen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-dark-gray mb-2">{benefit.title}</h3>
                  <p className="text-dark-gray-light text-sm">{benefit.description}</p>
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
