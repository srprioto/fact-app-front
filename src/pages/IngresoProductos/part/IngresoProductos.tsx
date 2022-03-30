import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { FormIngresoProductos } from "./FormIngresoProductos";

import { get, post } from "../../../resources/fetch";
import { MOVIMIENTOS, PRODUCTOS, PRODUCTOS_SEARCH, PROVEEDORES, PROVEEDORES_SEARCH } from "../../../resources/routes";

export const IngresoProductos = () => {

    // const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    
    // const [productos, setProductos] = useState<any>([])
    // const [proveedores, setProveedores] = useState<any>([])

    // const [loadingProductos, setLoadingProductos] = useState<boolean>(false)
    // const [loadingProveedores, setLoadingProveedores] = useState<boolean>(false)


    // const searchProductos = async (search:string) => { 
    //     setLoadingProductos(true);
    //     try {
    //         const productos = await get(PRODUCTOS_SEARCH + search);
    //         setProductos(productos);
    //         setLoadingProductos(false);
    //     } catch (error) {
    //         setLoadingProductos(true);
    //         console.log(error);
    //     }

    // }

    // const searchProveedor = async (search:string) => {
    //     setLoadingProveedores(true);
    //     try {
    //         const productos = await get(PROVEEDORES_SEARCH + search);
    //         setProveedores(productos);
    //         setLoadingProveedores(false);
    //     } catch (error) {
    //         setLoadingProveedores(true);
    //         console.log(error);
    //     }

    // }


    const handlerCreate = async (movimiento:any, detalles:any) => { 

        movimiento.movimiento_detalles = detalles;
        
        setLoading(true);
        try {
            const response = await post(movimiento, MOVIMIENTOS + "/ingreso");
            setLoading(false);
            console.log(response);
            // navigate('/almacen')
        } catch (error) {
            setLoading(true);
            console.log(error);
        }

    }

    return (
        <div className="ingreso-productos">

            <TitleBox titulo="Ingreso de productos"/>

            <FormIngresoProductos
                handlerCreate={handlerCreate} 
                loading={loading} 

                // loadingProductos={loadingProductos}
                // searchProductos={searchProductos}
                // productos={productos}

                // loadingProveedores={loadingProveedores}
                // searchProveedor={searchProveedor}
                // proveedores={proveedores}
            />


        </div>
    )
};
