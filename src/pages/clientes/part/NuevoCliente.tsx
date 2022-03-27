import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { FormCrearCliente } from "./forms/FormCrearCliente";

import { post } from "../../../resources/fetch";
import { CLIENTES } from "../../../resources/routes";

export const NuevoCliente = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateUser = async (data:any) => { 
        setLoading(true);
        try {
            await post(data, CLIENTES);
            setLoading(false);
            navigate('/clientes')
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    return (
        <div className="nuevo-cliente">
            <TitleBox titulo="Crear cliente" back/>

            <div className="box">

                <h3>Crear un nuevo cliente</h3>

                <FormCrearCliente handlerCreate={handlerCreateUser} loading={loading} />

            </div>
        </div>
    )
}
