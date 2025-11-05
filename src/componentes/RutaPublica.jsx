import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RutaPublica({ children }) {
  const token = localStorage.getItem('gastoapp_token');
  const usuario = localStorage.getItem('gastoapp_usuario');
  
  if (token && usuario) {
    console.log('ℹ️ Usuario ya autenticado - Redirigiendo a /gestor');
    return <Navigate to="/gestor" replace />;
  }
  
  return children;
}