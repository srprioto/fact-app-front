import { useState } from "react";
import { BiBookmarkAltMinus } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../../components/btns/LoadSwitchBtn2";
import { copy } from "../../../../../../resources/func/deepCopy";
import { ImpCreditoAdel } from "./ImpCreditoAdel";

interface btnImpCredAde {
    venta:any;
    loading:boolean;
    validarCredito:boolean;
    handlerCreditoDetalles:Function;
    updateCredito:any;
}

export const BtnImpCredAde = ({ 
    venta, 
    loading, 
    validarCredito, 
    handlerCreditoDetalles,
    updateCredito
}:btnImpCredAde) => {

    const [imprimir, setImprimir] = useState<boolean>(false);
    const [ventaUpdate, setVentaUpdate] = useState<any>({});

    const handlerImprimir = async () => { 

        const creditoDetalles:Array<any> = copy(venta.creditoDetalles);
        creditoDetalles.push({
            cantidad_pagada: updateCredito.cantidad_pagada,
            fecha_estimada: new Date(),
            nota: updateCredito.nota
        })

        const updateVenta:any = {};
        updateVenta.id = venta.id;
        updateVenta.codigo_venta = venta.codigo_venta;
        updateVenta.clientes = venta.clientes;
        updateVenta.created_at = venta.created_at;
        // updateVenta.estado_venta = venta.estado_venta; // actualizar
        updateVenta.estado_producto = updateCredito.estado_producto; 
        updateVenta.subtotal = venta.subtotal;
        updateVenta.total = venta.total;
        updateVenta.totalPagado = Number(venta.totalPagado) + Number(updateCredito.cantidad_pagada);
        updateVenta.ventaDetalles = venta.ventaDetalles;
        updateVenta.creditoDetalles = creditoDetalles;

        setVentaUpdate(updateVenta);

        setImprimir(true);
        await handlerCreditoDetalles();
    }


    return (
        <>
            <BtnOnOff2
                label="Conf. Imprimir"
                estado={validarCredito}
                icon={<BiBookmarkAltMinus />}
            >
                <LoadSwitchBtn2
                    loading={loading}
                    className="btn btn-success"
                    handler={() => handlerImprimir()}
                ><BiBookmarkAltMinus /> Conf. Imprimir
                </LoadSwitchBtn2>
            </BtnOnOff2>

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
