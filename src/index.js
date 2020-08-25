import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import setupGoogleAnalytics from './setupGoogleAnalytics';

setupGoogleAnalytics();

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
