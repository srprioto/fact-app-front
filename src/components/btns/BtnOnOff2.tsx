import { BiCheck } from "react-icons/bi";
import { ToolTip } from "../tooltip/ToolTip";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface btnOnOff2 {
    label?:string;
    estado:boolean;
    icon?:any;
    tooltipDisable?:toolTip;
    children:any;
}

export const BtnOnOff2 = ({ label = "Aceptar", estado, icon, tooltipDisable, children }:btnOnOff2) => {
    return (
        <>
            {
                estado
                ? (
                    children
                ) : <>
                    <button className="btn btn-disable" type="button" id={tooltipDisable && tooltipDisable.anchor}>
                        { icon ? icon : <BiCheck /> } { " " + label }
                    </button>
                    {
                        !!tooltipDisable
                        && <ToolTip
                            anchor={tooltipDisable.anchor}
                            descripcion={tooltipDisable.descripcion}
                        /> 
                    }
                </>
            }

        
        </>
    )
}


/* 
<BtnOnOff2
    estado={validMsg()}
    icon={<BiCheck />}
    label="Anular"
>
    // ...
</BtnOnOff2> 
*/


// añadir tooltip
// tooltipDisable={{
//     anchor: "btn-conf-venta",
//     descripcion: "Requiere la información del cliente",
// }}