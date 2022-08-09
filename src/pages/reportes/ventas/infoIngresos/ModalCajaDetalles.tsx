import { Modal } from "../../../../components/modals/Modal"
import { zeroFill } from "../../../../resources/func/ceroFill";
import { fecha } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda";

export const ModalCajaDetalles = ({ modal, setModal, itemCaja }:any) => {
    
    const totalCaja:number = 
        Number(itemCaja.monto_efectivo) + 
        Number(itemCaja.monto_apertura) + 
        Number(itemCaja.otros_montos);
        
    const montoOtrosMedios:number = Number(itemCaja.monto_otros_medios);

    const mostrarCajaDetalles = () => { 
        const mostrarDetalles:number = itemCaja.cajaDetalles && itemCaja.cajaDetalles.length;
        if (mostrarDetalles > 0) {
            return true
        } else {
            return false
        }
    }

    
    return (
        <Modal
            title="Detalles de caja"
            modal={modal}
            setModal={setModal}
            width={65}
        >
            <div className="grid-1 gap">

                <div className="wrap-descripcion3">
                    <h3>Informacion general</h3>
                    <div className="grid-2 gap">
            
                        <div className="box-wrap-descripcion3">

                            <span>
                                <p>Monto apertura:</p>
                                <h4 className="secundary-i">S/. { moneda(itemCaja.monto_apertura) }</h4>
                            </span>

                            <span>
                                <p>Otros movimientos:</p>
                                <h4 className="warning-i">S/. { moneda(itemCaja.otros_montos) }</h4>
                            </span>

                            <span>
                                <p>Ingresos en efectivo:</p>
                                <h4 className={
                                    (itemCaja.cantidad_diferencia > 0
                                    ? "danger-i"
                                    : "info-i")
                                }>S/. { moneda(itemCaja.monto_efectivo) }</h4>
                            </span>

                            <span>
                                <p>Monto total en caja:</p>
                                <h3 className="success-i strong">S/. { moneda(totalCaja) }</h3>
                            </span>
                            
                        </div>
                            
                        <div className="box-wrap-descripcion3">

                            <span>
                                <p>Ingresos otros medios:</p>
                                <h4 className="primary-i">S/. { moneda(montoOtrosMedios) }</h4>
                            </span>

                            <span>
                                <p>Monto diferencial:</p>
                                <h4 className={
                                    (itemCaja.cantidad_diferencia !== 0
                                    ? "danger-i"
                                    : "secundary-i")
                                }>S/. { moneda(itemCaja.cantidad_diferencia) }</h4>
                            </span>

                            {
                                itemCaja.nota_observacion
                                ? (
                                    <span>
                                        <p>Observaciones:</p>
                                        <h4 className="danger-i">{ itemCaja.nota_observacion }</h4>
                                    </span>
                                ) : (
                                    <span>
                                        <p className="transparent">...</p>
                                        <h4 className="transparent">...</h4>
                                    </span>
                                )
                            }
                            
                            <span>
                                <p className="strong">Ingresos totales:</p>
                                <h2 className="success-i strong">
                                    S/. { moneda(montoOtrosMedios + totalCaja) }
                                </h2>
                            </span>

                        </div>

                    </div>
                </div>

                <div className="wrap-descripcion3">
                    <h3>Informacion adiccional</h3>
                    <div className="grid-2 gap">
                        <div className="box-wrap-descripcion3">
                            <span>
                                <p>Codigo caja:</p>
                                <h4>{ zeroFill(Number(itemCaja.id)) }</h4>
                            </span>
                        </div>
                        <div className="box-wrap-descripcion3">
                            <span>
                                <p>Estado de caja:</p>
                                <h4 className={
                                    itemCaja.estado_caja
                                    ? "success-i"
                                    : "danger-i"
                                }>
                                    {
                                        itemCaja.estado_caja
                                        ? "Abierto"
                                        : "Cerrado"
                                    }
                                </h4>
                            </span>
                            <span>
                                <p>Fecha:</p>
                                <h4>{ fecha(itemCaja.created_at) }</h4>
                            </span>
                        </div>
                    </div>
                </div>

                {
                    mostrarCajaDetalles()
                    && (
                        <div className="box">
                            <h3>Otros movimientos</h3>
                            <table className="table">
                                        
                                <thead>
                                    <tr>
                                        <th>Descripcion</th>
                                        <th>Monto movimiento</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        itemCaja.cajaDetalles.map((e:any) => {
                                            return (
                                                <tr key={e.id}>
                                                    <td>{ e.descripcion }</td>
                                                    <td
                                                        className={
                                                            "strong " +
                                                            (e.monto_movimiento < 0
                                                            ? "danger"
                                                            : "info")
                                                        }
                                                    >{ e.monto_movimiento }</td>
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

                

            </div>
        </Modal>
    )
}


// id
// estado_caja
// monto_apertura
// monto_efectivo

// otros_montos
// cantidad_diferencia
// nota_observacion
// created_at