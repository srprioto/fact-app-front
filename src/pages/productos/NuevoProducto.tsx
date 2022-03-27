import { useState } from "react";

import { Layout } from "../../components/layouts/Layout"
import { CrearCantidad } from "../almacen/part/CrearCantidad";

import { post } from "../../resources/fetch";
import { PRODUCTOS } from "../../resources/routes";
import { TitleBox } from "../../components/TitleBox";
import { FormsCrearProducto } from "./part/FormsCrearProducto";
import { useNavigate } from "react-router-dom";

export const NuevoProducto = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    // const [modal, setModal] = useState<boolean>(false);
    // const [idProducto, setIdProducto] = useState<number>(0);

    const handlerCreateProducto = async (data:any) => { 
        setLoading(true);
        try {
            const response = await post(data, PRODUCTOS);
            // setIdProducto(response.data.id);
            setLoading(false);
            navigate('/productos')
            // setModal(!modal);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="nuevo-producto">

                <TitleBox titulo="Crear producto" back={true}/>
                
                <div className="box">

                    <h3>Crear un nuevo producto</h3>

                    <FormsCrearProducto 
                        handlerCreateProducto={handlerCreateProducto} 
                        loading={loading}
                    />

                </div>                

            </div>

            {/* <CrearCantidad modal={modal} id={idProducto} /> */}

        </Layout>
    )
};
