import { useEffect, useState } from "react";

import { ObservacionesVenta } from "./ObservacionesVenta";
import { TablaListaVentaProductos } from "./TablaListaVentaProductos";

import { put } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { ModalVentaConfirmar } from "./modals/ModalVentaConfirmar";
import { ModalVentaRechazar } from "./modals/ModalVentaRechazar";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { Select2 } from "../../../components/forms/Select2";
import { clienteInfo } from "../../../resources/dtos/Cliente";
import { BoletaCobrar } from "./factura/BoletaCobrar";
import { FacturaCobrar } from "./factura/FacturaCobrar";
import { Checkbox2 } from "../../../components/forms/Checkbox2";
import { RapidaCobrar } from "./factura/RapidaCobrar";
import { TabsVenta } from "./otros/TabsVenta";
import { moneda } from "../../../resources/func/moneda";
import { CodigoVenta } from "./otros/CodigoVenta";
import { FormasPago } from "./FormasPago";
import { tipoVenta } from "../../../resources/dtos/VentasDto";


interface descripcionVenta {
    data:any
    handlerRefresh:Function;
}

export const DescripcionVenta = ({ data, handlerRefresh }:descripcionVenta) => {

    const clienteOk:boolean = !!data.clientes;
    
    const tipoSerie = ():number => { 
        if (data.tipo_venta === tipoVenta.boleta) return 2 
        else if (data.tipo_venta === tipoVenta.factura) return 3 
        else return 1
    }

    const stateSwitchChange = () => { 
        if (
            (data.tipo_venta === tipoVenta.factura && clienteOk) ||
            (data.tipo_venta === tipoVenta.boleta)
        ) {
            return false;
        } else {
            return true;
        }
    }

    const showSwitchChange = () => { 
        if (
            (data.tipo_venta === tipoVenta.boleta) ||
            (data.tipo_venta === tipoVenta.factura && clienteOk)
        ) {
            return true;
        } else {
            return false;
        }
    }
    
    const [venta, setVenta] = useState<any>(data);
    const [cliente, setCliente] = useState<any>(clienteOk ? data.clientes : clienteInfo);

    const [loadConfirmarVenta, setLoadConfirmarVenta] = useState<boolean>(false);
    const [modalConfVenta, setModalConfVenta] = useState<boolean>(false);
    const [modalRechazVenta, setModalRechazVenta] = useState<boolean>(false);
    
    const [switchChangeFact, setSwitchChangeFact] = useState<boolean>(stateSwitchChange());
    const [tabbs, setTabbs] = useState<number>(tipoSerie());

    const [listaPrecios, setListaPrecios] = useState<Array<any>>([]);
    const [confirmarVenta, setConfirmarVenta] = useState<boolean>(false);
    const [showFormasPago, setShowFormasPago] = useState<boolean>(false);

    const [comisionTarjeta, setComisionTarjeta] = useState<number>(0);

    const listaPagosTarjeta = () => { 
        let itemsTarjeta:Array<any> = [];
        listaPrecios.forEach((e:any) => { 
            if (e.forma_pago === "tarjeta") {
                itemsTarjeta.push(e);
            }
        })
        return itemsTarjeta;
    }


    useEffect(() => {
        setVenta({
            ...venta,
            clientes: cliente
        })
    }, [cliente])


    // formas pago general
    useEffect(() => {
        if (venta.forma_pago === "tarjeta" && showFormasPago === false) {
            const cincoPor:number = Number(venta.total) * 0.05;
            setComisionTarjeta(cincoPor);
        } else {
            setComisionTarjeta(0);
            // setVenta({ ...venta, forma_pago: data.forma_pago })
        }
    }, [venta.forma_pago, showFormasPago])


    const verificarTarjeta = () => { 
        if (
            (venta.forma_pago === "tarjeta" && showFormasPago === false) || 
            listaPagosTarjeta().length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }


    const handlerChangeVenta = (e:any) => {
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        })
    }


    const handlerConfirmarVenta = async (estado:string, comprobante:any, envioComprobante:any) => {

        setLoadConfirmarVenta(true);

        let updateVenta:any = {}
        const ventaDet:Array<any> = [];
        const listaLimpia:Array<any> = [];

        // eliminar elementos con sin precios
        listaPrecios.forEach((e:any) => {
            if(Number(e.precio_parcial) !== 0){
                listaLimpia.push(e);
            }
        })
        
        updateVenta.estado_venta = estado;
        updateVenta.descuento_total = venta.descuento_total;
        updateVenta.codigo_venta = venta.codigo_venta;
        updateVenta.observaciones = venta.observaciones;
        updateVenta.subtotal = venta.subtotal;
        updateVenta.total = venta.total;
        updateVenta.forma_pago = listaLimpia.length <= 0 ? venta.forma_pago : "dividido";
        updateVenta.usuarioId = venta.usuarios.id;
        updateVenta.localId = venta.locales.id;
        updateVenta.tipo_venta = venta.tipo_venta;
        updateVenta.cliente = cliente;

        data.ventaDetalles.forEach((e:any) => { // añade listo o rechazado a ventaDetalles
            e.estado_venta_detalle = "listo";
            ventaDet.push(e);
        })

        updateVenta.ventaDetalles = ventaDet;
        updateVenta.formasPago = listaLimpia;

        updateVenta.comprobante = comprobante;
        updateVenta.envioComprobante = envioComprobante;

        try {
            await put(data.id, updateVenta, VENTAS);
            setLoadConfirmarVenta(false);
        } catch (error) {
            setLoadConfirmarVenta(false);
            console.log(error);
        } finally {
            handlerRefresh();
        }
        
    }


    const activarConfirmarVenta = () => { 
        if (confirmarVenta || !showFormasPago) {
            return true
        } else {
            return false
        }
    }
    
    // console.log(venta);
    // console.log(listaPrecios);

    return (
        <div className="descripcion-venta">
            <div className="grid-1 gap">

                <CodigoVenta codigVenta={venta.codigo_venta} />
                
                <TablaListaVentaProductos venta={data} />

                <TabsVenta
                    switchChangeFact={switchChangeFact}
                    tipoSerie={tipoSerie}
                    tabbs={tabbs}
                    setTabbs={setTabbs}
                />

                <div className="descripcion-venta grid-1 gap bb bb-neutro">

                    <div className="grid-4 gap">

                        <div className="center">
                            <p className="info">Subtotal</p>
                            <h3 className="success">S/. { moneda(venta.subtotal) }</h3>
                        </div>

                        <div className="center">
                            <p className="info">{
                                Number(venta.descuento_total) > 0
                                ? "Incremento total"
                                : Number(venta.descuento_total) === 0
                                ? "Inc/Desc total"
                                : "Descuento total"
                            }</p>
                            <h3 className={
                                Number(venta.descuento_total) < 0
                                ? "danger"
                                : Number(venta.descuento_total) === 0
                                ? "secundary"
                                : "success"
                            }>S/. {moneda(venta.descuento_total)}</h3>
                        </div>

                        <span className="center">
                            <p className={
                                "mb-10 " + (
                                    verificarTarjeta()
                                    ? "warning"
                                    : "info"
                                )
                            }>
                                {
                                    verificarTarjeta()
                                    ? "Total +5% com."
                                    : "Total"
                                }
                            </p>
                            <h1 className={
                                "strong m-0 " + 
                                (
                                    verificarTarjeta()
                                    ? "warning"
                                    : "success"
                                )
                            }>
                                S/. { moneda(Number(venta.total) + comisionTarjeta) }
                            </h1>
                        </span>
                        {
                            !showFormasPago
                            && (
                                <Select2
                                    label="Forma de pago"
                                    name="forma_pago"
                                    onChange={handlerChangeVenta}
                                    value={venta.forma_pago}
                                >
                                    <option value="efectivo">Efectivo</option>
                                    <option value="tarjeta">Tarjeta</option>
                                    <option value="pago_electronico">Pago Electronico</option> 
                                    <option value="deposito">Deposito</option>
                                </Select2>
                            )
                        }

                    </div>

                    <FormasPago 
                        showFormasPago={showFormasPago}
                        setShowFormasPago={setShowFormasPago}
                        venta={venta}
                        setConfirmarVenta={setConfirmarVenta}
                        listaPrecios={listaPrecios}
                        setListaPrecios={setListaPrecios}
                        comisionTarjeta={comisionTarjeta}
                        listaPagosTarjeta={listaPagosTarjeta}
                        setComisionTarjeta={setComisionTarjeta}
                    />

                    {
                        !showFormasPago
                        && <ObservacionesVenta observaciones={venta.observaciones} />
                    }
                    
                </div>

                {/* formas de pago aqui */}

                <div className="tabbs-box m-0">
                    {
                        showSwitchChange()
                        ? <Checkbox2
                            label={switchChangeFact ? "Restablecer tipo comprobante" : "Modificar tipo comprobante"}
                            name="switchChangeFact"
                            checked={switchChangeFact}
                            handlerCheck={ () => setSwitchChangeFact(!switchChangeFact) }
                        /> : <></>
                    }
                    { 
                        tabbs === 1 
                        && <RapidaCobrar
                            setModalConfVenta={setModalConfVenta}
                            modalConfVenta={modalConfVenta}
                            setModalRechazVenta={setModalRechazVenta}
                            modalRechazVenta={modalRechazVenta}
                            venta={venta}
                            setVenta={setVenta}

                            activarConfirmarVenta={activarConfirmarVenta}
                        />
                    }
                    { 
                        tabbs === 2 
                        && <BoletaCobrar
                            switchChange={switchChangeFact}
                            cliente={cliente}
                            setCliente={setCliente}

                            setModalConfVenta={setModalConfVenta}
                            modalConfVenta={modalConfVenta}
                            setModalRechazVenta={setModalRechazVenta}
                            modalRechazVenta={modalRechazVenta}

                            switchChangeFact={switchChangeFact}
                            tabbs={tabbs}
                            setTabbs={setTabbs}
                            tipoSerie={tipoSerie}
                            data={data}

                            venta={venta}
                            setVenta={setVenta}

                            activarConfirmarVenta={activarConfirmarVenta}
                        /> 
                    }
                    {
                        tabbs === 3 
                        && <FacturaCobrar
                            switchChange={switchChangeFact}
                            cliente={cliente}
                            setCliente={setCliente}

                            setModalConfVenta={setModalConfVenta}
                            modalConfVenta={modalConfVenta}
                            setModalRechazVenta={setModalRechazVenta}
                            modalRechazVenta={modalRechazVenta}

                            switchChangeFact={switchChangeFact}
                            tabbs={tabbs}
                            setTabbs={setTabbs}
                            tipoSerie={tipoSerie}
                            data={data}

                            venta={venta}
                            setVenta={setVenta}

                            activarConfirmarVenta={activarConfirmarVenta}
                        />
                    }
                </div>
            </div>

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
            
            <ModalWrap modal={modalRechazVenta} >
                <ModalVentaRechazar
                    modal={modalRechazVenta}
                    setModal={setModalRechazVenta}
                    venta={venta}
                    // codigoPago={codigoPago}
                    rechazarVenta={handlerConfirmarVenta}
                    loading={loadConfirmarVenta}
                />
            </ModalWrap>

        </div>
    )
}

