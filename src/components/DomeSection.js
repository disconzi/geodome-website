import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ModelViewer from './ModelViewer';
import DomeCharacteristics from './DomeCharacteristics';

const domeOptions = [
  {
    id: 'dome1',
    name: 'Geodome Flat Pack',
    description: 'Nossa casa geodésica pré-fabricada combina design escandinavo, montagem simples e conforto premium.',
    image: '/images/dome1.jpg',
    modelFileWeb: '/models/dome1.glb',
    modelFileIos: '/models/dome1.usdz',
  },
  // Add more dome options as needed
];

const domeCharacteristics = [
  {
    title: 'Montagem',
    description: '2-3 dias',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />,
  },
  {
    title: 'Área',
    description: '50m²',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />,
  },
  {
    title: 'Altura',
    description: '3.5m',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />,
  },
  {
    title: 'Material',
    description: 'Madeira + PETG',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
  },
  {
    title: 'Durabilidade',
    description: '25+ anos',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
  {
    title: 'Garantia',
    description: '5 anos',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  },
].map(char => ({
  ...char,
  icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">{char.icon}</svg>
}));

function DomeSection() {
  const [selectedDomeId, setSelectedDomeId] = useState('dome1');
  const [show3DModel, setShow3DModel] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const selectedDome = domeOptions.find(dome => dome.id === selectedDomeId);

  const handleARClick = () => {
    const modelUrl = `${window.location.origin}${selectedDome.modelFileWeb}`;
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      window.location.href = `${window.location.origin}${selectedDome.modelFileIos}`;
      return;
    }
    
    window.location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${modelUrl}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
  };

  const handlePayment = async () => {
    /* global google */
    if (typeof window.google === 'undefined' || !window.google?.payments?.api?.PaymentsClient) {
      try {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://pay.google.com/gp/p/js/pay.js';
          script.async = true;
          script.onload = () => setTimeout(resolve, 1000);
          document.head.appendChild(script);
        });
      } catch (err) {
        alert('Não foi possível carregar o Google Pay. Por favor, tente novamente mais tarde.');
        return;
      }
    }

    try {
      const paymentClient = new window.google.payments.api.PaymentsClient({
        environment: 'TEST'
      });

      const paymentData = await paymentClient.loadPaymentData({
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Geodome Flat Pack'
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: '9999.99',
          currencyCode: 'BRL',
          countryCode: 'BR'
        }
      });

      console.log('Payment successful', paymentData);
      setShowPaymentModal(false);
      alert('Pedido confirmado! Você receberá um email com os próximos passos.');
    } catch (err) {
      console.error('Payment failed', err);
      const message = err.statusCode === "CANCELED" 
        ? 'Pagamento cancelado. Você pode tentar novamente quando quiser.'
        : 'Houve um erro no pagamento. Por favor, tente novamente.';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Modelos</h2>
          <p className="text-xl text-gray-600">Explore nossos modelos em 3D e Realidade Aumentada</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {domeOptions.map((dome) => (
              <button
                key={dome.id}
                onClick={() => {
                  setSelectedDomeId(dome.id);
                  setShow3DModel(false);
                }}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  selectedDomeId === dome.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {dome.name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            key={selectedDomeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {show3DModel ? (
                  <ModelViewer modelUrl={`${window.location.origin}${selectedDome.modelFileWeb}`} />
                ) : (
                  <>
                    <img
                      src={selectedDome.image}
                      alt={selectedDome.name}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      onClick={() => setShowPaymentModal(true)}
                      className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
                    >
                      <span className="font-semibold">-30%</span>
                      <span className="text-sm ml-1">PRÉ-VENDA</span>
                    </div>
                  </>
                )}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <button
                    onClick={() => setShow3DModel(!show3DModel)}
                    className="bg-gray-800 hover:bg-gray-900 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                    {show3DModel ? 'Ver Foto' : 'Ver em 3D'}
                  </button>
                  <button
                    onClick={handleARClick}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Ver em AR
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedDome.name}</h3>
                <p className="text-gray-600 mb-6">{selectedDome.description}</p>
                <DomeCharacteristics characteristics={domeCharacteristics} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Finalizar Pré-venda</h2>
              <p className="text-emerald-600 font-semibold mt-2">30% de desconto aplicado</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Valor Original:</span>
                  <span className="line-through">R$ 14.999,99</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Valor com Desconto:</span>
                  <span className="text-emerald-600">R$ 9.999,99</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2-6.586l-2.707-2.707 1.414-1.414L11 13.586l4.293-4.293 1.414 1.414L11 16.414z"/>
                </svg>
                Pagar com Google Pay
              </button>

              <p className="text-sm text-gray-500 text-center">
                Pagamento 100% seguro via Google Pay
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default DomeSection;
