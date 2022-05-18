import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TitleBox } from "../../../components/TitleBox"
import { post } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { VerLista } from "./VerLista";
import { VerProducto } from "./VerProducto";

export const Vender = () => {

    const params = useParams(); // params.id, params.nombre

    // const [loadVenta, setLoadVenta] = useState<boolean>(false);

    const [data, setData] = useState<any>([]); // reinicio
    const [elemento, setElemento] = useState<any>({}); // reinicio

    const [listaRepetidos, setListaRepetidos] = useState<Array<number>>([]); // reinicio final
    
    const [showWindow, setShowWindow] = useState<number>(0);
    const [classStart, setClassStart] = useState<boolean>(false);
    
    const [listaVenta, setlistaVenta] = useState<Array<any>>([]);
    const [venta, setVenta] = useState<any>({
        descuento_total: 0,
        subtotal: 0,
        total: 0,
        codigo_venta: "1111",
        observaciones: "",
        estado_venta: "enviado",
        localId: params.id,
        clienteId: 0,
        usuarioId: 1,
        ventaDetalles: [],
    });
    

    useEffect(() => {
        setShowWindow(1);
    }, [])
    
    const itemPop = (i:number) => {     // i .- indice del elemento que se va a borrar
        let lista:Array<any> = [...listaVenta];    // convetimos el estado en un array
        lista.splice(i,1);              // borramos el elemento en base al indice
        setlistaVenta([...lista]);      // añadimos la lista corregida al estado

        // quitar de lista repetidos
        let prodRepe:Array<number> = [...listaRepetidos];
        prodRepe.splice(i,1);
        setListaRepetidos([...prodRepe]);
    }


    
    const postVenta = async () => {

        venta.ventaDetalles = listaVenta;

        // setLoadVenta(true);
        try {
            await post(venta, VENTAS);
            // setLoadVenta(false);
        } catch (error) {
            // setLoadVenta(true);
            console.log(error);
        } finally{
            // handlerReinicioProd();
            // setProductosRepe([]);
            // setListaVenta([]);
        }
    }


    return (
        <div className="vender">

            <TitleBox titulo={`Punto de venta - ${params.nombre}`} link="/tiendas"/>

            { 
                showWindow === 1 
                && <VerProducto 
                    setShowWindow={setShowWindow}
                    classStart={classStart}
                    setClassStart={setClassStart}
                    setData={setData}
                    data={data}
                    setElemento={setElemento}
                    elemento={elemento}
                    venta={venta}
                    setVenta={setVenta}
                    listaVenta={listaVenta}
                    setlistaVenta={setlistaVenta}
                    listaRepetidos={listaRepetidos}
                    setListaRepetidos={setListaRepetidos}
                    itemPop={itemPop}
                    postVenta={postVenta}
                /> 
            }
            { 
                showWindow === 2 
                && <VerLista 
                    setShowWindow={setShowWindow} 
                /> 
            }
            
            
            
            
        </div>
    )
}
