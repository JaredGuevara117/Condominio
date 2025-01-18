import React from "react";
import "./InicioAn.css";
import LineChart from "./Linechart";
import BarChart from "./Barchart";

const InicioAn = () => {
  return (
    <div className="inicio-container">
      {/* Encabezado de bienvenida */}
      <div className="inicio-box">
        <h1>¡Bienvenido al Portal de Administración del Condominio, Lucero González!</h1>
      </div>

      {/* Contenedor de estadísticas */}
      <div className="stats-container">
        {/* Gráfica de línea - Pagos */}
        <div className="stats-box">
          <div className="stats-title">Pagos</div>
          <div className="stats-value">$7,033.22</div>
          <div className="stats-chart">
            <LineChart />
          </div>
          <div className="stats-footer">
            <span>Esta semana</span>
            <span>Este mes</span>
            <span>Este año</span>
          </div>
        </div>

        {/* Gráfica de barras - Total del año */}
        <div className="stats-box">
          <div className="stats-title">Total del año 2024</div>
          <div className="stats-value">$1,068,900</div>
          <div className="stats-chart">
            <BarChart />
          </div>
          <div className="stats-footer">
            <span>2024 ↑ 11%</span>
          </div>
        </div>
      </div>

      {/* Contenedor de detalles */}
      <div className="details-container">
        {/* Órdenes recientes */}
        <div className="orders-box">
          <h3>Órdenes recientes</h3>
          <p>Total: 13 Órdenes</p>
          <ul>
            <li>Dept. 101, Torre A - Vendido a Juan Pérez ($150,000)</li>
            <li>Dept. 309, Torre B - Vendido a Ana González ($175,000)</li>
            <li>Dept. 1502, Torre C - Vendido a Carlos Martínez ($200,000)</li>
          </ul>
        </div>

        {/* Dueños de torres */}
        <div className="owners-box">
          <h3>Dueños de torres</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Torre</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jane Cooper</td>
                <td>(225) 555-0118</td>
                <td>jane@microsoft.com</td>
                <td>1</td>
                <td>Activo</td>
              </tr>
              <tr>
                <td>Floyd Miles</td>
                <td>(205) 555-0100</td>
                <td>floyd@yahoo.com</td>
                <td>4</td>
                <td>Activo</td>
              </tr>
              <tr>
                <td>Ronald Richards</td>
                <td>(305) 555-0107</td>
                <td>ronald@adobe.com</td>
                <td>10</td>
                <td>Activo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InicioAn;
