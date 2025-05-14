
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle, Clock, Video } from 'lucide-react';

const VideoCall = () => {
  useEffect(() => {
    document.title = 'Video-Call - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title text-center">Video-Sprechstunde</h1>
          <p className="section-subtitle text-center">
            Buche einen persönlichen Video-Call mit einer erfahrenen Ärztin oder einem Arzt.
            Erhalte dein Cannabis-Rezept bequem nach einem Online-Gespräch.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-10">
            <div className="lg:col-span-3">
              <Card className="shadow-md dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Termine</CardTitle>
                  <CardDescription>Wähle einen freien Termin für deinen Video-Call</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Calendar Widget Placeholder */}
                    <div className="bg-gray-100 dark:bg-dark-gray-medium rounded-lg p-6">
                      <p className="text-center text-dark-gray dark:text-gray-200">Hier würde ein Kalender-Widget angezeigt werden</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg text-dark-gray dark:text-white flex items-center gap-2">
                        <Clock size={18} /> Verfügbare Zeiten am 15.05.2025
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['09:00', '10:00', '11:30', '14:00', '15:30', '16:45'].map((time) => (
                          <button 
                            key={time}
                            className="p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:border-cannabis-green-500 dark:hover:border-cannabis-green-500 hover:bg-cannabis-green-50 dark:hover:bg-dark-gray-light transition-colors"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="shadow-md dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Deine Buchung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-cannabis-green-600 dark:text-cannabis-green-400">
                      <Calendar size={18} />
                      <span className="font-medium">15.05.2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-cannabis-green-600 dark:text-cannabis-green-400">
                      <Clock size={18} />
                      <span className="font-medium">14:00 Uhr</span>
                    </div>
                    <div className="flex items-center gap-2 text-cannabis-green-600 dark:text-cannabis-green-400">
                      <Video size={18} />
                      <span className="font-medium">Video-Sprechstunde (45 Min.)</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-300">Video-Termin</span>
                      <span className="font-medium">49,99 €</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700 font-bold">
                      <span>Gesamt</span>
                      <span>49,99 €</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input id="email" type="email" placeholder="deine-email@beispiel.de" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefonnummer</Label>
                      <Input id="phone" placeholder="+49 123 456789" />
                    </div>
                  </div>
                  
                  <Button className="w-full bg-cannabis-green-500 hover:bg-cannabis-green-600 dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700">
                    Jetzt bezahlen & buchen
                  </Button>
                  
                  <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle size={16} className="mt-0.5 text-cannabis-green-500" />
                    <p>Nach der Zahlung erhältst du eine Bestätigungs-E-Mail mit allen Details und dem Video-Link für deinen Termin.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray dark:text-white">So läuft der Video-Call ab</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-cannabis-green-100 dark:bg-cannabis-green-900 text-cannabis-green-600 dark:text-cannabis-green-300 mb-4">1</div>
                  <h3 className="font-bold text-lg mb-2 text-dark-gray dark:text-white">Termin auswählen</h3>
                  <p className="text-gray-600 dark:text-gray-300">Wähle einen passenden Termin und bezahle die Gebühr von 49,99€.</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-cannabis-green-100 dark:bg-cannabis-green-900 text-cannabis-green-600 dark:text-cannabis-green-300 mb-4">2</div>
                  <h3 className="font-bold text-lg mb-2 text-dark-gray dark:text-white">Gespräch führen</h3>
                  <p className="text-gray-600 dark:text-gray-300">Führe ein 45-minütiges Gespräch mit einer erfahrenen Ärztin oder einem Arzt.</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-cannabis-green-100 dark:bg-cannabis-green-900 text-cannabis-green-600 dark:text-cannabis-green-300 mb-4">3</div>
                  <h3 className="font-bold text-lg mb-2 text-dark-gray dark:text-white">Rezept erhalten</h3>
                  <p className="text-gray-600 dark:text-gray-300">Bei medizinischer Eignung erhältst du dein Rezept direkt nach dem Gespräch.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoCall;
