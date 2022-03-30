import { useEffect, useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi";

import { Checkbox2 } from "../../../../components/forms/Checkbox2";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { Modal } from "../../../../components/modals/Modal"
import { DatosClienteConf } from "./DatosClienteConf";
import { TablaProdVenta } from "./TablaProdVenta";

import { copy } from "../../../../resources/func/deepCopy";
import { redondeo } from "../../../../resources/func/redondeo";


export const ModalVentaConfirmar = ({ 
    modal, 
    setModal, 
    dataVenta, 
    codigoPago, 
    confirmarVenta, 
    loading 
}:any) => {

    const [igv, setIgv] = useState<boolean>(true);
    const [venta, setVenta] = useState<any>(copy(dataVenta));
    
    useEffect(() => { // aplicar igv        
        if (igv) {
            handlerIGV();
        } else {
            setVenta(copy(dataVenta));
        }
    }, [igv])
    

    const handlerIGV = () => { 
        let ventaDetallesUpdate:any = [];
        
        venta.ventaDetalles.map((e:any) => { 
            const igv:number = redondeo(e.precio_venta * 0.18)
            e.precio_venta = e.precio_venta - igv;
            e.precio_parcial = redondeo(((e.precio_venta + igv) * e.cantidad_venta) + (e.descuento))
            e.igv = igv;
            ventaDetallesUpdate.push(e);
        })

        setVenta({
            ...venta,
            ventaDetalles: ventaDetallesUpdate
        })
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title={"Confirmar venta"}
            width={50}
        >
            <div className="grid-1">

                <div className="box grid-1 gap">

                    <div className="grid-1 gap wrap-descripcion">
                        <span>
                            <h2 className="primary">Nro factura: </h2>
                            <h2><strong>{ codigoPago() + "-" + venta.id }</strong></h2>
                        </span>
                    </div>

                    <DatosClienteConf venta={venta} />
                    <TablaProdVenta venta={venta} igv={igv} />

                    <div className="grid-3 gap center">
                        <span>
                            <p>Subtotal:</p>
                            <p className="info"><strong>S/. { venta.subtotal }</strong></p>
                        </span>
                        <span>
                            <p>Incr/Desc total:</p>
                            <p className={(
                                venta.descuento_total < 0 
                                ? "danger" 
                                : venta.descuento_total > 0
                                ? "success" 
                                : "info"
                            )}>
                                <strong>S/. { venta.descuento_total }</strong>
                            </p>
                        </span>
                        <div>
                            <p className="center">Mostrar IGV:</p>
                            <Checkbox2
                                // label={igv ? "Deshabilitar" : "Habilitar"}
                                name="igv"
                                checked={igv}
                                handlerCheck={ () => setIgv(!igv) }
                            />
                        </div>
                    </div>

                    <div className="grid-1 gap center">
                        <span>
                            <p>TOTAL:</p><h1 className="success"><strong>S/. { venta.total }</strong></h1>
                        </span>
                    </div>

                </div>

                <div className="box grid-3 gap">
                    
                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-success"
                        handler={() => confirmarVenta("listo")}
                        
                    >
                        <BiCheck /> Confirmar e imprimir
                    </LoadSwitchBtn2>

                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-info"
                        handler={() => confirmarVenta("listo")}   
                        
                    >
                        <BiCheck /> Confirmar
                    </LoadSwitchBtn2>

                    <button 
                        className="btn btn-warning"
                        onClick={() => setModal(!modal)}
                    ><BiReply /> Regresar</button>
                </div>


            </div>
        </Modal>
    )
}
