import { Formik } from "formik";
import { ValidClienteDni } from "../../../../resources/validations/Clientes";
import { InputMk } from "../../../../components/forms/InputMk";

interface clienteDni {
    cliente:any;
    setCliente:Function;
}

export const VenderClienteDni = ({ cliente, setCliente }:clienteDni) => {

    const handlerOnChangeCliente = (e:any) => { 
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    return (

        <Formik
            initialValues={cliente}
            validationSchema={ValidClienteDni}
            onSubmit={(data, { resetForm }) => { 
                // const updateCliente = cliente
                // console.log("correcto");
                // console.log(data);
                
                
            }}
        >
            {({ errors }:any) => (

                <form className="grid-2 gap" onChange={handlerOnChangeCliente}>
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
                    
                </form>

            )}

        </Formik>
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