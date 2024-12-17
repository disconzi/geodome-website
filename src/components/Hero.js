import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
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
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-3xl"
        >
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Geodome<br />
              Flat Pack
            </h1>
            <p className="text-xl">
              Design escandinavo, montagem simples e conforto premium.<br />
              Seu refúgio na natureza com design minimalista.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
