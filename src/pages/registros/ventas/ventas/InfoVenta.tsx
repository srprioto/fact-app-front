import { tipoVenta } from "../../../../resources/dtos/VentasDto";
import { fecha } from "../../../../resources/func/fechas"
import { moneda } from "../../../../resources/func/moneda";

export const InfoVenta = ({ venta, classEstado }:any) => {

    const comprobante:any = venta.comprobante ? venta.comprobante : [];

    const correlativo:number = comprobante[0] ? comprobante[0].correlativo : 0;
    const codigoVenta:string = 
        // venta.serie + "-" + 
        venta.id + "-" + 
        venta.codigo_venta +
        (correlativo !== 0 ? "-" + correlativo : "");

    const esCredito:boolean = venta.tipo_venta === tipoVenta.credito || venta.tipo_venta === tipoVenta.adelanto

    
    // const tipoComprobante = () => { 
    //     if (venta.serie === "B003") {
    //         return "Boleta";
    //     } else if (venta.serie === "F003") {
    //         return "Factura";
    //     } else if (venta.serie === "V001") {
    //         return "Venta rapida";
    //     }
    // }


    return (
    
        <div className="grid-2 gap">

            <div className="wrap-descripcion3">
                <h3>Informacion general</h3>
                <div className="box-wrap-descripcion3">

                    <span>
                        <p>Codigo venta</p>
                        <h4 className="info-i">{ codigoVenta }</h4>
                    </span>

                    <span>
                        <p>Subtotal</p>
                        <h4>S/. { moneda(venta.subtotal) }</h4>
                    </span>

                    <span>
                        <p>Inc/Desc general</p>
                        <h4>S/. { moneda(venta.descuento_total) }</h4>
                    </span>

                    <span>
                        <p>Total</p>
                        <h4 className="success-i">S/. { moneda(venta.total) }</h4>
                    </span>

                    {
                        esCredito
                        && (
                            <span>
                                <p>Total pagado</p>
                                <h4 className="warning-i">S/. { moneda(venta.totalPagado) }</h4>
                            </span>
                        )
                    }
                    
                    <span>
                        <p>Tipo de venta</p>
                        <h4 className={
                            esCredito
                            ? "warning-i capitalize"
                            : "info-i capitalize"
                        }>{ venta.tipo_venta }</h4>
                    </span>

                    <span>
                        <p>Forma de pago</p>
                        <h4>{ venta.forma_pago }</h4>
                    </span>
                    
                </div>
            </div>

            <div className="wrap-descripcion3">
                <h3>Informacion adicional</h3>
                <div className="box-wrap-descripcion3">
                    
                    <span>
                        <p>Codigo de venta: </p>
                        <h4>{ venta.codigo_venta }</h4>
                    </span>

                    <span>
                        <p>Estado de venta</p>
                        <h4 className={classEstado(venta.estado_venta)}>{ venta.estado_venta }</h4>
                    </span>

                    <span>
                        <p>Local: </p>
                        <h4>{ venta.locales && venta.locales.nombre }</h4>
                    </span>

                    <span>
                        <p>Encargado de la venta: </p>
                        <h4>{ venta.usuarios && venta.usuarios.nombre }</h4>
                    </span>

                    <span>
                        <p>
                            {
                                venta.estado_venta !== "anulado"
                                ? "Observaciones:"
                                : "Nota anulacion"
                            }
                        </p>
                        <h4>{ venta.observaciones }</h4>
                    </span>

                    <span>
                        <p>Fecha de venta: </p>
                        <h4>{ fecha(venta.created_at) }</h4>
                    </span>

                </div>
            </div>
        </div>
    
    )
}
