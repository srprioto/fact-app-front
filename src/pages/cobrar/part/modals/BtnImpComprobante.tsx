import { useState } from "react";
import { BiBookmarkAltMinus } from "react-icons/bi"
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2"
import { ImpVenta } from "../../../../components/imprimir/ImpVenta"

export const BtnImpComprobante = ({ loading, registroFinal, venta }:any) => {

    const [imprimir, setImprimir] = useState<boolean>(false);

    const handlerImprimir = async () => { 
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

            { imprimir && <ImpVenta venta={venta} setImprimir={setImprimir} nuevo /> }           

        </>
    )
}
