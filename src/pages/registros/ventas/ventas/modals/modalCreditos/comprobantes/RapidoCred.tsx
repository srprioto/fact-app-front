import { BiCaretRight } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../../../components/btns/LoadSwitchBtn2";
import { tipoVenta } from "../../../../../../../resources/dtos/VentasDto";
import { ImpComVentaCredito } from "./ImpComVentaCredito";

export const RapidoCred = ({ confirmarVenta, loading, venta }:any) => {

    const validarVenta = () => {
        return true;
    }

    return (
        <div>
            <div className="grid-4 gap">
                
                <div></div>
                
                <ImpComVentaCredito
                    loading={loading}
                    venta={venta}
                    confirmarVenta={confirmarVenta}
                    tipoVenta={tipoVenta.venta_rapida}
                />

                <BtnOnOff2
                    label="Confirmar venta"
                    estado={validarVenta()}
                    icon={<BiCaretRight />}
                >
                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-warning"
                        handler={() => confirmarVenta(tipoVenta.venta_rapida)}
                    ><BiCaretRight /> Confirmar venta
                    </LoadSwitchBtn2>
                </BtnOnOff2>

            </div>
        </div>
    )
}
