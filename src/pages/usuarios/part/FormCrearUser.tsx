import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { BiBrush } from "react-icons/bi";

import { InputMk } from "../../../components/forms/InputMk";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";
import { SelectMk } from "../../../components/forms/SelectMk";

import { LOCALES_SOLO, ROLES } from "../../../resources/routes";
import { get } from "../../../resources/fetch";
import { ValidCreateUsuario } from "../../../resources/validations/Usuarios";
import { Roles } from "../../../resources/dtos/RolesDto";
import { Loading } from "../../../components/loads/Loading";

export const FormCrearUser = ({ handlerCreate, loading }:any) => {

    const [roles, setRoles] = useState<any>([]);
    const [locales, setLocales] = useState<any>([]);
    const [loadRoles, setLoadRoles] = useState<boolean>(false);


    useEffect(() => {
        getRoles();
    }, []);
    

    const getRoles = async () => { 

        setLoadRoles(true);
        try {
            const roles = await get(ROLES);
            const locales = await get(LOCALES_SOLO);
            setRoles(roles.reverse());
            setLocales(locales);
            setLoadRoles(false);
        } catch (error) {
            setLoadRoles(true);
            console.log(error);
        }
    }


    const checkRolUser = (rolId:any) => {
        if (rolId) {
            const rol:any = roles.find((e:any) => e.id === Number(rolId));
            if (rol) {
                if (rol.rol === Roles.ADMIN) {
                    return false;
                } else {
                    return true;
                }    
            }
        }
        return null
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
                rolesId: "3",
                localesId: "2"
            }}

            validationSchema={ValidCreateUsuario}

            onSubmit={(data, { resetForm }) => { 
                console.log(data);
                handlerCreate(data);
                resetForm();
            }}
        >

            {({ values, errors }:any) => (

                loadRoles
                ? <Loading />
                : (
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
                        <div className="grid-4 gap mb-25">
                            
                            <SelectMk
                                label="Rol del usuario"
                                name="rolesId"
                                error={errors.rolesId}
                            >
                                {
                                    roles.map((rol:any) => {
                                        return (
                                            <option key={rol.id} value={rol.id}>{ rol.descripcion }</option>
                                        )
                                    })
                                }
                            </SelectMk>
                            {
                                checkRolUser(values.rolesId)
                                && (
                                    <SelectMk
                                        label="Local ligado"
                                        name="localesId"
                                        error={errors.localesId}
                                    >
                                        {
                                            locales.map((e:any) => {
                                                return (
                                                    <option key={e.id} value={e.id}>{ e.nombre }</option>
                                                )
                                            })
                                        }
                                    </SelectMk>
                                )
                            }
                            
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
                )
            )}

        </Formik>
    )
};