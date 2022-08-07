interface input {
    label?:string;
    type?:string;
    name:string;
    value:any;
    onChange:any;
    placeholder?:string;
    color?:string;
    moneda?:boolean;
    noMenos?:boolean;
}

export const Input = ({ 
    label, 
    type = "text", 
    name, 
    value, 
    placeholder, 
    onChange, 
    color = "", 
    moneda, 
    noMenos
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
        <div className="wrap-form">
            {
                label && (<><label htmlFor={name}>{ label }</label><br /></>)
            }
            <div className="relative">
                {
                    type === "text"
                    ? (
                        <TextEstandar
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
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
                            />
                        ) : (
                            <NumberEstandar
                                name={name}
                                value={value}
                                placeholder={placeholder}
                                onChange={onChange}
                                color={color}
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
                        />
                    )
                }
                {
                    moneda
                    && <span className="moneda">S/.</span>
                }
            </div>
        </div>
    )
};


const TextEstandar = ({ 
    name, 
    value, 
    placeholder, 
    onChange, 
}:input) => { 
    return (
        <input 
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
}:input) => { 
    return (
        <input 
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

const NumberEstandar = ({ 
    name, 
    value, 
    placeholder, 
    onChange, 
    color = ""
}:input) => { 
    return (
        <input 
            className={color}
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
}:any) => { 
    return (
        <input 
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