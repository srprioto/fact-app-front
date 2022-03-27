import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { put } from "../../../resources/fetch";

import { PRODUCTOS } from "../../../resources/routes";
import { FormEditProducto } from "./forms/FormEditProducto";

export const EditarProducto = () => {

    
    const navigate = useNavigate();
    const params:any = useParams()

    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const handlerEdit = async (data:any) => { 
        setLoadingUpdate(true);
        try {
            await put(params.id, data, PRODUCTOS);
            setLoadingUpdate(false);
            navigate('/productos')
        } catch (error) {
            setLoadingUpdate(true);
            console.log(error);
        } 
    }

    
    return (
        <div className="editar-productos">
                
            <TitleBox titulo="Editar productos" link="/productos"/>

            <div className="box">

                <h3>Editar informacion del producto</h3>

                <FormEditProducto 
                    id={params.id} 
                    handlerEdit={handlerEdit} 
                    loadingUpdate={loadingUpdate} 
                />

            </div>

        </div>
    )
}
