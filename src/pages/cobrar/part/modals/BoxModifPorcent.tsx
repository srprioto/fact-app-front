import { useState } from "react"
import { Input } from "../../../../components/forms/Input"
import { ToolTip } from "../../../../components/tooltip/ToolTip"
import { BiChevronLeft } from "react-icons/bi"

export const BoxModifPorcent = ({ reducirPercent, onChangeRedPercent }:any) => {

    const [toogle, setToogle] = useState<boolean>(true)

    return (
        <div
            id="txt-modif-precio"
        >
            {
                toogle 
                ? <div className="show-modif-pocent btn-show red-text" onClick={() => { setToogle(false) }}>
                    <BiChevronLeft /> 
                </div>
                : <div>
                    <p>Modif. porcentual (%):</p>
                    <Input
                        type="number"
                        name="reducirPercent"
                        value={reducirPercent}
                        onChange={onChangeRedPercent}
                        color={
                            reducirPercent < 0
                            ? "danger-i" : ""
                        }
                    />
                    <ToolTip
                        anchor="txt-modif-precio"
                        descripcion="Permite hacer un recalculo porcentual del precio total, sin alterar el registro de la venta, pero afectando el comprobante final de la Sunat y su impresión."
                    /> 
                </div>
            }
            
        </div>
    )
}
