// import { zeroFill } from "../../../../resources/func/ceroFill"

import { fecha } from "../../../../resources/func/fechas"

export const InfoCotizacion = ({ venta }:any) => {

    const codigoVenta:string = 
        venta.serie + "-" + 
        venta.id
   

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

                </div>
            </div>

            <div className="wrap-descripcion3">
                <h3>Informacion adicional</h3>
                <div className="box-wrap-descripcion3">
                    
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
