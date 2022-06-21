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
import { clienteInfo } from "../../../resources/dtos/Cliente";
import { BoletaCobrar } from "./factura/BoletaCobrar";
import { FacturaCobrar } from "./factura/FacturaCobrar";
import { Checkbox2 } from "../../../components/forms/Checkbox2";
import { RapidaCobrar } from "./factura/RapidaCobrar";


interface descripcionVenta {
    data:any
    handlerRefresh:Function;
}

export const DescripcionVenta = ({ data, handlerRefresh }:descripcionVenta) => {

    const clienteOk:boolean = !!data.clientes;

    const tipoSerie = ():number => { 
        if (clienteOk) {
            if (data.clientes.serie_documento === "B001") {
                return 2
            } else if (data.clientes.serie_documento === "F001") {
                return 3
            } else {
                return 1
            }
        } else {
            return 1
        }
    }
    
    const [venta, setVenta] = useState<any>(data);
    const [cliente, setCliente] = useState<any>(clienteOk ? data.clientes : clienteInfo(""));
    const [listaRechazados, setListaRechazados] = useState<any>([]);

    const [loadConfirmarVenta, setLoadConfirmarVenta] = useState<boolean>(false);

    const [ModalCliente, setModalCliente] = useState<boolean>(false);
    const [modalConfVenta, setModalConfVenta] = useState<boolean>(false);
    const [modalRechazVenta, setModalRechazVenta] = useState<boolean>(false);

    const [switchChangeFact, setSwitchChangeFact] = useState<boolean>(clienteOk ? false : true);
    const [tabbs, setTabbs] = useState<number>(tipoSerie());

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


    useEffect(() => {
        if (!switchChangeFact) {
            setTabbs(tipoSerie())
            setCliente(data.clientes)
        } else {
            setCliente(clienteInfo(""))
        }
    }, [switchChangeFact, tabbs])


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


    const handlerConfirmarVenta = async (estado:string) => {

        setLoadConfirmarVenta(true);

        let updateVenta:any = {}
        const ventaDet:Array<any> = [];
        
        updateVenta.estado_venta = estado;
        updateVenta.descuento_total = venta.descuento_total;
        updateVenta.codigo_venta = venta.codigo_venta;
        updateVenta.observaciones = venta.observaciones;
        updateVenta.subtotal = venta.subtotal;
        updateVenta.total = venta.total;
        updateVenta.forma_pago = venta.forma_pago;
        updateVenta.usuarioId = venta.usuarios.id;
        updateVenta.localId = venta.locales.id;
        updateVenta.cliente = cliente;
        // updateVenta.cliente = venta.clientes;
        // updateVenta.clienteId = venta.clientes && venta.clientes.id;

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

                <div className="tabbs-buttons tabbs grid-4 gap mb-25">
                    <button 
                        className={
                            "btn2 btn2-success " + 
                            (!switchChangeFact ? ( tipoSerie() === 1 ? "" : "btn2-disable " ) : "") +
                            (tabbs === 1 && "btn2-sub-success")
                        }
                        
                        onClick={() => {switchChangeFact && setTabbs(1)}}
                    ><BiCartAlt/> Venta rapida
                    </button>

                    <button
                        className={
                            "btn2 btn2-info " + 
                            (!switchChangeFact ? ( tipoSerie() === 2 ? "" : "btn2-disable " ) : "") +
                            (tabbs === 2 && "btn2-sub-info")
                        }
                        onClick={() => {switchChangeFact && setTabbs(2)}}
                    ><BiSpreadsheet /> Boleta
                    </button>

                    <button 
                        className={
                            "btn2 btn2-info " + 
                            (!switchChangeFact ? ( tipoSerie() === 3 ? "" : "btn2-disable " ) : "") +
                            (tabbs === 3 && "btn2-sub-info")
                        }
                        onClick={() => {switchChangeFact && setTabbs(3)}}
                    ><BiTask /> Factura
                    </button>
                </div>

                <div className="descripcion-venta grid-1 gap bb bb-neutro">

                    <div className="grid-3 gap">

                        <div className="center">
                            <p className="info">Subtotal</p>
                            <h3 className="success">S/. {venta.subtotal}</h3>
                        </div>

                        <div className="center">
                            <p className="info">{
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
                    {
                        clienteOk
                        ? <Checkbox2
                            label={switchChangeFact ? "Restablecer tipo comprobante" : "Modificar tipo comprobante"}
                            name="igv"
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

                            // switchChangeFact={switchChangeFact}
                            // tabbs={tabbs}
                            // setTabbs={setTabbs}
                            // tipoSerie={tipoSerie}
                            // data={data}
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

                            // switchChangeFact={switchChangeFact}
                            // tabbs={tabbs}
                            // setTabbs={setTabbs}
                            // tipoSerie={tipoSerie}
                            // data={data}
                        />
                    }
                </div>

                {/* fin formas de pago */}
                {/* <div className="wrap-confirmar-venta grid-3 gap mb-25">
                    <button
                        className="btn btn-success"
                        onClick={() => setModalConfVenta(!modalConfVenta)}    
                    ><BiCaretRight /> Confirmar venta</button>
                    <div></div>
                    <button 
                        className="btn btn-danger"
                        onClick={() => setModalRechazVenta(!modalRechazVenta)}
                    ><BiX /> Rechazar venta</button>
                </div> */}

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