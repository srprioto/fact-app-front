import { useEffect, useState } from "react";
import { BiCheck, BiRightArrowAlt } from "react-icons/bi";
import { Input } from "../../../../components/forms/Input";
import { TextoRelleno } from "../../../../components/TextoRelleno";
import { TablaListaShort } from "./short/TablaListaShort";


export const VerListaShort = ({ 
    venta, 
    setVenta, 
    itemPop, 
    listaVenta, 
    handlerShowWindow, 
    postVenta 
}:any) => {

    const [descuentoOn, setDescuentoOn] = useState<boolean>(false);

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


    const handlerOnChange = (e:any) => { 
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className="box box-par m-0 ver-lista-short">

            {
                listaVenta.length > 0
                ? (
                    <div className="">
                        
                        <TablaListaShort 
                            itemPop={itemPop} 
                            listaVenta={listaVenta} 
                        />

                        <div className="info-venta grid-1 gap mb-25">
                            
                            <span className="center">
                                <p className="mb-5 info">Subtotal</p>
                                <h3 className="secundary m-0">S/. {venta.subtotal}</h3>
                            </span>

                            <span>
                                {
                                    alertaDescuento()
                                    ? (
                                        <p className="mb-10 danger center strong">
                                            ¡Descuentos activos!
                                        </p>
                                    )
                                    : (
                                        <p className="mb-10 info center">
                                            Incr/Desc. total
                                        </p>
                                    )
                                }                                
                                <Input 
                                    // label="Incr/Desc. total"
                                    type="number"
                                    name="descuento_total"
                                    value={venta.descuento_total}
                                    onChange={handlerOnChange}
                                    moneda
                                    color={(venta.descuento_total < 0) ? "danger-i" : ""}
                                />
                            </span>
                        
                            <span className="center">
                                <p className="mb-5 info">Total</p>
                                <h1 className="success strong">S/. {venta.total}</h1>
                            </span>
                            
                        </div>
                        
                        <div className="grid-31 gap10 acciones-venta">
                            <button className="btn btn-success" onClick={() => postVenta()}>
                                <BiCheck /> Confirmar
                            </button>
                            <button className="btn btn-primary" onClick={handlerShowWindow}>
                                <BiRightArrowAlt />
                            </button>
                        </div>
                    </div>
                ) : <TextoRelleno texto="Sin productos" />
            }           
        </div>
    )
}
