interface Checkbox {
    label?:string;
    className?:string;
    name:string;
    checked:any;
    handlerCheck:any;
}

export const Checkbox3 = ({ label, name, checked, handlerCheck, className }:Checkbox) => {
    return (
        <div>
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