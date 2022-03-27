import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { FormEditUser } from "./FormEditUser";

import { put } from "../../../resources/fetch";
import { USUARIOS } from "../../../resources/routes";

export const EditarUsuario = () => {

    const navigate = useNavigate();
    const params:any = useParams()

    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const handlerEditProveedor = async (data:any) => { 
        setLoadingUpdate(true);
        try {
            await put(params.id, data, USUARIOS);
            setLoadingUpdate(false);
            navigate('/usuarios')
        } catch (error) {
            setLoadingUpdate(true);
            console.log(error);
        } 
    }


    return (
        <div className="nuevo-usuario">
                
            <TitleBox titulo="Editar proveedor" link="/usuarios"/>

            <div className="box">

                <h3>Editar informacion de usuario</h3>

                <FormEditUser
                    id={params.id} 
                    handlerEdit={handlerEditProveedor} 
                    loadUpdate={loadingUpdate} 
                />

            </div>

        </div>
    )
};
