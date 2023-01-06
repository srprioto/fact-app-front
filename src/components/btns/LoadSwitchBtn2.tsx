import { ToolTip } from "../tooltip/ToolTip";
import { LoadingBtn } from "./LoadingBtn";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface loadSwitchBtn2 {
    loading:boolean;
    className:string;
    handler?:any; // requiere arrow function por fuera
    tooltip?:toolTip;
    children?:any
}

export const LoadSwitchBtn2 = ({ loading, className, handler, tooltip, children }:loadSwitchBtn2) => {
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
                            className={className} 
                            type="submit" 
                            onClick={() => handler()}
                        >
                            {
                                children
                            }
                        </button>
                    ) : (
                        <button 
                            id={tooltip && tooltip.anchor}
                            className={className} 
                            type="submit"
                        >
                            {
                                children
                            }
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

// para tooltip
// tooltip={{
//     anchor: "btn-inc-desc",
//     descripcion: "Incrementos o descuentos de<br/>la venta del producto actual",
// }}