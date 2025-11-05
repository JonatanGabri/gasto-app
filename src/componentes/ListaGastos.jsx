import React, { useMemo } from 'react';
import TarjetaGasto from './TarjetaGasto';

export default function ListaGastos({ listaGastos, terminoBusqueda, eliminarGasto }) {
    const gastosFiltrados = useMemo(() => {
    const termino = terminoBusqueda.toLowerCase();
    return listaGastos.filter(gasto => 
      gasto.descripcion.toLowerCase().includes(termino) ||
      gasto.categoria.toLowerCase().includes(termino)
    );
  }, [listaGastos, terminoBusqueda]);

  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        {gastosFiltrados.length === 0 ? (
          <p className="text-center text-muted p-4 mb-0">
            {terminoBusqueda 
              ? '🔍 No se encontraron gastos con ese criterio' 
              : '👌​ No hay gastos para mostrar'}
          </p>
        ) : (
        
          <ul className="list-group list-group-flush">
            {gastosFiltrados.map((gasto) => (
              <TarjetaGasto 
                key={gasto.id} 
                gasto={gasto}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}