import { zeroFill } from "../../../../resources/func/ceroFill"
import { fecha } from "../../../../resources/func/fechas"

export const InfoTransaccion = ({ transaccion, classEstado }:any) => {
    return (
        <div className="grid-2 gap">

            <div className="wrap-descripcion3">
                <h3>Informacion general</h3>
                <div className="box-wrap-descripcion3">

                    <span>
                        <p>Codigo de envio: </p>
                        <h4 className="info-i">{ zeroFill(transaccion.id, 6) }</h4>
                    </span>
                    
                    <span>
                        <p>Descripcion de envio: </p>
                        <h4>{ transaccion.descripcion }</h4>
                    </span>

                    <span>
                        <p>Estado de envio</p>
                        <h4 
                            className={classEstado(transaccion.estado_general)}
                        >{ transaccion.estado_general }</h4>
                    </span>

                    <span>
                        <p>Observaciones: </p>
                        <h4>{ transaccion.observaciones }</h4>
                    </span>
                    
                </div>
            </div>

            <div className="wrap-descripcion3">
                <h3>Informacion de envio</h3>
                <div className="box-wrap-descripcion3">

                    <span>
                        <p>Local de origen: </p>
                        <h4>{ transaccion.localOrigen && transaccion.localOrigen.nombre }</h4>
                    </span>

                    <span>
                        <p>Local destino: </p>
                        <h4>{ transaccion.localDestino && transaccion.localDestino.nombre }</h4>
                    </span>

                    <span>
                        <p>Usuario emisor: </p>
                        <h4>{ transaccion.usuarioEnvia && transaccion.usuarioEnvia.nombre }</h4>
                    </span>

                    <span>
                        <p>Usuario receptor: </p>
                        <h4>{ transaccion.usuarioRecibe && transaccion.usuarioRecibe.nombre }</h4>
                    </span>

                    <span>
                        <p>Fecha de envio: </p>
                        <h4>{ fecha(transaccion.created_at) }</h4>
                    </span>

                </div>
            </div>
        </div>
    )
}
