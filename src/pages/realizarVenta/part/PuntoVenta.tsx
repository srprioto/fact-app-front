import { useEffect, useState } from "react";
import { BiListPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";

import { SelectSearch } from "../../../components/forms/SelectSearch";
import { Loading } from "../../../components/loads/Loading";
import { TextoRelleno } from "../../../components/TextoRelleno";
import { TitleBox } from "../../../components/TitleBox";
import { BtnOnOff } from "../../../components/btns/BtnOnOff";
import { ListaVenta } from "./ListaVenta";
import { ProductoDetallesVenta } from "./ProductoDetallesVenta";
import { GestionCantidades } from "./GestionCantidades";

import { LOCAL_STOCK, LOCAL_STOCK_SEARCH } from "../../../resources/routes";
import { get } from "../../../resources/fetch";
import { productDetail, ProductoDetalles } from "../../../resources/dtos/VentasDto";
import { GestionPrecios } from "./GestionPrecios";


export const PuntoVenta = () => {

    const params = useParams(); // params.id, params.nombre

    const [switchSelectProd, setSwitchSelectProd] = useState<boolean>(false); // estado manejo select
    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [producto, setProducto] = useState<any>({}); // producto en grudo original
    const [productoDetalles, setProductoDetalles] = useState<ProductoDetalles>(productDetail); // producto
    const [listaVenta, setListaVenta] = useState<any>([]) // lista de productos
    const [fornzarVenta, setFornzarVenta] = useState<boolean>(false); // forzar venta
    const [LocalStockId, setLocalStockId] = useState<number>(0);
    const [productosRepe, setProductosRepe] = useState<Array<number>>([]);

    const [descUnid, setDescUnid] = useState<boolean>(false);
    
    const handlerForzVenta = () => setFornzarVenta(!fornzarVenta); // fornzar ventas
    
    const getOneData = async (id:number) => {
        setLoadingOne(true);
        try {
            // const response_productos = await getOne(id, PRODUCTOS);
            const response_productos = await get(LOCAL_STOCK + `/${id}/local/${params.id}`);
            setProducto(response_productos);
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }

    
    useEffect(() => { 
        // añade una cantidad negativa al estado de venta_negativa
        const cantidadNeg:number = producto.cantidad - productoDetalles.cantidad_venta 
        let precioParcial:number = 0;

        if (productoDetalles.precio_venta && productoDetalles.cantidad_venta > 0) {
            const precioVenta:number = productoDetalles.precio_venta ? Number(productoDetalles.precio_venta) : 0
            const cantidadVenta:number = productoDetalles.cantidad_venta ? Number(productoDetalles.cantidad_venta) : 0
            const descuentoVenta:number = productoDetalles.descuento ? Number(productoDetalles.descuento) : 0
            
            if (descUnid) {
                // descuento a cada producto
                precioParcial = (
                    (Number(precioVenta) + Number(descuentoVenta)) * Number(cantidadVenta)
                )    
            } else {
                // descuento a bloque de venta
                precioParcial = ( 
                    (Number(precioVenta) * 
                    Number(cantidadVenta)) + Number(descuentoVenta)
                )
            }

        }
        setProductoDetalles({
            ...productoDetalles,
            precio_parcial: precioParcial,
            venta_negativa: cantidadNeg < 0 ? cantidadNeg : 0
        })

    }, [
        productoDetalles.precio_venta, 
        productoDetalles.cantidad_venta,
        productoDetalles.descuento,
        descUnid
    ])


    useEffect(() => { // habilitar boolean de forzar venta
        setProductoDetalles({ ...productoDetalles, forzar_venta: fornzarVenta })
    }, [fornzarVenta])


    const handlerChangePrecio = (e:any) => { // producto listo para vender
        setProductoDetalles({
            ...productoDetalles,
            nombre_producto: producto.productos.nombre,
            codigo_producto: producto.productos.codigo,
            [e.target.name]: e.target.value,
        })
    }

    
    const handlerListaVentas = () => { // añade productos a la lista
        setProductosRepe([ ...productosRepe, LocalStockId ]); // evitar producto repetido

        // añade productos a la lista
        if (descUnid) { // descuento unidad activo
            productoDetalles.descuento = productoDetalles.descuento * productoDetalles.cantidad_venta
            setListaVenta([ 
                ...listaVenta, 
                productoDetalles
            ])     
        } else { // descuento unidad inactivo
            setListaVenta([ 
                ...listaVenta, 
                productoDetalles 
            ])
        }

        handlerReinicioProd() // reinicios
    }


    const handlerReinicioProd = () => { // reinicios punto de venta
        setLocalStockId(0);
        setSwitchSelectProd(false);
        setProductoDetalles(productDetail);
        setProducto({});
        setDescUnid(false);
    }


    const handlerProductoInfo = (producto:string) => {
        setLocalStockId(Number((producto.split('@'))[3]));
        getOneData(Number((producto.split('@'))[0]));
        setProductoDetalles({
            ...productoDetalles,
            productosId: Number((producto.split('@'))[0])
        })
    };


    const itemPop = (i:number) => {     // i .- indice del elemento que se va a borrar
        let lista:Array<any> = [...listaVenta];    // convetimos el estado en un array
        lista.splice(i,1);              // borramos el elemento en base al indice
        setListaVenta([...lista]);      // añadimos la lista corregida al estado

        // quitar de lista repetidos
        let prodRepe:Array<number> = [...productosRepe];
        prodRepe.splice(i,1);
        setProductosRepe([...prodRepe]);
    }
    
   
    const cantidad = () => { // calcula cantidad total del producto
        let cantidad:number = 0;
        if (productoDetalles.cantidad_venta) {
            cantidad = producto.cantidad - productoDetalles.cantidad_venta;
        } else {
            cantidad = producto.cantidad;
        }
        return cantidad;
    }


    const validadAnadir = () => { 
        if (
            // productoDetalles.cantidad_venta > 0 &&
            productoDetalles.precio_parcial > 0 &&
            productoDetalles.precio_venta
        ) {
            return true
        } else {
            return false
        }
    }


    return (
        <div className="punto-de-venta">
            <TitleBox titulo={`Punto de venta - ${params.nombre}`} link="/tiendas"/>
            
            <div className="grid-2 gap">
                <div className="box m-0 wrap-scroll-ventas">
                    
                    <div className="grid-1">

                        <SelectSearch
                            label={"Producto en stock"}
                            urlData={LOCAL_STOCK_SEARCH + `${params.id}/`}
                            respuesta={handlerProductoInfo}
                            repetidos={productosRepe}
                            switchSelect={switchSelectProd}
                            setSwitchSelect={setSwitchSelectProd}
                            placeholder="Codigo, nombre, marca o color del prod..."
                            link={`/tiendas/local/${params.id}/${params.nombre}`}
                            textoLink="Ver stock"
                            reinicios={handlerReinicioProd}
                        />

                        {
                            Object.keys(producto).length <= 0
                            ? (
                                <div className="box-no-productos-venta">
                                    <TextoRelleno texto="Busca un producto"/>
                                </div> 
                            )
                            : loadingOne
                            ? <Loading />
                            : (
                                <div className="mt-25 grid-1 gap wrap-producto-venta">

                                    <ProductoDetallesVenta
                                        producto={producto.productos}
                                    />   

                                    <GestionCantidades
                                        productoCantidad={producto.cantidad} 
                                        fornzarVenta={fornzarVenta} 
                                        handlerForzVenta={handlerForzVenta} 
                                        cantidad={cantidad()}
                                        cantidad_venta={productoDetalles.cantidad_venta}
                                        handlerChangePrecio={handlerChangePrecio}
                                    />

                                    <GestionPrecios
                                        producto={producto}
                                        handlerChangePrecio={handlerChangePrecio}
                                        productoDetalles={productoDetalles}
                                        descUnid={descUnid}
                                        setDescUnid={setDescUnid}
                                    />

                                    <div className="grid-2 gap mt-5">
                                        <div></div>
                                        <BtnOnOff
                                            label="Añadir"
                                            estado={validadAnadir()}
                                            onClick={handlerListaVentas}
                                            icon={ <BiListPlus /> }
                                            className="info"
                                        />
                                    </div>

                                </div>                                
                            )
                        }
                    </div>
                </div>

                <div className="box m-0 wrap-scroll-ventas">
                    {
                        listaVenta.length <= 0
                        ? <TextoRelleno texto="Aun no hay productos en la lista" />
                        : (
                            <ListaVenta
                                listaVenta={listaVenta}
                                itemPop={itemPop}
                                handlerReinicioProd={handlerReinicioProd}
                                setListaVenta={setListaVenta}
                                idLocal={Number(params.id)}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
};


/* <span className="center">
    <h4 className="primary">Cantidad en stock: </h4>
    <p
        className={
            cantidad <= 10
            ? cantidad <= 0 || cantidad === null
            ? "danger" 
            : "warning"
            : "success"
        }
    >{cantidad}</p>
</span> */

/* {
    validadAnadir()
    ? (
        <button 
            className="btn btn-success"
            onClick={() => handlerListaVentas()}
        >
            <BiListPlus /> Añadir
        </button>
    ) : (
        <button className="btn btn-disable">
            <BiListPlus /> Añadir
        </button>
    )
} */