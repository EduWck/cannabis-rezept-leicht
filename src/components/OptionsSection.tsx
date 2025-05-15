
import { FileText, Video, MapPin, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const OptionsSection = () => {
  return (
    <section id="optionen" className="py-16 bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Wähle den passenden Weg zu deinem Rezept</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alle drei Wege führen zum gleichen Ziel – einem legalen Rezept für medizinisches Cannabis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Option 1: Fragebogen */}
          <div id="fragebogen" className="bg-card dark:bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group animate-fade-in">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-cannabis-green-600 dark:text-cannabis-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Digitaler Fragebogen</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-foreground">ab 4,99€</span>
                <span className="ml-2 text-muted-foreground">zzgl. Produktkosten</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Automatisierte Prüfung & Produktauswahl</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Rezeptfreigabe nach 4-10 Minuten</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">10€ Versand (unter 100€ Bestellwert)</span>
                </li>
              </ul>
              <Link to="/fragebogen" className="bg-cannabis-green-500 hover:bg-cannabis-green-600 text-white w-full py-3 rounded-md font-medium text-center block transition-colors">Fragebogen starten</Link>
            </div>
          </div>

          {/* Option 2: Video-Call */}
          <div id="video-call" className="bg-card dark:bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group animate-fade-in delay-100">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Video className="text-cannabis-green-600 dark:text-cannabis-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Video-Sprechstunde</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-foreground">49,99€</span>
                <span className="ml-2 text-muted-foreground">Rezeptgebühr</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Persönliches Gespräch mit erfahrener Ärztin</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Termin im Kalender wählbar</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Persönliche Beratung zur optimalen Therapie</span>
                </li>
              </ul>
              <Link to="/video-call" className="bg-cannabis-green-500 hover:bg-cannabis-green-600 text-white w-full py-3 rounded-md font-medium text-center block transition-colors">Video-Termin buchen</Link>
            </div>
          </div>

          {/* Option 3: Vor-Ort-Termin */}
          <div id="vor-ort" className="bg-card dark:bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group animate-fade-in delay-200">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="text-cannabis-green-600 dark:text-cannabis-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Vor-Ort-Termin</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-foreground">149,99€</span>
                <span className="ml-2 text-muted-foreground">Rezeptgebühr</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Persönlicher Termin in einer unserer Praxen</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Sofortige Zahlung, Team meldet sich</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Ausführliche Anamnese und persönliche Beratung</span>
                </li>
              </ul>
              <Link to="/vor-ort" className="bg-cannabis-green-500 hover:bg-cannabis-green-600 text-white w-full py-3 rounded-md font-medium text-center block transition-colors">Termin anfragen</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionsSection;
