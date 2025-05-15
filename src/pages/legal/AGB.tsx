
import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AGB = () => {
  useEffect(() => {
    document.title = 'AGB - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Allgemeine Geschäftsbedingungen</h1>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Geltungsbereich</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB" genannt) gelten für alle Verträge, die zwischen der MediCannabis GmbH (nachfolgend "MediCannabis" genannt) und deren Kunden (nachfolgend "Nutzer" genannt) über die Website medicannabis.de geschlossen werden.
              </p>
              
              <h2>2. Vertragsgegenstand</h2>
              <p>
                MediCannabis bietet eine Plattform zur Vermittlung von ärztlichen Konsultationen und zur Ausstellung von Rezepten für medizinisches Cannabis. Die Dienstleistungen umfassen:
              </p>
              <ul>
                <li>Die Bereitstellung eines digitalen Fragebogens zur Ersteinschätzung</li>
                <li>Die Vermittlung von Video-Sprechstunden mit qualifizierten Ärzten</li>
                <li>Die Organisation von Vor-Ort-Terminen bei kooperierenden Ärzten</li>
                <li>Die Ausstellung von Rezepten für medizinisches Cannabis bei entsprechender medizinischer Indikation</li>
              </ul>
              
              <h2>3. Vertragsschluss</h2>
              <p>
                Der Vertragsschluss erfolgt durch die Buchung einer Dienstleistung auf der Website und deren Bezahlung. Mit der Bezahlung akzeptiert der Nutzer diese AGB.
              </p>
              
              <h2>4. Preise und Zahlung</h2>
              <p>
                Die Preise für die Dienstleistungen sind auf der Website ersichtlich. Die Zahlung erfolgt per elektronischer Zahlungsmethoden wie Kreditkarte, PayPal oder Überweisung.
              </p>
              
              <h2>5. Widerrufsrecht</h2>
              <p>
                Der Nutzer hat das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
              </p>
              
              <h2>6. Datenschutz</h2>
              <p>
                MediCannabis verpflichtet sich, die personenbezogenen Daten der Nutzer gemäß der geltenden Datenschutzgesetze zu behandeln. Nähere Informationen finden Sie in unserer Datenschutzerklärung.
              </p>
              
              <h2>7. Haftung</h2>
              <p>
                MediCannabis haftet nur für Vorsatz und grobe Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, sofern keine wesentlichen Vertragspflichten verletzt werden.
              </p>
              
              <h2>8. Schlussbestimmungen</h2>
              <p>
                Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Erfüllungsort und Gerichtsstand ist Berlin, soweit gesetzlich zulässig.
              </p>
              
              <p className="text-sm text-gray-500 mt-8">Stand: 15.05.2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AGB;
