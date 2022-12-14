import { useState } from "react";

import { Layout } from "../../components/layouts/Layout"
// import { CrearCantidad } from "../almacen/part/CrearCantidad";

import { post } from "../../resources/fetch";
import { PRODUCTOS } from "../../resources/routes";
import { TitleBox } from "../../components/TitleBox";
// import { FormsCrearProducto } from "./part/forms/FormsCrearProducto";
// import { useNavigate } from "react-router-dom";
import { WrapCrearProducto } from "./part/forms/WrapCrearProducto";
import { useToast } from "../../hooks/useContext/toast/useToast";

export const NuevoProducto = () => {

    const toast = useToast();

    const [loading, setLoading] = useState<boolean>(false);
    const [producto, setProducto] = useState<any>({});

    const handlerCreateProducto = async (data:any) => {
        setLoading(true);
        try {
            const productoListo = await post(data, PRODUCTOS);
            setProducto(productoListo.data);
            if (productoListo.estado) {
                toast.show("success", "Producto registro correctamente!");    
            } else {
                toast.show("warning", "El producto fue registrado anteriormente!");
            }
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    
    return (
        <Layout>
            <div className="nuevo-producto">

                <TitleBox titulo="Crear producto" back={true}/>
                
                <div className="box m-0 wrap-crear-producto relative">

                    <h3>Crear un nuevo producto</h3>

                    <WrapCrearProducto
                        handlerCreateProducto={handlerCreateProducto} 
                        loading={loading}
                        producto={producto}
                        setProducto={setProducto}
                    />

                </div>                

            </div>

        </Layout>
    )
};
