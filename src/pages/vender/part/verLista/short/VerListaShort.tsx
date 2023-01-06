import { useState } from "react";
import { BiCaretRight, BiRightArrowAlt } from "react-icons/bi";
import { LoadSwitchBtn2 } from "../../../../../components/btns/LoadSwitchBtn2";
// import { Input } from "../../../../../components/forms/Input";
import { ModalWrap } from "../../../../../components/modals/ModalWrap";
import { TextoRelleno } from "../../../../../components/TextoRelleno";
import { ToolTip } from "../../../../../components/tooltip/ToolTip";
import { useCaja } from "../../../../../hooks/useContext/caja.ts/useCaja";
import { clienteInfo } from "../../../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../../../resources/dtos/VentasDto";
import { moneda } from "../../../../../resources/func/moneda";
import { ModalCodigoVenta } from "./ModalCodigoVenta";
import { TablaListaShort } from "./TablaListaShort";

interface verListaShort {
    // setVenta:Function;
    venta:any;
    itemPop:Function;
    listaVenta:Array<any>;
    handlerShowWindow:any;
    postVenta:Function;
    reinicios2:Function;
    // alertaDescuento:Function;
}

export const VerListaShort = ({ 
    // setVenta,
    venta, 
    itemPop, 
    listaVenta, 
    handlerShowWindow, 
    postVenta,
    reinicios2,
    // alertaDescuento
}:verListaShort) => {

    const caja = useCaja();
    
    const [loadVenta, setLoadVenta] = useState<boolean>(false);

    const [ventaRespuesta, setVentaRespuesta] = useState<any>({});
    const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  

    // const handlerOnChange = (e:any) => { 
    //     setVenta({
    //         ...venta,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const verificarCaja = (func:Function) => { 
        caja.handlerEstadoCaja();
        func();
    }

    const handlerVenta = async () => { 
        setLoadVenta(true);
        const cliente:any = clienteInfo
        try {
            const ventaResp:any = await postVenta(cliente, tipoVenta.venta_rapida);
            if (ventaResp.data) {
                setVentaRespuesta(ventaResp.data);
                setModalConfirm(true);
            }            
            setLoadVenta(false);
        } catch (error) {
            setLoadVenta(true);
            console.log(error);
        } finally{
            reinicios2();
        }
    }


    return (
        <div className="box box-par m-0 ver-lista-short">

            {
                listaVenta.length > 0
                ? (
                    <div className="">
                        
                        <TablaListaShort 
                            itemPop={itemPop} 
                            listaVenta={listaVenta} 
                        />

                        <div className="info-venta grid-1 gap mb-25">
                            
                            {/* <span className="center">
                                <p className="mb-5 info">Subtotal</p>
                                <h3 className="secundary m-0">S/. {venta.subtotal}</h3>
                            </span>

                            <span>
                                {
                                    alertaDescuento()
                                    ? (
                                        <p className="mb-10 danger center strong">
                                            ¡Descuentos activos!
                                        </p>
                                    )
                                    : (
                                        <p className="mb-10 info center">
                                            Incr/Desc. total
                                        </p>
                                    )
                                }                                
                                <Input 
                                    // label="Incr/Desc. total"
                                    type="number"
                                    name="descuento_total"
                                    value={venta.descuento_total}
                                    onChange={handlerOnChange}
                                    moneda
                                    color={(venta.descuento_total < 0) ? "danger-i" : ""}
                                />
                            </span> */}
                        
                            <span className="center">
                                <p className="mb-5 info">Total</p>
                                <h1 className="success strong">S/. { moneda(venta.total) }</h1>
                            </span>
                            
                        </div>
                        
                        <div className="grid-31 gap10 acciones-venta">
                        
                            <LoadSwitchBtn2
                                loading={loadVenta}
                                className="btn btn-success"
                                handler={() => verificarCaja(handlerVenta)}
                            >
                                <BiCaretRight /> Vender
                            </LoadSwitchBtn2>
                            
                            <button 
                                id="btn-next-page"
                                className="btn btn-primary" 
                                onClick={handlerShowWindow}
                            >
                                <BiRightArrowAlt />
                            </button>
                            <ToolTip
                                anchor="btn-next-page"
                                descripcion="Ir al siguiente paso"
                            /> 

                        </div>
                    </div>
                ) : <TextoRelleno texto="Sin productos" />
            }

            <ModalWrap modal={modalConfirm} >
                <ModalCodigoVenta 
                    modal={modalConfirm}
                    setModal={setModalConfirm}
                    ventaRes={ventaRespuesta}
                />
            </ModalWrap>

        </div>
    )
}