// const [listaRechazados, setListaRechazados] = useState<any>([]);
// const [ModalCliente, setModalCliente] = useState<boolean>(false);


// useEffect(() => { 
//     let ventaDetails:any = []; // añadir lista detalles
//     data.ventaDetalles.map((e:any) => { 
//         if (!(listaRechazados.includes(e.id))) {
//             ventaDetails.push(e);
//         }
//         return (null)
//     })

//     const sumaSubtotal = venta.ventaDetalles // calcular subtotal
//     .map((e:any) => e.precio_parcial)
//     .reduce((prev:number, curr:number) => prev + curr, 0);
    
//     setVenta({ 
//         ...venta, 
//         subtotal: sumaSubtotal,
//         ventaDetalles: ventaDetails
//     });

// }, [venta.ventaDetalles, listaRechazados])


// useEffect(() => { // calcular total
//     setVenta({
//         ...venta,
//         total: (venta.subtotal + (Number(venta.descuento_total)))
//     })
// }, [venta.subtotal, venta.descuento_total])


// useEffect(() => {
//     if (!switchChangeFact) {
//         setTabbs(tipoSerie())
//         setCliente(data.clientes)
//     } else {
//         setCliente(clienteInfo(""))
//     }
// }, [switchChangeFact, tabbs])


