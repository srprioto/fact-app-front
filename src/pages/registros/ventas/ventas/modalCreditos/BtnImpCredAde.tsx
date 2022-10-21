import { useState } from "react";
import { BiBookmarkAltMinus } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../../components/btns/BtnOnOff2"
import { LoadSwitchBtn2 } from "../../../../../components/btns/LoadSwitchBtn2";
import { copy } from "../../../../../resources/func/deepCopy";
import { ImpComprobante } from "../../../../cobrar/part/modals/ImpComprobante";
import { ImpCreditoAdel } from "./ImpCreditoAdel";

interface btnImpCredAde {
    venta:any;
    loading:boolean;
    validarCredito:Function;
    handlerCreditoDetalles:Function;
}

export const BtnImpCredAde = ({ venta, loading, validarCredito, handlerCreditoDetalles }:btnImpCredAde) => {

    const [imprimir, setImprimir] = useState<boolean>(false);
    // const [ventaUpdate, setVentaUpdate] = useState<any>({});

    const handlerImprimir = async () => { 

        // const creditoDetalles:Array<any> = copy(venta.creditoDetalles); // actualizar
        // const updateVenta:any = {};
        // updateVenta.clientes = venta.clientes;
        // updateVenta.created_at = venta.created_at;
        // updateVenta.estado_venta = venta.estado_venta; // actualizar
        // updateVenta.subtotal = venta.subtotal;
        // updateVenta.total = venta.total;
        // updateVenta.totalPagado = venta.totalPagado; // actualizar
        // updateVenta.ventaDetalles = venta.ventaDetalles;
        // updateVenta.creditoDetalles = creditoDetalles;
        // updateVenta.prueba = "actualizado!!!!"

        // setVentaUpdate(updateVenta);

        setImprimir(true);
        await handlerCreditoDetalles();
    }

    return (
        <>

            <BtnOnOff2
                label="Conf. Imprimir"
                estado={validarCredito()}
                icon={<BiBookmarkAltMinus />}
            >
                <LoadSwitchBtn2
                    loading={loading}
                    className="btn btn-success"
                    handler={() => handlerImprimir()}
                ><BiBookmarkAltMinus /> Conf. Imprimir
                </LoadSwitchBtn2>
            </BtnOnOff2>

            {/* { imprimir && <ImpCreditoAdel ventaUpdate={ventaUpdate} setImprimir={setImprimir} /> }            */}
            { imprimir && <ImpComprobante venta={venta} setImprimir={setImprimir} /> }           

        </>
    )
}
