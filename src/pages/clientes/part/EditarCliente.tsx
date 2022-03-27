import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { FormEditarCliente } from "./forms/FormEditarCliente";

import { put } from "../../../resources/fetch";
import { CLIENTES } from "../../../resources/routes";

export const EditarCliente = () => {

    const navigate = useNavigate();
    const params:any = useParams()

    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const handlerEdit = async (data:any) => { 
        setLoadingUpdate(true);
        try {
            await put(params.id, data, CLIENTES);
            setLoadingUpdate(false);
            navigate('/clientes')
        } catch (error) {
            setLoadingUpdate(true);
            console.log(error);
        } 
    }

    
    return (
        <div className="editar-cliente">
                
            <TitleBox titulo="Editar cliente" back/>

            <div className="box">

                <h3>Editar informacion del cliente</h3>

                <FormEditarCliente 
                    id={params.id} 
                    handlerEdit={handlerEdit} 
                    loadingUpdate={loadingUpdate} 
                />

            </div>

        </div>
    )
}
