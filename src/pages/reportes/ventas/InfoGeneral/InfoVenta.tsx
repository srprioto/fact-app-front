import { zeroFill } from "../../../../resources/func/ceroFill"

export const InfoVenta = ({ venta, classEstado }:any) => {
    return (
        <>
            <div className="grid-2 gap">

                <div className="wrap-descripcion3">
                    <h3>Informacion general</h3>
                    <div className="box-wrap-descripcion3">

                        <span>
                            <p>Codigo de venta: </p>
                            <h4 className="info-i">{ zeroFill(Number(venta.id), 5) }</h4>
                        </span>
                        
                        <span>
                            <p>Estado de venta</p>
                            <h4 className={classEstado(venta.estado_venta)}>{ venta.estado_venta }</h4>
                        </span>

                        <span>
                            <p>Subtotal</p>
                            <h4>{ venta.subtotal }</h4>
                        </span>

                        <span>
                            <p>Descuento general</p>
                            <h4>{ venta.descuento_total }</h4>
                        </span>

                        <span>
                            <p>Total</p>
                            <h4 className="success-i">{ venta.total }</h4>
                        </span>
                        
                    </div>
                </div>

                <div className="wrap-descripcion3">
                    <h3>Informacion adicional</h3>
                    <div className="box-wrap-descripcion3">
                        
                        <span>
                            <p>Nombre del cliente: </p>
                            <h4>{ venta.nombre_cliente }</h4>
                        </span>

                        <span>
                            <p>Observaciones: </p>
                            <h4>{ venta.observaciones }</h4>
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
                            <p>Fecha de venta: </p>
                            <h4>{ venta.created_at }</h4>
                        </span>

                    </div>
                </div>
            </div>
        </>
    )
}
