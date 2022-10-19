import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { DropDown } from "../../../../../components/DropDown";
import { Loading } from "../../../../../components/loads/Loading";
import { Modal } from "../../../../../components/modals/Modal"
import { getOne } from "../../../../../resources/fetch";
import { fecha } from "../../../../../resources/func/fechas";
import { moneda } from "../../../../../resources/func/moneda";
import { VENTAS } from "../../../../../resources/routes";
import { InfoCliente } from "../InfoCliente";
import { GestionCreditoAdelanto } from "./GestionCreditoAdelanto";
import { InfoGeneralCredito } from "./InfoGeneralCredito";

export const ModalCredito = ({ modal, setModal, idVenta, getData }:any) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [venta, setVenta] = useState<any>({});

    const creditoDetalles:Array<any> = venta.creditoDetalles ? venta.creditoDetalles : [];


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
        >
            {
                loadingOne
                ? <Loading />
                : (
                    <div className="grid-1 gap modal-credito">
                        <div className="box box-par m-0">

                            <table className="table2">
                                
                                <thead>
                                    <tr>
                                        <th>Cantidad pagada</th>
                                        <th>Estado</th>
                                        <th>Nota</th>
                                        <th>Fecha pago</th>
                                        <th className="transparent">...</th>
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
                                                    <td>
                                                        <DropDown>
                                                            <span onClick={ () => {} } >
                                                                <BiTrash /> Eliminar
                                                            </span>
                                                        </DropDown>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <InfoGeneralCredito venta={venta} />
                        </div>
                        
                        <GestionCreditoAdelanto venta={venta} getDataOne={getDataOne} getData={getData} />

                        {
                            venta.clientes
                            && (
                                <InfoCliente cliente={venta.clientes} />
                            )
                        }

                    </div>
                )
            }
            
        </Modal>
    )
}
