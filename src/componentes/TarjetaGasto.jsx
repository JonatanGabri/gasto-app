import React from 'react';

export default function TarjetaGasto({ gasto, eliminarGasto }) {
  const formatearMoneda = (monto) => {
    return monto.toLocaleString('es-AR', { 
      style: 'currency', 
      currency: 'ARS' 
    });
  };

  return (
    <li className="list-group-item p-3 tarjeta-gasto">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="descripcion-gasto">{gasto.descripcion}</div>
          <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill">
            📁 {gasto.categoria}
          </span>
        </div>
        
        <div className="d-flex align-items-center">
          <span className="monto-gasto me-3">
            {formatearMoneda(gasto.monto)}
          </span>
          
          <button
            onClick={() => eliminarGasto(gasto.id)}
            className="btn btn-link text-danger boton-eliminar-gasto p-0"
            aria-label="Eliminar gasto"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill="currentColor" 
              className="bi bi-trash" 
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}