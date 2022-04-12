interface checkbox {
    label?:string;
    name:string;
    value:any;
    onChange:any;
    checked?:any;
    children?:any;
    invertir?:boolean;
}

export const Checkbox = ({ label, name, value, onChange, checked, invertir, children }:checkbox) => {
    return (
        <div className={"checkbox " + (invertir && "switch-invertido")}>
            <input 
                id={name} 
                type="checkbox" 
                className="switch" 
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {
                label
                ? <label htmlFor={name}>{ label }</label>
                : <label htmlFor={name}>{ children }</label>
            }
            
        </div>
    )
}



// estructura:

// <Checkbox
//     key={e.id}
//     name="estado_detalle"
//     value={ e.estado_detalle }
//     onChange={ onChangeInput }
// >
//     {/* <p>{ e.transaccionDetalles.productos.codigo }</p>
//     <p>{ e.productos.nombre }</p> */}
// </Checkbox>


// const handlerChangeTransfDetalles = (e:any) => { 

//     let updatedList = [ ...checked ];
//     if (e.target.checked) {
//         updatedList = [ ...listaRechazados, Number(e.target.value)]; // en caso de que el valor sea numerico
//         updatedList = [ ...checked, e.target.value];
//     } else {
//         updatedList.splice(checked.indexOf(e.target.value), 1);
//     }

//     setChecked(updatedList);

// }