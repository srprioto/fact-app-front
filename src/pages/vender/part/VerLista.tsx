import { useState } from "react";
import { BiArrowBack, BiCaretRight, BiCartAlt, BiSpreadsheet, BiTask } from "react-icons/bi";
import { LoadSwitchBtn2 } from "../../../components/btns/LoadSwitchBtn2";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { PreciosVenta } from "./verLista/extend/PreciosVenta";
import { TablaLista } from "./verLista/extend/TablaLista";
import { ModalCodigoVenta } from "./verLista/short/ModalCodigoVenta";

export const VerLista = ({ 
    setShowWindow, 
    listaVenta, 
    itemPop, 
    venta, 
    setVenta,
    alertaDescuento,
    postVenta,
    reinicios2
}:any) => {

    const [loadVenta, setLoadVenta] = useState<boolean>(false);

    const [ventaRespuesta, setVentaRespuesta] = useState<any>({});
    const [modalConfirm, setModalConfirm] = useState<boolean>(false);

    const [tabbs, setTabbs] = useState<number>(1);

    const handlerOnChange = (e:any) => { 
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        })
    }

    const handlerVenta = async () => { 
        setLoadVenta(true);
        try {
            const ventaResp:any = await postVenta();
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
        <div className="over-hidden">
            <div className="box m-0 ver-lista show-right">

                <div className="box-venta-large">
            
                    <TablaLista
                        listaVenta={listaVenta}
                        itemPop={itemPop}
                    />

                    <div className="tabbs-buttons tabbs grid-5 gap mb-25">
                        <button 
                            className={"btn2 btn2-success " + (tabbs === 1 && "btn2-sub-success")}
                            onClick={() => setTabbs(1)}
                        >
                            <BiCartAlt
                            /> Venta rapida
                        </button>

                        <button 
                            className={"btn2 btn2-info " + (tabbs === 2 && "btn2-sub-info")}
                            onClick={() => setTabbs(2)}
                        >
                            <BiSpreadsheet /> Boleta
                        </button>

                        <button 
                            className={"btn2 btn2-info " + (tabbs === 3 && "btn2-sub-info")}
                            onClick={() => setTabbs(3)}
                        >
                            <BiTask /> Factura
                        </button>
                    </div>

                    <PreciosVenta
                        venta={venta}
                        alertaDescuento={alertaDescuento}
                        handlerOnChange={handlerOnChange}
                    />

                    <div className="tabbs-box box box-par m-0">
                        { tabbs === 1 && <div className="venta-rapida"></div> }
                        { tabbs === 2 && <div className="boleta"><h2>Boleta</h2></div> }
                        { tabbs === 3 && <div className="factura"><h2>Factura</h2></div> }
                    </div>

                </div>

                <div className="pt-20 m-0 grid-3 gap acciones-venta">

                    <div className="grid-6">
                        <button className="btn btn-primary" onClick={() => setShowWindow(1)}>
                            {/* <BiRightArrowAlt /> */}
                            <BiArrowBack />
                        </button>
                    </div>
                    <LoadSwitchBtn2
                        loading={loadVenta}
                        className="btn btn-success"
                        handler={() => handlerVenta()}
                    >
                        <BiCaretRight /> Vender
                    </LoadSwitchBtn2>                  
                    
                </div>
                
            </div>

            <ModalWrap modal={modalConfirm} >
                <ModalCodigoVenta 
                    modal={modalConfirm}
                    setModal={setModalConfirm}
                    ventaRes={ventaRespuesta}
                    setShowWindow={setShowWindow}
                />
            </ModalWrap>

        </div>
    )
}
