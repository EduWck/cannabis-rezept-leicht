
import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const UberUns = () => {
  useEffect(() => {
    document.title = 'Über uns - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <h1 className="section-title text-center">Über uns</h1>
        <p className="section-subtitle text-center">
          Erfahre mehr über MediCannabis, unsere Mission und das Team hinter der Plattform
        </p>
        
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-dark-gray dark:text-white">Unsere Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                MediCannabis wurde mit einer klaren Vision gegründet: Patienten einen einfachen, legalen und würdevollen Zugang zu medizinischem Cannabis zu ermöglichen.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Wir glauben an die therapeutische Wirkung von Cannabis und möchten die Stigmatisierung beenden, indem wir einen professionellen, medizinisch fundierten Ansatz verfolgen.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Unser Team aus Ärzten, Technologen und Gesundheitsexperten arbeitet daran, die bestmögliche Erfahrung für Patienten zu schaffen - von der Beratung bis zur Rezeptausstellung.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-dark-gray-medium rounded-lg overflow-hidden">
              <AspectRatio ratio={4/3}>
                <div className="h-full w-full flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Bild: Team bei der Arbeit</p>
                </div>
              </AspectRatio>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center text-dark-gray dark:text-white">Unser Expertenteam</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {name: "Dr. Johanna Berg", role: "Leitende Ärztin", specialty: "Schmerztherapie"},
                {name: "Dr. Thomas Weber", role: "Facharzt", specialty: "Neurologie"},
                {name: "Dr. Lisa Schneider", role: "Fachärztin", specialty: "Psychiatrie"},
                {name: "Dr. Michael Neumann", role: "Facharzt", specialty: "Innere Medizin"},
                {name: "Dr. Andrea Fischer", role: "Fachärztin", specialty: "Allgemeinmedizin"},
                {name: "Dr. David Müller", role: "Facharzt", specialty: "Schmerztherapie"}
              ].map((doctor, index) => (
                <Card key={index} className="shadow-md dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-dark-gray-medium mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">Foto</span>
                    </div>
                    <h3 className="text-lg font-bold text-center text-dark-gray dark:text-white">{doctor.name}</h3>
                    <p className="text-cannabis-green-600 dark:text-cannabis-green-400 text-center">{doctor.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm mt-1">Spezialisierung: {doctor.specialty}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="order-2 md:order-1 bg-gray-100 dark:bg-dark-gray-medium rounded-lg overflow-hidden">
              <AspectRatio ratio={4/3}>
                <div className="h-full w-full flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Bild: Moderne Praxisräume</p>
                </div>
              </AspectRatio>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-4 text-dark-gray dark:text-white">Qualität und Sicherheit</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Bei MediCannabis stehen Qualität und Sicherheit an erster Stelle. Wir arbeiten nur mit zertifizierten Ärzten und liefern ausschließlich geprüfte Produkte von lizenzierten Herstellern.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Unsere digitale Plattform erfüllt höchste Sicherheitsstandards zum Schutz deiner persönlichen und medizinischen Daten gemäß DSGVO.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Jeder Patient wird individuell betreut und erhält nur dann ein Rezept, wenn die medizinischen Voraussetzungen erfüllt sind und Cannabis als Therapieoption sinnvoll ist.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray dark:text-white text-center">Unsere Werte</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3 text-dark-gray dark:text-white">Patientenwohl</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Das Wohlbefinden unserer Patienten steht bei allen Entscheidungen im Mittelpunkt.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3 text-dark-gray dark:text-white">Transparenz</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Wir kommunizieren offen und ehrlich über Therapiemöglichkeiten, Kosten und Prozesse.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3 text-dark-gray dark:text-white">Innovation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Wir nutzen moderne Technologien, um den Zugang zu medizinischem Cannabis zu vereinfachen.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3 text-dark-gray dark:text-white">Professionalität</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Unsere Arbeit basiert auf medizinischen Standards und wissenschaftlichen Erkenntnissen.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3 text-dark-gray dark:text-white">Datenschutz</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Wir schützen deine persönlichen und medizinischen Daten mit größter Sorgfalt.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-3 text-dark-gray dark:text-white">Zugänglichkeit</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Wir machen medizinisches Cannabis für berechtigte Patienten einfach zugänglich.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UberUns;
