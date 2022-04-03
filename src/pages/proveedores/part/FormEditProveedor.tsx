import { useEffect, useState } from 'react';
import { Formik, Form, } from 'formik';
import { BiReply } from 'react-icons/bi';

import { InputMk } from '../../../components/forms/InputMk';
import { SelectMk } from '../../../components/forms/SelectMk';
import { LoadSwitchBtn } from '../../../components/btns/LoadSwitchBtn';
import { Loading } from '../../../components/loads/Loading';

import { ValidCreateProveedores } from '../../../resources/validations/Proveedores';
import { PROVEEDORES } from '../../../resources/routes';
import { getOne } from '../../../resources/fetch';
import { CreateProveedoresDto } from '../../../resources/dtos/ProveedoresDto';

// interface FormEditProveedor {
//     id:number;
//     handlerEditProveedor:Function;
//     loadingUpdate:boolean;
// }

export const FormEditProveedor = ({ id, handlerEditProveedor, loadingUpdate }:any) => {
        
    const [loadingGetOne, setLoadingGetOne] = useState<boolean>(false);
    const [proveedor, setProveedor] = useState<CreateProveedoresDto>({
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
    });

    useEffect(() => {
        getDataOne();
    }, []);
    
    const getDataOne = async () => { 
        setLoadingGetOne(true);
        try {
            const response_productos = await getOne(id, PROVEEDORES);
            setProveedor(response_productos);
            setLoadingGetOne(false);
        } catch (error) {
            setLoadingGetOne(true);
            console.log(error);     
        }
    }
    
    return (
        <Formik
            enableReinitialize={true}
            initialValues={proveedor}
            validationSchema={ValidCreateProveedores}
            onSubmit={(data, { resetForm }) => { 
                handlerEditProveedor({
                    nombre: data.nombre,
                    razon_social: data.razon_social,
                    tipo_documento: data.tipo_documento,
                    documento: data.documento,
                    direccion: data.direccion,
                    telefono: data.telefono,
                    tel_movil: data.tel_movil,
                    email: data.email,
                    nombre_banco: data.nombre_banco,
                    nro_cuenta_bancaria: data.nro_cuenta_bancaria,
                    nombre_titular: data.nombre_titular,
                    tipo_producto: data.tipo_producto
                });
                resetForm();                
            }}
        >
            {({ errors }) => (

                loadingGetOne
                ? <Loading />
                : (                
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
                                defaultValue={false}
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

                            <LoadSwitchBtn label="Editar Proveedor" loading={loadingUpdate} />

                            <button className="btn btn-primary" type="reset">
                                <BiReply />
                                Restablecer valores
                            </button>

                            <div />
                        </div>

                    </Form>
                )
            )}

        </Formik>
    )
};
