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

    const creditoDetalles:Array<any> = venta.creditoDetalles ? venta.creditoDetalles : [];
    const cantidadRestante:number = Number(venta.total) - Number(venta.totalPagado);
    const codigoVenta:string = venta.id + "-" + venta.codigo_venta;

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

                        <h3 className="info center m-0">Codigo de venta: { codigoVenta }</h3>

                        <div className="box box-par m-0">

                            <h3>Informacion de {venta.tipo_venta}</h3>

                            <table className="table2">
                                
                                <thead>
                                    <tr>
                                        <th>Cantidad pagada</th>
                                        <th>Estado</th>
                                        <th>Nota</th>
                                        <th>Fecha pago</th>
                                        {/* <th className="transparent">...</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        creditoDetalles.map((e:any) => {
                                            return (
                                                <tr key={e.id}>
                                                    <td className={
                                                        Number(e.cantidad_pagada) === 0
                                                        ? "warning strong"
                                                        : "success strong"
                                                    }>S/.{ moneda(e.cantidad_pagada) }</td>
                                                    <td className={e.estado ? "success" : "warning"}>
                                                        { e.estado ? "Listo" : "Sin pagar" }
                                                    </td>
                                                    <td>{ e.nota }</td>
                                                    <td>{ fecha(e.created_at) }</td>
                                                    {/* <td>
                                                        <DropDown>
                                                            <span onClick={ () => {} } >
                                                                <BiTrash /> Eliminar
                                                            </span>
                                                        </DropDown>
                                                    </td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {
                                !(cantidadRestante <= 0 && venta.estado_producto)
                                && <InfoGeneralCredito venta={venta} />
                            }
                        </div>
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
