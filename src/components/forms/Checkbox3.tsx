import { ToolTip } from "../tooltip/ToolTip";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface Checkbox {
    label?:string;
    className?:string;
    name:string;
    checked:any;
    handlerCheck:any;
    tooltip?:toolTip;
    // title?:string
}

export const Checkbox3 = ({ label, name, checked, handlerCheck, className, tooltip }:Checkbox) => {
    return (
        <div id={tooltip && tooltip.anchor} >
            {
                label
                && <label className={"center w100 " + className} htmlFor={name}>{ label }</label>
            }
            <div className="checkbox wrap-switch">
                <input
                    className="switch switch-input"
                    type="checkbox"
                    name={name}
                    id={name}
                    checked={checked}
                    onChange={handlerCheck}
                />
                
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


// estructura:

// <Checkbox3
//     label={igv ? "Deshabilitar" : "Habilitar"}
//     name="igv"
//     checked={igv}
//     handlerCheck={ () => setIgv(!igv) }
// />


// <Checkbox
//     key={e.id}
//     name="estado_detalle"
//     value={ e.estado_detalle }
//     onChange={ onChangeInput }
// >
//     {/* <p>{ e.transaccionDetalles.productos.codigo }</p>
//     <p>{ e.productos.nombre }</p> */}
// </Checkbox>

// añadir tooltip
// tooltip={{
//     anchor: "btn-conf-venta",
//     descripcion: "Requiere la información del cliente",
// }}