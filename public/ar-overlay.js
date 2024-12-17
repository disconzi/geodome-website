// Create container for React app
const overlayContainer = document.createElement('div');
overlayContainer.id = 'ar-overlay-root';
document.body.appendChild(overlayContainer);

// Load React and ReactDOM
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Initialize React app
const initializeOverlay = async () => {
  try {
    await loadScript('https://unpkg.com/react@17/umd/react.production.min.js');
    await loadScript('https://unpkg.com/react-dom@17/umd/react-dom.production.min.js');
    
    // Load our AR overlay component
    const response = await fetch('/static/AROverlay.js');
    const overlayCode = await response.text();
    
    // Create and execute the component
    const script = document.createElement('script');
    script.textContent = `
      ${overlayCode}
      ReactDOM.render(
        React.createElement(AROverlay),
        document.getElementById('ar-overlay-root')
      );
    `;
    document.body.appendChild(script);
  } catch (error) {
    console.error('Error initializing AR overlay:', error);
  }
};

// Initialize when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOverlay);
} else {
  initializeOverlay();
}
