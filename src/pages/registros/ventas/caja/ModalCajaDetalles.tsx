import { useEffect, useState } from "react";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal"
import { ToolTip } from "../../../../components/tooltip/ToolTip";
import { getOne } from "../../../../resources/fetch";
import { zeroFill } from "../../../../resources/func/ceroFill";
import { fecha } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda";
import { CAJA } from "../../../../resources/routes";
import { CajaDetalles } from "../../../cajaChica/part/CajaDetalles";
import { InfoCaja } from "./InfoCaja";

export const ModalCajaDetalles = ({ modal, setModal, cajaId }:any) => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [caja, setcaja] = useState<any>({});

    
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
            titulo="Detalles de caja"
            modal={modal}
            setModal={setModal}
            width={80}
        >
            {
                loading
                ? <Loading />
                : (
                    <div className="grid-1 gap">

                        <div className="wrap-descripcion3 grid-1 gap">
                            <h3>Informacion general</h3>
                            <InfoCaja caja={caja} />
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