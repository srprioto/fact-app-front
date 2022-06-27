import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiReply } from "react-icons/bi";

import { InputMk } from "../../../../components/forms/InputMk";
import { Loading } from "../../../../components/loads/Loading";
import { LoadSwitchBtn } from "../../../../components/btns/LoadSwitchBtn";

import { getOne } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";
import { ValidRegistroClienteDni, ValidRegistroClienteRuc } from "../../../../resources/validations/Clientes";
import { SelectMk } from "../../../../components/forms/SelectMk";
import { InputDisable } from "../../../../components/forms/InputDisable";
import { initialCrearCliente } from "../../../../resources/dtos/Cliente";


export const FormEditarCliente = ({ id, handlerEdit, loadingUpdate }:any) => {

    const [loadingGetOne, setLoadingGetOne] = useState<boolean>(false);
    const [cliente, setCliente] = useState<any>(initialCrearCliente);

    useEffect(() => {
        getDataOne();
    }, []);
    
    const getDataOne = async () => { 
        setLoadingGetOne(true);
        try {
            const response_productos = await getOne(id, CLIENTES);
            setCliente(response_productos);
            setLoadingGetOne(false);
        } catch (error) {
            setLoadingGetOne(true);
            console.log(error);     
        }
    }


    return (
        <Formik
            enableReinitialize={true}
            initialValues={cliente}
            validationSchema={cliente.tipoDocumento === "DNI" ? ValidRegistroClienteDni : ValidRegistroClienteRuc}
            onSubmit={(data) => { 
                handlerEdit({
                    tipoDocumento: data.tipoDocumento,
                    numero_documento: data.numero_documento,
                    razonSocial: data.razonSocial,
                    nombreComercial: data.nombreComercial,
                    codigo_pais: data.codigo_pais,
                    departamento: data.departamento,
                    provincia: data.provincia,
                    distrito: data.distrito,
                    nombre: data.nombre,
                    direccion: data.direccion,
                    telefono: data.telefono,
                    email: data.email,
                    ubigeo: data.ubigeo
                });
                     
            }}
        >
            
            {({ errors, values }) => (

                loadingGetOne
                ? <Loading />
                : (

                    <Form className="grid-1 gap mt-25 mb-25">

                        <h4 className="desc-form">Informacion de registro</h4>
                        <div className="grid-2 gap">

                            {/* <SelectMk
                                label="Tipo de documento"
                                type="text"
                                name="tipoDocumento"
                                error={errors.tipoDocumento}
                            >
                                <option value="DNI">DNI</option>
                                <option value="RUC">RUC</option>
                            </SelectMk> */}

                            <InputDisable
                                label="Tipo de documento"
                                value={values.tipoDocumento}
                            />

                            {/* <div>
                                <InputMk 
                                    // label="Documento"
                                    type="text"
                                    name="numero_documento"
                                    error={errors.numero_documento}
                                />
                            </div> */}

                            <InputDisable
                                label="Documento"
                                value={values.numero_documento}
                            />

                        </div>

                        <h4 className="desc-form">Informacion del cliente</h4>
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
                                    label="Email"
                                    type="text"
                                    name="email"
                                    error={errors.email}
                                />
                            </div>

                        </div>

                        <h4 className="desc-form">Ubicacion</h4>
                        <div className="grid-3 gap">

                            <InputMk 
                                label="Direccion"
                                type="text"
                                name="direccion"
                                error={errors.direccion}
                            />

                            <SelectMk
                                label="Codigo del país"
                                type="text"
                                name="codigo_pais"
                                error={errors.codigo_pais}
                            >
                                <option value="PE">Perú</option>
                            </SelectMk>

                            <InputMk 
                                label="Ubigeo"
                                type="text"
                                name="ubigeo"
                                error={errors.ubigeo}
                            />
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

                        <div className="grid-4 gap mt-15">
                            <div />

                            <LoadSwitchBtn label="Editar cliente" loading={loadingUpdate} />

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
}
