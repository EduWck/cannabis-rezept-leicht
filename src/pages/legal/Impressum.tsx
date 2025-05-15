
import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Impressum = () => {
  useEffect(() => {
    document.title = 'Impressum - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Impressum</h1>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <h2>Angaben gemäß § 5 TMG:</h2>
              <p>
                MediCannabis GmbH<br />
                Cannabisstraße 420<br />
                10115 Berlin
              </p>
              
              <h2>Vertreten durch:</h2>
              <p>
                Dr. Hanf Grün, Geschäftsführer
              </p>
              
              <h2>Kontakt:</h2>
              <p>
                Telefon: +49 (0) 30 123 456 789<br />
                E-Mail: kontakt@medicannabis.de
              </p>
              
              <h2>Registereintrag:</h2>
              <p>
                Eintragung im Handelsregister.<br />
                Registergericht: Amtsgericht Berlin-Charlottenburg<br />
                Registernummer: HRB 123456
              </p>
              
              <h2>Umsatzsteuer-ID:</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                DE 123456789
              </p>
              
              <h2>Aufsichtsbehörde:</h2>
              <p>
                Bundesinstitut für Arzneimittel und Medizinprodukte (BfArM)<br />
                Kurt-Georg-Kiesinger-Allee 3<br />
                53175 Bonn
              </p>
              
              <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
              <p>
                Dr. Hanf Grün<br />
                Cannabisstraße 420<br />
                10115 Berlin
              </p>
              
              <h2>Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="text-cannabis-green-500">https://ec.europa.eu/consumers/odr/</a>.<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
              
              <h2>Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              
              <p className="text-sm text-gray-500 mt-8">Stand: 15.05.2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Impressum;
