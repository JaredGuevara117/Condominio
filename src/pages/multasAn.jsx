import React from "react";
import "./multasAn.css";

const MultasAn = () => {
  return (
    
      <div className="multas-container">
        {/* Formulario de Registro de Multas */}
        <div className="registrar-multa">
          <h3>Registrar multa</h3>
          <div className="steps-container">
            <div className="step active">1</div>
            <div className="step">2</div>
            <div className="step">3</div>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="Jane Cooper" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Número telefónico</label>
              <input type="tel" id="telefono" placeholder="(225) 555-0118" />
            </div>
            <div className="form-group">
              <label htmlFor="torre">Torre</label>
              <input type="text" id="torre" placeholder="#Torre" />
            </div>
            <button type="button" className="boton">
              Próximo paso
            </button>
          </form>
        </div>

        {/* Tabla de Gestión de Multas */}
        <div className="gestionar-multas">
          <h3>Gestionar multas</h3>
          <table>
            <thead>
              <tr>
                <th>Departamento</th>
                <th>Torre</th>
                <th>Motivo</th>
                <th>A pagar</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>1</td>
                <td>Vidrio roto</td>
                <td>$100</td>
                <td>Dic 1, 2023</td>
                <td>Pagado</td>
              </tr>
              <tr>
                <td>C</td>
                <td>4</td>
                <td>Vidrio roto</td>
                <td>$120</td>
                <td>Dic 12, 2023</td>
                <td>Pagado</td>
              </tr>
              <tr>
                <td>D</td>
                <td>11</td>
                <td>Puerta rota</td>
                <td>$130</td>
                <td>Dic 1, 2023</td>
                <td>Pendiente</td>
              </tr>
              <tr>
                <td>F</td>
                <td>1</td>
                <td>Piso roto</td>
                <td>$1100</td>
                <td>Dic 11, 2023</td>
                <td>Pagado</td>
              </tr>
              <tr>
                <td>E</td>
                <td>4</td>
                <td>Vidrio roto</td>
                <td>$190</td>
                <td>Dic 22, 2023</td>
                <td>Pendiente</td>
              </tr>
              <tr>
                <td>D</td>
                <td>12</td>
                <td>Barandal roto</td>
                <td>$180</td>
                <td>Dic 21, 2023</td>
                <td>Pendiente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
  );
};

export default MultasAn;
