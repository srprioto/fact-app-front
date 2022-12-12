import { useState } from "react";
import { FormsCrearProducto } from "./FormsCrearProducto"
import { GestionCodigo } from "./GestionCodigo";

interface wrapCrearProducto {
    handlerCreateProducto:Function;
    loading:boolean;
    producto:any;
}

export const WrapCrearProducto = ({ handlerCreateProducto, loading, producto }:wrapCrearProducto) => {
    
    const [clearInput, setClearInput] = useState<boolean>(false);

    const createProduct = () => { 
        if (!(Object.keys(producto).length)) {
            return true;
        } else if (clearInput) {
            return true;
        } else {
            return false;
        }
    }

    
    return (
        <>
            {
                createProduct()
                ? (
                    <FormsCrearProducto
                        handlerCreateProducto={handlerCreateProducto}
                        loading={loading}
                        clearInput={clearInput}
                        setClearInput={setClearInput}
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