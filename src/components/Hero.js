import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function Hero() {
  const [showModel, setShowModel] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!showModel ? (
          <>
            <img
              src="/images/hero/hero-main.jpg"
              alt="Geodome in nature"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/1920x1080?text=Geodome+Flat+Pack';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          </>
        ) : (
          <div className="w-full h-full">
            <div className="sketchfab-embed-wrapper w-full h-full">
              <iframe
                title="Geodome 3D View"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking="true"
                execution-while-out-of-viewport="true"
                execution-while-not-rendered="true"
                web-share="true"
                src="https://2f86-2804-140-8001-b99-a0e2-ec54-d26a-5e67.ngrok-free.app/ar-experience"
              />
            </div>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {(!showModel || !isMinimized) && (
          <motion.div
            initial={{ opacity: 0, y: showModel ? 20 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`container mx-auto px-4 z-10 text-white ${
              showModel ? 'absolute bottom-0 left-0 right-0 pb-8 bg-gradient-to-t from-black/80 to-transparent' : ''
            }`}
          >
            {!showModel && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl font-bold mb-6">
                  Geodome Flat Pack
                </h1>
                <p className="text-xl mb-8 max-w-2xl">
                  A união perfeita entre estilo escandinavo, montagem simples e conforto premium.
                  Seu refúgio na natureza com design minimalista.
                </p>
              </motion.div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/3d-view"
                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
              >
                Visualizar em 3D
                <span className="text-indigo-200" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
              {!showModel && (
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  Solicitar Orçamento
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showModel && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMinimized ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 15l7-7 7 7" 
              />
            )}
          </svg>
        </motion.button>
      )}

      {!showModel && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white text-center"
          >
            <p className="text-sm mb-2">Explore Mais</p>
            <svg 
              className="w-6 h-6 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Hero;
