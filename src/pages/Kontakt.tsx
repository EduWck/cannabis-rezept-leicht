
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Kontakt = () => {
  useEffect(() => {
    document.title = 'Kontakt - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <main className="page-container">
        <div className="max-w-5xl mx-auto">
          <h1 className="section-title text-center">Kontakt</h1>
          <p className="section-subtitle text-center">
            Hast du Fragen oder benötigst du Unterstützung? Wir sind für dich da!
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
            <div className="lg:col-span-3">
              <Card className="shadow-md dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Schreib uns eine Nachricht</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Dein Name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail</Label>
                        <Input id="email" type="email" placeholder="deine-email@beispiel.de" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Betreff</Label>
                      <Input id="subject" placeholder="Worum geht es?" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Nachricht</Label>
                      <textarea 
                        id="message" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 min-h-[150px]"
                        placeholder="Wie können wir dir helfen?"
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="privacy" className="rounded border-gray-300 text-cannabis-green-500 focus:ring-cannabis-green-500" />
                      <Label htmlFor="privacy" className="text-sm">
                        Ich akzeptiere die <a href="#" className="text-cannabis-green-600 dark:text-cannabis-green-400 hover:underline">Datenschutzbestimmungen</a>
                      </Label>
                    </div>
                    
                    <Button className="w-full bg-cannabis-green-500 hover:bg-cannabis-green-600 dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700">
                      Nachricht senden
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4 text-dark-gray dark:text-white">Kontaktdaten</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="text-cannabis-green-500 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-dark-gray dark:text-white">E-Mail</p>
                        <a href="mailto:info@medicannabis.de" className="text-cannabis-green-600 dark:text-cannabis-green-400 hover:underline">
                          info@medicannabis.de
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="text-cannabis-green-500 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-dark-gray dark:text-white">Telefon</p>
                        <a href="tel:+4930123456789" className="text-cannabis-green-600 dark:text-cannabis-green-400 hover:underline">
                          +49 30 123 456 789
                        </a>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Mo-Fr: 9:00 - 17:00 Uhr</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-cannabis-green-500 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-dark-gray dark:text-white">Hauptsitz</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          MediCannabis GmbH<br />
                          Kantstraße 24<br />
                          10623 Berlin
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="text-cannabis-green-500 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-dark-gray dark:text-white">Öffnungszeiten</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Montag - Freitag: 9:00 - 17:00 Uhr<br />
                          Samstag & Sonntag: Geschlossen
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4 text-dark-gray dark:text-white">FAQs</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Viele Fragen werden bereits in unseren häufig gestellten Fragen beantwortet.
                  </p>
                  <Button className="w-full" variant="outline">
                    FAQ ansehen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center text-dark-gray dark:text-white">Unsere Standorte</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Berlin', 'München', 'Hamburg'].map((city) => (
                <Card key={city} className="shadow-md dark:border-gray-700">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2 text-dark-gray dark:text-white">MediCannabis {city}</h3>
                    <div className="h-40 bg-gray-100 dark:bg-dark-gray-medium rounded-lg mb-3 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Karte: {city}</p>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      {city === 'Berlin' && (
                        <p>Kantstraße 24, 10623 Berlin</p>
                      )}
                      {city === 'München' && (
                        <p>Leopoldstraße 81, 80802 München</p>
                      )}
                      {city === 'Hamburg' && (
                        <p>Eppendorfer Baum 26, 20249 Hamburg</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Kontakt;
