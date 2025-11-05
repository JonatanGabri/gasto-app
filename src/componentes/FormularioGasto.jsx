import React, { useState } from 'react';

export default function FormularioGasto({ agregarGasto }) {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    
    if (descripcion.trim() && monto.trim() && categoria.trim() && parseFloat(monto) > 0) {
      agregarGasto(descripcion, monto, categoria);
      
      setDescripcion('');
      setMonto('');
      setCategoria('');
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="card shadow-sm mb-4 p-4">
      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              className="form-control"
              required
            />
            <label htmlFor="descripcion">📝 Descripción</label>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="form-floating">
            <input
              type="number"
              id="monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Monto"
              className="form-control"
              min="0.01"
              step="0.01"
              required
            />
            <label htmlFor="monto">💵 Monto (ARS)</label>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="form-floating">
            <input
              type="text"
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Categoría"
              className="form-control"
              required
            />
            <label htmlFor="categoria">📁 Categoría</label>
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        className="btn btn-primary fw-medium mt-3 w-100"
      >
        ➕ Añadir Gasto
      </button>
    </form>
  );
}