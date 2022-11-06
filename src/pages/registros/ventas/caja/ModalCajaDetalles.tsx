import { useEffect, useState } from "react";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal"
import { tipoMovimiento } from "../../../../resources/dtos/Caja";
import { getOne } from "../../../../resources/fetch";
import { zeroFill } from "../../../../resources/func/ceroFill";
import { fecha } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda";
import { CAJA } from "../../../../resources/routes";
import { CajaDetalles } from "../../../cajaChica/part/CajaDetalles";

export const ModalCajaDetalles = ({ modal, setModal, cajaId }:any) => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [caja, setcaja] = useState<any>({});

    const totalCaja:number = 
        Number(caja.monto_efectivo) + 
        Number(caja.monto_apertura) + 
        Number(caja.otros_montos);
    
    const montoOtrosMedios:number = 
        Number(caja.monto_deposito) +
        Number(caja.monto_tarjeta) +
        Number(caja.monto_pago_electronico);

    
    useEffect(() => {
        getComprobante();
    }, [])


    const getComprobante = async () => { 
        setLoading(true);
        try {
            const dataOne = await getOne(cajaId, CAJA);
            setcaja(dataOne);
            setLoading(false);            
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    const mostrarCajaDetalles = () => { 
        const mostrarDetalles:number = caja.cajaDetalles && caja.cajaDetalles.length;
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
            width={80}
        >
            {
                loading
                ? <Loading />
                : (
                    <div className="grid-1 gap">

                        <div className="wrap-descripcion3">
                            <h3>Informacion general</h3>
                            <div className="grid-2 gap">

                                <div className="box-wrap-descripcion3">

                                    <span>
                                        <p>Monto apertura:</p>
                                        <h4 className="secundary-i">S/. { moneda(caja.monto_apertura) }</h4>
                                    </span>

                                    <span>
                                        <p>Otros movimientos:</p>
                                        <h4 className="warning-i">S/. { moneda(caja.otros_montos) }</h4>
                                    </span>

                                    {/* <span>
                                        <p>Ingresos en efectivo:</p>
                                        <h4 className={
                                            (caja.cantidad_diferencia > 0
                                            ? "danger-i"
                                            : "info-i")
                                        }>S/. { moneda(caja.monto_efectivo) }</h4>
                                    </span> */}

                                    <span>
                                        <p>Monto total en caja:</p>
                                        <h3 className="success-i strong">S/. { moneda(totalCaja) }</h3>
                                    </span>
                                    
                                </div>
                                    
                                <div className="box-wrap-descripcion3">
                                    
                                    <div className="mb-15">
                                        <span className="m-0">
                                            <p className="m-0">Tarjeta:</p>
                                            <h4 className="m-0 secundary-i">S/. { moneda(caja.monto_tarjeta) }</h4>
                                        </span>
                                        <span className="m-0">
                                            <p className="m-0">Pago electronico:</p>
                                            <h4 className="m-0 secundary-i">S/. { moneda(caja.monto_pago_electronico) }</h4>
                                        </span>
                                        <span className="m-0">
                                            <p className="m-0">Deposito:</p>
                                            <h4 className="m-0 secundary-i">S/. { moneda(caja.monto_deposito) }</h4>
                                        </span>
                                    </div>

                                    <span>
                                        <p>Ingresos otros medios:</p>
                                        <h4 className="primary-i">S/. { moneda(montoOtrosMedios) }</h4>
                                    </span>
                                </div>
                            </div>

                            <div className="grid-3 gap middle">
                                <div></div>
                                <span className="center mt-15 grid-2 gap">
                                    <p className="strong">Ingresos totales:</p>
                                    <h2 className="success-i strong">
                                        S/. { moneda(montoOtrosMedios + totalCaja) }
                                    </h2>
                                </span>
                                <div></div>
                            </div>

                        </div>

                        <div className="wrap-descripcion3">
                            <h3>Informacion adiccional</h3>
                            <div className="grid-2 gap">
                                <div className="box-wrap-descripcion3">
                                    <span>
                                        <p>Codigo caja:</p>
                                        <h4>{ zeroFill(Number(caja.id)) }</h4>
                                    </span>
                                    <span>
                                        <p>Monto diferencial:</p>
                                        <h4 className={
                                            (caja.cantidad_diferencia !== 0
                                            ? "danger-i"
                                            : "secundary-i")
                                        }>S/. { moneda(caja.cantidad_diferencia) }</h4>
                                    </span>
                                    <span>
                                        <p>Observaciones:</p>
                                        <h4 className="danger-i">{ caja.nota_observacion }</h4>
                                    </span>
                                </div>
                                <div className="box-wrap-descripcion3">
                                    <span>
                                        <p>Estado de caja:</p>
                                        <h4 className={
                                            caja.estado_caja
                                            ? "success-i"
                                            : "danger-i"
                                        }>
                                            {
                                                caja.estado_caja
                                                ? "Abierto"
                                                : "Cerrado"
                                            }
                                        </h4>
                                    </span>
                                    <span>
                                        <p>Usuario apertura:</p>
                                        <h4>{ caja.usuarioAbre ? caja.usuarioAbre.nombre : "" }</h4>
                                    </span>
                                    <span>
                                        <p>Usuario cierre:</p>
                                        <h4>{ caja.usuarioCierra ? caja.usuarioCierra.nombre : "--" }</h4>
                                    </span>
                                    <span>
                                        <p>Fecha:</p>
                                        <h4>{ fecha(caja.created_at) }</h4>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {
                            mostrarCajaDetalles()
                            && <CajaDetalles
                                cajaDetalles={caja.cajaDetalles}
                            />
                        }
                    </div>
                )
            }
            
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