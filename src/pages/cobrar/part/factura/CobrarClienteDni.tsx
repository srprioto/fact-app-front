import { Input } from "../../../../components/forms/Input"
import { InputDisable } from "../../../../components/forms/InputDisable";

interface clienteDni {
    cliente:any;
    setCliente:Function;
    switchChange?:boolean;
}

export const CobrarClienteDni = ({ cliente, setCliente, switchChange = true }:clienteDni) => {

    const handlerOnChangeCliente = (e:any) => { 
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="grid-1 gap">
            <div className="grid-2 gap">
                {
                    switchChange
                    ? (
                        <Input
                            label="Nombre del cliente"
                            type="text"
                            name="nombre"
                            value={cliente.nombre}
                            onChange={handlerOnChangeCliente}
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
                        <Input
                            label="Telefono"
                            type="text"
                            name="telefono"
                            value={cliente.telefono}
                            onChange={handlerOnChangeCliente}
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
                        <Input
                            label="Direccion"
                            type="text"
                            name="direccion"
                            value={cliente.direccion}
                            onChange={handlerOnChangeCliente}
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
                        <Input
                            label="E-mail"
                            type="text"
                            name="email"
                            value={cliente.email}
                            onChange={handlerOnChangeCliente}
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
