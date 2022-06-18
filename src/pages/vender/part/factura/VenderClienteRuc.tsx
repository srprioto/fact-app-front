import { Input } from "../../../../components/forms/Input"
import { InputMk } from "../../../../components/forms/InputMk";
import { ParrafoForm } from "../../../../components/forms/ParrafoForm"
// import { InputDisable } from "../../forms/InputDisable";

interface clienteRuc {
    errors:any
    cliente:any;
    // setCliente:Function;
}

export const VenderClienteRuc = ({ errors, cliente }:clienteRuc) => {
    
    // const handlerOnChangeCliente = (e:any) => { 
    //     setCliente({
    //         ...cliente,
    //         [e.target.name]: e.target.value
    //     })
    // }


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

            {/* aqu direccion */}
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
                <InputMk 
                    label="Telefono"
                    type="text"
                    name="telefono"
                    error={errors.telefono}
                />
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
