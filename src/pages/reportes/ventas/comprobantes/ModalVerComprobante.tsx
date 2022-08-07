import { useEffect, useState } from "react";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal"
import { getOne } from "../../../../resources/fetch";
import { moneda } from "../../../../resources/func/moneda";
import { COMPROBANTE } from "../../../../resources/routes";
import { InfoCliente } from "../InfoGeneral/InfoCliente";
import { InfoComprobante } from "./InfoComprobante";
import { InfoRespuestaSunat } from "./InfoRespuestaSunat";

export const ModalVerComprobante = ({ modal, setModal, idComprobante }:any) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [comprobante, setComprobante] = useState<any>({});


    useEffect(() => {
        getComprobante();
    }, [])


    const getComprobante = async () => { 
        setLoadingOne(true);
        try {
            const dataOne = await getOne(idComprobante, COMPROBANTE);
            // console.log(dataOne);
            setComprobante(dataOne);
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }
    

    return (
        <Modal
            title="Detalles del comprobante"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={70}
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
                                        <th>Igv</th>
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

        </Modal>
    )
}



// tipoComprobante: "01"
// tipoDocumento: "6"
// tipoOperacion: "10"
// locales: {id: 2, nombre: 'local Nro1', direccion: 'direccion del local', telefono: '', tipo_local: 'tienda', …}
// fecha_emision: "2022-07-09T03:38:13.424Z"



// respuesta_sunat: 