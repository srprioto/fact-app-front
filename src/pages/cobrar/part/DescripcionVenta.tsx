import { useEffect, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

// import { Input } from "../../../components/forms/Input";
// import { InputDisable } from "../../../components/forms/InputDisable";
import { ModalNuevoCliente } from "../../../components/modals/ModalNuevoCliente";
import { FormasPagoBotones } from "./formasPago/FormasPagoBotones";
import { FormasPagoTabs } from "./formasPago/FormasPagoTabs";
import { ObservacionesVenta } from "./ObservacionesVenta";
import { TablaListaVentaProductos } from "./TablaListaVentaProductos";

import { put } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { ModalVentaConfirmar } from "./modals/ModalVentaConfirmar";
import { ModalVentaRechazar } from "./modals/ModalVentaRechazar";
import { ModalWrap } from "../../../components/modals/ModalWrap";


interface descripcionVenta {
    data:any
    handlerRefresh:Function;
}

export const DescripcionVenta = ({ data, handlerRefresh }:descripcionVenta) => {

    const [tabbs, setTabbs] = useState<number>(1);

    const [venta, setVenta] = useState<any>(data);
    const [listaRechazados, setListaRechazados] = useState<any>([]);

    const [loadConfirmarVenta, setLoadConfirmarVenta] = useState<boolean>(false);

    const [ModalCliente, setModalCliente] = useState<boolean>(false);
    const [modalConfVenta, setModalConfVenta] = useState<boolean>(false);
    const [modalRechazVenta, setModalRechazVenta] = useState<boolean>(false);

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


    // const handlerChangeVenta = (e:any) => {
    //     setVenta({
    //         ...venta,
    //         [e.target.name]: e.target.value
    //     })
    // }

    
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
    const updateClienteExistente = (cliente:any) => setVenta({ ...venta, clientes: cliente }) // cliente existente

    
    const codigoPago = ():string => { 
        if (tabbs === 1) {
            return "001";
        } else if (tabbs === 2){
            return "002"
        } else if (tabbs === 3){
            return "003"
        }
        return ""
    }


    const handlerConfirmarVenta = async (estado:string) => {

        let updateVenta:any = {}
        const ventaDet:Array<any> = [];
        
        updateVenta.estado_venta = estado;
        updateVenta.descuento_total = venta.descuento_total;
        updateVenta.nombre_cliente = venta.nombre_cliente;
        updateVenta.observaciones = venta.observaciones;
        updateVenta.subtotal = venta.subtotal;
        updateVenta.total = venta.total;

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
            const response = await put(data.id, updateVenta, VENTAS);
            console.log(response);
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
                    <p className="m-0 pr-20">Nro de comprobante: </p>
                    <h1 className="info m-0">{ codigoPago() + "-" +  venta.id}</h1>
                </div>
                
                <TablaListaVentaProductos
                    venta={data}
                    listaRechazados={listaRechazados}
                    handlerCheckbox={handlerCheckbox}
                />

                <ObservacionesVenta observaciones={venta.observaciones} />

                <div className="descripcion-venta grid-1 gap bb bb-neutro">

                    <div className="grid-2 gap">

                        <div className="center">
                            <p className="info">Subtotal</p>
                            <h3 className="success">S/. {venta.subtotal}</h3>
                        </div>

                        <div className="center">
                            <p
                                className="info"
                            >{
                                venta.descuento_total >= 0
                                ? "Incremento total"    
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

                        {/* <InputDisable
                            label="Subtotal"
                            value={venta.subtotal}
                            moneda
                        /> */}
                        {/* <div className="grid-1">
                            <Input
                                label="Inc/Desc total"
                                type="number"
                                name="descuento_total"
                                value={venta.descuento_total}
                                onChange={handlerChangeVenta}
                                color={(venta.descuento_total < 0) ? "danger-i" : ""}
                                moneda
                            />
                            <h5 className="warning m-0 center">Haz un descuento añadiendo una cantidad negativa</h5>
                        </div> */}
                        
                        
                    </div>

                </div>

                <div className="wrap-formas-pago grid-1 gap">
                    
                    <FormasPagoBotones
                        tabbs={tabbs}
                        setTabbs={setTabbs}
                    />

                    <FormasPagoTabs
                        clientesExistente={venta.clientes}
                        clienteRapido={venta.nombre_cliente}
                        tabbs={tabbs}
                        updateCliente={updateClienteExistente}
                        modalCliente={setModalCliente}
                    />

                </div>

                <div className="grid-3 mt-15 bb bb-neutro">
                    <div></div>
                    <span className="center">
                        <p className="info">Total de la venta</p>
                        <h1 className="success strong">S/. { venta.total }</h1>
                    </span>
                    <div></div>    
                </div>

                <div className="wrap-confirmar-venta grid-4 gap mb-25">
                    <div></div>
                    <button 
                        className="btn btn-success"
                        onClick={() => setModalConfVenta(!modalConfVenta)}    
                    ><BiCheck /> Realizar venta</button>
                    <button 
                        className="btn btn-danger"
                        onClick={() => setModalRechazVenta(!modalRechazVenta)}
                    ><BiX /> Rechazar venta</button>
                    <div></div>
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
                    codigoPago={codigoPago}
                    confirmarVenta={handlerConfirmarVenta}
                    loading={loadConfirmarVenta}
                />
            </ModalWrap>
            

            <ModalVentaRechazar
                modal={modalRechazVenta}
                setModal={setModalRechazVenta}
                venta={venta}
                codigoPago={codigoPago}
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