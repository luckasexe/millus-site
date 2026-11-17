import React from 'react';
import ReactDOM from 'react-dom/client';
import Aplicacao from './App';
import './tokens.css';
import './styles.css';
const elementoRaiz = document.getElementById('root');
if (!elementoRaiz) throw new Error('Elemento raiz não encontrado.');
ReactDOM.createRoot(elementoRaiz).render(<React.StrictMode><Aplicacao /></React.StrictMode>);
