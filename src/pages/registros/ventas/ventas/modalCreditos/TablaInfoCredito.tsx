import { fecha } from "../../../../../resources/func/fechas";
import { moneda } from "../../../../../resources/func/moneda";
import { InfoGeneralCredito } from "./InfoGeneralCredito";

export const TablaInfoCredito = ({ venta, cantidadRestante }:any) => {

    const creditoDetalles:Array<any> = venta.creditoDetalles ? venta.creditoDetalles : [];
    const codigoVenta:string = venta.id + "-" + venta.codigo_venta;

    return (
        <div>
            <h3 className="info center m-0">Codigo de venta: { codigoVenta }</h3>

            <div className="box box-par m-0">

                <h3>Informacion de {venta.tipo_venta}</h3>

                <table className="table2">
                    
                    <thead>
                        <tr>
                            <th>Cantidad pagada</th>
                            <th>Estado</th>
                            <th>Nota</th>
                            <th>Fecha pago</th>
                            {/* <th className="transparent">...</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            creditoDetalles.map((e:any) => {
                                return (
                                    <tr key={e.id}>
                                        <td className={
                                            Number(e.cantidad_pagada) === 0
                                            ? "warning strong"
                                            : "success strong"
                                        }>S/.{ moneda(e.cantidad_pagada) }</td>
                                        <td className={e.estado ? "success" : "warning"}>
                                            { e.estado ? "Listo" : "Sin pagar" }
                                        </td>
                                        <td>{ e.nota }</td>
                                        <td>{ fecha(e.created_at) }</td>
                                        {/* <td>
                                            <DropDown>
                                                <span onClick={ () => {} } >
                                                    <BiTrash /> Eliminar
                                                </span>
                                            </DropDown>
                                        </td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    !(cantidadRestante <= 0 && venta.estado_producto)
                    && <InfoGeneralCredito venta={venta} />
                }
            </div>
        </div>
    )
}
