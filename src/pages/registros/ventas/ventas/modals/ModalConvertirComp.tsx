import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../components/btns/LoadSwitchBtn2";
import { RadioButton2 } from "../../../../../components/forms/RadioButton2";
import { Modal } from "../../../../../components/modals/Modal"
import { ModalWrap } from "../../../../../components/modals/ModalWrap";
import { TextoRelleno } from "../../../../../components/TextoRelleno";
import { clienteInfo } from "../../../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../../../resources/dtos/VentasDto";
import { put } from "../../../../../resources/fetch";
import { VENTAS } from "../../../../../resources/routes";
import { ConvertirBoleta } from "./comprobantes/boleta/ConvertirBoleta";
import { ConvertirFactura } from "./comprobantes/factura/ConvertirFactura";
import { ModalVentaDetalles } from "./ModalVentaDetalles";

interface modalConvertirComp {
    modal:boolean;
    setModal:Function;
    idVenta:number;
    getData:Function;
}

export const ModalConvertirComp = ({ modal, setModal, idVenta, getData }:modalConvertirComp) => {

    const getCli:any = { documento: "", tipoDocumento: "" }

    const [selectTipoComp, setSelectTipoComp] = useState<string>(""); // select
    const [clienteConv, setClienteConv] = useState<any>(clienteInfo);
    const [getCliente, setGetCliente] = useState<any>(getCli);

    const [modalVenta, setModalVenta] = useState<boolean>(false);
    const [loadingPost, setLoadingPost] = useState<boolean>(false);


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
            await put(idVenta, { tipoComprobante: selectTipoComp, cliente: updateCliente }, url);
            setLoadingPost(false);
        } catch (error) {
            setLoadingPost(true);
            console.log(error);
        } finally {
            getData();
            setModal(false);
        }

    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title={`Convertir venta rapida en comprobante nro ${idVenta}`}
            width={70}
        >
            <div className="box m-0 grid-1 gap">

                <div className="grid-3 mb-10">
                    {/* <h3 className="m-0">Selecciona un documento</h3>  */}
                    <div></div>
                    <div className="center">
                        <span
                            onClick={() => setModalVenta(true)}
                            className="redtext pointer"
                        >Informacion de la venta</span>
                    </div>
                    <div></div>
                </div>
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
                    && <TextoRelleno texto="Selecciona un documento" />
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

            <ModalWrap modal={modalVenta}>
                <ModalVentaDetalles
                    modal={modalVenta}
                    setModal={setModalVenta}
                    idVenta={idVenta}
                />
            </ModalWrap>

        </Modal>
    )
}
