import React from 'react';
import './pagosAn.css';

const PagosAn = () => {
    return (
        <div className="pagos-container">
            <div className="pagos-historial">
            <h3>Historial de renta semanal</h3>
                <div className="ganancias-pagos">
                    <div className="ganancias">
                        <p>Ganancias totales de la semana</p>
                        <p className="monto-verde">$4300.00</p>
                    </div>
                    <div className="pagos-pendientes">
                        <p>Pagos pendientes</p>
                        <p className="monto-rojo">$1600.00</p>
                    </div>
                </div>
            

            <div className="filtros">
                <button className="filtro activo">Todas</button>
                <button className="filtro">Completas</button>
                <button className="filtro">Pendientes</button>
                <button className="filtro">Rechazadas</button>
            </div>

            <table className="tabla-pagos">
                <thead>
                    <tr>
                        <th>ID operación</th>
                        <th>Fecha</th>
                        <th>Costo</th>
                        <th>Torre</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#15267</td>
                        <td>Dic 1, 2023</td>
                        <td>$100</td>
                        <td>1</td>
                        <td className="completado">Completado</td>
                    </tr>
                    <tr>
                        <td>#153587</td>
                        <td>Dic 6, 2023</td>
                        <td>$300</td>
                        <td>3</td>
                        <td className="completado">Completado</td>
                    </tr>
                    <tr>
                        <td>#12436</td>
                        <td>Dic 1, 2023</td>
                        <td>$100</td>
                        <td>1</td>
                        <td className="completado">Completado</td>
                    </tr>
                    <tr>
                        <td>#16879</td>
                        <td>Dic 2, 2023</td>
                        <td>$500</td>
                        <td>5</td>
                        <td className="completado">Completado</td>
                    </tr>
                    <tr>
                        <td>#16378</td>
                        <td>Dic 2, 2023</td>
                        <td>$500</td>
                        <td>5</td>
                        <td className="rechazado">Rechazado</td>
                    </tr>
                    <tr>
                        <td>#16609</td>
                        <td>Dic 1, 2023</td>
                        <td>$100</td>
                        <td>1</td>
                        <td className="completado">Completado</td>
                    </tr>
                    <tr>
                        <td>#16907</td>
                        <td>Dic 7, 2023</td>
                        <td>$100</td>
                        <td>1</td>
                        <td className="pendiente">Pendiente</td>
                    </tr>
                </tbody>
            </table>
        </div>
            <div className="ordenes-recientes">
                <h3>Órdenes recientes</h3>
                <ul>
                    <li>Torre 1 - Vendida a Juan Pérez el 15/11/2024 por $150,000 USD. 2 habitaciones, vista al jardín.</li>
                    <li>Torre 2 - Vendida a Ana González el 22/10/2024 por $175,000 USD. 3 habitaciones, balcón con vista a la piscina.</li>
                    <li>Torre 3 - Vendida a Carlos Martínez el 05/12/2024 por $200,000 USD. Penthouse con terraza privada.</li>
                    <li>Torre 10 - Vendida a Juan Pérez el 15/11/2024 por $150,000 USD. 2 habitaciones, vista al jardín.</li>
                    <li>Torre 11 - Vendida a Ana González el 22/10/2024 por $175,000 USD. 3 habitaciones, balcón con vista a la piscina.</li>
                    <li>Torre 14 - Vendida a Carlos Martínez el 05/12/2024 por $200,000 USD. Penthouse con terraza privada.</li>
                </ul>
            </div>

            <div className="ordenes-pendientes">
                <h3>Pagos pendientes</h3>
                <table className="tabla-pendientes">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Costo</th>
                            <th>Torre</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jane Cooper</td>
                            <td>Dic 7, 2023</td>
                            <td>$100</td>
                            <td>1</td>
                            <td className="pendiente">Pendiente</td>
                        </tr>
                        <tr>
                            <td>Will Johnson</td>
                            <td>Dic 6, 2023</td>
                            <td>$150</td>
                            <td>11</td>
                            <td className="pendiente">Pendiente</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PagosAn;
