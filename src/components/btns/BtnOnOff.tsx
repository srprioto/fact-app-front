import { BiCheck } from "react-icons/bi";
import { ToolTip } from "../tooltip/ToolTip";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface btnOnOff {
    label?:string;
    estado:boolean;
    onClick?:any;
    className?:string;
    icon?:any
    tooltip?:toolTip;
}

export const BtnOnOff = ({ label = "Aceptar", estado, onClick, icon, className = "success", tooltip }:btnOnOff) => {
    return (
        <>
            {
                estado
                ? (
                    <button
                        className={"btn btn-" + className}
                        onClick={ onClick }
                    >
                        { icon ? icon : <BiCheck /> } { " " + label }
                    </button>
                ) : (
                    <button 
                        id={tooltip && tooltip.anchor}
                        className="btn btn-disable"
                    >
                        { icon ? icon : <BiCheck /> } { " " + label }
                    </button>
                )
            }
            {
                (!!tooltip && !estado)
                && <ToolTip
                    anchor={tooltip.anchor}
                    descripcion={tooltip.descripcion}
                /> 
            }
        </>
    )
}

// // añadir tooltip
// tooltip={{
//     anchor: "btn-conf-venta",
//     descripcion: "Requiere la información del cliente",
// }}