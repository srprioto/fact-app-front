import { useEffect, useState } from "react";
import { TablaListaVentaProductos } from "./TablaListaVentaProductos";
import { put } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { ModalVentaConfirmar } from "./modals/ModalVentaConfirmar";
import { ModalVentaRechazar } from "./modals/ModalVentaRechazar";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { clienteInfo } from "../../../resources/dtos/Cliente";
import { BoletaCobrar } from "./factura/BoletaCobrar";
import { FacturaCobrar } from "./factura/FacturaCobrar";
import { Checkbox2 } from "../../../components/forms/Checkbox2";
import { RapidaCobrar } from "./factura/RapidaCobrar";
import { TabsVenta } from "./otros/TabsVenta";
import { CodigoVenta } from "./otros/CodigoVenta";
import { DividirPagos } from "./DividirPagos";
import { tipoVenta } from "../../../resources/dtos/VentasDto";
import { CreditoAdelanto } from "./creditoAdelanto/CreditoAdelanto";
import { MasAccionesCobrar } from "./otros/MasAccionesCobrar";
import { DescripcionCobrarVenta } from "./otros/DescripcionCobrarVenta";


interface descripcionVenta {
    data:any;
    handlerRefresh:Function;
}

export const DescripcionVenta = ({ data, handlerRefresh }:descripcionVenta) => {

    const clienteOk:boolean = !!data.clientes;
    
    const tipoSerie = ():number => {
        let nroTabb:number = 1;
        switch (data.tipo_venta) {
            case tipoVenta.venta_rapida:
                nroTabb = 1;
                break;
            case tipoVenta.boleta:
                nroTabb = 2;
                break;
            case tipoVenta.factura:
                nroTabb = 3;
                break;
            case tipoVenta.credito:
                nroTabb = 4;
                break;
            case tipoVenta.adelanto:
                nroTabb = 4;
                break;
        }
        // if (data.tipo_venta === tipoVenta.boleta) return 2 
        // else if (data.tipo_venta === tipoVenta.factura) return 3 
        // else return 1
        return nroTabb;
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
    
    // const [venta, setVenta] = useState<any>(data);
    const [venta, setVenta] = useState<any>({...data, totalPagado: 0});
    const [cliente, setCliente] = useState<any>(clienteOk ? data.clientes : clienteInfo);

    const [loadConfirmarVenta, setLoadConfirmarVenta] = useState<boolean>(false);
    const [modalConfVenta, setModalConfVenta] = useState<boolean>(false);
    const [modalRechazVenta, setModalRechazVenta] = useState<boolean>(false);
    
    const [switchChangeFact, setSwitchChangeFact] = useState<boolean>(stateSwitchChange());
    const [tabbs, setTabbs] = useState<number>(tipoSerie());
    
    const [listaPrecios, setListaPrecios] = useState<Array<any>>([]);
    const [confirmarVenta, setConfirmarVenta] = useState<boolean>(false);
    const [showFormasPago, setShowFormasPago] = useState<boolean>(false);
    const [switchCredito, setSwitchCredito] = useState<boolean>(false);

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
        updateVenta.forma_pago = listaLimpia.length <= 0 
            ? venta.forma_pago 
            : "dividido";
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

        if (venta.tipo_venta === tipoVenta.credito || venta.tipo_venta === tipoVenta.credito) {
            updateVenta.estado_producto = venta.estado_producto;
            updateVenta.totalPagado = venta.totalPagado;
            updateVenta.credito = venta.credito;
        }

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
    

    return (
        <div className="descripcion-venta">
            <div className="grid-1 gap">

                <CodigoVenta codigVenta={venta.codigo_venta} observaciones={venta.observaciones} />
                
                <TablaListaVentaProductos venta={data} />

                {
                    showSwitchChange()
                    ? <Checkbox2
                        label="Modificar tipo comprobante"
                        name="switchChangeFact"
                        checked={switchChangeFact}
                        handlerCheck={ () => setSwitchChangeFact(!switchChangeFact) }
                    /> : <></>
                }

                <TabsVenta
                    switchChangeFact={switchChangeFact}
                    tipoSerie={tipoSerie}
                    tabbs={tabbs}
                    setTabbs={setTabbs}
                />

                <div className="descripcion-venta grid-1 gap">

                    <DescripcionCobrarVenta
                        venta={venta}
                        setVenta={setVenta}
                        listaPagosTarjeta={listaPagosTarjeta}
                        showFormasPago={showFormasPago}
                        comisionTarjeta={comisionTarjeta}
                        tabbs={tabbs}
                    />

                    <MasAccionesCobrar
                        venta={venta}
                        setListaPrecios={setListaPrecios}
                        showFormasPago={showFormasPago}
                        setShowFormasPago={setShowFormasPago}
                        switchCredito={switchCredito}
                        setSwitchCredito={setSwitchCredito}
                    />

                    <DividirPagos
                        showFormasPago={showFormasPago}
                        venta={venta}
                        setConfirmarVenta={setConfirmarVenta}
                        listaPrecios={listaPrecios}
                        setListaPrecios={setListaPrecios}
                        comisionTarjeta={comisionTarjeta}
                        listaPagosTarjeta={listaPagosTarjeta}
                        setComisionTarjeta={setComisionTarjeta}
                    />
                    
                </div>

                <div className="tabbs-box m-0">
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
                    {
                        tabbs === 4
                        && <CreditoAdelanto
                            venta={venta}
                            setVenta={setVenta}
                            modalRechazVenta={modalRechazVenta}
                            setModalRechazVenta={setModalRechazVenta}
                            modalConfVenta={modalConfVenta}
                            setModalConfVenta={setModalConfVenta}
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
                    confirmarVenta={handlerConfirmarVenta}
                    loading={loadConfirmarVenta}
                    comisionTarjeta={comisionTarjeta}
                    listaPrecios={listaPrecios}
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