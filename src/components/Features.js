import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Design Escandinavo Minimalista',
    description: 'Linhas limpas e modernas com foco em funcionalidade e beleza simples.',
    icon: '🎨'
  },
  {
    title: 'Flat Pack',
    description: 'Estrutura enviada em embalagens planas, otimizando custos de transporte.',
    icon: '📦'
  },
  {
    title: 'Fácil Montagem',
    description: 'Peças numeradas e pré-cortadas, prontas para encaixe sem ferramentas especiais.',
    icon: '🔧'
  },
  {
    title: 'Conforto Premium',
    description: 'Espaço interno versátil com ventilação e iluminação natural otimizadas.',
    icon: '✨'
  },
  {
    title: 'Sustentabilidade',
    description: 'Materiais certificados e layout modular que favorece o reaproveitamento.',
    icon: '🌱'
  },
  {
    title: 'Versatilidade',
    description: 'Ideal para greenhouse, cabin, sauna, glamping, trellis ou tiny house.',
    icon: '🏠'
  }
];

function Features() {
  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Características Principais</h2>
          <p className="text-xl text-gray-600">Descubra o que torna nosso Geodome único</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
