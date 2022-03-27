import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { FormCrearUser } from "./FormCrearUser";

import { post } from "../../../resources/fetch";
import { USUARIOS } from "../../../resources/routes";

export const NuevoUsuario = () => {
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateUser = async (data:any) => { 
        setLoading(true);
        try {
            await post(data, USUARIOS);
            setLoading(false);
            navigate('/usuarios')
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    return (
        <div className="nuevo-usuario">
            <TitleBox titulo="Crear usuario" link="/usuarios"/>

            <div className="box">

                <h3>Crear un nuevo usuario</h3>

                <FormCrearUser handlerCreate={handlerCreateUser} loading={loading} />

            </div>
        </div>
    )
};
