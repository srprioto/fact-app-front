import { useEffect, useState } from "react";
import { BiCaretRight, BiCartAlt, BiSpreadsheet, BiTask, BiX } from "react-icons/bi";

import { ModalNuevoCliente } from "../../../components/modals/ModalNuevoCliente";
import { ObservacionesVenta } from "./ObservacionesVenta";
import { TablaListaVentaProductos } from "./TablaListaVentaProductos";

import { put } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { ModalVentaConfirmar } from "./modals/ModalVentaConfirmar";
import { ModalVentaRechazar } from "./modals/ModalVentaRechazar";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { Select2 } from "../../../components/forms/Select2";


interface descripcionVenta {
    data:any
    handlerRefresh:Function;
}

export const DescripcionVenta = ({ data, handlerRefresh }:descripcionVenta) => {

    const [venta, setVenta] = useState<any>(data);
    const [listaRechazados, setListaRechazados] = useState<any>([]);

    const [loadConfirmarVenta, setLoadConfirmarVenta] = useState<boolean>(false);

    const [ModalCliente, setModalCliente] = useState<boolean>(false);
    const [modalConfVenta, setModalConfVenta] = useState<boolean>(false);
    const [modalRechazVenta, setModalRechazVenta] = useState<boolean>(false);

    const [tabbs, setTabbs] = useState<number>(1);

    useEffect(() => { 
        let ventaDetails:any = []; // añadir lista detalles
        data.ventaDetalles.map((e:any) => { 
            if (!(listaRechazados.includes(e.id))) {
                ventaDetails.push(e);
            }
            return (null)
        })

        const sumaSubtotal = venta.ventaDetalles // calcular subtotal
        .map((e:any) => e.precio_parcial)
        .reduce((prev:number, curr:number) => prev + curr, 0);
        
        setVenta({ 
            ...venta, 
            subtotal: sumaSubtotal,
            ventaDetalles: ventaDetails
        });

    }, [venta.ventaDetalles, listaRechazados])


    useEffect(() => { // calcular total
        setVenta({
            ...venta,
            total: (venta.subtotal + (Number(venta.descuento_total)))
        })
    }, [venta.subtotal, venta.descuento_total])


    const handlerChangeVenta = (e:any) => {
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        })
    }

    
    const handlerCheckbox = (e:any) => {
        let updatedList = [ ...listaRechazados ];
        if (e.target.checked) {
            updatedList = [ ...listaRechazados, Number(e.target.value)];
        } else {
            updatedList.splice(listaRechazados.indexOf(e.target.value), 1);
        }
        setListaRechazados(updatedList);
    }

    
    const handlerCliente = (cliente:any) => setVenta({ ...venta, clientes: cliente}) // cliente nuevo
    // const updateClienteExistente = (cliente:any) => setVenta({ ...venta, clientes: cliente }) // cliente existente

    
    // const codigoPago = ():string => { 
    //     if (tabbs === 1) {
    //         return "001";
    //     } else if (tabbs === 2){
    //         return "002"
    //     } else if (tabbs === 3){
    //         return "003"
    //     }
    //     return ""
    // }


    const handlerConfirmarVenta = async (estado:string) => {

        let updateVenta:any = {}
        const ventaDet:Array<any> = [];
        
        updateVenta.estado_venta = estado;
        updateVenta.descuento_total = venta.descuento_total;
        updateVenta.codigo_venta = venta.codigo_venta;
        updateVenta.observaciones = venta.observaciones;
        updateVenta.subtotal = venta.subtotal;
        updateVenta.total = venta.total;
        updateVenta.forma_pago = venta.forma_pago;

        updateVenta.cliente = venta.clientes;
        updateVenta.clienteId = venta.clientes && venta.clientes.id;
        updateVenta.usuarioId = venta.usuarios.id;
        updateVenta.localId = venta.locales.id;

        data.ventaDetalles.map((e:any) => { // añade listo o rechazado a ventaDetalles
            if (!(listaRechazados.includes(e.id))) {
                e.estado_venta_detalle = "listo"
                ventaDet.push(e);
            } else {
                e.estado_venta_detalle = "rechazado"
                ventaDet.push(e);
            }
            return (null)
        })

        updateVenta.ventaDetalles = ventaDet;

        setLoadConfirmarVenta(true);
        try {
            await put(data.id, updateVenta, VENTAS);
            // console.log(response);
            setLoadConfirmarVenta(false);
        } catch (error) {
            setLoadConfirmarVenta(true);
            console.log(error);
        } finally {
            handlerRefresh();
        }
    }


    return (
        <div className="descripcion-venta">
            <div className="grid-1 gap">

                <div className="middle bb bb-neutro">
                    <p className="m-0 pr-20">Codigo de venta: </p>
                    <h1 className="info m-0">{ venta.codigo_venta }</h1>
                </div>
                
                <TablaListaVentaProductos
                    venta={data}
                    listaRechazados={listaRechazados}
                    handlerCheckbox={handlerCheckbox}
                />

                <div className="tabbs-buttons tabbs grid-3 gap mb-25">
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

                <div className="descripcion-venta grid-1 gap bb bb-neutro">

                    <div className="grid-3 gap">

                        <div className="center">
                            <p className="info">Subtotal</p>
                            <h3 className="success">S/. {venta.subtotal}</h3>
                        </div>

                        <div className="center">
                            <p
                                className="info"
                            >{
                                venta.descuento_total > 0
                                ? "Incremento total"    
                                : venta.descuento_total === 0
                                ? "Inc/Desc total"
                                : "Descuento total"
                            }</p>
                            <h3 className={
                                venta.descuento_total < 0
                                ? "danger"
                                : venta.descuento_total === 0
                                ? "secundary"
                                : "success"
                            }>S/. {venta.descuento_total}</h3>
                        </div>

                        <span className="center">
                            <p className="info">Total de la venta</p>
                            <h1 className="success strong">S/. { venta.total }</h1>
                        </span>

                    </div>

                    <div className="grid-3 gap mb-15">

                        <Select2
                            label="Forma de pago"
                            name="forma_pago"
                            onChange={handlerChangeVenta}
                            value={venta.forma_pago}
                        >
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="yape">Yape</option>                                
                        </Select2>

                        <ObservacionesVenta observaciones={venta.observaciones} />

                        <div className="center">
                            <p className="mb-10 info">Vendedor: </p>
                            <p className="mb-10">{ venta.usuarios ? venta.usuarios.nombre : "" }</p>
                        </div>
                       

                    </div>

                </div>

                
                {/* formas de pago aqui */}

                <div className="tabbs-box m-0">
                    { tabbs === 1 && <></> }
                    { tabbs === 2 && <div className="boleta"><h2>Boleta</h2></div> }
                    { tabbs === 3 && <div className="factura"><h2>Factura</h2></div> }
                </div>

                {/* fin formas de pago */}


                <div className="wrap-confirmar-venta grid-3 gap mb-25">
                    <button 
                        className="btn btn-success"
                        onClick={() => setModalConfVenta(!modalConfVenta)}    
                    ><BiCaretRight /> Confirmar venta</button>
                    <div></div>
                    <button 
                        className="btn btn-danger"
                        onClick={() => setModalRechazVenta(!modalRechazVenta)}
                    ><BiX /> Rechazar venta</button>
                </div>

            </div>

            <ModalNuevoCliente
                modal={ModalCliente}
                setModal={setModalCliente}
                handlerCliente={handlerCliente}
            />
            
            <ModalWrap modal={modalConfVenta} >
                <ModalVentaConfirmar
                    modal={modalConfVenta}
                    setModal={setModalConfVenta}
                    dataVenta={venta}
                    // codigoPago={codigoPago}
                    confirmarVenta={handlerConfirmarVenta}
                    loading={loadConfirmarVenta}
                />
            </ModalWrap>
            
            <ModalVentaRechazar
                modal={modalRechazVenta}
                setModal={setModalRechazVenta}
                venta={venta}
                // codigoPago={codigoPago}
                rechazarVenta={handlerConfirmarVenta}
                loading={loadConfirmarVenta}
            />

        </div>
    )
}


/* <div className="desc-formas-pago">
                            
    <div className={"nota-venta " + (tabbs === 1 ? "tabb-enable" : "tabb-disable")}>
        <h1>nota de venta</h1>
    </div>

    <div className={"boleta " + (tabbs === 2 ? "tabb-enable" : "tabb-disable")}>
        <h1>boleta</h1>
    </div>

    <div className={"factura " + (tabbs === 3 ? "tabb-enable" : "tabb-disable")}>
        <h1>factura</h1>
    </div>

</div> */