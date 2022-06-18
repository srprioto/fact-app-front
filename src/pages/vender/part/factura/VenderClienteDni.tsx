import { InputMk } from "../../../../components/forms/InputMk";

interface clienteDni {
    errors:any;
    // cliente:any;
    // setCliente:Function;
    // handlerOnChangeCliente:any
}

export const VenderClienteDni = ({ errors }:clienteDni) => {

    return (

        <div className="grid-2 gap">
            <InputMk 
                label="Nombre del cliente"
                type="text"
                name="nombre"
                error={errors.nombre}
            /> 
            <InputMk 
                label="Telefono"
                type="text"
                name="telefono"
                error={errors.telefono}
            /> 
            <InputMk 
                label="Direccion"
                type="text"
                name="direccion"
                error={errors.direccion}
            /> 
            <InputMk 
                label="E-mail"
                type="text"
                name="email"
                error={errors.email}
            /> 
            
        </div>

    )
}


/* 

<Input
    label="Nombre del cliente"
    type="text"
    name="nombre"
    value={cliente.nombre}
    onChange={handlerOnChangeCliente}
/>
<Input
    label="Telefono"
    type="text"
    name="telefono"
    value={cliente.telefono}
    onChange={handlerOnChangeCliente}
/> 
<Input
    label="Direccion"
    type="text"
    name="direccion"
    value={cliente.direccion}
    onChange={handlerOnChangeCliente}
/>
<Input
    label="E-mail"
    type="text"
    name="email"
    value={cliente.email}
    onChange={handlerOnChangeCliente}
/>

*/