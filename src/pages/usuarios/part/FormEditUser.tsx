import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { BiBrush } from "react-icons/bi";

import { InputMk } from "../../../components/forms/InputMk";
import { SelectMk } from "../../../components/forms/SelectMk";
import { Loading } from "../../../components/loads/Loading";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";

import { UsuarioEditDto } from "../../../resources/dtos/UsuariosDto";
import { get, getOne } from "../../../resources/fetch";
import { ROLES, USUARIOS } from "../../../resources/routes";

// import { ValidCreateUsuario, ValidEditUsuario } from "../../../resources/validations/Usuarios";

// interface FormEditUser{
//     id:number; 
//     handlerEdit:Function;
//     loadUpdate:boolean;
// }

export const FormEditUser = ({ id, handlerEdit, loadUpdate }:any) => {

    const [loadingGetOne, setLoadingGetOne] = useState<boolean>(false);
    // const [loadRoles, setLoadRoles] = useState<boolean>(false);
    const [roles, setRoles] = useState<any>([]);
    const [usuario, setUsuario] = useState<UsuarioEditDto>({
        nombre: "",
        documento: "",
        direccion: "",
        edad: "",
        telefono: "",
        email: "",
        password: "",
        rolesId: ""
    });

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
                rolesId: response_productos.rolesId
            });
            const data = await get(ROLES);
            setRoles(data);
            setLoadingGetOne(false);
        } catch (error) {
            setLoadingGetOne(true);
            console.log(error);     
        }
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={usuario}
            // validationSchema={ValidEditUsuario}
            onSubmit={(data, { resetForm }) => { 

                if (data.password !== "") {
                    handlerEdit({
                        nombre: data.nombre,
                        documento: data.documento,
                        direccion: data.direccion,
                        edad: data.edad,
                        telefono: data.telefono,
                        email: data.email,
                        password: data.password,
                        rolesId: data.rolesId
                    });    
                } else{
                    handlerEdit({
                        nombre: data.nombre,
                        documento: data.documento,
                        direccion: data.direccion,
                        edad: data.edad,
                        telefono: data.telefono,
                        email: data.email,
                        rolesId: data.rolesId
                    });
                }

            }}
        >
            {({ errors }) => (

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
                        <div className="grid-3 gap mb-25">
                            <div></div>
                            <SelectMk
                                label="Rol del usuario"
                                name="rolesId"
                                error={errors.rolesId}
                                defaultValue={false}
                                // loading={loadRoles}
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
