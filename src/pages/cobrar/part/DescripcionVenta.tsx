import { useEffect, useState } from "react";
import { TablaListaVentaProductos } from "./TablaListaVentaProductos";
import { put } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { ModalVentaConfirmar } from "./modals/ModalVentaConfirmar";
import { ModalVentaRechazar } from "./modals/ModalVentaRechazar";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { clienteInfo } from "../../../resources/dtos/Cliente";
import { BoletaCobrar } from "./comprobante/boleta/BoletaCobrar";
import { FacturaCobrar } from "./comprobante/factura/FacturaCobrar";
import { Checkbox2 } from "../../../components/forms/Checkbox2";
import { RapidaCobrar } from "./comprobante/RapidaCobrar";
import { TabsVenta } from "./otros/TabsVenta";
import { CodigoVenta } from "./otros/CodigoVenta";
import { DividirPagos } from "./DividirPagos";
import { tipoVenta } from "../../../resources/dtos/VentasDto";
import { CreditoAdelanto } from "./creditoAdelanto/CreditoAdelanto";
import { MasAccionesCobrar } from "./otros/MasAccionesCobrar";
import { DescripcionCobrarVenta } from "./otros/DescripcionCobrarVenta";
import { copy } from "../../../resources/func/deepCopy";


interface descripcionVenta {
    data:any;
    handlerRefresh:Function;
}

export const DescripcionVenta = ({ data, handlerRefresh }:descripcionVenta) => {

    const clienteOk:boolean = !!data.clientes;
    // estado del switch
    const stateSwitchChange:boolean = !((data.tipo_venta === tipoVenta.factura && clienteOk) ||
    (data.tipo_venta === tipoVenta.boleta));
    // visivilidad del switch
    const showSwitchChange:boolean = ((data.tipo_venta === tipoVenta.boleta) ||
    (data.tipo_venta === tipoVenta.factura && clienteOk));
    // tabbs por comprobante
    const tabbComprob:number = data.tipo_venta === tipoVenta.venta_rapida ? 1 
    : data.tipo_venta === tipoVenta.boleta ? 2 
    : data.tipo_venta === tipoVenta.factura ? 3 : 4; // 4 es credito y adelanto

    const [venta, setVenta] = useState<any>({...copy(data), totalPagado: 0});
    const [cliente, setCliente] = useState<any>(clienteOk ? data.clientes : clienteInfo);
    const [creditoDetalles, setCreditoDetalles] = useState<Array<any>>([]);

    const tipoDocumUpdate = () => { 
        if (!!cliente) {
            if (!!cliente.tipoDocumento) {
                return cliente.tipoDocumento
            } else {
                return "noDocumento"
            }
        } else {
            return "noDocumento"
        }
    }
    
    const [loadConfirmarVenta, setLoadConfirmarVenta] = useState<boolean>(false);
    const [modalConfVenta, setModalConfVenta] = useState<boolean>(false);
    const [modalRechazVenta, setModalRechazVenta] = useState<boolean>(false);
    const [switchChangeFact, setSwitchChangeFact] = useState<boolean>(stateSwitchChange);
    const [tabbs, setTabbs] = useState<number>(tabbComprob);
    const [listaPrecios, setListaPrecios] = useState<Array<any>>([]);
    const [confirmarVenta, setConfirmarVenta] = useState<boolean>(false);
    const [showFormasPago, setShowFormasPago] = useState<boolean>(false);
    const [switchCredito, setSwitchCredito] = useState<boolean>(false);
    const [comisionTarjeta, setComisionTarjeta] = useState<number>(0);
    const [getCliente, setGetCliente] = useState<any>({documento: "", tipoDocumento: tipoDocumUpdate()});

    const esCredito:boolean = venta.tipo_venta === tipoVenta.credito || venta.tipo_venta === tipoVenta.adelanto;

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
        setCliente(clienteOk ? data.clientes : clienteInfo);
    }, [])
    

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
        }
    }, [venta.forma_pago, showFormasPago])


    const handlerConfirmarVenta = async (estado:string, comprobante:any, envioComprobante:any) => {

        setLoadConfirmarVenta(true);

        let updateVenta:any = {}
        const ventaDet:Array<any> = [];
        const listaLimpia:Array<any> = [];
        const updateComprobante:any = comprobante;
        const updateCliente:any = {
            ...cliente,
            numero_documento: getCliente.documento,
            tipoDocumento: getCliente.tipoDocumento
        };

        // eliminar elementos sin precios
        listaPrecios.forEach((e:any) => {
            if(Number(e.precio_parcial) !== 0){
                listaLimpia.push(e);
            }
        })

        // updateComprobante.clientes = updateCliente;
        delete updateComprobante.clientes;
        delete updateComprobante.comprobante;
        
        updateVenta.estado_venta = estado;
        updateVenta.localId = venta.locales.id;
        updateVenta.forma_pago = listaLimpia.length <= 0 
            ? venta.forma_pago 
            : "dividido";
        updateVenta.tipo_venta = venta.tipo_venta;
        updateVenta.cliente = updateCliente;
        updateVenta.ventaDetalles = ventaDet;
        updateVenta.formasPago = listaLimpia;
        updateVenta.comprobante = updateComprobante;
        updateVenta.envioComprobante = envioComprobante;

        if (esCredito) {
            updateVenta.estado_producto = venta.estado_producto;
            updateVenta.totalPagado = venta.totalPagado;
            updateVenta.creditoDetalles = creditoDetalles;
        } 

        try {
            await put(data.id, updateVenta, VENTAS);
            setLoadConfirmarVenta(false);
        } catch (error) {
            setLoadConfirmarVenta(false);
            console.log(error);
        } finally {
            setGetCliente({ documento: "", tipoDocumento: "noDocumento" })
            setCliente({});
            setCreditoDetalles([]);
            setVenta({...data, totalPagado: 0}); // puede generar problemas al desmontar componente
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
                    showSwitchChange
                    ? <Checkbox2
                        label="Modificar tipo comprobante"
                        name="switchChangeFact"
                        checked={switchChangeFact}
                        handlerCheck={ () => setSwitchChangeFact(!switchChangeFact) }
                    /> : <></>
                }

                <TabsVenta
                    switchChangeFact={switchChangeFact}
                    tabbComprob={tabbComprob}
                    tabbs={tabbs}
                    setTabbs={setTabbs}
                    setCliente={setCliente}
                    data={data}
                    setGetCliente={setGetCliente}
                    tipoDocumUpdate={tipoDocumUpdate}
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
                        // comisionTarjeta={comisionTarjeta}
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
                            venta={venta}
                            setVenta={setVenta}
                            activarConfirmarVenta={activarConfirmarVenta}
                            getCliente={getCliente}
                            setGetCliente={setGetCliente}
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
                            venta={venta}
                            setVenta={setVenta}
                            activarConfirmarVenta={activarConfirmarVenta}
                            getCliente={getCliente}
                            setGetCliente={setGetCliente}
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
                            setCliente={setCliente}
                            setCreditoDetalles={setCreditoDetalles}
                            setListaPrecios={setListaPrecios}
                            showFormasPago={showFormasPago}
                            setGetCliente={setGetCliente}
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
                    creditoDetalles={creditoDetalles}
                />
            </ModalWrap>
            
            <ModalWrap modal={modalRechazVenta} >
                <ModalVentaRechazar
                    modal={modalRechazVenta}
                    setModal={setModalRechazVenta}
                    venta={venta}
                    rechazarVenta={handlerConfirmarVenta}
                    loading={loadConfirmarVenta}
                />
            </ModalWrap>

        </div>
    )
}
