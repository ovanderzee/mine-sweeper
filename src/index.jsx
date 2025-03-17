import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';

const appElement = document.getElementById('app')

const root = ReactDOMClient.createRoot(appElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
