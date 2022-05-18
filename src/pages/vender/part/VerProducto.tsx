import { useState } from "react";
import { BiListPlus } from "react-icons/bi";
import { BtnOnOff2 } from "../../../components/btns/BtnOnOff2";
import { TextoRelleno } from "../../../components/TextoRelleno";
import { ventaDet, ventaDetalles } from "../../../resources/dtos/VentasDto";
import { VerListaShort } from "./verLista/VerListaShort";
import { BuscarProducto } from "./verProductos/BuscarProducto";
import { GestionCantidades } from "./verProductos/GestionCantidades";
import { GestionPrecios } from "./verProductos/GestionPrecios";
import { InfoProducto } from "./verProductos/InfoProducto";


interface verProducto {
    setShowWindow:Function;
    classStart:boolean;
    setClassStart:Function;
    setData:Function;
    data:any;
    setElemento:Function;
    elemento:any;
    venta:any
    setVenta:Function;
    listaVenta:any;
    setlistaVenta:Function;
    listaRepetidos:any;
    setListaRepetidos:Function;
    itemPop:Function;
    postVenta:Function;
}

export const VerProducto = ({ 
    setShowWindow, 
    classStart, 
    setClassStart, 
    data, 
    setData, 
    elemento, 
    setElemento,
    venta,
    setVenta,
    listaVenta,
    setlistaVenta,
    listaRepetidos,
    setListaRepetidos,
    itemPop,
    postVenta
}:verProducto) => {

    const [ventaDetalle, setVentaDetalle] = useState<ventaDetalles>(ventaDet); // reinicio
    const [tipoDescuento, setTipoDescuento] = useState<boolean>(false);

    const producto:any = elemento.productos ? elemento.productos : {};

    const handlerShowWindow = () => { 
        setClassStart(true);
        setShowWindow(2)
    }


    const handlerOnChange = (e:any) => { 
        setVentaDetalle({ 
            ...ventaDetalle,
            [e.target.name]: e.target.value
        })
    }


    const calcularStock = ():number => { 
        return Number(elemento.cantidad) - Number(ventaDetalle.cantidad_venta)
    }


    const reinicios = () => { 
        setElemento({});
        setTipoDescuento(false);
        setVentaDetalle(ventaDet);
    }


    const handlerAddListaVenta = () => { 
        setListaRepetidos([ ...listaRepetidos, ventaDetalle.productosId ]); // trabaja con id del producto

        let updateListaDet = listaVenta; // lista de productos
        const updateVentaDetalle:any = ventaDetalle;
        if (tipoDescuento) {
            updateVentaDetalle.descuento = ventaDetalle.descuento * ventaDetalle.cantidad_venta;        
        }
        updateListaDet.push(updateVentaDetalle)
        setlistaVenta([
            ...updateListaDet
        ])

        reinicios()

    }


    const validarAñadir = () => { 
        if (ventaDetalle.cantidad_venta <= 0 || ventaDetalle.precio_parcial <= 0) {
            return false
        } else {
            return true
        }
    }


    return (
        <div className={"over-hidden ver-producto" + (classStart ? " show-left" : "")}>
            <div className="grid-31 gap">

                <div className="grid-1 gap box-ver-producto">

                    <BuscarProducto
                        setElemento={setElemento}
                        elemento={elemento}
                        setData={setData}
                        data={data}
                        listaRepetidos={listaRepetidos}
                    />

                    <div className="box box-par m-0 info-producto">
                    {
                        Object.keys(elemento).length !== 0
                        ? (
                            <div className="grid-1 gap">
                                <InfoProducto 
                                    producto={producto}
                                />
                                <GestionCantidades 
                                    producto={producto} 
                                    calcularStock={calcularStock}
                                    ventaDetalle={ventaDetalle}
                                    handlerOnChange={handlerOnChange} 
                                />
                                <GestionPrecios
                                    producto={producto}
                                    ventaDetalle={ventaDetalle}
                                    setVentaDetalle={setVentaDetalle}
                                    handlerOnChange={handlerOnChange}
                                    calcularStock={calcularStock}
                                    tipoDescuento={tipoDescuento}
                                    setTipoDescuento={setTipoDescuento}
                                />

                                <div className="grid-4 gap mt-25">
                                    <BtnOnOff2
                                        estado={validarAñadir()}
                                        label="Venta rapida"
                                        // icon={<BiListPlus />}
                                    >
                                        <button className="btn btn-warning">
                                            Venta rapida
                                        </button>
                                    </BtnOnOff2>
                                    
                                    
                                    <div></div>
                                    <div></div>
                                    <BtnOnOff2
                                        estado={validarAñadir()}
                                        label="Añadir"
                                        icon={<BiListPlus />}
                                    >
                                        <button className="btn btn-info" onClick={() => handlerAddListaVenta()}>
                                            <BiListPlus /> Añadir
                                        </button>
                                    </BtnOnOff2>
                                    
                                </div>
                            </div>
                        ) : (
                            <TextoRelleno texto="Selecciona un producto" />
                        )
                    }
                    </div>

                </div>

                <VerListaShort
                    venta={venta}
                    setVenta={setVenta}
                    itemPop={itemPop}
                    listaVenta={listaVenta}
                    handlerShowWindow={handlerShowWindow}
                    postVenta={postVenta}
                />
                
            </div>
            
        </div>
    )

}

