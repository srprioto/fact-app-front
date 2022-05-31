import { Modal } from "../../../../components/modals/Modal"
import { zeroFill } from "../../../../resources/func/ceroFill";

export const ModalCajaDetalles = ({ modal, setModal, itemCaja }:any) => {
    
    console.log(itemCaja);
    const totalCaja:number = itemCaja.monto_efectivo + itemCaja.monto_apertura + itemCaja.otros_montos

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
                                <h4 className="secundary-i">S/. { itemCaja.monto_apertura }</h4>
                            </span>

                            <span>
                                <p>Otros movimientos:</p>
                                <h4 className="warning-i">S/. { itemCaja.otros_montos }</h4>
                            </span>

                            <span>
                                <p>Ingresos en efectivo:</p>
                                <h4 className={
                                    (itemCaja.cantidad_diferencia > 0
                                    ? "danger-i"
                                    : "info-i")
                                }>S/. { itemCaja.monto_efectivo }</h4>
                            </span>

                            <span>
                                <p>Monto total en caja:</p>
                                <h3 className="success-i strong">S/. { totalCaja }</h3>
                            </span>
                            
                        </div>
                            
                        <div className="box-wrap-descripcion3">

                            <span>
                                <p>Ingresos otros medios:</p>
                                <h4 className="primary-i">S/. { itemCaja.monto_otros_medios }</h4>
                            </span>

                            <span>
                                <p>Monto diferencial:</p>
                                <h4 className={
                                    (itemCaja.cantidad_diferencia !== 0
                                    ? "danger-i"
                                    : "secundary-i")
                                }>S/. { itemCaja.cantidad_diferencia }</h4>
                            </span>

                            <span>
                                <p>Observaciones:</p>
                                <h4>{ itemCaja.nota_observacion }</h4>
                            </span>
                            
                            <span>
                                <p className="strong">Ingresos totales:</p>
                                <h2 className="success-i strong">S/. { itemCaja.monto_otros_medios + totalCaja }</h2>
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
                                <h4>{ itemCaja.created_at }</h4>
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
                                                    <td>{ e.created_at }</td>
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