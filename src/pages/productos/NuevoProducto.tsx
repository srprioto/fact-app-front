import { useState } from "react";

import { Layout } from "../../components/layouts/Layout"
// import { CrearCantidad } from "../almacen/part/CrearCantidad";

import { post } from "../../resources/fetch";
import { PRODUCTOS } from "../../resources/routes";
import { TitleBox } from "../../components/TitleBox";
// import { FormsCrearProducto } from "./part/forms/FormsCrearProducto";
// import { useNavigate } from "react-router-dom";
import { WrapCrearProducto } from "./part/forms/WrapCrearProducto";

export const NuevoProducto = () => {

    // const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [producto, setProducto] = useState<any>({});

    const handlerCreateProducto = async (data:any) => { 
        setLoading(true);
        try {
            const productoListo = await post(data, PRODUCTOS);
            setProducto(productoListo.data);
            setLoading(false);                        
            // navigate('/productos');
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="nuevo-producto">

                <TitleBox titulo="Crear producto" back={true}/>
                
                <div className="box m-0 wrap-crear-producto">

                    <WrapCrearProducto
                        handlerCreateProducto={handlerCreateProducto} 
                        loading={loading}
                        producto={producto}
                        // setCodigoProd={setCodigoProd}
                    />

                </div>                

            </div>

        </Layout>
    )
};
