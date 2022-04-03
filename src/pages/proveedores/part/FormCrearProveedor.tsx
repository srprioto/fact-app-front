import { Formik, Form, } from 'formik';
import { BiBrush } from 'react-icons/bi';

import { InputMk } from '../../../components/forms/InputMk';
import { SelectMk } from '../../../components/forms/SelectMk';
import { LoadSwitchBtn } from '../../../components/btns/LoadSwitchBtn';

import { ValidCreateProveedores } from '../../../resources/validations/Proveedores';

export const FormCrearProveedor = ({ handlerCreateProveedor, loading }:any) => {
    return (
        <Formik
            initialValues={{
                nombre: "",
                razon_social: "",
                tipo_documento: "",
                documento: "",
                direccion: "",
                telefono: "",
                tel_movil: "",
                email: "",
                nombre_banco: "",
                nro_cuenta_bancaria: "",
                nombre_titular: "",
                tipo_producto: ""
            }}

            validationSchema={ValidCreateProveedores}

            onSubmit={(data, { resetForm }) => { 
                handlerCreateProveedor(data);
                resetForm();                
            }}
        >
            
            {({ errors }) => (

                <Form className="grid-1 gap mt-25 mb-25">

                    <h4 className="desc-form">Informacion de persona ó empresa</h4>
                    <div className="grid-3 gap">

                        <InputMk 
                            label="Nombre proveedor"
                            type="text"
                            name="nombre"
                            error={errors.nombre}
                        />
                        <InputMk 
                            label="Razon social"
                            type="text"
                            name="razon_social"
                            error={errors.razon_social}
                        />
                        <InputMk 
                            label="Direccion"
                            type="text"
                            name="direccion"
                            error={errors.direccion}
                        />

                    </div>

                    <div className="grid-3 gap">
                        <SelectMk
                            label="Tipo de documento"
                            type="text"
                            name="tipo_documento"
                            error={errors.tipo_documento}
                        >
                            <option value="DNI">DNI</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </SelectMk>

                        <InputMk 
                            label="Documento"
                            type="text"
                            name="documento"
                            error={errors.documento}
                        />

                        <InputMk 
                            label="Tipo de producto"
                            type="text"
                            name="tipo_producto"
                            error={errors.tipo_producto}
                        />
                        
                    </div>

                    <h4 className="desc-form">Informacion de contacto</h4>
                    <div className="grid-3 gap">
                        <InputMk 
                            label="Telefono"
                            type="text"
                            name="telefono"
                            error={errors.telefono}
                        />
                        <InputMk 
                            label="Celular"
                            type="text"
                            name="tel_movil"
                            error={errors.tel_movil}
                        />
                        <InputMk 
                            label="Email"
                            type="text"
                            name="email"
                            error={errors.email}
                        />
                    </div>

                    <h4 className="desc-form">Informacion bancaria</h4>
                    <div className="grid-3 gap">
                        <InputMk 
                            label="Nombre del banco"
                            type="text"
                            name="nombre_banco"
                            error={errors.nombre_banco}
                        />
                        <InputMk 
                            label="Nro de Cuenta"
                            type="text"
                            name="nro_cuenta_bancaria"
                            error={errors.nro_cuenta_bancaria}
                        />
                        <InputMk 
                            label="Nombre del titular"
                            type="text"
                            name="nombre_titular"
                            error={errors.nombre_titular}
                        />
                    </div>

                    <div className="grid-4 gap mt-15">
                        <div />

                        <LoadSwitchBtn label="Crear Proveedor" loading={loading} />

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
};
