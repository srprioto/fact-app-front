import { BiCheck } from "react-icons/bi";
import { ToolTip } from "../tooltip/ToolTip";
import { LoadingBtn } from "./LoadingBtn";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface loadSwitchBtn {
    label?:string;
    loading:boolean;
    handler?:any;
    className?:string;
    icon?:any;
    tooltip?:toolTip;
}

export const LoadSwitchBtn = ({ 
    label = "Aceptar", 
    loading, 
    handler, 
    className = "success", 
    icon, 
    tooltip 
}:loadSwitchBtn) => {
    
    return (
        <>
            {
                loading
                ? <LoadingBtn />
                : (
                    handler
                    ? (
                        <button 
                            id={tooltip && tooltip.anchor}
                            className={"btn btn-" + className} 
                            type="submit" 
                            onClick={() => handler()}
                        >
                            { icon ? icon : <BiCheck /> }
                            { label ? label : "Aceptar" }
                        </button>
                    ) : (
                        <button 
                            id={tooltip && tooltip.anchor} 
                            className={"btn btn-" + className} 
                            type="submit"
                        >
                            { icon ? icon : <BiCheck /> }
                            { label ? label : "Aceptar" }
                        </button>
                    )
                    
                )
            }
            {
                !!tooltip
                && <ToolTip
                    anchor={tooltip.anchor}
                    descripcion={tooltip.descripcion}
                /> 
            }
            
        </>
    )
};

// // para inputs
// tooltip={{
//     anchor: "btn-inc-desc",
//     descripcion: "Incrementos o descuentos de<br/>la venta del producto actual",
// }}


