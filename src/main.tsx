
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Wait for the deviceready event before starting the app (for Capacitor)
const startApp = () => {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Check if we're running in a Capacitor environment
if ((window as any).capacitor) {
  document.addEventListener('deviceready', startApp, false);
} else {
  // Regular web start
  startApp();
}
