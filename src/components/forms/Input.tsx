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

export const Input = ({ label, type = "text", name, value, placeholder, onChange, color = "", moneda, noMenos }:input) => {
    return (
        <div className="wrap-form">
            {
                label && (<><label htmlFor={name}>{ label }</label><br /></>)
            }
            <div className="relative">

                {
                    type === "text"
                    ? (
                        <input 
                            type={type}
                            name={name} 
                            id={name} 
                            value={value === 0 || value === isNaN ? "" : value}
                            onChange={onChange}
                            placeholder={placeholder}
                            autoComplete="off"
                        />
                    ) : type === "number" 
                    ? (
                        noMenos
                        ? (
                            <input 
                                type={type} 
                                name={name} 
                                id={name}
                                // step="0.01"
                                value={
                                    value === isNaN || 
                                    value === undefined || 
                                    value === null || 
                                    value === "" || 
                                    value === isNaN ||
                                    value <= 0
                                    ? "" 
                                    : value
                                }
                                onChange={onChange}
                                placeholder={placeholder}
                                autoComplete="off"
                                min="0"
                            />  
                        ) : (
                            <input 
                                className={color}
                                type={type} 
                                // step="0.01"
                                name={name} 
                                id={name} 
                                value={
                                    value === isNaN || 
                                    value === undefined || 
                                    value === null || 
                                    value === "" || 
                                    value === isNaN
                                    ? "" 
                                    : value
                                }
                                onChange={onChange}
                                placeholder={placeholder}
                                autoComplete="off"
                            />  
                        )
                              
                    ) : (
                        <input 
                        type={type} 
                        name={name} 
                        id={name} 
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        autoComplete="off"
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