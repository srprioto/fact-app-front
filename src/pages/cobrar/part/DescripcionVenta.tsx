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
    // const correlativo:any = data.correlaivo ? data.correlaivo: {}

    // const tipoSerie = ():number => { 
    //     if (clienteOk) {
    //         if (data.serie === "B003") return 2 
    //         else if (data.serie === "F003") return 3 
    //         else return 1
    //     } else {
    //         return 1
    //     }
    // }
    
    const tipoSerie = ():number => { 
        if (data.tipo_venta === tipoVenta.boleta) return 2 
        else if (data.tipo_venta === tipoVenta.factura) return 3 
        else return 1
        // if (clienteOk) {
        //     if (data.tipo_venta === tipoVenta.boleta) return 2 
        //     else if (data.tipo_venta === tipoVenta.factura) return 3 
        //     else return 1
        // } else {
        //     return 1
        // }
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

    useEffect(() => {
        setVenta({
            ...venta,
            clientes: cliente
        })
    }, [cliente])

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
        
        updateVenta.estado_venta = estado;
        updateVenta.descuento_total = venta.descuento_total;
        updateVenta.codigo_venta = venta.codigo_venta;
        updateVenta.observaciones = venta.observaciones;
        updateVenta.subtotal = venta.subtotal;
        updateVenta.total = venta.total;
        updateVenta.forma_pago = listaPrecios.length <= 0 ? venta.forma_pago : "dividido";
        updateVenta.usuarioId = venta.usuarios.id;
        updateVenta.localId = venta.locales.id;
        updateVenta.tipo_venta = venta.tipo_venta;
        updateVenta.cliente = cliente;
        // updateVenta.serie = venta.serie;
        // updateVenta.cliente = venta.clientes;
        // updateVenta.clienteId = venta.clientes && venta.clientes.id;

        data.ventaDetalles.forEach((e:any) => { // añade listo o rechazado a ventaDetalles
            e.estado_venta_detalle = "listo";
            ventaDet.push(e);
            // if (!(listaRechazados.includes(e.id))) {
            //     e.estado_venta_detalle = "listo"
            //     ventaDet.push(e);
            // } else {
            //     e.estado_venta_detalle = "rechazado"
            //     ventaDet.push(e);
            // }
            // return (null)
        })

        updateVenta.ventaDetalles = ventaDet;
        updateVenta.formasPago = listaPrecios;

        updateVenta.comprobante = comprobante;
        updateVenta.envioComprobante = envioComprobante;

        try {
            // const response = await put(data.id, updateVenta, VENTAS);
            // console.log(response);
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
                            <p className="info mb-10">Total</p>
                            <h1 className="success strong m-0">S/. { moneda(venta.total) }</h1>
                        </span>
                        {
                            !showFormasPago
                            && (
                                // <MetodosPago
                                //     label="Forma de pago"
                                //     name="forma_pago"
                                //     onChange={handlerChangeVenta}
                                //     value={venta.forma_pago}
                                // />
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