import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
  const token = localStorage.getItem('gastoapp_token');
  const usuario = localStorage.getItem('gastoapp_usuario');

  if (!token || !usuario) {
    console.log('🚫 Acceso denegado - Redirigiendo a /login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('✅ Acceso permitido');
  return children;
}