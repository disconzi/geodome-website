import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Preparação do Terreno',
    description: 'Escolha um local plano e firme, faça a limpeza e nivelamento básico do solo.',
    image: '/images/assembly/step-1.jpg'
  },
  {
    title: 'Separação das Peças',
    description: 'Organize todas as hastes, painéis e conectores conforme a numeração do manual.',
    image: '/images/assembly/step-2.jpg'
  },
  {
    title: 'Estrutura Base',
    description: 'Monte a base fixando as hastes da circunferência seguindo o projeto.',
    image: '/images/assembly/step-3.jpg'
  },
  {
    title: 'Montagem Superior',
    description: 'Conecte as hastes superiores formando os triângulos geodésicos.',
    image: '/images/assembly/step-4.jpg'
  }
];

function Assembly() {
  return (
    <section className="py-20" id="assembly">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Montagem Simplificada</h2>
          <p className="text-xl text-gray-600">
            Processo passo a passo para construir seu Geodome
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full">
                  <span className="font-bold">Passo {index + 1}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Baixar Manual Completo
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Assembly;
