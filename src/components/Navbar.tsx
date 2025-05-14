
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-dark-gray shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-2xl text-dark-gray dark:text-white flex items-center">
              <div className="w-10 h-10 rounded-md bg-cannabis-green-500 mr-2 flex items-center justify-center">
                <span className="text-white">MC</span>
              </div>
              <span>MediCannabis</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/fragebogen" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors">Fragebogen</Link>
            <Link to="/video-call" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors">Video-Call</Link>
            <Link to="/vor-ort" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors">Vor-Ort-Termin</Link>
            <Link to="/uber-uns" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors">Über uns</Link>
            <Link to="/kontakt" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors">Kontakt</Link>
            <ThemeToggle />
            <Link to="/fragebogen" className="btn-primary dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700">Jetzt Rezept starten</Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-dark-gray dark:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-scale-in">
            <div className="flex flex-col space-y-4">
              <Link to="/fragebogen" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors py-2">Fragebogen</Link>
              <Link to="/video-call" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors py-2">Video-Call</Link>
              <Link to="/vor-ort" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors py-2">Vor-Ort-Termin</Link>
              <Link to="/uber-uns" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors py-2">Über uns</Link>
              <Link to="/kontakt" className="text-dark-gray dark:text-gray-200 hover:text-cannabis-green-600 dark:hover:text-cannabis-green-400 transition-colors py-2">Kontakt</Link>
              <Link to="/fragebogen" className="btn-primary dark:bg-cannabis-green-600 dark:hover:bg-cannabis-green-700 w-full">Jetzt Rezept starten</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
