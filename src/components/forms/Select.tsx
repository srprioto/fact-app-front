import { ToolTip } from "../tooltip/ToolTip";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface select {
    label?:string;
    name:string;
    onChange:any;
    defaultValue?:any; // activa el valor por defecto "no"
    value?:any; // requiere activar defaultValue
    loading?:boolean|undefined;
    textDefault?:string;
    tooltip?:toolTip;
    children:any;
}

export const Select = ({ 
    label, 
    name, 
    onChange, 
    defaultValue, 
    value,
    loading, 
    textDefault = "Selecciona una opción", 
    tooltip,
    children 
}:select) => {
    return (
        <div className="wrap-form w100" id={tooltip && tooltip.anchor}>
            { label && <><label htmlFor={name}>{ label }</label><br /></> }
            <select 
                name={name}
                id={name}
                onChange={onChange}
                autoComplete="off"
                defaultValue={value ? value : "0"}
            >
                {
                    defaultValue 
                    && (
                        <option value={value ? value : "0"} disabled>
                            {
                                loading
                                ? "Recuperando datos"
                                : textDefault
                            }
                        </option>
                    )
                }
                { children }
            </select>
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

/* <Select
    label="Local destino *"
    name="localDestino"
    onChange={handlerChangeGenerales}
    loading={loadingLocales}
    defaultValue
>
    {
        locales.map((e:any) => {
            if (e.id !== idLocal) {
                return (
                    <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                )    
            }
        })
    }
    
</Select> */


// añadir tooltip
// tooltip={{
//     anchor: "btn-conf-venta",
//     descripcion: "Requiere la información del cliente"
// }}