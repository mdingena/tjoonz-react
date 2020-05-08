import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import setupGoogleAnalytics from './setupGoogleAnalytics';

const rootElement = document.getElementById('root');

ReactDOM
  .createRoot(rootElement)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

setupGoogleAnalytics();
