import React from 'react';
import { motion } from 'framer-motion';

const domeOptions = [
  {
    id: 'dome1',
    name: 'Geodome Classic',
    description: 'Nossa cúpula geodésica clássica, perfeita para espaços amplos',
    size: '6m x 6m',
    modelFile: '/models/geodome-classic.usdz',
    image: '/images/geodome-classic.jpg'
  },
  {
    id: 'dome2',
    name: 'Geodome Compact',
    description: 'Versão compacta ideal para jardins e áreas menores',
    size: '4m x 4m',
    modelFile: '/models/geodome-compact.usdz',
    image: '/images/geodome-compact.jpg'
  }
];

function DomeOptions({ onSelectDome }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
      {domeOptions.map((dome) => (
        <motion.div
          key={dome.id}
          className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative h-64">
            <img
              src={dome.image}
              alt={dome.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Geodome';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-2xl font-bold text-white">{dome.name}</h3>
              <p className="text-white/80">{dome.size}</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-white/90 mb-4">{dome.description}</p>
            <div className="flex gap-4">
              <button
                onClick={() => onSelectDome(dome)}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Ver em 3D
              </button>
              <a
                href={dome.modelFile}
                rel="ar"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-center transition-colors"
              >
                Ver em AR
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DomeOptions;
