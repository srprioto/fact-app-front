import { zeroFill } from "../../../../resources/func/ceroFill"
import { moneda } from "../../../../resources/func/moneda"

export const InfoIngresoProductos = ({ movimiento }:any) => {
    return (
        <div className="grid-2 gap">

            <div className="wrap-descripcion3">
                <h3>Costos</h3>
                <div className="box-wrap-descripcion3">
                    <span>
                        <p>Subtotal</p>
                        <h4>S/. { moneda(movimiento.subtotal) }</h4>
                    </span>
                    <span>
                        <p>Costo de transporte</p>
                        <h4>S/. { moneda(movimiento.costo_transporte) }</h4>
                    </span>
                    <span>
                        <p>Otros costos</p>
                        <h4>S/. { moneda(movimiento.costo_otros) }</h4>
                    </span>
                    <span>
                        <p>Total</p>
                        <h4>S/. { moneda(movimiento.total) }</h4>
                    </span>
                </div>
            </div>

            <div className="wrap-descripcion3">
                <h3>Otros</h3>
                <div className="box-wrap-descripcion3">
                    <span>
                        <p>Codigo de ingreso: </p>
                        <h4>{ zeroFill(Number(movimiento.id), 8) }</h4>
                    </span>

                    <span>
                        <p>Local destino: </p>
                        <h4>{ movimiento.locales && movimiento.locales.nombre }</h4>
                    </span>

                    <span>
                        <p>Observaciones: </p>
                        <h4>{ movimiento.observaciones }</h4>
                    </span>

                    <span>
                        <p>Fecha de envio: </p>
                        <h4>{ movimiento.created_at }</h4>
                    </span>
                </div>                    
            </div>
        </div>
    )
}
