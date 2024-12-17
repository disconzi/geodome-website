import React from 'react';
import { motion } from 'framer-motion';

const AssemblySteps = () => {
  const steps = [
    {
      title: 'Preparação',
      description: 'Organize todas as peças e ferramentas necessárias',
      image: '/images/assembly/step1.svg',
      color: '#4169e1'
    },
    {
      title: 'Base',
      description: 'Monte a estrutura base do Geodome',
      image: '/images/assembly/step2.svg',
      color: '#3c5fd9'
    },
    {
      title: 'Estrutura',
      description: 'Conecte as hastes principais formando os triângulos',
      image: '/images/assembly/step3.svg',
      color: '#3454d2'
    },
    {
      title: 'Cobertura',
      description: 'Instale a cobertura e os acabamentos',
      image: '/images/assembly/step4.svg',
      color: '#2d4acb'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Montagem Simples e Rápida
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div 
                className="w-full aspect-square rounded-lg mb-6 flex items-center justify-center"
                style={{ backgroundColor: `${step.color}10` }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              <div className="mt-4 flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>
                <div className="ml-3 h-1 flex-grow rounded"
                  style={{ backgroundColor: `${step.color}40` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssemblySteps;
