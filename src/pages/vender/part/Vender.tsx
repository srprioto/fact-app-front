import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import { TitleBox } from "../../../components/TitleBox"
import { ventaDet, ventaDetalles } from "../../../resources/dtos/VentasDto";
import { post } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { VerLista } from "./VerLista";
import { VerProducto } from "./VerProducto";

interface vender{
    idLocal:string;
    nombreLocal?:string;
    user?:boolean;
}

export const Vender = ({ idLocal, nombreLocal, user }:vender) => {

    const auth = useAuth();

    const ventaItem = {
        descuento_total: 0,
        subtotal: 0,
        total: 0,
        observaciones: "",
        estado_venta: "enviado",
        localId: idLocal,
        clienteId: 0,
        usuarioId: auth.userInfo.sub,
        forma_pago: "efectivo",
        codigo_venta: "",
        ventaDetalles: [],
    }

    const [data, setData] = useState<any>([]); // reinicio
    const [elemento, setElemento] = useState<any>({}); // reinicio

    const [listaRepetidos, setListaRepetidos] = useState<Array<number>>([]); // reinicio final
    
    const [showWindow, setShowWindow] = useState<number>(0);
    const [classStart, setClassStart] = useState<boolean>(false);
    
    const [listaVenta, setlistaVenta] = useState<Array<any>>([]);
    const [venta, setVenta] = useState<any>(ventaItem);

    const [descuentoOn, setDescuentoOn] = useState<boolean>(false);

    const [ventaDetalle, setVentaDetalle] = useState<ventaDetalles>(ventaDet); // reinicio
    const [tipoDescuento, setTipoDescuento] = useState<boolean>(false);
    

    useEffect(() => {
        setShowWindow(1);
    }, [])


    useEffect(() => {
        listaVenta.forEach((e:any) => { // verficar que existen descuentos activos
            if (e.descuento < 0) { setDescuentoOn(true) }
        })
        const sumaSubtotal = listaVenta
            .map((item:any) => item.precio_parcial)
            .reduce((prev:number, curr:number) => prev + curr, 0);
        setVenta({ ...venta, subtotal: sumaSubtotal });
    }, [listaVenta])


    useEffect(() => { // calcular total
        setVenta({
            ...venta,
            total: (Number(venta.subtotal) + (Number(venta.descuento_total)))
        })
    }, [venta.subtotal, venta.descuento_total])


    const alertaDescuento = () => { 
        if (venta.descuento_total < 0 && descuentoOn) {
            return true;
        } else {
            return false;
        }
    }

    
    const itemPop = (i:number) => {     // i .- indice del elemento que se va a borrar
        let lista:Array<any> = [...listaVenta];    // convetimos el estado en un array
        lista.splice(i,1);              // borramos el elemento en base al indice
        setlistaVenta([...lista]);      // a??adimos la lista corregida al estado

        // quitar de lista repetidos
        let prodRepe:Array<number> = [...listaRepetidos];
        prodRepe.splice(i,1);
        setListaRepetidos([...prodRepe]);
    }


    const reinicios2 = () => {
        setListaRepetidos([]);
        setVenta(ventaItem);
        setlistaVenta([])
        reinicios();
    }


    const reinicios = () => { 
        setElemento({});
        setTipoDescuento(false);
        setVentaDetalle(ventaDet);
    }

    
    const postVenta = async (cliente:any, serie:string) => {
        let ventaResp:any;
        venta.ventaDetalles = listaVenta;
        venta.serie = serie;
        venta.cliente = cliente;
        try {
            ventaResp = await post(venta, VENTAS);
        } catch (error) {
            console.log(error);
        }
        return ventaResp
    }
    

    return (
        <div className="vender">

            {
                !user
                ? <TitleBox titulo={`Punto de venta - ${nombreLocal}`} link="/tiendas"/>
                : <TitleBox titulo={`Punto de venta`}/>
            }

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
                    // setVenta={setVenta}
                    listaVenta={listaVenta}
                    setlistaVenta={setlistaVenta}
                    listaRepetidos={listaRepetidos}
                    setListaRepetidos={setListaRepetidos}
                    itemPop={itemPop}
                    postVenta={postVenta}
                    // alertaDescuento={alertaDescuento}
                    ventaDetalle={ventaDetalle}
                    setVentaDetalle={setVentaDetalle}
                    tipoDescuento={tipoDescuento}
                    setTipoDescuento={setTipoDescuento}
                    reinicios2={reinicios2}
                    reinicios={reinicios}
                    idLocal={idLocal}
                /> 
            }
            { 
                showWindow === 2 
                && <VerLista
                    setShowWindow={setShowWindow} 
                    listaVenta={listaVenta}
                    itemPop={itemPop}
                    venta={venta}
                    setVenta={setVenta}
                    alertaDescuento={alertaDescuento}
                    postVenta={postVenta}
                    reinicios2={reinicios2}
                /> 
            }
            
        </div>
    )
}
