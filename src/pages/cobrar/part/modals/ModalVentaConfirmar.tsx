import { useEffect, useState } from "react";
import { 
    BiBookmarkAltMinus, 
    BiCaretRight, 
    BiMailSend 
    // BiImport, 
} from "react-icons/bi";
// import { FaWhatsapp } from "react-icons/fa";

import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { Modal } from "../../../../components/modals/Modal"
// import { DatosClienteConf } from "./DatosClienteConf";
import { TablaProdVenta } from "./TablaProdVenta";

import { copy } from "../../../../resources/func/deepCopy";
import { fixRedondeo, redondeo } from "../../../../resources/func/redondeo";
import { Input } from "../../../../components/forms/Input";
import { ModalWrap } from "../../../../components/modals/ModalWrap";
import { ModalCorreo } from "./ModalCorreo";


export const ModalVentaConfirmar = ({ 
    modal,
    setModal,
    dataVenta,
    // codigoPago,
    confirmarVenta,
    loading
}:any) => {

    const ventaAux:any = copy(dataVenta);
    const [venta, setVenta] = useState<any>(copy(dataVenta));
    const [reducirPercent, setReducirPercent] = useState<number>(0)
    const [modalCorreo, setModalCorreo] = useState<boolean>(false);


    useEffect(() => { 
        handlerRecalculoIGV();
    }, [reducirPercent])

    
    const onChangeRedPercent = (e:any) => setReducirPercent(Number(e.target.value));


    const handlerRecalculoIGV = () => { 

        let ventaDetallesUpdate:any = [];
        
        ventaAux.ventaDetalles.forEach((e:any) => { 

            const disolvDesc:number = (e.descuento / e.cantidad_venta);
            // const fixDisolvDesc:number = Number(disolvDesc.toFixed());
            let reduccion:number;

            e.precio_venta = e.precio_venta + disolvDesc

            if (reducirPercent !== 0) {
                reduccion = redondeo(e.precio_venta * (reducirPercent / 100))
            } else {
                reduccion = 0;
            }

            e.precio_venta = e.precio_venta + reduccion

            const igv:number = redondeo(e.precio_venta * 0.18);
            const precioGravada:number = redondeo((e.precio_venta - igv));
            const precioVenta:number = redondeo(precioGravada + igv);

            e.precio_gravada = precioGravada;
            e.igv = igv;
            e.precio_venta = precioVenta
            
            // doble redondeo
            e.precio_parcial = fixRedondeo(redondeo((precioVenta * e.cantidad_venta))); /*  + (e.descuento) */
    
            ventaDetallesUpdate.push(e);

        })


        const sumaSubtotal:number = ventaDetallesUpdate // calcular subtotal
        .map((e:any) => e.precio_parcial)
        .reduce((prev:number, curr:number) => prev + curr, 0);

        const total:number = (Number(sumaSubtotal) + (Number(venta.descuento_total)))

        setVenta({
            ...venta,
            ventaDetalles: ventaDetallesUpdate,
            subtotal: redondeo(sumaSubtotal),
            total: redondeo(total)
        })

    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title={"Confirmar venta"}
            width={60}
        >
            <div className="grid-1">

                <div className="box grid-1 gap">

                    <div className="grid-1 gap wrap-descripcion">
                        <span>
                            <h3 className="primary">Codigo de venta: </h3>
                            <h2><strong>{ venta.codigo_venta }</strong></h2>
                        </span>
                    </div>

                    {/* <DatosClienteConf venta={venta} /> */}
                    <TablaProdVenta venta={venta} />

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
                            <p>Reducir por porcentaje (%):</p>
                            <Input
                                type="number"
                                name="reducirPercent"
                                value={reducirPercent}
                                onChange={onChangeRedPercent}
                                color={
                                    reducirPercent < 0
                                    ? "danger-i" : ""
                                }
                            />
                        </div>

                    </div>

                    <div className="grid-1 gap center">
                        <span>
                            <p>TOTAL:</p><h1 className="success"><strong>S/. { venta.total }</strong></h1>
                        </span>
                    </div>

                </div>

                <div className="box">

                    <h3 className="mb-25">Confirmar venta</h3>
                    <div className="grid-2 gap">

                        <div className="grid-2 gap">
                            
                            <LoadSwitchBtn2
                                loading={loading}
                                className="btn btn-success"
                                handler={() => confirmarVenta("listo")}
                            ><BiBookmarkAltMinus /> Imprimir
                            </LoadSwitchBtn2>

                            <LoadSwitchBtn2
                                loading={loading}
                                className="btn btn-warning"
                                handler={() => confirmarVenta("listo")}   
                            ><BiCaretRight /> Solo
                            </LoadSwitchBtn2>

                        </div>

                        <div className="grid-5 gap">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>

                            {/* <LoadSwitchBtn2
                                loading={loading}
                                className="btn btn-success"
                                handler={() => confirmarVenta("listo")}
                            ><FaWhatsapp />
                            </LoadSwitchBtn2> */}

                            {/* <LoadSwitchBtn2
                                loading={loading}
                                className="btn btn-primary"
                                handler={() => confirmarVenta("listo")}   
                            ><BiImport />
                            </LoadSwitchBtn2> */}

                            <LoadSwitchBtn2
                                loading={loading}
                                className="btn btn-secundary"
                                handler={() => setModalCorreo(true)}
                            ><BiMailSend />
                            </LoadSwitchBtn2>
                                
                        </div>

                    </div>
                    
                </div>
            </div>

            <ModalWrap modal={modalCorreo}>
                <ModalCorreo
                    modal={modalCorreo}
                    setModal={setModalCorreo}
                    venta={venta}
                    confirmarVenta={confirmarVenta}
                />
            </ModalWrap>

        </Modal>
    )
}
