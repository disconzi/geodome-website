import React from 'react';

function SketchfabViewer() {
  return (
    <div className="sketchfab-embed-wrapper w-full h-full">
      <iframe
        title="Geodome 3D View"
        className="w-full h-full rounded-lg shadow-lg"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        src="https://sketchfab.com/models/9d7f430e32a84ad0b91aa11e3fc1be37/embed?autostart=1&ui_theme=dark"
      />
    </div>
  );
}

export default SketchfabViewer;
