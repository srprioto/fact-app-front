import { useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { TextoRelleno } from "../../../components/TextoRelleno";
import { useCaja } from "../../../hooks/useContext/caja.ts/useCaja";
import { clienteInfo } from "../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../resources/dtos/VentasDto";
import { post } from "../../../resources/fetch";
import { noDecimal } from "../../../resources/func/noDecimal";
import { VENTAS } from "../../../resources/routes";
import { ModalCodigoVenta } from "./verLista/short/ModalCodigoVenta";
import { VerListaShort } from "./verLista/short/VerListaShort";
import { BtnsAnadirProds } from "./verProductos/BtnsAnadirProds";
import { BuscarProducto } from "./verProductos/BuscarProducto";
import { GestionCantidades } from "./verProductos/GestionCantidades";
import { GestionPrecios } from "./verProductos/GestionPrecios";
import { InfoProducto } from "./verProductos/InfoProducto";


interface verProducto {
    setShowWindow:Function;
    classStart:boolean;
    setClassStart:Function;
    setData:Function;
    data:any;
    setElemento:Function;
    elemento:any;
    venta:any
    // setVenta:Function;
    listaVenta:any;
    setlistaVenta:Function;
    listaRepetidos:any;
    setListaRepetidos:Function;
    itemPop:Function;
    postVenta:Function;
    // alertaDescuento:Function;
    ventaDetalle:any
    setVentaDetalle:Function;
    tipoDescuento:boolean;
    setTipoDescuento:Function;
    reinicios2:Function;
    reinicios:Function;
    idLocal:string;
}

export const VerProducto = ({ 
    setShowWindow, 
    classStart, 
    setClassStart, 
    data, 
    setData, 
    elemento, 
    setElemento,
    venta,
    // setVenta,
    listaVenta,
    setlistaVenta,
    listaRepetidos,
    setListaRepetidos,
    itemPop,
    postVenta,
    // alertaDescuento,
    setVentaDetalle,
    ventaDetalle,
    tipoDescuento,
    setTipoDescuento,
    reinicios2,
    reinicios,
    idLocal
}:verProducto) => {

    const caja = useCaja();
    const auth = useAuth();
    
    const [loadVentaRapida, setloadVentaRapida] = useState<boolean>(false);
    const [ventaRespuesta, setVentaRespuesta] = useState<any>({});
    const [modalConfirm, setModalConfirm] = useState<boolean>(false);

    const producto:any = elemento.productos ? elemento.productos : {};

    const handlerShowWindow = () => { 
        setClassStart(true);
        setShowWindow(2)
    }

    const handlerOnChange = (e:any) => { 
        setVentaDetalle({ 
            ...ventaDetalle,
            [e.target.name]: e.target.value
        })
    }

    const handlerOnChangeCantidad = (e:any) => {
        setVentaDetalle({
            ...ventaDetalle,
            [e.target.name]: noDecimal(e.target.value)
        })
    }


    const calcularStock = ():number => { 
        return Number(elemento.cantidad) - Number(ventaDetalle.cantidad_venta)
    }


    const handlerAddListaVenta = () => { 
        // añade con id del producto a lista repes
        setListaRepetidos([ ...listaRepetidos, ventaDetalle.productosId ]); 

        let updateListaDet = listaVenta; // lista de productos
        const updateVentaDetalle:any = ventaDetalle;
        if (tipoDescuento) {
            updateVentaDetalle.descuento = ventaDetalle.descuento * ventaDetalle.cantidad_venta;        
        }
        updateListaDet.push(updateVentaDetalle)
        setlistaVenta([
            ...updateListaDet
        ])

        reinicios();
    }


    const validarAñadir = () => { 
        if (ventaDetalle.cantidad_venta <= 0 || ventaDetalle.precio_parcial <= 0) {
            return false
        } else {
            return true
        }
    }


    const verificarCaja = (func:Function) => { 
        caja.handlerEstadoCaja()
        func()
    }


    const selectProds = () => { 
        if (Object.keys(elemento).length !== 0) {
            return true;
        } else {
            return false;
        }
    }


    const handlerPedidoRapido = async () => { 

        setloadVentaRapida(true);

        const cliente:any = clienteInfo

        let updateListaVenta:Array<any> = [];
        let updateVentaDetalle:any = ventaDetalle;
        if (tipoDescuento) {
            updateVentaDetalle.descuento = Number(Number(ventaDetalle.descuento) * Number(ventaDetalle.cantidad_venta));
        }

        updateListaVenta.push(updateVentaDetalle);

        const updateVenta:any = {
            // serie: "V001",
            tipo_venta: tipoVenta.venta_rapida,
            descuento_total: 0,
            subtotal: ventaDetalle.precio_parcial,
            total: ventaDetalle.precio_parcial,
            observaciones: "",
            estado_venta: "enviado",
            localId: idLocal,
            clienteId: 0,
            usuarioId: auth.userInfo.sub,
            forma_pago: "efectivo",
            codigo_venta: "",
            ventaDetalles: updateListaVenta,
            cliente: cliente
        };
        
        try {
            const ventaResp = await post(updateVenta, VENTAS);
            if (ventaResp.data) {
                setVentaRespuesta(ventaResp.data);
                setModalConfirm(true);
            }            
            setloadVentaRapida(false);
        } catch (error) {
            setloadVentaRapida(true);
            console.log(error);
        } finally{
            reinicios2();
        }
    }


    return (
        <div className={"over-hidden ver-producto" + (classStart ? " show-left" : "")}>
            <div className="grid-31 gap">

                <div className="grid-1 gap box-ver-producto">

                    <BuscarProducto
                        setElemento={setElemento}
                        elemento={elemento}
                        setData={setData}
                        data={data}
                        listaRepetidos={listaRepetidos}
                        idLocal={idLocal}
                    />

                    <div className="box box-par m-0">
                        {
                            selectProds()
                            ? (
                                <>
                                    <div className="grid-1 gap info-producto info-prod-scroll1">
                                        <InfoProducto 
                                            producto={producto}
                                        />
                                        <GestionCantidades 
                                            producto={producto} 
                                            calcularStock={calcularStock}
                                            ventaDetalle={ventaDetalle}
                                            handlerOnChange={handlerOnChangeCantidad} 
                                            idLocal={idLocal}
                                        />
                                        <GestionPrecios
                                            producto={producto}
                                            ventaDetalle={ventaDetalle}
                                            setVentaDetalle={setVentaDetalle}
                                            handlerOnChange={handlerOnChange}
                                            calcularStock={calcularStock}
                                            tipoDescuento={tipoDescuento}
                                            setTipoDescuento={setTipoDescuento}
                                        />
                                    </div>
                                    <BtnsAnadirProds
                                        listaVenta={listaVenta}
                                        validarAñadir={validarAñadir}
                                        loadVentaRapida={loadVentaRapida}
                                        verificarCaja={verificarCaja}
                                        handlerPedidoRapido={handlerPedidoRapido}
                                        handlerAddListaVenta={handlerAddListaVenta}
                                        precioParcial={ventaDetalle.precio_parcial}
                                    />
                                </>
                            ) : (
                                <div className="info-prod-scroll2">
                                    <TextoRelleno texto="Selecciona un producto" />
                                </div>
                            )
                        }

                        
                    </div>
                </div>

                <VerListaShort
                    // setVenta={setVenta}
                    venta={venta}
                    itemPop={itemPop}
                    listaVenta={listaVenta}
                    handlerShowWindow={handlerShowWindow}
                    postVenta={postVenta}
                    reinicios2={reinicios2}
                    // alertaDescuento={alertaDescuento}
                />
                
            </div>

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

