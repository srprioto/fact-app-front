import { useEffect, useState } from "react";
import { BiBookmarkAltMinus, BiRedo, BiX } from "react-icons/bi";
import { Loading } from "../../../../../components/loads/Loading";
import { Modal } from "../../../../../components/modals/Modal"
import { ModalWrap } from "../../../../../components/modals/ModalWrap";
import { estados_comprobante } from "../../../../../resources/dtos/ComprobantesDto";
import { getOne } from "../../../../../resources/fetch";
import { moneda } from "../../../../../resources/func/moneda";
import { COMPROBANTE } from "../../../../../resources/routes";
import { InfoCliente } from "../../ventas/InfoCliente";
import { ModalAnularVenta } from "../../ventas/modals/ModalAnularVenta";
import { InfoComprobante } from "../InfoComprobante";
import { InfoRespuestaSunat } from "../InfoRespuestaSunat";
import { ModalReenviarComp } from "./ModalReenviarComp";
import { ModalReimpComprob } from "./ModalReimpComprob";

interface modalVerComprobante {
    modal:boolean;
    setModal:Function;
    idComprobante:number;
    getData?:Function;
    btnClose?:Function;
    contable?:boolean;
}

export const ModalVerComprobante = ({ 
    modal, 
    setModal, 
    idComprobante, 
    getData, 
    btnClose, 
    contable 
}:modalVerComprobante) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [comprobante, setComprobante] = useState<any>({});

    const [modalReenviar, setModalReenviar] = useState<boolean>(false);
    const [modalAnularComp, setModalAnularComp] = useState<boolean>(false);
    const [modalReimprimir, setModalReimprimir] = useState<boolean>(false);

    const venta:any = comprobante.ventas ? comprobante.ventas : {};


    useEffect(() => {
        getOneData();
    }, [])


    const getOneData = async () => { 
        setLoadingOne(true);
        try {
            const dataOne = await getOne(idComprobante, COMPROBANTE);
            setComprobante(dataOne);
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }


    const acciones = ():Array<any> => {

        if (!contable) {
            const accionesArray:Array<any> = [{
                label: "Imprimir",
                funcion: () => setModalReimprimir(true),
                icon: <BiBookmarkAltMinus />
            }];
            if (!loadingOne) {
                if (
                    comprobante.estado_sunat === estados_comprobante.Error_envio || 
                    comprobante.estado_sunat === estados_comprobante.Rechazado
                ) {
                    accionesArray.push({
                        label: "Reenviar",
                        funcion: () => setModalReenviar(true),
                        icon: <BiRedo />
                    });
                }
                if (
                    comprobante.estado_sunat === estados_comprobante.Error_anulacion ||
                    comprobante.estado_sunat === estados_comprobante.Anulacion_procesada ||
                    comprobante.estado_sunat === estados_comprobante.Aceptado
                ) {
                    accionesArray.push({
                        label: "Anular Comp.",
                        funcion: () => setModalAnularComp(true),
                        icon: <BiX />
                    });
                }
            }
            return accionesArray;
        } else {
            return [];
        }
    }


    const updateData = () => { 
        // getOneData();
        getData && getData();
        btnClose && btnClose();
    }


    return (
        <Modal
            titulo="Detalles del comprobante"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={70}
            acciones={acciones().length > 0 ? acciones() : null}
            btnClose={updateData}
        >

            {
                loadingOne
                ? <Loading />
                : (
                    <div className="modal-ver-ingreso grid-1 gap">
                        <div className="box m-0">
                            <table className="table2">
    
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Nombre prod.</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unidad</th>
                                        <th>IGV</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        comprobante.comprobanteDetalles
                                        && (
                                            comprobante.comprobanteDetalles.map((e:any) => {
                                                return (
                                                    <tr key={e.id}>
                                                        <td>{ e.codigo }</td>
                                                        <td className="info">{ e.nombre }</td>
                                                        <td>{ e.cantidad_venta }</td>
                                                        <td className="secundary">S/. { moneda(e.unidad_con_igv) }</td>
                                                        <td className="secundary">S/. { moneda(e.igv) }</td>
                                                        <td className="secundary">
                                                            S/. { moneda(e.unidad_con_igv * e.cantidad_venta) }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>

                        </div>

                        <InfoComprobante comprobante={comprobante} />
                        
                        {
                            comprobante.clientes
                            && (
                                <InfoCliente cliente={comprobante.clientes} />
                            )
                        }

                        {
                            !!comprobante.respuesta_sunat
                            && <InfoRespuestaSunat 
                                respuesta_sunat={comprobante.respuesta_sunat} 
                                estado_sunat={comprobante.estado_sunat} 
                            />
                        }

                    </div>        
                )
            }

            <ModalWrap modal={modalReenviar}>
                <ModalReenviarComp
                    modal={modalReenviar}
                    setModal={setModalReenviar}
                    idComprobante={comprobante.id}
                    getData={getOneData}
                />
            </ModalWrap>

            <ModalWrap modal={modalAnularComp}>
                <ModalAnularVenta
                    modal={modalAnularComp}
                    setModal={setModalAnularComp}
                    idVenta={venta.id}
                    getData={getOneData}
                />
            </ModalWrap>
            
            <ModalWrap modal={modalReimprimir}>
                <ModalReimpComprob
                    modal={modalReimprimir}
                    setModal={setModalReimprimir}
                    idComprobante={comprobante.id}
                />
            </ModalWrap>

        </Modal>
    )
}



// tipoComprobante: "01"
// tipoDocumento: "6"
// tipoOperacion: "10"
// locales: {id: 2, nombre: 'local Nro1', direccion: 'direccion del local', telefono: '', tipo_local: 'tienda', …}
// fecha_emision: "2022-07-09T03:38:13.424Z"



// respuesta_sunat: 