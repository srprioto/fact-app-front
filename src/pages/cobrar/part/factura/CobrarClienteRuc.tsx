// import { Input } from "../../forms/Input"
// import { InputDisable } from "../../forms/InputDisable";
// import { ParrafoForm } from "../../forms/ParrafoForm"
// import { Input } from "../../../../components/forms/Input";
import { InputDisable } from "../../../../components/forms/InputDisable";
import { InputMk } from "../../../../components/forms/InputMk";
// import { ParrafoForm } from "../../../../components/forms/ParrafoForm";

interface clienteRuc {
    errors:any;
    cliente:any;
    setCliente:Function;
    switchChange?:boolean;
}

export const CobrarClienteRuc = ({ errors, cliente, setCliente, switchChange = true }:clienteRuc) => {

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
                            label="Razon social"
                            type="text"
                            name="razonSocial"
                            error={errors.razonSocial}
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
                        <InputMk 
                            label="Nombre comercial"
                            type="text"
                            name="nombreComercial"
                            error={errors.nombreComercial}
                        />
                    ) : (
                        <InputDisable
                            label="Nombre comercial"
                            value={cliente.nombreComercial}
                        />
                    )
                }                
            </div>

            <div className="grid-3 gap">
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

            <div className="grid-3 gap">
                {
                    switchChange
                    ? (
                        <InputMk 
                            label="Departamento"
                            type="text"
                            name="departamento"
                            error={errors.departamento}
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
                        <InputMk 
                            label="Provincia"
                            type="text"
                            name="provincia"
                            error={errors.provincia}
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
                        <InputMk 
                            label="Distrito"
                            type="text"
                            name="distrito"
                            error={errors.distrito}
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
