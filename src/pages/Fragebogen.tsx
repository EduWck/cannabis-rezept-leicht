
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Fragebogen = () => {
  useEffect(() => {
    document.title = 'Fragebogen - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title text-center">Medizinischer Fragebogen</h1>
          <p className="section-subtitle text-center">
            Beantworte die folgenden Fragen, um deine medizinische Eignung zu prüfen. 
            Bei erfolgreicher Prüfung erhältst du dein Cannabis-Rezept in 4-10 Minuten.
          </p>
          
          <div className="mt-10">
            <Card className="mb-8 shadow-md dark:border-gray-700">
              <CardHeader>
                <CardTitle>Persönliche Informationen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname</Label>
                    <Input id="firstName" placeholder="Dein Vorname" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname</Label>
                    <Input id="lastName" placeholder="Dein Nachname" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" type="email" placeholder="deine-email@beispiel.de" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefonnummer</Label>
                    <Input id="phone" placeholder="+49 123 456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthday">Geburtsdatum</Label>
                    <Input id="birthday" type="date" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-8 shadow-md dark:border-gray-700">
              <CardHeader>
                <CardTitle>Symptome & Beschwerden</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">Wähle alle Symptome aus, unter denen du leidest:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="chronic-pain" />
                    <Label htmlFor="chronic-pain">Chronische Schmerzen</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="insomnia" />
                    <Label htmlFor="insomnia">Schlafstörungen</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anxiety" />
                    <Label htmlFor="anxiety">Angstzustände</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="depression" />
                    <Label htmlFor="depression">Depression</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="spasticity" />
                    <Label htmlFor="spasticity">Spastiken</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="migraine" />
                    <Label htmlFor="migraine">Migräne</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="appetite-loss" />
                    <Label htmlFor="appetite-loss">Appetitlosigkeit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nausea" />
                    <Label htmlFor="nausea">Übelkeit</Label>
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="symptom-description">Beschreibe deine Symptome genauer:</Label>
                  <textarea 
                    id="symptom-description" 
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 min-h-[100px]"
                    placeholder="Beschreibe hier deine Symptome, deren Intensität und Häufigkeit..."
                  ></textarea>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 shadow-md dark:border-gray-700">
              <CardHeader>
                <CardTitle>Bisherige Therapien</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">Welche Therapien hast du bereits versucht?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="painkillers" />
                    <Label htmlFor="painkillers">Schmerzmittel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="psychotherapy" />
                    <Label htmlFor="psychotherapy">Psychotherapie</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="physiotherapy" />
                    <Label htmlFor="physiotherapy">Physiotherapie</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="antidepressants" />
                    <Label htmlFor="antidepressants">Antidepressiva</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="surgery" />
                    <Label htmlFor="surgery">Operation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="opioids" />
                    <Label htmlFor="opioids">Opioide</Label>
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="therapy-description">Beschreibe deine bisherigen Therapieversuche:</Label>
                  <textarea 
                    id="therapy-description" 
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 min-h-[100px]"
                    placeholder="Welche Therapien hast du bereits versucht und warum waren sie nicht erfolgreich?"
                  ></textarea>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 shadow-md dark:border-gray-700">
              <CardHeader>
                <CardTitle>Ausschlusskriterien</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">Bitte bestätige, dass keines der folgenden Ausschlusskriterien auf dich zutrifft:</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="age-confirm" />
                    <Label htmlFor="age-confirm">Ich bin mindestens 21 Jahre alt</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="not-pregnant" />
                    <Label htmlFor="not-pregnant">Ich bin nicht schwanger und stille nicht</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="no-psychosis" />
                    <Label htmlFor="no-psychosis">Ich leide nicht an einer psychotischen Erkrankung</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="truth-confirm" />
                    <Label htmlFor="truth-confirm">Ich bestätige, dass alle Angaben wahrheitsgemäß sind</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-8">
              <Button className="w-full md:w-1/2 bg-cannabis-green-500 hover:bg-cannabis-green-600 dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700 text-lg py-6">
                Weiter zur Produktauswahl
              </Button>
            </div>
            
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Die Rezeptgebühr beträgt 4,99€. Nach der Produktauswahl folgt die Bezahlung.
              <br />Bei medizinischer Eignung erhältst du dein Rezept in 4-10 Minuten per E-Mail.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fragebogen;