// const handlerCheckbox = (e:any) => {
//     let updatedList = [ ...listaRechazados ];
//     if (e.target.checked) {
//         updatedList = [ ...listaRechazados, Number(e.target.value)];
//     } else {
//         updatedList.splice(listaRechazados.indexOf(e.target.value), 1);
//     }
//     setListaRechazados(updatedList);
// }


// const handlerCliente = (cliente:any) => setVenta({ ...venta, clientes: cliente}) // cliente nuevo

// <MetodosPago
//     label="Forma de pago"
//     name="forma_pago"
//     onChange={handlerChangeVenta}
//     value={venta.forma_pago}
// />


// useEffect(() => {
//     if (venta.forma_pago === "tarjeta" && showFormasPago === false) {
//         const cincoPor:number = Number(venta.total) * 0.05;
//         const descuentoTotal:number = Number(venta.descuento_total) + cincoPor
//         const total:number = Number(venta.subtotal) + Number(descuentoTotal)
//         setVenta({
//             ...venta,
//             descuento_total: descuentoTotal,
//             total: total
//         })
//     } else {
//         setVenta({
//             ...venta,
//             descuento_total: data.descuento_total,
//             total: data.total,
//             forma_pago: data.forma_pago
//         })
//     }
// }, [venta.forma_pago, showFormasPago])


// formas pago divididos
// useEffect(() => {
//     const listaTarjeta: Array<any> = listaPagosTarjeta();
//     if (listaTarjeta.length > 0 && showFormasPago === true) {
//         let cincoPor:number = 0;
//         listaTarjeta.forEach((e:any) => {
//             cincoPor = cincoPor + (Number(e.precio_parcial) * 0.05);
//         })
//         setComisionTarjeta(cincoPor);
//     } else {
//         setComisionTarjeta(0);
//     }

// }, [listaPrecios, showFormasPago])


// console.log(comisionTarjeta);    