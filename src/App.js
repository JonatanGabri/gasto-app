import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BarraNavegacion from './componentes/BarraNavegacion';
import RutaProtegida from './componentes/RutaProtegida';
import RutaPublica from './componentes/RutaPublica';

// Páginas
import PaginaLogin from './componentes/PaginaLogin';
import PaginaDashboard from './componentes/PaginaDashboard';
import PaginaGestorGastos from './componentes/PaginaGestorGastos';
import Cargando from './componentes/Cargando';

const CLAVE_USUARIO = 'gastoapp_usuario';
const CLAVE_GASTOS = 'gastoapp_gastos';
const CLAVE_TOKEN = 'gastoapp_token';
const GASTOS_INICIALES = [
  { id: 1, descripcion: 'Café de la mañana', monto: 4000.00, categoria: 'Comida' },
  { id: 2, descripcion: 'Boleto de obnibus', monto: 1200, categoria: 'Transporte' },
  { id: 3, descripcion: 'Factura de internet', monto: 31000.00, categoria: 'Servicios' },
  { id: 4, descripcion: 'Cena con amigos', monto: 27000.00, categoria: 'Ocio' },
];

export default function App() {

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem(CLAVE_USUARIO);
    const token = localStorage.getItem(CLAVE_TOKEN);
    
    if (usuarioGuardado && token) {
      try {
        return JSON.parse(usuarioGuardado);
      } catch (error) {
        console.error('Error al parsear usuario:', error);
        return null;
      }
    }
    return null;
  });

  const [listaGastos, setListaGastos] = useState(() => {
    const gastosGuardados = localStorage.getItem(CLAVE_GASTOS);
    return gastosGuardados ? JSON.parse(gastosGuardados) : GASTOS_INICIALES;
  });

  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    if (usuario) {
      localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(CLAVE_USUARIO);
      localStorage.removeItem(CLAVE_TOKEN);
    }
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem(CLAVE_GASTOS, JSON.stringify(listaGastos));
  }, [listaGastos]);

  useEffect(() => {
    setTimeout(() => setCargando(false), 500);
  }, []);

  const iniciarSesion = (nombreUsuario, contraseña) => {
    if (nombreUsuario === 'admin' && contraseña === '1234') {
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      localStorage.setItem(CLAVE_TOKEN, token);
    
      const nuevoUsuario = { 
        nombreUsuario: 'admin',
        loginTime: Date.now()
      };
      setUsuario(nuevoUsuario);
      
      return true;
    }
    return false;
  };

  const cerrarSesion = () => {
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
    setUsuario(null);
  };

  const agregarGasto = (descripcion, monto, categoria) => {
    const nuevoGasto = {
      id: Date.now(),
      descripcion,
      monto: parseFloat(monto), 
      categoria
    };
    setListaGastos([...listaGastos, nuevoGasto]);
  };

  const eliminarGasto = (idGasto) => {
    setListaGastos(listaGastos.filter((gasto) => gasto.id !== idGasto));
  };

const limpiarDatos = () => {
  if (window.confirm('¿Estás seguro de que quieres borrar todos los gastos?')) {
    localStorage.removeItem(CLAVE_GASTOS);
    setListaGastos([]);
    alert('✅ Todos los gastos han sido eliminados');
  }
};

  
  const estaAutenticado = !!usuario;

  if (cargando) {
    return <Cargando />;
  }

  return (
    <BrowserRouter>
      <div className="altura-completa">
        <BarraNavegacion 
          estaAutenticado={estaAutenticado}
          usuario={usuario}
          cerrarSesion={cerrarSesion}
          limpiarDatos={limpiarDatos}
        />
        
        <main className="container p-4 p-md-5">
          <Routes>
            <Route 
              path="/login" 
              element={
                <RutaPublica>
                  <PaginaLogin iniciarSesion={iniciarSesion} />
                </RutaPublica>
              } 
            />

            <Route 
              path="/gestor" 
              element={
                <RutaProtegida>
                  <PaginaGestorGastos 
                    listaGastos={listaGastos}
                    agregarGasto={agregarGasto}
                    eliminarGasto={eliminarGasto}
                  />
                </RutaProtegida>
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <RutaProtegida>
                  <PaginaDashboard listaGastos={listaGastos} />
                </RutaProtegida>
              } 
            />

            <Route 
              path="/" 
              element={
                estaAutenticado 
                  ? <Navigate to="/gestor" replace /> 
                  : <Navigate to="/login" replace />
              } 
            />

            <Route 
              path="*" 
              element={
                <div className="text-center mt-5">
                  <h1 className="display-1 fw-bold text-primary">404</h1>
                  <p className="lead text-muted mb-4">Página no encontrada</p>
                  <a href="/" className="btn btn-primary btn-lg">
                    🏠 Volver al inicio
                  </a>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}