import { ToolTip } from "../tooltip/ToolTip";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface Checkbox {
    label?:string;
    name:string;
    checked:any;
    handlerCheck:any;
    classname?:string;
    tooltip?:toolTip;
}

export const Checkbox2 = ({ 
    label, 
    name, 
    checked, 
    handlerCheck, 
    classname, 
    tooltip 
}:Checkbox) => {
    return (
        <div className="checkbox wrap-switch" id={tooltip && tooltip.anchor}>

            <input
                className="switch switch-input"
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={handlerCheck}
            />
            
            {
                label
                && <label className={"switch-label " + classname} htmlFor={name}><span>{ label }</span></label>
            }
            
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

// <Checkbox2
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
//     descripcion: "Requiere la información del cliente"
// }}