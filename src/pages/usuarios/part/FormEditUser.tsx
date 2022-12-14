import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { BiBrush } from "react-icons/bi";

import { InputMk } from "../../../components/forms/InputMk";
import { SelectMk } from "../../../components/forms/SelectMk";
import { Loading } from "../../../components/loads/Loading";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";

// import { UsuarioEditDto } from "../../../resources/dtos/UsuariosDto";
import { get, getOne } from "../../../resources/fetch";
import { LOCALES_SOLO, ROLES, USUARIOS } from "../../../resources/routes";
import { Roles } from "../../../resources/dtos/RolesDto";
import { ValidEditUsuario } from "../../../resources/validations/Usuarios";

// import { ValidCreateUsuario, ValidEditUsuario } from "../../../resources/validations/Usuarios";

// interface FormEditUser{
//     id:number; 
//     handlerEdit:Function;
//     loadUpdate:boolean;
// }

export const FormEditUser = ({ id, handlerEdit, loadUpdate }:any) => {

    const [loadingGetOne, setLoadingGetOne] = useState<boolean>(false);
    const [locales, setLocales] = useState<any>([]);
    const [roles, setRoles] = useState<any>([]);
    const [usuario, setUsuario] = useState<any>({});


    useEffect(() => {
        getDataOne();    
    }, []);


    const getDataOne = async () => { 
        setLoadingGetOne(true);
        try {
            const response_productos = await getOne(id, USUARIOS);
            setUsuario({
                nombre: response_productos.nombre,
                documento: response_productos.documento,
                direccion: response_productos.direccion,
                edad: response_productos.edad,
                telefono: response_productos.telefono,
                email: response_productos.email,
                password: "",
                rolesId: response_productos.roles ? response_productos.roles.id : "",
                localesId: response_productos.locales ? response_productos.locales.id : ""
            });
            const data = await get(ROLES);
            const locales = await get(LOCALES_SOLO);
            setLocales(locales);
            setRoles(data);
            setLoadingGetOne(false);
        } catch (error) {
            setLoadingGetOne(true);
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
            enableReinitialize={true}
            initialValues={usuario}
            validationSchema={ValidEditUsuario}
            onSubmit={(data, { resetForm }) => { 

                let local:number|null = null

                if (checkRolUser(data.rolesId)) {
                    local = data.localesId ? data.localesId : null;
                } else {
                    local = null;
                }
                
                if (data.password !== "") {
                    handlerEdit({
                        nombre: data.nombre,
                        documento: data.documento,
                        direccion: data.direccion,
                        edad: data.edad,
                        telefono: data.telefono,
                        email: data.email,
                        password: data.password,
                        rolesId: data.rolesId,
                        localesId: local
                    });    
                } else{
                    handlerEdit({
                        nombre: data.nombre,
                        documento: data.documento,
                        direccion: data.direccion,
                        edad: data.edad,
                        telefono: data.telefono,
                        email: data.email,
                        rolesId: data.rolesId,
                        localesId: local
                    });
                }

            }}
        >
            {({ values, errors }) => (

                loadingGetOne
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
                        <div className="grid-4 gap">
                            <SelectMk
                                label="Rol del usuario"
                                name="rolesId"
                                error={errors.rolesId}
                                defaultValue={false}
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

                            <div></div>
                        </div>

                        <div className="grid-4 gap mt-25">
                            <div />

                            <LoadSwitchBtn label="Editar Usuario" loading={loadUpdate} />

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
