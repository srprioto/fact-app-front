// establece valor por defecto manualmente

import { ToolTip } from "../tooltip/ToolTip";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface select {
    label?:string;
    name:string;
    onChange:any;
    value:any;
    defaultValue?:any;
    tooltip?:toolTip;
    children:any;
}

export const Select2 = ({ 
    label, 
    name, 
    onChange, 
    value,
    defaultValue,
    tooltip,
    children 
}:select) => {
    return (
        <div className="wrap-form w100" id={tooltip && tooltip.anchor}>
            { label && <><label htmlFor={name}>{ label }</label><br /></> }
            {
                defaultValue
                ? (
                    <select 
                        name={name}
                        id={name}
                        onChange={onChange}
                        autoComplete="off"
                        defaultValue={defaultValue}
                    >
                        { children }
                    </select>
                ) : (
                    <select 
                        name={name}
                        id={name}
                        onChange={onChange}
                        autoComplete="off"
                        defaultValue={value}
                    >
                        { children }
                    </select>
                )
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


// // para inputs
// tooltip={{
//     anchor: "btn-inc-desc",
//     descripcion: "Incrementos o descuentos de<br/>la venta del producto actual",
// }}