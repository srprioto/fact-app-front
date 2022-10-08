import { InputMk } from "../../../../components/forms/InputMk"

export const FormsClienteCred = ({ errors }:any) => {
    return (
        <div className="grid-2 gap mt-20">

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
