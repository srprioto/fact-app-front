import { ToolTip } from "../tooltip/ToolTip";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface inputDisable {
    label?:string;
    name?:string;
    value:any;
    moneda?:boolean;
    color?:string;
    font_size?:number; // no se recomienda
    tooltip?:toolTip;
}

export const InputDisable = ({ label, name, value, moneda, color, font_size, tooltip }:inputDisable) => {

    const font:any = {'fontSize': `${font_size}px`};

    return (
        <div className="wrap-form " id={tooltip && tooltip.anchor}>
            { label && (<><label htmlFor={name}>{ label }</label><br /></>) }
            <div className="relative">
                
                <input 
                    className={"form-disabled " + (color ? color : "")}
                    style={ font && font }
                    disabled={true}
                    type="text" 
                    name={name} 
                    id={name} 
                    value={value}
                    autoComplete="off"
                />
                
                {
                    moneda
                    && <span className="moneda">S/.</span>
                }
            </div>
            {
                !!tooltip
                && <ToolTip
                    anchor={tooltip.anchor}
                    descripcion={tooltip.descripcion}
                /> 
            }
        </div>

    )
}

/* <InputDisable
    label="Tipo de Documento"
    value="DNI"
/> */