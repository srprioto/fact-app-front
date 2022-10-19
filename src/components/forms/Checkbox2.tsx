interface Checkbox {
    label?:string;
    name:string;
    checked:any;
    handlerCheck:any;
    classname?:string;
}

export const Checkbox2 = ({ label, name, checked, handlerCheck, classname }:Checkbox) => {
    return (
        <div className="checkbox wrap-switch">

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