
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CompletionStep from '@/components/fragebogen/CompletionStep';

const VorOrt = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDates, setPreferredDates] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    document.title = 'Vor-Ort-Termin - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  const locationData = [
    {
      name: "MediCannabis Berlin",
      address: "Kantstraße 24, 10623 Berlin",
      doctors: 4
    },
    {
      name: "MediCannabis München",
      address: "Leopoldstraße 81, 80802 München",
      doctors: 3
    },
    {
      name: "MediCannabis Hamburg",
      address: "Eppendorfer Baum 26, 20249 Hamburg",
      doctors: 2
    }
  ];
  
  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
  };
  
  const validateForm = () => {
    if (!selectedLocation) {
      toast({
        title: "Bitte auswählen",
        description: "Bitte wähle einen Standort aus.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!name || name.length < 3) {
      toast({
        title: "Bitte Namen angeben",
        description: "Bitte gib deinen Namen ein.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte gib eine gültige E-Mail-Adresse ein.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!phone || phone.length < 6) {
      toast({
        title: "Ungültige Telefonnummer",
        description: "Bitte gib eine gültige Telefonnummer ein.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!preferredDates || preferredDates.length < 5) {
      toast({
        title: "Terminangabe fehlt",
        description: "Bitte gib mindestens einen Wunschtermin an.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simuliere eine API-Anfrage
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      
      toast({
        title: "Terminanfrage gesendet!",
        description: "Deine Anfrage wurde erfolgreich übermittelt. Wir werden dich innerhalb von 24 Stunden kontaktieren.",
      });
    }, 1500);
  };
  
  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <main className="page-container pt-24">
          <CompletionStep treatmentType="vor-ort" />
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <main className="page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title text-center">Vor-Ort-Termin</h1>
          <p className="section-subtitle text-center">
            Buche einen persönlichen Vor-Ort-Termin bei einem unserer erfahrenen Ärzte.
            Erhalte dein Cannabis-Rezept nach einer persönlichen Beratung.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-10">
            <div className="lg:col-span-3">
              <Card className="shadow-md dark:border-gray-700 mb-8">
                <CardHeader>
                  <CardTitle>Standorte</CardTitle>
                  <CardDescription>Wähle einen Standort in deiner Nähe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Map Placeholder */}
                    <div className="bg-gray-100 dark:bg-dark-gray-medium rounded-lg p-6 h-64">
                      <p className="text-center text-dark-gray dark:text-gray-200">Hier würde eine Karte mit Standorten angezeigt werden</p>
                    </div>
                    
                    <div className="space-y-4">
                      {locationData.map((location) => (
                        <div 
                          key={location.name}
                          className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                            selectedLocation === location.name 
                              ? 'border-cannabis-green-500 bg-cannabis-green-50 dark:bg-dark-gray-light dark:border-cannabis-green-500' 
                              : 'hover:border-cannabis-green-500 dark:border-gray-700 dark:hover:border-cannabis-green-500'
                          }`}
                          onClick={() => handleSelectLocation(location.name)}
                        >
                          <div className="flex items-start gap-3">
                            <MapPin className="text-cannabis-green-500 mt-1" />
                            <div>
                              <h3 className="font-medium text-dark-gray dark:text-white">{location.name}</h3>
                              <p className="text-gray-600 dark:text-gray-300">{location.address}</p>
                              <p className="text-sm text-cannabis-green-600 dark:text-cannabis-green-400 mt-1">
                                {location.doctors} Ärzte verfügbar
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="shadow-md dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Terminanfrage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-cannabis-green-50 dark:bg-dark-gray-light rounded-lg">
                    <h3 className="font-medium text-dark-gray dark:text-white">
                      {selectedLocation || "MediCannabis Berlin"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedLocation === "MediCannabis München" 
                        ? "Leopoldstraße 81, 80802 München" 
                        : selectedLocation === "MediCannabis Hamburg"
                          ? "Eppendorfer Baum 26, 20249 Hamburg"
                          : "Kantstraße 24, 10623 Berlin"}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Vor- und Nachname" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="deine-email@beispiel.de" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefonnummer</Label>
                      <Input 
                        id="phone" 
                        placeholder="+49 123 456789" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred-dates">Gewünschte Termine</Label>
                      <textarea 
                        id="preferred-dates" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 min-h-[80px]"
                        placeholder="Gib bitte 2-3 mögliche Termine an"
                        value={preferredDates}
                        onChange={(e) => setPreferredDates(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-300">Vor-Ort-Termin</span>
                      <span className="font-medium">149,99 €</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700 font-bold">
                      <span>Gesamt</span>
                      <span>149,99 €</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-cannabis-green-500 hover:bg-cannabis-green-600 dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? 'Wird verarbeitet...' : 'Jetzt bezahlen & anfragen'}
                  </Button>
                  
                  <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle size={16} className="mt-0.5 text-cannabis-green-500" />
                    <p>Nach der Zahlung kontaktieren wir dich innerhalb von 24 Stunden zur finalen Terminvereinbarung.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray dark:text-white">So läuft der Vor-Ort-Termin ab</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-cannabis-green-100 dark:bg-cannabis-green-900 text-cannabis-green-600 dark:text-cannabis-green-300 mb-4">1</div>
                  <h3 className="font-bold text-lg mb-2 text-dark-gray dark:text-white">Anfrage & Zahlung</h3>
                  <p className="text-gray-600 dark:text-gray-300">Wähle einen Standort, gib deine Wunschtermine an und bezahle die Gebühr von 149,99€.</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-cannabis-green-100 dark:bg-cannabis-green-900 text-cannabis-green-600 dark:text-cannabis-green-300 mb-4">2</div>
                  <h3 className="font-bold text-lg mb-2 text-dark-gray dark:text-white">Termin vereinbaren</h3>
                  <p className="text-gray-600 dark:text-gray-300">Wir kontaktieren dich zur finalen Terminvereinbarung nach deinen Wünschen.</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-cannabis-green-100 dark:bg-cannabis-green-900 text-cannabis-green-600 dark:text-cannabis-green-300 mb-4">3</div>
                  <h3 className="font-bold text-lg mb-2 text-dark-gray dark:text-white">Persönliches Gespräch</h3>
                  <p className="text-gray-600 dark:text-gray-300">Beim persönlichen Gespräch mit einem Arzt erhältst du bei medizinischer Eignung dein Rezept.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VorOrt;
