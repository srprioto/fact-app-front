import { fecha } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda";

export const CreditoDetalles = ({ creditoDetalles }:any) => {

    return (
        <div className="box box-par m-0">
            <h3>Detalles del credito</h3>

            <table className="table2">
                
                <thead>
                    <tr>
                        <th>Cantidad pagada</th>
                        <th>Estado</th>
                        <th>Nota</th>
                        <th>Fecha pago</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        creditoDetalles.map((e:any) => {
                            return (
                                <tr key={e.id}>
                                    <td className="success strong">S/.{ moneda(e.cantidad_pagada) }</td>
                                    <td className={e.estado ? "success" : "warning"}>
                                        { e.estado ? "Listo" : "Sin pagar" }
                                    </td>
                                    <td>{ e.nota }</td>
                                    <td>{ fecha(e.created_at) }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
