import React from 'react';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas e comece a construir seu Geodome
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="subject">
                  Assunto
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="purchase">Comprar Planos</option>
                  <option value="custom">Projeto Personalizado</option>
                  <option value="support">Suporte Técnico</option>
                  <option value="other">Outro Assunto</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
