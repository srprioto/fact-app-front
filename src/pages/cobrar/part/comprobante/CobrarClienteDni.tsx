import { InputDisable } from "../../../../components/forms/InputDisable";
import { InputMk } from "../../../../components/forms/InputMk";

interface clienteDni {
    errors:any;
    cliente:any;
    switchChange?:boolean;
}

export const CobrarClienteDni = ({ errors, cliente, switchChange = true }:clienteDni) => {

    // const handlerOnChangeCliente = (e:any) => { 
    //     setCliente({
    //         ...cliente,
    //         [e.target.name]: e.target.value
    //     })
    // }

    return (
        <div className="grid-1 gap">
            <div className="grid-2 gap">
                {
                    switchChange
                    ? (
                        <InputMk 
                            label="Nombre del cliente"
                            type="text"
                            name="nombre"
                            error={errors.nombre}
                        /> 
                    ) : (
                        <InputDisable
                            label="Nombre del cliente"
                            value={cliente.nombre}
                        />
                    )
                }
                {
                    switchChange
                    ? (
                        <InputMk 
                            label="Telefono"
                            type="text"
                            name="telefono"
                            error={errors.telefono}
                        /> 
                    ) : (
                        <InputDisable
                            label="Telefono"
                            value={cliente.telefono}
                        />
                    )
                }
                {
                    switchChange
                    ? (
                        <InputMk 
                            label="Direccion"
                            type="text"
                            name="direccion"
                            error={errors.direccion}
                        /> 
                    ) : (
                        <InputDisable
                            label="Direccion"
                            value={cliente.direccion}
                        />
                    )
                }
                {
                    switchChange
                    ? (
                        <InputMk 
                            label="E-mail"
                            type="text"
                            name="email"
                            error={errors.email}
                        /> 
                    ) : (
                        <InputDisable
                            label="E-mail"
                            value={cliente.email}
                        />
                    )
                }
                
            </div>
        </div>
    )
}
