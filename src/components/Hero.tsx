
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-gray mb-6 leading-tight">
            Dein Cannabis-Rezept in wenigen Schritten
          </h1>
          <p className="text-xl md:text-2xl text-dark-gray-light mb-10">
            Wähle den passenden Weg – digital, per Video oder vor Ort
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
            <Link to="/fragebogen" className="group">
              <div className="bg-white hover:bg-cannabis-green-50 border border-gray-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-cannabis-green-100 flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9H15" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 13H15" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 17H12" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark-gray">Fragebogen starten</h3>
                <p className="text-dark-gray-light mb-4 text-sm">Digital & schnell ab 4,99€</p>
                <span className="text-cannabis-green-600 flex items-center font-medium group-hover:underline">
                  Auswählen <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>

            <Link to="/video-call" className="group">
              <div className="bg-white hover:bg-cannabis-green-50 border border-gray-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-cannabis-green-100 flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 10L19.5528 7.72361C19.8343 7.58281 20.1852 7.84093 20.1852 8.15147V15.8485C20.1852 16.1591 19.8343 16.4172 19.5528 16.2764L15 14V10Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="6" width="12" height="12" rx="2" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark-gray">Video-Call buchen</h3>
                <p className="text-dark-gray-light mb-4 text-sm">Persönliches Gespräch für 49,99€</p>
                <span className="text-cannabis-green-600 flex items-center font-medium group-hover:underline">
                  Auswählen <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>

            <Link to="/vor-ort" className="group">
              <div className="bg-white hover:bg-cannabis-green-50 border border-gray-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-cannabis-green-100 flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 10H14V7C14 6.44772 13.5523 6 13 6H11C10.4477 6 10 6.44772 10 7V10H8" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 19C5.20914 19 7 17.2091 7 15C7 17.2091 8.79086 19 11 19C13.2091 19 15 17.2091 15 15C15 17.2091 16.7909 19 19 19C21.2091 19 23 17.2091 23 15V8L18 3H6L1 8V15C1 17.2091 2.79086 19 5 19" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark-gray">Vor-Ort-Termin</h3>
                <p className="text-dark-gray-light mb-4 text-sm">Direkter Kontakt für 149,99€</p>
                <span className="text-cannabis-green-600 flex items-center font-medium group-hover:underline">
                  Auswählen <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
