import { useState } from "react";
import { BiCartAlt } from "react-icons/bi";
import { BoletaVenta } from "./factura/BoletaVenta";
import { FacturaVenta } from "./factura/FacturaVenta";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { useCaja } from "../../../hooks/useContext/caja.ts/useCaja";
import { clienteInfo } from "../../../resources/dtos/Cliente";
import { PreciosVenta } from "./verLista/extend/PreciosVenta";
import { TablaLista } from "./verLista/extend/TablaLista";
import { ModalCodigoVenta } from "./verLista/short/ModalCodigoVenta";
import { RapidaVenta } from "./factura/RapidaVenta";
import { Cotizacion } from "./factura/Cotizacion";

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

    const [cliente, setCliente] = useState<any>(clienteInfo);


    // useEffect(() => {
    //     if (listaVenta.length <= 0) {
    //         setShowWindow(1);
    //     }
    // }, [listaVenta])

    const handlerTabb = (tab:number) => { 
        // setCliente("");
        setTabbs(tab);
    }
    
    const handlerOnChange = (e:any) => { 
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        })
    }

    const verificarCaja = (handlerVenta:Function, tipo_venta:string, cotizacion?:boolean) => { 
        caja.handlerEstadoCaja();
        if (cotizacion) {
            handlerVenta(tipo_venta, "cotizacion");
        } else {
            handlerVenta(tipo_venta);
        }
    }


    const verificarVender = ():boolean => { 
        if (listaVenta.length <= 0) {
            return false
        } else {
            return true
        }
    }


    const handlerVenta = async (tipo_venta:string, estado_venta?:string) => {
        setLoadVenta(true);
        try {
            const ventaResp:any = await postVenta(cliente, tipo_venta, estado_venta && estado_venta);
            if (!estado_venta) {
                if (ventaResp.data) {
                    setVentaRespuesta(ventaResp.data);
                    setModalConfirm(true);
                    reinicios2();
                    setLoadVenta(false);
                }    
            } else {
                reinicios2();
                setLoadVenta(false);
                setShowWindow(1);
            }
        } catch (error) {
            setLoadVenta(true);
            console.log(error);
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
                            onClick={() => handlerTabb(1)}
                        ><BiCartAlt/> Venta rapida
                        </button>

                        {/* descomentar luego de habilitar comprobantes */}
                        {/* <button 
                            className={"btn2 btn2-info " + (tabbs === 2 && "btn2-sub-info")}
                            onClick={() => handlerTabb(2)}
                        ><BiSpreadsheet /> Boleta
                        </button>

                        <button 
                            className={"btn2 btn2-info " + (tabbs === 3 && "btn2-sub-info")}
                            onClick={() => handlerTabb(3)}
                        ><BiTask /> Factura
                        </button>

                        <button 
                            className={"btn2 btn2-info " + (tabbs === 4 && "btn2-sub-info")}
                            onClick={() => handlerTabb(4)}
                        ><BiBook /> Cotizacion
                        </button> */}
                    </div>

                    <PreciosVenta
                        venta={venta}
                        alertaDescuento={alertaDescuento}
                        handlerOnChange={handlerOnChange}
                        tabbs={tabbs}
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
                    { 
                        tabbs === 4
                        && (
                            <Cotizacion
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
