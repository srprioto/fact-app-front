import { useEffect, useState } from "react";
import { Loading } from "../../../../../../components/loads/Loading";
import { Modal } from "../../../../../../components/modals/Modal";
import { ModalWrap } from "../../../../../../components/modals/ModalWrap";
import { clienteInfo } from "../../../../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../../../../resources/dtos/VentasDto";
import { getOne, put } from "../../../../../../resources/fetch";
import { VENTAS } from "../../../../../../resources/routes";
import { ModalVerComprobante } from "../../../comprobantes/modals/ModalVerComprobante";
import { InfoCliente } from "../../InfoCliente";
import { ModalVentaDetalles } from "../ModalVentaDetalles";
import { ConfirmCreditoAdelanto } from "./ConfirmCreditoAdelanto";
import { GestionCreditoAdelanto } from "./GestionCreditoAdelanto";
import { TablaInfoCredito } from "./TablaInfoCredito";

interface modalCredito {
    modal:boolean;
    setModal:Function;
    idVenta:number;
    getData:Function;
    localId:string;
}

export const ModalCredito = ({ modal, setModal, idVenta, getData, localId }:modalCredito) => {
    
    const getCli:any = { documento: "", tipoDocumento: "" }

    const [loading, setLoading] = useState<boolean>(false);
    const [venta, setVenta] = useState<any>({});
    const [resto, setResto] = useState<any>({});

    const [modalVenta, setModalVenta] = useState<boolean>(false);
    const [modalComponente, setModalComponente] = useState<boolean>(false);

    const [selectTipoComp, setSelectTipoComp] = useState<string>(tipoVenta.venta_rapida);
    const [clienteConv, setClienteConv] = useState<any>(clienteInfo);
    const [getCliente, setGetCliente] = useState<any>(getCli);


    const codigoVenta:string = venta.id + "-" + venta.codigo_venta;
    const cantidadRestante:number = Number(venta.total) - Number(venta.totalPagado);


    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
        setLoading(true);
        try {
            const dataOne = await getOne(idVenta, VENTAS);
            setVenta(dataOne);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    const confirmarVenta = async () => { 
        setLoading(true);

        const updateCliente:any = clienteConv;
        updateCliente.numero_documento = getCliente.documento;
        updateCliente.tipoDocumento = getCliente.tipoDocumento;

        const updateVenta:any = { tipo_venta: selectTipoComp, cliente: updateCliente };

        try {
            const resto:any = await put(venta.id, updateVenta, VENTAS + "/cambiar_tipo_venta");
            if (resto.success) {
                setResto(resto);
                if (resto.tipo_venta === tipoVenta.venta_rapida) {
                    setModalVenta(true);
                } else if (resto.tipo_venta === tipoVenta.boleta || resto.tipo_venta === tipoVenta.factura) {
                    setModalComponente(true);
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        } 
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            width={85}
            btnClose={getData}
        >
            <h2 className="center m-0">Gestion de {venta.tipo_venta} de la venta</h2>
            <h3 className="info center mb-15">Codigo de venta: { codigoVenta }</h3>

            <div className="grid-1 gap modal-credito">

                {
                    (cantidadRestante <= 0 && venta.estado_producto)
                    ? (
                        // si el credito esta cancelado
                        <ConfirmCreditoAdelanto 
                            venta={venta} 
                            cantidadRestante={cantidadRestante} 
                            loading={loading}

                            clienteConv={clienteConv}
                            setClienteConv={setClienteConv}
                            getCliente={getCliente}
                            setGetCliente={setGetCliente}
                            loadingPost={loading}
                            enviarVenta={confirmarVenta}
                            selectTipoComp={selectTipoComp}
                            setSelectTipoComp={setSelectTipoComp}
                        />
                    ) : (
                        // si el credito esta activo
                        <>
                            <GestionCreditoAdelanto 
                                venta={venta} 
                                getDataOne={getDataOne}
                                localId={localId}
                                cantidadRestante={cantidadRestante}
                                loading={loading}
                                setLoading={setLoading}
                            />
                            {
                                loading
                                ? <Loading />
                                : <>
                                    
                                    <TablaInfoCredito
                                        venta={venta}
                                        cantidadRestante={cantidadRestante}
                                    />

                                    {
                                        venta.clientes
                                        && (
                                            <InfoCliente cliente={venta.clientes} />
                                        )
                                    }
                                        
                                </>
                            }

                        </>
                    )
                }
            </div>

            
            {
                resto.success && !loading
                && (selectTipoComp === tipoVenta.boleta || selectTipoComp === tipoVenta.factura)
                ? <ModalWrap modal={modalComponente}>
                    <ModalVerComprobante
                        modal={modalComponente}
                        setModal={setModalComponente}
                        idComprobante={resto.id}
                        btnClose={() => {
                            getData();
                            setModal(false); 
                        }}
                    />
                </ModalWrap>
                : <ModalWrap modal={modalVenta}>
                    <ModalVentaDetalles
                        modal={modalVenta}
                        setModal={setModalVenta}
                        idVenta={idVenta}
                        btnClose={() => {
                            getData();
                            setModal(false); 
                        }}
                    />
                </ModalWrap>
                
            }


        </Modal>
    )
}
