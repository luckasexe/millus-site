import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const raiz = document.getElementById('root');

if (!raiz) {
  throw new Error('Elemento raiz da aplicação não encontrado.');
}

ReactDOM.createRoot(raiz).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
