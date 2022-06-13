import { Input } from "../../forms/Input"

export const ClienteDni = ({ cliente, handlerOnChangeCliente }:any) => {
    return (
        <div className="grid-1 gap">
            <div className="grid-2 gap">
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
            </div>
        </div>
    )
}
