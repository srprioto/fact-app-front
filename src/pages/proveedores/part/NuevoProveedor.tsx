import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { FormCrearProveedor } from "./FormCrearProveedor";

import { CreateProveedoresDto } from "../../../resources/dtos/ProveedoresDto";
import { post } from "../../../resources/fetch";
import { PROVEEDORES } from "../../../resources/routes";

export const NuevoProveedor = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateProveedor = async (data:CreateProveedoresDto) => { 
        setLoading(true);
        try {
            await post(data, PROVEEDORES);
            setLoading(false);
            navigate(-1)
        } catch (error) {
            setLoading(true);
            console.log(error);
        } 
    }

    return (
        <div className="nuevo-proveedor">
            
            <TitleBox titulo="Crear proveedor" back/>

            <div className="box">

                <h3>Crear un nuevo proveedor</h3>

                <FormCrearProveedor handlerCreateProveedor={handlerCreateProveedor} loading={loading} />

            </div>

        </div>
    )
};
