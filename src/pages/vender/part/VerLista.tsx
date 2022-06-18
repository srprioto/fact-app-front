import { useState } from "react";
import { BiCartAlt, BiSpreadsheet, BiTask } from "react-icons/bi";
import { BoletaVenta } from "./factura/BoletaVenta";
import { FacturaVenta } from "./factura/FacturaVenta";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { useCaja } from "../../../hooks/useContext/caja.ts/useCaja";
import { clienteInfo } from "../../../resources/dtos/Cliente";
import { PreciosVenta } from "./verLista/extend/PreciosVenta";
import { TablaLista } from "./verLista/extend/TablaLista";
import { ModalCodigoVenta } from "./verLista/short/ModalCodigoVenta";
import { RapidaVenta } from "./factura/RapidaVenta";

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

    const caja = useCaja();

    const [loadVenta, setLoadVenta] = useState<boolean>(false);
    const [ventaRespuesta, setVentaRespuesta] = useState<any>({});
    const [modalConfirm, setModalConfirm] = useState<boolean>(false);
    const [tabbs, setTabbs] = useState<number>(1);

    const [cliente, setCliente] = useState<any>(clienteInfo(""));


    // useEffect(() => {
    //     if (listaVenta.length <= 0) {
    //         setShowWindow(1);
    //     }
    // }, [listaVenta])
    
    const handlerOnChange = (e:any) => { 
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        })
    }

    const verificarCaja = (func:Function) => { 
        caja.handlerEstadoCaja();
        func();
    }


    const verificarVender = ():boolean => { 
        if (listaVenta.length <= 0) {
            return false
        } else {
            return true
        }
    }


    const handlerVenta = async () => { 
        setLoadVenta(true);
        try {
            const ventaResp:any = await postVenta(cliente);
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
            <div className="box m-0 box-par ver-lista show-right">

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
                    
                    { 
                        tabbs === 1 
                        && (
                            <RapidaVenta
                                loadVenta={loadVenta}
                                setShowWindow={setShowWindow}
                                verificarCaja={verificarCaja}
                                handlerVenta={handlerVenta}
                                verificarVender={verificarVender}
                            />
                        ) 
                    }
                    {
                        tabbs === 2 
                        && (
                            <BoletaVenta 
                                cliente={cliente} 
                                setCliente={setCliente} 
                                loadVenta={loadVenta}
                                setShowWindow={setShowWindow}
                                verificarCaja={verificarCaja}
                                handlerVenta={handlerVenta}
                                verificarVender={verificarVender}
                            />
                        ) 
                    }
                    { 
                        tabbs === 3 
                        && (
                            <FacturaVenta 
                                cliente={cliente} 
                                setCliente={setCliente} 
                                loadVenta={loadVenta}
                                setShowWindow={setShowWindow}
                                verificarCaja={verificarCaja}
                                handlerVenta={handlerVenta}
                                verificarVender={verificarVender}
                            />
                        ) 
                    }
                    
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
