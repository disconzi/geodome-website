import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import MorphingGeometry from './components/MorphingGeometry';
import AssemblySteps from './components/AssemblySteps';
import Contact from './components/Contact';
import ModelViewer from './components/ModelViewer';

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
      </Routes>
    </Router>
  );
}

export default App;
