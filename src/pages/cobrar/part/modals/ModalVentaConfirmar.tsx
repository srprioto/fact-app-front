import { useEffect, useState } from "react";
import { 
    // BiBookmarkAltMinus, 
    BiCaretRight, 
    // BiMailSend 
    // BiImport, 
} from "react-icons/bi";
// import { FaWhatsapp } from "react-icons/fa";

import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { Modal } from "../../../../components/modals/Modal"
import { TablaProdVenta } from "./TablaProdVenta";

import { copy } from "../../../../resources/func/deepCopy";
import { redondeo } from "../../../../resources/func/redondeo";
import { ModalWrap } from "../../../../components/modals/ModalWrap";
import { ModalCorreo } from "./ModalCorreo";
import { moneda } from "../../../../resources/func/moneda";
// import { ImpComprobante } from "./ImpComprobante";
import { BtnImpComprobante } from "./BtnImpComprobante";
import { tipoVenta } from "../../../../resources/dtos/VentasDto";
import { TablaDividirPrecios } from "./TablaDividirPrecios";
import { BtnImpCredito } from "./BtnImpCredito";
import { ToolTip } from "../../../../components/tooltip/ToolTip";
import { BoxModifPorcent } from "./BoxModifPorcent";
// import { useAuth } from "../../../../auth/useAuth";
// import { Roles } from "../../../../resources/dtos/RolesDto";


interface modalVentaConfirmar {
    modal:boolean;
    setModal:Function;
    dataVenta:any;
    confirmarVenta:Function;
    loading:boolean;
    comisionTarjeta:number;
    listaPrecios:Array<any>;
    creditoDetalles:Array<any>;
}

