import { useEffect, useState } from "react";
import { Loading } from "../../../../../../components/loads/Loading";
import { Modal } from "../../../../../../components/modals/Modal";
import { getOne } from "../../../../../../resources/fetch";
import { VENTAS } from "../../../../../../resources/routes";
import { InfoCliente } from "../../InfoCliente";
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
    
    const [loading, setLoading] = useState<boolean>(false);
    const [venta, setVenta] = useState<any>({});

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
                        <ConfirmCreditoAdelanto venta={venta} cantidadRestante={cantidadRestante} />
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
        </Modal>
    )
}
