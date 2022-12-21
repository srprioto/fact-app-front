import { useState } from "react";
import { BiBookmarkAltMinus } from "react-icons/bi";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { ImpCreditoAdel } from "../../../../components/imprimir/ImpCreditoAdel";

export const BtnImpCredito = ({ loading, registroFinal, venta, creditoDetalles }:any) => {

    const [imprimir, setImprimir] = useState<boolean>(false);
    const [ventaUpdate, setVentaUpdate] = useState<any>({});

    const handlerImprimir = async () => { 

        const updateVenta:any = {};

        updateVenta.id = venta.id;
        updateVenta.codigo_venta = venta.codigo_venta;
        updateVenta.created_at =  venta.created_at;
        updateVenta.estado_producto = venta.estado_producto;
        updateVenta.subtotal = venta.subtotal;
        updateVenta.total = venta.total;
        updateVenta.totalPagado = venta.totalPagado;
        updateVenta.clientes = venta.clientes;
        updateVenta.ventaDetalles = venta.ventaDetalles;
        updateVenta.creditoDetalles = creditoDetalles; 

        setVentaUpdate(updateVenta);

        setImprimir(true);
        await registroFinal("listo");

    }


    return (
        <>
            <LoadSwitchBtn2
                loading={loading}
                className="btn btn-success"
                handler={() => handlerImprimir()}
            ><BiBookmarkAltMinus /> Imprimir
            </LoadSwitchBtn2>
            { 
                imprimir 
                && <ImpCreditoAdel 
                    ventaUpdate={ventaUpdate} 
                    setImprimir={setImprimir} 
                /> 
            }     
        </>
    )
}
