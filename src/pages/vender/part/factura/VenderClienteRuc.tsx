import { InputDisable } from "../../../../components/forms/InputDisable";
import { InputMk } from "../../../../components/forms/InputMk";

interface clienteRuc {
    errors:any
    cliente:any;
}


export const VenderClienteRuc = ({ errors, cliente }:clienteRuc) => {
    
    return (
        <div className="grid-1 gap">
            <div className="grid-2 gap">
                <InputMk 
                    label="Razon social"
                    type="text"
                    name="razonSocial"
                    error={errors.razonSocial}
                /> 
                <InputMk 
                    label="Nombre comercial"
                    type="text"
                    name="nombreComercial"
                    error={errors.nombreComercial}
                />
            </div>

            <div className="grid-3 gap">
                <InputMk 
                    label="Direccion"
                    type="text"
                    name="direccion"
                    error={errors.direccion}
                />
                <InputMk 
                    label="Telefono"
                    type="text"
                    name="telefono"
                    error={errors.telefono}
                />
                <InputMk 
                    label="E-mail"
                    type="text"
                    name="email"
                    error={errors.email}
                />
            </div>

            <div className="grid-3 gap">
                <InputMk 
                    label="Departamento"
                    type="text"
                    name="departamento"
                    error={errors.departamento}
                />
                <InputMk 
                    label="Provincia"
                    type="text"
                    name="provincia"
                    error={errors.provincia}
                />
                <InputMk 
                    label="Distrito"
                    type="text"
                    name="distrito"
                    error={errors.distrito}
                />
            </div>

            <div className="grid-3 gap">

                <InputDisable
                    label="Estado del Contribuyente"
                    value={cliente.estado ? cliente.estado : "---"}
                    color={cliente.estado === "ACTIVO" ? "success" : ""}
                />
                <InputDisable
                    label="Condición del Contribuyente"
                    value={cliente.condom ? cliente.condom : "---"}
                    color={cliente.condom === "HABIDO" ? "success" : ""}
                />
                <InputDisable
                    label="Ubigeo"
                    value={cliente.ubigeo}
                />
                
            </div>

        </div>
    )

}
