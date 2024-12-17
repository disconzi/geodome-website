import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import DomeSection from './components/DomeSection';
import Features from './components/Features';
import MorphingGeometry from './components/MorphingGeometry';
import AssemblySteps from './components/AssemblySteps';
import Contact from './components/Contact';
import ModelViewer from './components/ModelViewer';
import ARViewer from './components/ARViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <div className="min-h-screen bg-white">
              <Header />
              <main>
                <Hero />
                <DomeSection />
                <Features />
                <section className="py-20">
                  <div className="container mx-auto px-4">
                    <MorphingGeometry />
                  </div>
                </section>
                <AssemblySteps />
                <Contact />
              </main>
              <footer className="bg-gray-50 py-8 text-center">
                <p> 2024 Geodome Flat Pack. All rights reserved.</p>
              </footer>
            </div>
          </div>
        } />
        <Route path="/3d-view" element={<ModelViewer />} />
        <Route path="/ar-view/:modelId?" element={<ARViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
