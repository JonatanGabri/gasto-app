import React from 'react';
import TarjetaEstadistica from './TarjetaEstadistica';

export default function PaginaDashboard({ listaGastos }) {
 
  const gastoTotal = listaGastos.reduce((suma, gasto) => suma + gasto.monto, 0);
  const numeroGastos = listaGastos.length;
  const gastoPromedio = numeroGastos > 0 ? (gastoTotal / numeroGastos) : 0;

  const formatearMoneda = (monto) => {
    return monto.toLocaleString('es-AR', { 
      style: 'currency', 
      currency: 'ARS' 
    });
  };

  return (
    <div className="container-fluid">
      <h2 className="display-5 fw-bold mb-4">📈 Resumen de Gastos</h2>
      
      <div className="alert alert-success mb-4">
        Aquí puedes ver un resumen de tus gastos.<br />
        Analiza tus finanzas y toma mejores decisiones.
      </div>
      
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <TarjetaEstadistica 
            titulo="Gasto Total" 
            valor={formatearMoneda(gastoTotal)} 
            color="rojo" 
          />
        </div>
        <div className="col-md-4">
          <TarjetaEstadistica 
            titulo="Nº de Gastos" 
            valor={numeroGastos} 
            color="azul" 
          />
        </div>
        <div className="col-md-4">
          <TarjetaEstadistica 
            titulo="Gasto Promedio" 
            valor={formatearMoneda(gastoPromedio)} 
            color="amarillo" 
          />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <h3 className="h5 mb-0">💸 Últimos Gastos</h3>
        </div>
        <ul className="list-group list-group-flush">
          {listaGastos.length > 0 ? (
            listaGastos.slice(-10).reverse().map(gasto => (
              <li 
                key={gasto.id} 
                className="list-group-item d-flex justify-content-between align-items-center p-3"
              >
                <div>
                  <div className="fw-medium">{gasto.descripcion}</div>
                  <small className="text-muted">📁 {gasto.categoria}</small>
                </div>
                <span className="fs-5 fw-bold text-danger">
                  {formatearMoneda(gasto.monto)}
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted text-center p-4">
          👌​ No hay gastos para mostrar
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}