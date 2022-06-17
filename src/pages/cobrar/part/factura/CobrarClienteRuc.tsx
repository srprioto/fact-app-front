// import { Input } from "../../forms/Input"
// import { InputDisable } from "../../forms/InputDisable";
// import { ParrafoForm } from "../../forms/ParrafoForm"

import { Input } from "../../../../components/forms/Input";
import { InputDisable } from "../../../../components/forms/InputDisable";
import { ParrafoForm } from "../../../../components/forms/ParrafoForm";

interface clienteRuc {
    cliente:any;
    setCliente:Function;
    switchChange?:boolean;
}

export const CobrarClienteRuc = ({ cliente, setCliente, switchChange = true }:clienteRuc) => {

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
                            label="Razon social"
                            type="text"
                            name="razonSocial"
                            value={cliente.razonSocial}
                            onChange={handlerOnChangeCliente}
                        />
                    ) : (
                        <InputDisable
                            label="Razon social"
                            value={cliente.razonSocial}
                        />
                    )
                }
                {
                    switchChange
                    ? (
                        <Input
                            label="Nombre comercial"
                            type="text"
                            name="nombreComercial"
                            value={cliente.nombreComercial}
                            onChange={handlerOnChangeCliente}
                        />
                    ) : (
                        <InputDisable
                            label="Nombre comercial"
                            value={cliente.nombreComercial}
                        />
                    )
                }
                
                
            </div>

            {/* aqu direccion */}
            

            <div className="grid-3 gap">
                {
                    switchChange
                    ? (
                        <Input
                            label="Departamento"
                            type="text"
                            name="departamento"
                            value={cliente.departamento}
                            onChange={handlerOnChangeCliente}
                        />
                    ) : (
                        <InputDisable
                            label="Departamento"
                            value={cliente.departamento}
                        />
                    )
                }
                {
                    switchChange
                    ? (
                        <Input
                            label="Provincia"
                            type="text"
                            name="provincia"
                            value={cliente.provincia}
                            onChange={handlerOnChangeCliente}
                        />
                    ) : (
                        <InputDisable
                            label="Provincia"
                            value={cliente.provincia}
                        />
                    )
                }
                {
                    switchChange
                    ? (
                        <Input
                            label="Distrito"
                            type="text"
                            name="distrito"
                            value={cliente.distrito}
                            onChange={handlerOnChangeCliente}
                        />
                    ) : (
                        <InputDisable
                            label="Distrito"
                            value={cliente.distrito}
                        />
                    )
                }
            </div>

            <div className="grid-3 gap">
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
            </div>

            <div className="grid-3 gap">

                {
                    cliente.estado
                    && (
                        <ParrafoForm
                            label="Estado del Contribuyente"
                            value={cliente.estado ? cliente.estado : "---"}
                            className={cliente.estado === "ACTIVO" ? "success" : ""}
                        />
                    )
                }
                {
                    cliente.condom
                    && (
                        <ParrafoForm
                            label="Condición del Contribuyente"
                            value={cliente.condom ? cliente.condom : "---"}
                            className={cliente.condom === "HABIDO" ? "success" : ""}
                        />
                    )
                }
                {
                    cliente.ubigeo !== 0
                    && (
                        <ParrafoForm
                            label="Ubigeo"
                            value={cliente.ubigeo}
                        />
                    )
                }              

            </div>

        </div>
    )
}
