import React from "react";
import "./reportesAn.css";
import SalesChart from "./salesChart";
const ReportesAn = () => {
  return (
    <div className="reportes-container">
      {/* Nuevos dueños de torres */}
      <div className="owners">
        <h3>Nuevos dueños de torres</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Torre</th>
                <th>Inquilinos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ana González</td>
                <td className="active">ACTIVO</td>
                <td>10</td>
                <td>👤👤👤</td>
              </tr>
              <tr>
                <td>Carlos Martínez</td>
                <td className="active">ACTIVO</td>
                <td>11</td>
                <td>👤👤👤</td>
              </tr>
              {/* Añade más filas aquí */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ventas */}
      <div className="sales">
        <h3>Ventas</h3>
        <div className="chart-container">
          {/* Aquí puedes integrar una librería de gráficos como Chart.js */}
          <p>Ventas en el año</p>
          <SalesChart />
        </div>
      </div>

      {/* Actividades */}
      <div className="activities">
        <h3>Actividades</h3>
        <ul>
          <li>Creación de Usuario - Juan Pérez: Registrado...</li>
          <li>Resumen Financiero Mensual...</li>
          <li>Cuota de Mantenimiento...</li>
          <li>Pago de Servicio de Limpieza...</li>
        </ul>
      </div>

      {/* Permisos */}
      <div className="permissions">
        <h3>Permisos</h3>
        <ul>
          <li>Permiso para entrada a Torre 1 el 15/11/2024</li>
          <li>Permiso para entrada a Torre 3 el 17/11/2024</li>
          {/* Añade más permisos aquí */}
        </ul>
      </div>
    </div>
  );
};

export default ReportesAn;
