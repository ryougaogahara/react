import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ← ここで読み込みOK！

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
