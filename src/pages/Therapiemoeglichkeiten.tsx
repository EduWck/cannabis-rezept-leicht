
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Video, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Therapiemoeglichkeiten = () => {
  useEffect(() => {
    document.title = 'Therapiemöglichkeiten - MediCannabis';
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <main className="page-container">
        <div className="max-w-5xl mx-auto">
          <h1 className="section-title text-center">Therapiemöglichkeiten</h1>
          <p className="section-subtitle text-center">
            Bei MediCannabis haben Sie verschiedene Möglichkeiten, Ihr medizinisches Cannabis-Rezept zu erhalten. 
            Wählen Sie den Weg, der am besten zu Ihnen passt.
          </p>
          
          <div className="grid gap-8 md:grid-cols-3 mt-12">
            <Card className="shadow-md dark:border-gray-700 transition-all hover:shadow-lg">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 bg-cannabis-green-100 dark:bg-cannabis-green-800/30 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-cannabis-green-600 dark:text-cannabis-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Online-Fragebogen</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  Füllen Sie unseren ausführlichen medizinischen Fragebogen online aus. 
                  Ein Arzt prüft Ihre Angaben und stellt gegebenenfalls ein Rezept aus.
                </p>
                <Link to="/fragebogen">
                  <Button className="bg-cannabis-green-500 hover:bg-cannabis-green-600 dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700 mt-auto">
                    Fragebogen starten
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="shadow-md dark:border-gray-700 transition-all hover:shadow-lg">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 bg-cannabis-green-100 dark:bg-cannabis-green-800/30 rounded-full flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-cannabis-green-600 dark:text-cannabis-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Video-Sprechstunde</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  Buchen Sie einen persönlichen Termin für eine Video-Sprechstunde mit einem Facharzt. 
                  Die Beratung erfolgt bequem von zu Hause aus.
                </p>
                <Link to="/video-call">
                  <Button className="bg-cannabis-green-500 hover:bg-cannabis-green-600 dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700 mt-auto">
                    Termin buchen
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="shadow-md dark:border-gray-700 transition-all hover:shadow-lg">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 bg-cannabis-green-100 dark:bg-cannabis-green-800/30 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-cannabis-green-600 dark:text-cannabis-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Vor-Ort-Termin</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  Besuchen Sie eine unserer Praxen für ein persönliches Gespräch mit einem Facharzt. 
                  Wir haben Standorte in Berlin, München und Hamburg.
                </p>
                <Link to="/vor-ort">
                  <Button className="bg-cannabis-green-500 hover:bg-cannabis-green-600 dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700 mt-auto">
                    Termin vereinbaren
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">So funktioniert der Prozess</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mt-6">
              <ol className="space-y-8">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cannabis-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Wählen Sie Ihre bevorzugte Konsultationsmethode</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Je nach Ihren Bedürfnissen und Ihrem Zeitplan können Sie zwischen unserem Online-Fragebogen, 
                      einer Video-Sprechstunde oder einem persönlichen Termin vor Ort wählen.
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cannabis-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Ärztliche Beratung und Bewertung</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ein Facharzt prüft Ihre Angaben oder führt ein Gespräch mit Ihnen, um Ihre medizinische 
                      Geschichte und Symptome zu verstehen und die beste Behandlungsoption zu bestimmen.
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cannabis-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Erhalt Ihres Rezepts</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Bei medizinischer Eignung erhalten Sie ein Rezept für medizinisches Cannabis, 
                      das Sie in einer Apotheke einlösen oder direkt über unseren Service bestellen können.
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cannabis-green-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Fortlaufende Betreuung</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Unser Team steht Ihnen auch nach der Rezeptausstellung zur Seite, 
                      um Fragen zu beantworten und Sie bei Ihrer Behandlung zu unterstützen.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Therapiemoeglichkeiten;