export const ModalVentaConfirmar = ({ 
    modal,
    setModal,
    dataVenta,
    confirmarVenta,
    loading,
    comisionTarjeta,
    listaPrecios,
    creditoDetalles
}:modalVentaConfirmar) => {

    const ventaAux:any = copy(dataVenta);
    const [venta, setVenta] = useState<any>(copy(dataVenta));
    const [reducirPercent, setReducirPercent] = useState<number>(0);
    const [modalCorreo, setModalCorreo] = useState<boolean>(false);

    const estadoTarjeta:boolean = comisionTarjeta > 0 ? true : false;
    // const esCredito:boolean = venta.tipo_venta === tipoVenta.credito || venta.tipo_venta === tipoVenta.adelanto; 

    useEffect(() => { 
        let ventaDetallesUpdate:any = [];
        
        const descuentoXItems:number = Number(ventaAux.descuento_total) / ventaAux.ventaDetalles.length;
        let igvGen:number = 0;
        
        ventaAux.ventaDetalles.forEach((e:any) => { 

            const cantidadVenta:number = Number(e.cantidad_venta);
            const descuenXUnid:number = Number(descuentoXItems / cantidadVenta);
            const disolvDesc:number = Number((e.descuento / cantidadVenta) + descuenXUnid);

            let reduccion:number;

            e.precio_venta = Number(e.precio_venta) + disolvDesc

            if (reducirPercent !== 0) {
                reduccion = e.precio_venta * (reducirPercent / 100)
            } else {
                reduccion = 0;
            }

            e.precio_venta = Number(e.precio_venta) + reduccion

            // const precioVenta:number = Number(e.precio_venta);
            const precioGravada:number = Number(e.precio_venta / 1.18);
            const igv:number = Number(e.precio_venta) - Number(precioGravada);

            e.precio_gravada = Number(precioGravada);
            e.igv = Number(igv);
            // e.precio_venta = Number(precioVenta)
            e.precio_parcial = Number(e.precio_venta) * Number(cantidadVenta);

            igvGen = igvGen + (igv * cantidadVenta);
    
            ventaDetallesUpdate.push(e);

        })


        const sumaSubtotal:number = ventaDetallesUpdate // calcular subtotal
        .map((e:any) => e.precio_parcial)
        .reduce((prev:number, curr:number) => prev + curr, 0);

        const total:number = (
            Number(sumaSubtotal) 
            // + (Number(venta.descuento_total))
        )

        setVenta({
            ...venta,
            ventaDetalles: ventaDetallesUpdate,
            subtotal: total - igvGen,
            total: redondeo(total),
            igvGeneral: igvGen
        })

    }, [reducirPercent])

    
    const onChangeRedPercent = (e:any) => setReducirPercent(Number(e.target.value));

    const registroFinal = async (estado:string, sendEmail?:string, imprimir?:boolean) => { 

        const updateVenta = venta.tipo_venta !== tipoVenta.venta_rapida || sendEmail ? venta : false;
        const sendComprobante = sendEmail ? sendEmail : false;

        // confirma la venta y la guarda en nuetro registro
        await confirmarVenta(estado, updateVenta, sendComprobante); 
        
        // await registrarSunat();
    }
    
    
    const credito = () => { 
        if (
            (venta.tipo_venta === tipoVenta.credito || venta.tipo_venta === tipoVenta.adelanto) &&
            !(Number(venta.totalPagado) === Number(venta.total))
        ) {
            return true;
        } else {
            return false;
        }
    }


    const limpiarLista = ():Array<any> => { 
        const listaLimpia:Array<any> = [];
        listaPrecios.forEach((e:any) => {
            if(Number(e.precio_parcial) !== 0){
                listaLimpia.push(e);
            }
        })
        return listaLimpia
    }
    

    // const totalGrid = ():number => { 
    //     let total:number = 4;
    //     // if (credito()) {
    //     //     total = total + 1
    //     // } 
    //     return total;
    // }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            titulo={"Confirmar venta"}
            width={70}
        >
            <div className="grid-1">

                <div className="box grid-1 gap">

                    <div className="grid-1 gap wrap-descripcion">
                        <span>
                            <h3 className="primary">Codigo de venta: </h3>
                            <h2><strong>{ venta.codigo_venta }</strong></h2>
                        </span>
                    </div>

                    <TablaProdVenta venta={venta} />

                    <div className={`grid-4 gap center`}>
                        <span>
                            <p>Subtotal:</p>
                            <p className="info"><strong>S/. { moneda(venta.subtotal) }</strong></p>
                        </span>

                        <span>
                            <p>IGV general:</p>
                            <p className="info"><strong>S/. { moneda(venta.igvGeneral) }</strong></p>
                        </span>

                        {
                            credito()
                            ? (
                                <>
                                    <span>
                                        <p>Total real:</p>
                                        <p className="info strong">S/. { moneda(venta.total) }</p>
                                    </span>
                                    <span>
                                        <p className={
                                            estadoTarjeta
                                            ? "warning"
                                            : ""
                                        }>{
                                            estadoTarjeta
                                            ? "Total P + 5%:"
                                            : "Total a pagar:"
                                        }</p>
                                        <h1 className="success strong">S/. { moneda(
                                            Number(venta.totalPagado) + Number(comisionTarjeta)
                                        ) }</h1>
                                    </span>
                                </>
                            ) : (
                                <span>
                                    <p className={
                                        estadoTarjeta
                                        ? "warning"
                                        : ""
                                    }>{
                                        estadoTarjeta
                                        ? "Total + 5% com."
                                        : "Total"
                                    }</p>
                                    <h1 className="success strong">S/. { moneda(
                                        Number(venta.total) + Number(comisionTarjeta)
                                    ) }</h1>
                                </span>
                            )
                        }
                        {
                            (!credito())
                            && <BoxModifPorcent
                                reducirPercent={reducirPercent}
                                onChangeRedPercent={onChangeRedPercent}
                            />
                        }

                    </div>
                    <TablaDividirPrecios limpiarLista={limpiarLista}/>
                </div>

                <div className="box box-par m-0">

                    <h3 className="mb-25">Confirmar venta</h3>
                    <div className="grid-2 gap">

                        <div className="grid-2 gap">
                            
                            {
                                !credito()
                                ? <BtnImpComprobante
                                    loading={loading}
                                    registroFinal={registroFinal}
                                    venta={venta}
                                /> : <BtnImpCredito 
                                    loading={loading}
                                    registroFinal={registroFinal}
                                    venta={venta}
                                    creditoDetalles={creditoDetalles}
                                />
                            }

                            <LoadSwitchBtn2
                                loading={loading}
                                className="btn btn-warning"
                                handler={() => registroFinal("listo")}
                                tooltip={{
                                    anchor: "btn-confi-venta-solo",
                                    descripcion: "Confirma la venta sin realizar la impresión del comprobante",
                                }}
                            ><BiCaretRight /> Solo
                            </LoadSwitchBtn2>

                        </div>

                        {/* <div className="grid-5 gap">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>

                            <LoadSwitchBtn2
                                loading={loading}
                                className="btn btn-secundary"
                                handler={() => setModalCorreo(true)}
                            ><BiMailSend />
                            </LoadSwitchBtn2>  
                        </div> */}
                    </div>
                    <ToolTip
                        anchor=""
                        descripcion=""
                    /> 
                    <ToolTip
                        anchor=""
                        descripcion=""
                    /> 
                </div>
            </div>

            <ModalWrap modal={modalCorreo}>
                <ModalCorreo
                    modal={modalCorreo}
                    setModal={setModalCorreo}
                    venta={venta}
                    registroFinal={registroFinal}
                    loading={loading}
                />
            </ModalWrap>

            {/* <ImpComprobante venta={venta} /> */}

        </Modal>
    )
}


/* <LoadSwitchBtn2
    loading={loading}
    className="btn btn-success"
    handler={() => registroFinal("listo")}
><FaWhatsapp />
</LoadSwitchBtn2> */

/* <LoadSwitchBtn2
    loading={loading}
    className="btn btn-primary"
    handler={() => registroFinal("listo")}   
><BiImport />
</LoadSwitchBtn2> */