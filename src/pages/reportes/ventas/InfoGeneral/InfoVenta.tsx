// import { zeroFill } from "../../../../resources/func/ceroFill"

import { fecha } from "../../../../resources/func/fechas"

export const InfoVenta = ({ venta, classEstado }:any) => {

    const comprobante:any = venta.comprobante ? venta.comprobante : [];

    const correlativo:number = comprobante[0] ? comprobante[0].id : 0;
    const codigoVenta:string = 
        venta.serie + "-" + 
        venta.id + "-" + 
        venta.codigo_venta +
        (correlativo !== 0 ? "-" + correlativo : "");

        
    const tipoComprobante = () => { 
        if (venta.serie === "B001") {
            return "Boleta";
        } else if (venta.serie === "F001") {
            return "Factura";
        } else if (venta.serie === "V001") {
            return "Venta rapida";
        }
    }
    

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
                        <p>Tipo comp.</p>
                        <h4 className="info-i">{ tipoComprobante() }</h4>
                    </span>

                    <span>
                        <p>Subtotal</p>
                        <h4>S/. { venta.subtotal }</h4>
                    </span>

                    <span>
                        <p>Descuento general</p>
                        <h4>S/. { venta.descuento_total }</h4>
                    </span>

                    <span>
                        <p>Total</p>
                        <h4 className="success-i">S/. { venta.total }</h4>
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
