import { BiCaretRight } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../../../components/btns/LoadSwitchBtn2";
import { tipoVenta } from "../../../../../../../resources/dtos/VentasDto";
// import { ImpComVentaCredito } from "./ImpComVentaCredito";

export const RapidoCred = ({ enviarVenta, loading }:any) => {

    const validarVenta = () => {
        return true;
    }

    return (
        <div>
            <div className="grid-3 gap">
                
                <div></div>
{/*                 
                <ImpComVentaCredito
                    loading={loading}
                    venta={venta}
                    enviarVenta={enviarVenta}
                    tipoVenta={tipoVenta.venta_rapida}
                /> */}

                <BtnOnOff2
                    label="Confirmar"
                    estado={validarVenta()}
                    icon={<BiCaretRight />}
                >
                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-success"
                        handler={() => enviarVenta()}
                    ><BiCaretRight /> Confirmar
                    </LoadSwitchBtn2>
                </BtnOnOff2>

            </div>
        </div>
    )
}
