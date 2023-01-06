import { Tooltip as ReactTooltip } from 'react-tooltip';

interface toolTip {
    anchor:string;
    descripcion:string;
}

export const ToolTip = ({ anchor, descripcion }:toolTip) => {
    return (
        <ReactTooltip
            anchorId={anchor}
            html={descripcion}

            variant="dark"
            place="bottom" 
            float={true} 
            delayShow={400} 
            offset={15} 
            noArrow={true} 
            className="tooltip"
            style={{ 
                zIndex: "5",
                textAlign: "left",
                maxWidth: "500px",
                // background: "#cecece"
            }}
        />
    )
}

/* 
// generales
<ToolTip
    anchor=""
    descripcion=""
/> 

// para inputs
tooltip={{
    anchor: "btn-inc-desc",
    descripcion: "Incrementos o descuentos de<br/>la venta del producto actual",
}}

IMPORTANTE:
en anchor tiene que ser distinto al name

*/

