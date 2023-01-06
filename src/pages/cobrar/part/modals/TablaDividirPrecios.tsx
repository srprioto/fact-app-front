import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { ToolTip } from "../../../../components/tooltip/ToolTip";

export const TablaDividirPrecios = ({ limpiarLista }:any) => {

    const [showLista, setShowLista] = useState<boolean>(false);

    return (
        limpiarLista().length > 0
        ? (
            <div>
                <div className="middle">
                    <button
                        id="btn-show-pag-div"
                        onClick={() => setShowLista(!showLista)}
                        className="btn-show red-text center"
                    >
                        {
                            showLista
                            ? <>Esconder pagos divididos <BiChevronUp /></>
                            : <>Mostrar pagos divididos <BiChevronDown /></>
                        }
                    </button>
                    <ToolTip
                        anchor="btn-show-pag-div"
                        descripcion="Muestra el registro de los pagos divididos de esta venta"
                    /> 
                </div>
                {
                    showLista
                    && (
                        <div className="grid-3 gap">
                            <div></div>
                            <div>
                                {
                                    limpiarLista().map((e:any, index:number) => {
                                        return (
                                            <span key={index} className="grid-2 gap">
                                                <p className="capitalize m-0 right">{ e.forma_pago }:</p>
                                                <p className={
                                                    e.forma_pago === "tarjeta"
                                                    ? "warning strong m-0 left"
                                                    : "success strong m-0 left"
                                                }>S/. { e.precio_parcial }</p>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                            <div></div>
                        </div>
                    )
                }
                
            </div>
        ) : (
            <></>
        )
        
    )
}
