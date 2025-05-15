
import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CookiePolicy = () => {
  useEffect(() => {
    document.title = 'Cookie-Richtlinie - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Cookie-Richtlinie</h1>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <h2>Was sind Cookies?</h2>
              <p>
                Cookies sind kleine Textdateien, die beim Besuch einer Webseite auf Ihrem Endgerät gespeichert werden. Sie ermöglichen es, Informationen über einen bestimmten Zeitraum zu speichern und die Nutzung der Webseite zu personalisieren.
              </p>
              
              <h2>Welche Cookies verwenden wir?</h2>
              <p>
                Wir verwenden folgende Arten von Cookies:
              </p>
              
              <h3>1. Notwendige Cookies</h3>
              <p>
                Diese Cookies sind erforderlich, damit unsere Webseite funktionieren kann. Sie ermöglichen grundlegende Funktionen wie die Seitensicherheit, Kontoverwaltung und den Zugang zu geschützten Bereichen.
              </p>
              
              <h3>2. Präferenz-Cookies</h3>
              <p>
                Diese Cookies ermöglichen es unserer Webseite, sich Informationen zu merken, die die Art und Weise beeinflussen, wie sich die Webseite verhält oder aussieht, wie z.B. Ihre bevorzugte Sprache oder die Region, in der Sie sich befinden.
              </p>
              
              <h3>3. Statistik-Cookies</h3>
              <p>
                Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Webseite interagieren, indem sie Informationen anonym sammeln und melden. Sie helfen uns, die Nutzung unserer Webseite zu verbessern.
              </p>
              
              <h3>4. Marketing-Cookies</h3>
              <p>
                Diese Cookies werden verwendet, um Besucher auf Webseiten zu verfolgen. Die Absicht ist, Anzeigen zu schalten, die relevant und ansprechend für den einzelnen Benutzer sind und daher wertvoller für Publisher und werbetreibende Drittparteien sind.
              </p>
              
              <h2>Wie können Sie Cookies kontrollieren?</h2>
              <p>
                Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie Ihre Browsereinstellungen anpassen. Bitte beachten Sie, dass das Blockieren bestimmter Cookies die Funktionalität unserer Webseite beeinträchtigen kann.
              </p>
              
              <h3>Anleitung zur Cookie-Verwaltung in gängigen Browsern:</h3>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="text-cannabis-green-500">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen" target="_blank" rel="noreferrer" className="text-cannabis-green-500">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/de-de/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" className="text-cannabis-green-500">Safari</a></li>
                <li><a href="https://support.microsoft.com/de-de/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noreferrer" className="text-cannabis-green-500">Microsoft Edge</a></li>
              </ul>
              
              <h2>Änderungen an unserer Cookie-Richtlinie</h2>
              <p>
                Wir behalten uns das Recht vor, diese Cookie-Richtlinie jederzeit zu ändern. Alle Änderungen werden auf dieser Seite veröffentlicht. Bitte überprüfen Sie regelmäßig, ob es Aktualisierungen oder Änderungen an unserer Cookie-Richtlinie gibt.
              </p>
              
              <p className="text-sm text-gray-500 mt-8">Stand: 15.05.2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiePolicy;
