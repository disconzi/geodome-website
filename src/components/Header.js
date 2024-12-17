import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-bold text-gray-800">
            Geodome
          </a>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Características
            </a>
            <a
              href="#ar-experience"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Visualização 3D
            </a>
            <a
              href="#assembly"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Montagem
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contato
            </a>
          </nav>

          <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Comprar Agora
            </button>
          </div>

          <button className="md:hidden text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
