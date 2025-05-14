
import { FileText, Video, MapPin, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const OptionsSection = () => {
  return (
    <section id="optionen" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">Wähle den passenden Weg zu deinem Rezept</h2>
          <p className="text-lg text-dark-gray-light max-w-2xl mx-auto">
            Alle drei Wege führen zum gleichen Ziel – einem legalen Rezept für medizinisches Cannabis.
            Die Bezahlung erfolgt immer vorab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Option 1: Fragebogen */}
          <div id="fragebogen" className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 flex items-center justify-center mb-4">
                <FileText className="text-cannabis-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digitaler Fragebogen</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-dark-gray">4,99€</span>
                <span className="ml-2 text-dark-gray-light">Rezeptgebühr</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Digitale Angaben zu Symptomen & Krankengeschichte</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Bei Eignung: Automatisierte Rezeptfreigabe</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Schnell: 4-10 Minuten Bearbeitungszeit</span>
                </li>
              </ul>
              <Link to="#fragebogen-details" className="btn-primary w-full text-center block">Fragebogen starten</Link>
            </div>
          </div>

          {/* Option 2: Video-Call */}
          <div id="video-call" className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 flex items-center justify-center mb-4">
                <Video className="text-cannabis-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video-Call mit Ärztin</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-dark-gray">49,99€</span>
                <span className="ml-2 text-dark-gray-light">Rezeptgebühr</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Persönliches Gespräch mit erfahrener Ärztin</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Terminwahl im Kalender</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Persönliche Beratung zur optimalen Therapie</span>
                </li>
              </ul>
              <Link to="#video-call-details" className="btn-primary w-full text-center block">Video-Call buchen</Link>
            </div>
          </div>

          {/* Option 3: Vor-Ort-Termin */}
          <div id="vor-ort" className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 flex items-center justify-center mb-4">
                <MapPin className="text-cannabis-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vor-Ort-Termin</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-dark-gray">149,99€</span>
                <span className="ml-2 text-dark-gray-light">Rezeptgebühr</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Persönlicher Termin in einer unserer Praxen</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Nach Zahlung: Manuelle Terminvereinbarung</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light">Ausführliche Anamnese und persönliche Beratung</span>
                </li>
              </ul>
              <Link to="#vor-ort-details" className="btn-primary w-full text-center block">Termin anfragen</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionsSection;
