import { Form, Formik } from "formik"
import { BiBrush } from "react-icons/bi";

import { InputMk } from "../../../../components/forms/InputMk";
import { LoadSwitchBtn } from "../../../../components/LoadSwitchBtn";

import { ValidCreateCliente } from "../../../../resources/validations/Clientes";


export const FormCrearCliente = ({ handlerCreate, loading }:any) => {
    return (
        <Formik
        
            initialValues={{
                nombre: "",
                documento: "",
                direccion: "",
                telefono: "",
                email: ""
            }}

            validationSchema={ValidCreateCliente}

            onSubmit={(data, { resetForm }) => { 
                handlerCreate(data);
                resetForm();                
            }}
        
        >
            
            {({ errors }) => (

                <Form className="grid-1 gap mt-25 mb-25">

                    <h4 className="desc-form">Informacion personal</h4>
                    <div className="grid-2 gap">

                        <InputMk 
                            label="Nombre del cliente"
                            type="text"
                            name="nombre"
                            error={errors.nombre}
                        />
                        <InputMk 
                            label="Documento"
                            type="text"
                            name="documento"
                            error={errors.documento}
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
                            label="Email"
                            type="text"
                            name="email"
                            error={errors.email}
                        />
                    </div>

                    <div className="grid-4 gap mt-15">
                        <div />

                        <LoadSwitchBtn label="Registrar cliente" loading={loading} />

                        <button className="btn btn-primary" type="reset">
                            <BiBrush />
                            Limpiar
                        </button>

                        <div />
                    </div>

                </Form>

            )}
            
        </Formik>
    )
}
