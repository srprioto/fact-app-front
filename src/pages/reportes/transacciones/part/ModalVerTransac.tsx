import { useEffect, useState } from "react";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal"
import { ModalWrap } from "../../../../components/modals/ModalWrap";
import { getOne } from "../../../../resources/fetch";
import { TRANSACCIONES } from "../../../../resources/routes";
import { ProductoInfo } from "../../Ingresos/part/ProductoInfo";
import { EnvioDropdown } from "./EnvioDropdown";
import { InfoTransaccion } from "./InfoTransaccion";
import { ModalConfirmarTrans } from "./ModalConfirmarTrans";

interface modalVerTransac {
    modal:boolean;
    setModal:Function;
    idTransaccion:number;
    getData:Function;
}

export const ModalVerTransac = ({ modal, setModal, idTransaccion, getData }:modalVerTransac) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [transaccion, setTransaccion] = useState<any>({});
    const [TransaccionDetalles, setTransaccionDetalles] = useState<any>({});
    const [modalConfirmarEnvio, setModalConfirmarEnvio] = useState<boolean>(false);


    
    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
        setLoadingOne(true);
        try {
            const dataOne = await getOne(idTransaccion, TRANSACCIONES);
            setTransaccion(dataOne);
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }


    const classEstado = (estado:string) => { 
        if (estado === "listo") {
            return "success-i"
        } else if (estado === "enviado") {
            return "warning-i"
        } else if (estado === "observado") {
            return "danger-i"
        } else if (estado === "corregido") {
            return "primary-i"
        }
    }


    const handlerModalConfirmar = (transaccionDetalle:any, estado_envio:string) => { 

        const data:any = {};
        data.id_transaccion = transaccion.id;
        data.id_transaccion_detalle = transaccionDetalle.id;
        data.id_producto = transaccionDetalle.productos.id;

        if (estado_envio === "listo") {
            data.id_local_destino = transaccion.localDestino.id;    
        } else if (estado_envio === "regresar"){
            data.id_local_destino = transaccion.localOrigen.id
        }
        
        data.cantidad = transaccionDetalle.cantidad;
        data.estado_detalle = estado_envio

        setTransaccionDetalles(data);
        setModalConfirmarEnvio(true);
    }


    return (
        <Modal
            title="Resumen de transaccion"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={70}
        >
            {
                loadingOne
                ? <Loading heightModal />
                : (
                    
                    <div className="grid-1 gap">

                        <div className="box m-0">

                            <table className="table2">

                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th></th>
                                        <th>Cantidad</th>
                                        <th>Estado de envio</th>
                                        <th className="transparent">...</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        transaccion.transaccionDetalles
                                        && (
                                            transaccion.transaccionDetalles.map((e:any) => {
                                                return (
                                                    <tr key={e.id}>
                                                        <td className="info">{ e.productos.nombre }</td>
                                                        <td><ProductoInfo producto={e.productos} /></td>
                                                        <td>{ e.cantidad }</td>
                                                        <td
                                                            className={classEstado(e.estado_detalle)}
                                                        >{ e.estado_detalle }</td>
                                                        <td>
                                                            {
                                                                e.estado_detalle === "observado" && 
                                                                <EnvioDropdown
                                                                    el={e}
                                                                    confirmarEnvio={handlerModalConfirmar}
                                                                />
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>

                        </div>

                        <InfoTransaccion transaccion={transaccion} classEstado={classEstado} />

                    </div>
                )
            }

            <ModalWrap modal={modalConfirmarEnvio}>
                <ModalConfirmarTrans
                    modal={modalConfirmarEnvio}
                    setModal={setModalConfirmarEnvio}
                    transaccionDetalles={TransaccionDetalles}
                    setLoading={setLoadingOne}
                    getDataOne={getDataOne}
                    getData={getData}
                />
            </ModalWrap>

        </Modal>
    )
}
