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

    // const prodProeuba:any = {
    //     codigo: "0000000123",
    //     color: "prod83",
    //     created_at: "2022-04-01T04:21:02.777Z",
    //     descripcion: "prod83",
    //     id: 123,
    //     marca: "prod83",
    //     nombre: "prod83",
    //     precio_venta_1: 100,
    //     precio_venta_2: 110,
    //     precio_venta_3: 120,
    //     talla: "prod83",
    //     updated_at: "2022-04-01T04:21:02.000Z",
    
    //     categorias:{
    //         created_at: "2022-01-31T01:06:59.794Z",
    //         descripcion: "descripcion 3",
    //         id: 1,
    //         nombre: "categoria 3",
    //         updated_at: "2022-01-31T01:06:59.794Z",
    //     },
    
    //     usuarios: {
    //         created_at: "2022-01-31T01:04:30.434Z",
    //         direccion: "direcccion 1",
    //         documento: "documento1",
    //         edad: 20,
    //         email: "correo@correo.com",
    //         id: 1,
    //         nombre: "renato",
    //         password: "$2b$10$ipP3icz3LXoAYR3iU4pQPO4Awb3DWhWnOWPVSS2O3HKP104rZnny6",
    //         telefono: "9999",
    //         updated_at: "2022-01-31T01:04:30.434Z",
    //     }
    // }
    