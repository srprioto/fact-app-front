import { BiQuestionMark } from "react-icons/bi";
import { ToolTip } from "../tooltip/ToolTip";

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface input {
    label?:string;
    type?:string;
    name:string;
    value:any;
    onChange:any;
    placeholder?:string;
    color?:string;
    colorLabel?:string;
    className?:string;
    msgErr?:string|boolean;
    moneda?:boolean;
    noMenos?:boolean;
    noMas?:boolean;
    tooltip?:toolTip;
}

export const Input = ({ 
    label, 
    type = "text", 
    name, 
    value, 
    placeholder, 
    onChange, 
    color = "",
    colorLabel,
    className = "",
    msgErr,
    moneda, 
    noMenos,
    noMas,
    tooltip
}:input) => {

    // const checkValue = () => { 
    //     if (
    //         // value === isNaN ||
    //         // value === "" || 
    //         value === isNaN || 
    //         value === undefined || 
    //         value === null || 
    //         value <= 0
    //     ) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    return (
        <div className="wrap-form" id={tooltip && tooltip.anchor}>
            { label && (<><label className={colorLabel} htmlFor={name}>{ label }</label><br /></>) }
            <div className="relative">
                {
                    type === "text"
                    ? (
                        <TextEstandar
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
                            className={className}
                        />
                        
                    ) : type === "number" 
                    ? (
                        // numbers
                        noMenos
                        ? (
                            <NumberNoMenor
                                name={name}
                                value={value}
                                placeholder={placeholder}
                                onChange={onChange}
                                className={className}
                            />
                        ) : noMas
                        ? (
                            <NumberNoMas
                                name={name}
                                value={value}
                                placeholder={placeholder}
                                onChange={onChange}
                                className={className}
                            />
                            
                        ) : (
                            <NumberEstandar
                                name={name}
                                value={value}
                                placeholder={placeholder}
                                onChange={onChange}
                                color={color}
                                className={className}
                            />
                        )  
                    ) : (
                        // otros
                        <InputOtros
                            type={type}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
                            className={className}
                        />
                    )
                }
                {
                    !!msgErr
                    && <MsgError msgErr={msgErr} />
                }
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
};


const TextEstandar = ({ 
    name, 
    value, 
    placeholder, 
    onChange, 
    className
}:input) => { 
    return (
        <input 
            className={className}
            type="text"
            name={name} 
            id={name} 
            value={value === 0 || value === isNaN ? "" : value}
            onWheel={ event => event.currentTarget.blur() }
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
        />
    );
}

const NumberNoMenor = ({ 
    name, 
    value, 
    placeholder, 
    onChange, 
    className
}:input) => { 
    return (
        <input 
            className={className}
            type="number" 
            name={name} 
            id={name}
            value={
                value === isNaN ||
                value === undefined ||
                value === null ||
                value <= 0
                ? ""
                : value
            }
            onWheel={ event => event.currentTarget.blur() }
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            min="0"
        />
    );
}

const NumberNoMas = ({ 
    name, 
    value, 
    placeholder, 
    onChange, 
    className
}:input) => { 
    return (
        <input 
            className="danger-i"
            type="number" 
            name={name} 
            id={name}
            value={
                value === isNaN ||
                value === undefined ||
                value === null ||
                value >= 0
                ? ""
                : value
            }
            onWheel={ event => event.currentTarget.blur() }
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            max="0"
        />
    );
}

const NumberEstandar = ({ 
    name, 
    value, 
    placeholder, 
    onChange, 
    color = "",
    className
}:input) => { 
    return (
        <input 
            className={color + " " + className}
            type="number" 
            name={name} 
            id={name} 
            value={
                value === isNaN ||
                value === undefined ||
                value === null ||
                value === 0
                ? "" 
                : value
            }
            onWheel={ event => event.currentTarget.blur() }
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
        />  
    );
}

const InputOtros = ({ 
    type, 
    name, 
    value, 
    placeholder, 
    onChange, 
    className
}:any) => { 
    return (
        <input 
            className={className}
            type={type} 
            name={name} 
            id={name} 
            value={value}
            onWheel={ event => event.currentTarget.blur() }
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
        /> 
    );
}

const MsgError = ({ msgErr }:any) => { 
    return (
        <div className="msg-error">
            <BiQuestionMark />
            <h5 className="error-message">{msgErr}</h5>
        </div>
    )
}


/*
<Input
    label="Precio de compra del paquete"
    type="number"
    name="precio_parcial"
    value={movDetails.precio_parcial}
    onChange={handlerChangeMovimientoDetalles}
    moneda
/>
*/

/*
para capturar el onChange

setTransferencia({
    ...transferencia,
    [e.target.name]: e.target.value
})

*/



// input original

/* <input 
    type={type} 
    name={name} 
    id={name} 
    value={
        type === 'text' 
        ? (value === 0 || value === isNaN ? "" : value)
        : type === 'number' 
        ? (
            value === isNaN || value === undefined || value === null || value === "" || value == isNaN
            ? 0 
            : value
        ) : value
    }
    onChange={onChange}
    placeholder={placeholder}
    autoComplete="off"
/> */


// añadir tooltip
// tooltip={{
//     anchor: "btn-conf-venta",
//     descripcion: "Requiere la información del cliente"
// }}