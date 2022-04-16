import { useEffect, useState } from "react";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal"
import { getOne } from "../../../../resources/fetch";
import { TRANSACCIONES } from "../../../../resources/routes";
import { ProductoInfo } from "../../Ingresos/part/ProductoInfo";
import { InfoTransaccion } from "./InfoTransaccion";

interface modalVerTransac {
    modal:boolean;
    setModal:Function;
    idTransaccion:number;
}

export const ModalVerTransac = ({ modal, setModal, idTransaccion }:modalVerTransac) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [transaccion, setTransaccion] = useState<any>({});
    
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
        }
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
                ? <Loading />
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
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>

                        </div>

                        <InfoTransaccion transaccion={transaccion} classEstado={classEstado} />

                        {
                            transaccion.estado_general === "observado"
                            && (
                                <div className="box grid-3 gap">
                                    


                                </div>
                            )
                        }

                        {
                            transaccion.estado_general === "enviado"
                            && (
                                <div className="box grid-3 gap">
                                    
                                    

                                </div>
                            )
                        }


                    </div>
                )
            }            

        </Modal>
    )
}
