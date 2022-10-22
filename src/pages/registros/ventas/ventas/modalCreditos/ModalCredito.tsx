import { useEffect, useState } from "react";
import { Loading } from "../../../../../components/loads/Loading";
import { Modal } from "../../../../../components/modals/Modal"
import { getOne } from "../../../../../resources/fetch";
import { fecha } from "../../../../../resources/func/fechas";
import { moneda } from "../../../../../resources/func/moneda";
import { VENTAS } from "../../../../../resources/routes";
import { InfoCliente } from "../InfoCliente";
import { ConfirmCreditoAdelanto } from "./ConfirmCreditoAdelanto";
import { GestionCreditoAdelanto } from "./GestionCreditoAdelanto";
import { InfoGeneralCredito } from "./InfoGeneralCredito";
import { TablaInfoCredito } from "./TablaInfoCredito";

interface modalCredito {
    modal:boolean;
    setModal:Function;
    idVenta:number;
    getData:Function;
    localId:number;
}

export const ModalCredito = ({ modal, setModal, idVenta, getData, localId }:modalCredito) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [venta, setVenta] = useState<any>({});

    const cantidadRestante:number = Number(venta.total) - Number(venta.totalPagado);


    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
        setLoadingOne(true);
        try {
            const dataOne = await getOne(idVenta, VENTAS);
            setVenta(dataOne);
            setLoadingOne(false);
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            width={75}
            title={`Gestion de ${venta.tipo_venta} de la venta`}
            btnClose={getData}
        >
            {
                loadingOne
                ? <Loading />
                : (
                    <div className="grid-1 gap modal-credito">

                        <TablaInfoCredito
                            venta={venta}
                            cantidadRestante={cantidadRestante}
                        />

                        {
                            (cantidadRestante <= 0 && venta.estado_producto)
                            ? (
                                // si la venta esta cancelado
                                <ConfirmCreditoAdelanto venta={venta} />
                            ) : (
                                // si el credito esta activo
                                <>
                                    <GestionCreditoAdelanto 
                                        venta={venta} 
                                        getDataOne={getDataOne}
                                        localId={localId}
                                        cantidadRestante={cantidadRestante}
                                        // loading={loadingOne}
                                        // setLoading={setLoadingOne}
                                    />
                                    {
                                        venta.clientes
                                        && (
                                            <InfoCliente cliente={venta.clientes} />
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                )
            }
        </Modal>
    )
}
