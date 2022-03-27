import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { FormEditProveedor } from "./FormEditProveedor";

import { CreateProveedoresDto } from "../../../resources/dtos/ProveedoresDto";
import { put } from "../../../resources/fetch";
import { PROVEEDORES } from "../../../resources/routes";

export const EditarProveedor = () => {

    const navigate = useNavigate();
    const params:any = useParams()

    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const handlerEditProveedor = async (data:CreateProveedoresDto) => { 
        setLoadingUpdate(true);
        try {
            await put(params.id, data, PROVEEDORES);
            setLoadingUpdate(false);
            navigate('/proveedores')
        } catch (error) {
            setLoadingUpdate(true);
            console.log(error);
        } 
    }

    return (
        <div className="editar-proveedor">
                
            <TitleBox titulo="Editar proveedor" link="/proveedores"/>

            <div className="box">

                <h3>Editar informacion de proveedor</h3>

                <FormEditProveedor 
                    id={params.id} 
                    handlerEditProveedor={handlerEditProveedor} 
                    loadingUpdate={loadingUpdate} 
                />

            </div>

        </div>
    )
};
