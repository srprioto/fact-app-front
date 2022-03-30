import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { BiBrush } from "react-icons/bi";

import { InputMk } from "../../../components/forms/InputMk";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";
import { SelectMk } from "../../../components/forms/SelectMk";

import { ROLES } from "../../../resources/routes";
import { get } from "../../../resources/fetch";
import { ValidCreateUsuario } from "../../../resources/validations/Usuarios";

export const FormCrearUser = ({ handlerCreate, loading }:any) => {

    const [roles, setRoles] = useState<any>([]);
    const [loadRoles, setLoadRoles] = useState<boolean>(false);

    useEffect(() => {
        getRoles()
    }, []);
    
    const getRoles = async () => { 

        setLoadRoles(true);
        try {
            const data = await get(ROLES);
            setRoles(data);            
            setLoadRoles(false);
        } catch (error) {
            setLoadRoles(true);
            console.log(error);
        }
    }

    return (
        <Formik
            initialValues={{
                nombre: "",
                documento: "",
                direccion: "",
                edad: "",
                telefono: "",
                email: "",
                password: "",
                rolesId: ""
            }}

            validationSchema={ValidCreateUsuario}

            onSubmit={(data, { resetForm }) => { 
                handlerCreate(data);
                resetForm();
            }}
        >

            {({ errors }) => (

                <Form className="grid-1 gap mt-25 mb-25">

                    <h4 className="desc-form">Informacion personal</h4>
                    <div className="grid-3 gap">
                        <InputMk 
                            label="Nombre"
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
                        <InputMk 
                            label="Direccion"
                            type="text"
                            name="direccion"
                            error={errors.direccion}
                        />
                        <InputMk 
                            label="Edad"
                            type="text"
                            name="edad"
                            error={errors.edad}
                        />
                        <InputMk 
                            label="Telefono"
                            type="text"
                            name="telefono"
                            error={errors.telefono}
                        />
                    </div>

                    <h4 className="desc-form">Informacion de registro</h4>
                    <div className="grid-2 gap">
                        <InputMk 
                            label="Email"
                            type="text"
                            name="email"
                            error={errors.email}
                        />
                        <InputMk 
                            label="Password"
                            type="password"
                            name="password"
                            error={errors.password}
                        />
                    </div>
                    <div className="grid-3 gap mb-25">
                        <div></div>
                        <SelectMk
                            label="Rol del usuario"
                            name="rolesId"
                            error={errors.rolesId}
                            loading={loadRoles}
                        >
                            {
                                roles.map((rol:any) => {
                                    return (
                                        <option key={rol.id} value={rol.id}>{ rol.descripcion }</option>
                                    )
                                })                                 
                            }
                        </SelectMk>
                        <div></div>
                    </div>

                    <div className="grid-4 gap mt-25">
                        <div />

                        <LoadSwitchBtn label="Crear Usuario" loading={loading} />

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



