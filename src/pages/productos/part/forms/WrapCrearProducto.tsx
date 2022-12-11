import { FormsCrearProducto } from "./FormsCrearProducto"
import { GestionCodigo } from "./GestionCodigo";

interface wrapCrearProducto {
    handlerCreateProducto:Function;
    loading:boolean;
    producto:any;
}

export const WrapCrearProducto = ({ handlerCreateProducto, loading, producto }:wrapCrearProducto) => {
    return (
        <>
            {
                !(Object.keys(producto).length)
                ? (
                    <FormsCrearProducto 
                        handlerCreateProducto={handlerCreateProducto} 
                        loading={loading}
                    /> 
                ) : (
                    <GestionCodigo
                        producto={producto}
                    />
                )
            }
        </>
    )
}    