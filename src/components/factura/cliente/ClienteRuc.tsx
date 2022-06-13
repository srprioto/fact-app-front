import { Input } from "../../forms/Input"
import { ParrafoForm } from "../../forms/ParrafoForm"

export const ClienteRuc = ({ cliente, handlerOnChangeCliente }:any) => {
    return (
        <div className="grid-1 gap">
            <div className="grid-2 gap">
                <Input
                    label="Razon social"
                    type="text"
                    name="razonSocial"
                    value={cliente.razonSocial}
                    onChange={handlerOnChangeCliente}
                />
                <Input
                    label="Nombre comercial"
                    type="text"
                    name="nombreComercial"
                    value={cliente.nombreComercial}
                    onChange={handlerOnChangeCliente}
                />
            </div>
            <Input
                label="Direccion"
                type="text"
                name="direccion"
                value={cliente.direccion}
                onChange={handlerOnChangeCliente}
            />
            <div className="grid-2 gap">
                <Input
                    label="Telefono"
                    type="text"
                    name="telefono"
                    value={cliente.telefono}
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
            <div className="grid-3 gap">
                <Input
                    label="Departamento"
                    type="text"
                    name="departamento"
                    value={cliente.departamento}
                    onChange={handlerOnChangeCliente}
                />
                <Input
                    label="Provincia"
                    type="text"
                    name="provincia"
                    value={cliente.provincia}
                    onChange={handlerOnChangeCliente}
                />
                <Input
                    label="Distrito"
                    type="text"
                    name="distrito"
                    value={cliente.distrito}
                    onChange={handlerOnChangeCliente}
                />
            </div>
            <div className="grid-3 gap">

                <ParrafoForm
                    label="Estado del Contribuyente"
                    value={cliente.estado ? cliente.estado : "---"}
                    className={cliente.estado === "ACTIVO" ? "success" : ""}
                />
                <ParrafoForm
                    label="Condición del Contribuyente"
                    value={cliente.condom ? cliente.condom : "---"}
                    className={cliente.condom === "HABIDO" ? "success" : ""}
                />
                <ParrafoForm
                    label="Ubigeo"
                    value={cliente.ubigeo}
                />

            </div>

        </div>
    )
}
