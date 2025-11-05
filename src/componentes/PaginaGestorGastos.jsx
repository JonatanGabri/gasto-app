import React, { useState } from 'react';

import FormularioGasto from './FormularioGasto';
import FiltrosBusqueda from './FiltrosBusqueda';
import ListaGastos from './ListaGastos';

export default function PaginaGestorGastos({ 
  listaGastos, 
  agregarGasto, 
  eliminarGasto 
}) {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10 col-xl-9">
        
        <h2 className="display-5 fw-bold mb-4 text-center">¿En qué gastaste hoy?</h2>
        
        <div className="alert alert-primary mb-4">
          Gestiona todos tus gastos desde aquí-¡añade, busca y elimina fácilmente!
        </div>
        
        <FormularioGasto agregarGasto={agregarGasto} />
        
        <FiltrosBusqueda 
          terminoBusqueda={terminoBusqueda} 
          setTerminoBusqueda={setTerminoBusqueda} 
        />
        
        <ListaGastos 
          listaGastos={listaGastos}
          terminoBusqueda={terminoBusqueda}
          eliminarGasto={eliminarGasto}
        />
      </div>
    </div>
  );
}