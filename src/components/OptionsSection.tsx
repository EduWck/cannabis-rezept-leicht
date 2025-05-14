
import { FileText, Video, MapPin, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const OptionsSection = () => {
  return (
    <section id="optionen" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray dark:text-white mb-4">Wähle den passenden Weg zu deinem Rezept</h2>
          <p className="text-lg text-dark-gray-light dark:text-gray-300 max-w-2xl mx-auto">
            Alle drei Wege führen zum gleichen Ziel – einem legalen Rezept für medizinisches Cannabis.
            Die Bezahlung erfolgt immer vorab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Option 1: Fragebogen */}
          <div id="fragebogen" className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 flex items-center justify-center mb-4">
                <FileText className="text-cannabis-green-600 dark:text-cannabis-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Digitaler Fragebogen</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-dark-gray dark:text-white">14,99€</span>
                <span className="ml-2 text-dark-gray-light dark:text-gray-400">Rezeptgebühr</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Digitale Angaben zu Symptomen & Krankengeschichte</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Bei Eignung: Automatisierte Rezeptfreigabe</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Schnell: 4-10 Minuten Bearbeitungszeit</span>
                </li>
              </ul>
              <Link to="/fragebogen" className="btn-primary w-full text-center block">Fragebogen starten</Link>
            </div>
          </div>

          {/* Option 2: Video-Call */}
          <div id="video-call" className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 flex items-center justify-center mb-4">
                <Video className="text-cannabis-green-600 dark:text-cannabis-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Video-Call mit Ärztin</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-dark-gray dark:text-white">ab 45€</span>
                <span className="ml-2 text-dark-gray-light dark:text-gray-400">Rezeptgebühr</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Persönliches Gespräch mit erfahrener Ärztin</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Terminwahl im Kalender</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Persönliche Beratung zur optimalen Therapie</span>
                </li>
              </ul>
              <Link to="/video-call" className="btn-primary w-full text-center block">Video-Call buchen</Link>
            </div>
          </div>

          {/* Option 3: Vor-Ort-Termin */}
          <div id="vor-ort" className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-1 bg-cannabis-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cannabis-green-100 dark:bg-cannabis-green-900/30 flex items-center justify-center mb-4">
                <MapPin className="text-cannabis-green-600 dark:text-cannabis-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Vor-Ort-Termin</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-dark-gray dark:text-white">149,99€</span>
                <span className="ml-2 text-dark-gray-light dark:text-gray-400">Rezeptgebühr</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Persönlicher Termin in einer unserer Praxen</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Nach Zahlung: Manuelle Terminvereinbarung</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray-light dark:text-gray-300">Ausführliche Anamnese und persönliche Beratung</span>
                </li>
              </ul>
              <Link to="/vor-ort" className="btn-primary w-full text-center block">Termin anfragen</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionsSection;
