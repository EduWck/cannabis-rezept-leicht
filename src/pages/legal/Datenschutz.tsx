
import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Datenschutz = () => {
  useEffect(() => {
    document.title = 'Datenschutzerklärung - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Datenschutzerklärung</h1>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Allgemeine Informationen</h2>
              <p>
                Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie darüber, welche personenbezogenen Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben.
              </p>
              
              <h2>2. Verantwortliche Stelle</h2>
              <p>
                Verantwortlich für die Datenverarbeitung ist:
              </p>
              <p>
                MediCannabis GmbH<br />
                Cannabisstraße 420<br />
                10115 Berlin<br />
                kontakt@medicannabis.de
              </p>
              
              <h2>3. Erhebung und Verarbeitung personenbezogener Daten</h2>
              <p>
                Wir erheben personenbezogene Daten, wenn Sie:
              </p>
              <ul>
                <li>Unsere Website besuchen</li>
                <li>Ein Nutzerkonto erstellen</li>
                <li>Den Fragebogen ausfüllen</li>
                <li>Einen Termin buchen</li>
                <li>Mit unserem Kundendienst kommunizieren</li>
              </ul>
              <p>
                Zu den erhobenen Daten können gehören: Name, Anschrift, Geburtsdatum, E-Mail-Adresse, Telefonnummer, Gesundheitsdaten und Informationen zu Ihren medizinischen Beschwerden.
              </p>
              
              <h2>4. Zweck der Datenverarbeitung</h2>
              <p>
                Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:
              </p>
              <ul>
                <li>Zur Bereitstellung unserer Dienstleistungen</li>
                <li>Zur Abwicklung von Terminen und Rezepten</li>
                <li>Zur Kommunikation mit Ihnen</li>
                <li>Zur Verbesserung unserer Website und Dienstleistungen</li>
                <li>Zu Abrechnungszwecken</li>
              </ul>
              
              <h2>5. Rechtsgrundlage der Datenverarbeitung</h2>
              <p>
                Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage:
              </p>
              <ul>
                <li>Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</li>
                <li>Zur Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO)</li>
                <li>Zur Erfüllung einer rechtlichen Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO)</li>
                <li>Zur Wahrung berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO)</li>
              </ul>
              
              <h2>6. Weitergabe von Daten</h2>
              <p>
                Eine Weitergabe Ihrer personenbezogenen Daten erfolgt nur:
              </p>
              <ul>
                <li>An Ärzte, die für uns tätig sind, zur Durchführung der medizinischen Beratung</li>
                <li>An Dienstleister, die für uns tätig sind (z.B. IT-Dienstleister, Zahlungsanbieter)</li>
                <li>Wenn wir gesetzlich dazu verpflichtet sind</li>
              </ul>
              
              <h2>7. Dauer der Speicherung</h2>
              <p>
                Wir speichern Ihre personenbezogenen Daten so lange, wie es für die Zwecke, für die sie erhoben wurden, erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
              </p>
              
              <h2>8. Ihre Rechte</h2>
              <p>
                Sie haben das Recht auf:
              </p>
              <ul>
                <li>Auskunft über die von uns verarbeiteten personenbezogenen Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung oder Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerruf erteilter Einwilligungen</li>
                <li>Beschwerde bei einer Aufsichtsbehörde</li>
              </ul>
              
              <p className="text-sm text-gray-500 mt-8">Stand: 15.05.2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Datenschutz;
