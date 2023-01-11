import { useEffect, useState } from "react";
import { RadioButton2 } from "../../../../../../components/forms/RadioButton2";
import { Modal } from "../../../../../../components/modals/Modal"
import { ModalWrap } from "../../../../../../components/modals/ModalWrap";
import { TextoRelleno } from "../../../../../../components/TextoRelleno";
import { clienteInfo } from "../../../../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../../../../resources/dtos/VentasDto";
import { put } from "../../../../../../resources/fetch";
import { VENTAS } from "../../../../../../resources/routes";
import { ConvertirBoleta } from "./boleta/ConvertirBoleta";
import { ConvertirFactura } from "./factura/ConvertirFactura";

import { ModalVentaDetalles } from "../ModalVentaDetalles";
import { ModalVerComprobante } from "../../../comprobantes/modals/ModalVerComprobante";

interface modalConvertirComp {
    modal:boolean;
    setModal:Function;
    idVenta:number;
    getData?:Function;
    inModal?:boolean;
}

export const ModalConvertirComp = ({ modal, setModal, idVenta, getData, inModal }:modalConvertirComp) => {

    const getCli:any = { documento: "", tipoDocumento: "" }

    const [selectTipoComp, setSelectTipoComp] = useState<string>(""); // select
    const [clienteConv, setClienteConv] = useState<any>(clienteInfo);
    const [getCliente, setGetCliente] = useState<any>(getCli);
    const [loadingPost, setLoadingPost] = useState<boolean>(false);
    const [idComprobante, setIdComprobante] = useState<number>(0);

    const [modalVenta, setModalVenta] = useState<boolean>(false);
    const [modalComprobante, setModalComprobante] = useState<boolean>(false);


    useEffect(() => {
        setClienteConv(clienteInfo);
        setGetCliente({ 
            documento: "", 
            tipoDocumento: selectTipoComp === tipoVenta.factura ? "RUC" : "noDocumento"
        });
    }, [selectTipoComp])


    const enviarVenta = async () => { 
        setLoadingPost(true);
        const url:string = VENTAS + "/cambiar_tipo_comprobante";

        const updateCliente:any = clienteConv;
        updateCliente.numero_documento = getCliente.documento;
        updateCliente.tipoDocumento = getCliente.tipoDocumento;

        try {
            const resto:any = await put(idVenta, { tipo_venta: selectTipoComp, cliente: updateCliente }, url);
            if (resto.data.id !== 0) {
                setIdComprobante(resto.data.id);
                !inModal && setModalComprobante(true);
            }
            setLoadingPost(false);
        } catch (error) {
            setLoadingPost(true);
            console.log(error);
        } finally {
            getData && getData();
            if (inModal) {
                // setModalComprobante(false);
                setModal(false);
            }
        }

    }

    return (
        <Modal
            modal={modal}
            setModal={setModal}
            titulo={`Convertir venta rapida en comprobante nro ${idVenta}`}
            width={70}
        >
            <div className="box m-0 grid-1 gap">

                {
                    !inModal
                    && (
                        <div className="grid-3 mb-10">
                            <div></div>
                            <div className="center">
                                <span
                                    onClick={() => setModalVenta(true)}
                                    className="redtext pointer"
                                >Informacion de la venta</span>
                            </div>
                            <div></div>
                        </div>
                    )
                }
                

                <div className="grid-121 gap">
                    <div></div>
                    <RadioButton2
                        grid="grid-2 gap"
                        name="precio_venta"
                        values={[
                            { label: "Boleta", value: "boleta" },
                            { label: "Factura", value: "factura" },
                        ]}
                        onChange={(e:any) => setSelectTipoComp(e.target.value)}
                    />
                </div>

                {
                    !selectTipoComp
                    && <div style={{ height: "176px" }}><TextoRelleno texto="Selecciona un documento" /></div>
                }

                {
                    selectTipoComp === tipoVenta.boleta
                    && <ConvertirBoleta 
                        clienteConv={clienteConv}
                        setClienteConv={setClienteConv}
                        selectTipoComp={selectTipoComp}
                        getCliente={getCliente}
                        setGetCliente={setGetCliente}
                        loadingPost={loadingPost}
                        enviarVenta={enviarVenta}
                    />
                }

                {
                    selectTipoComp === tipoVenta.factura
                    && <ConvertirFactura 
                        clienteConv={clienteConv}
                        setClienteConv={setClienteConv}
                        selectTipoComp={selectTipoComp}
                        getCliente={getCliente}
                        setGetCliente={setGetCliente}
                        loadingPost={loadingPost}
                        enviarVenta={enviarVenta}
                    />
                }

            </div>



            {
                !inModal
                && <>
                    <ModalWrap modal={modalVenta}>
                        <ModalVentaDetalles
                            modal={modalVenta}
                            setModal={setModalVenta}
                            idVenta={idVenta}
                            modalConvert
                        />
                    </ModalWrap>
                    
                    {
                        (idComprobante !== 0 && !loadingPost)
                        && <ModalWrap modal={modalComprobante}>
                            <ModalVerComprobante
                                modal={modalComprobante}
                                setModal={setModalComprobante}
                                idComprobante={idComprobante}
                                btnClose={setModal}
                            />
                        </ModalWrap>
                    }
                </>
            }

        </Modal>
    )
}
