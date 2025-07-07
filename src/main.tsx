
console.log('main.tsx starting...');

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Imports loaded successfully in main.tsx');

const rootElement = document.getElementById("root");
console.log('Root element found:', !!rootElement);

if (!rootElement) {
  console.error('Root element not found!');
} else {
  console.log('Creating React root...');
  const root = createRoot(rootElement);
  console.log('Rendering App component...');
  root.render(<App />);
  console.log('App rendered successfully');
}
