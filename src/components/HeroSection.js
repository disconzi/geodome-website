import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/domes/904a4eaf051aebb1f96350ab538c7e25.jpg"
          alt="Geodome"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Geodome Flat Pack
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
        >
          Design escandinavo, montagem simples e conforto premium. Seu refúgio na natureza com design minimalista.
        </motion.p>

        {/* Pre-sale Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg mb-8 transform rotate-2 shadow-lg"
        >
          <span className="text-lg font-semibold">Pré-venda Exclusiva</span>
          <span className="mx-2">|</span>
          <span className="text-lg">Economize 30% até 31/12</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={() => setShowModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Garanta sua Oferta
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Solicitar Orçamento
          </motion.button>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              title: 'Montagem Rápida',
              description: 'Sistema modular pré-fabricado',
              icon: '⚡'
            },
            {
              title: 'Garantia Estendida',
              description: '5 anos de garantia total',
              icon: '🛡️'
            },
            {
              title: 'Entrega Expressa',
              description: 'Frete grátis na pré-venda',
              icon: '🚚'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-80">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pre-sale Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Garanta seu Desconto Exclusivo</h2>
            <p className="text-gray-600 mb-6">
              Aproveite 30% de desconto na pré-venda do Geodome Flat Pack. Oferta válida até 31/12.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <input
                type="tel"
                placeholder="Seu telefone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Quero Aproveitar
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Fechar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
