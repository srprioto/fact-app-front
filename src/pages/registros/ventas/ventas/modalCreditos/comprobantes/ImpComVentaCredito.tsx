import { useState } from "react";
import { BiBookmarkAltMinus } from "react-icons/bi";
import { LoadSwitchBtn2 } from "../../../../../../components/btns/LoadSwitchBtn2";
import { ImpVenta } from "../../../../../cobrar/part/modals/ImpVenta";

export const ImpComVentaCredito = ({ loading, venta, confirmarVenta, tipoVenta }:any) => {

    const [imprimir, setImprimir] = useState<boolean>(false);

    const handlerImprimir = async () => { 
        setImprimir(true);
        await confirmarVenta(tipoVenta);
    }

    return (
        <>
            <LoadSwitchBtn2
                loading={loading}
                className="btn btn-success"
                handler={() => handlerImprimir()}
            ><BiBookmarkAltMinus /> Conf. Imprimir
            </LoadSwitchBtn2>

            { imprimir && <ImpVenta venta={venta} setImprimir={setImprimir} nuevo /> }           

        </>
    )
}
