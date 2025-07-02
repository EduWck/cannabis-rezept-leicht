
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-white pt-10 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Company Info */}
          <div>
            <div className="font-bold text-xl md:text-2xl flex items-center mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-cannabis-green-500 mr-2 flex items-center justify-center">
                <span className="text-white">MC</span>
              </div>
              <span>MediCannabis</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Deine vertrauensvolle Plattform für den Zugang zu medizinischem Cannabis. Legal, sicher und diskret.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cannabis-green-400">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cannabis-green-400">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cannabis-green-400">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cannabis-green-400">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Schnelllinks</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/fragebogen" className="text-gray-400 hover:text-white transition-colors">Fragebogen</Link></li>
              <li><Link to="/video-call" className="text-gray-400 hover:text-white transition-colors">Video-Call</Link></li>
              <li><Link to="/vor-ort" className="text-gray-400 hover:text-white transition-colors">Vor-Ort-Termin</Link></li>
              <li><Link to="/uber-uns" className="text-gray-400 hover:text-white transition-colors">Über uns</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Rechtliches</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><Link to="/agb" className="text-gray-400 hover:text-white transition-colors">Allgemeine Geschäftsbedingungen</Link></li>
              <li><Link to="/datenschutz" className="text-gray-400 hover:text-white transition-colors">Datenschutzerklärung</Link></li>
              <li><Link to="/impressum" className="text-gray-400 hover:text-white transition-colors">Impressum</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie-Richtlinie</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Kontakt</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li className="flex items-start">
                <Mail className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <a href="mailto:kontakt@medicannabis.de" 
                   className="text-gray-400 hover:text-white transition-colors break-all">
                   kontakt@medicannabis.de
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <a href="tel:+4930123456789" className="text-gray-400 hover:text-white transition-colors">+49 (0) 30 123 456 789</a>
              </li>
              <li className="flex items-start">
                <MapPin className="text-cannabis-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-400">Cannabisstraße 420, 10115 Berlin</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} MediCannabis. Alle Rechte vorbehalten.
            </p>
            <div>
              <p className="text-gray-500 text-xs text-center md:text-left">
                Medizinisches Cannabis nur für Personen über 21 Jahren mit entsprechender medizinischer Indikation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
