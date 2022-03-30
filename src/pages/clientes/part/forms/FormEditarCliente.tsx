import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiReply } from "react-icons/bi";

import { InputMk } from "../../../../components/forms/InputMk";
import { Loading } from "../../../../components/loads/Loading";
import { LoadSwitchBtn } from "../../../../components/btns/LoadSwitchBtn";

import { getOne } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";
import { ValidCreateCliente } from "../../../../resources/validations/Clientes";


export const FormEditarCliente = ({ id, handlerEdit, loadingUpdate }:any) => {

    const [loadingGetOne, setLoadingGetOne] = useState<boolean>(false);
    const [cliente, setCliente] = useState<any>({
        nombre: "",
        documento: "",
        direccion: "",
        telefono: "",
        email: ""
    });

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
            validationSchema={ValidCreateCliente}
            onSubmit={(data, { resetForm }) => { 
                handlerEdit({
                    nombre: data.nombre,
                    documento: data.documento,
                    direccion: data.direccion,
                    telefono: data.telefono,
                    email: data.email,
                });
                     
            }}
        >
            
            {({ errors }) => (

                loadingGetOne
                ? <Loading />
                : (

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
