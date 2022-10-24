import { useEffect, useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import { Input } from "../../../components/forms/Input";
import { InputDisable } from "../../../components/forms/InputDisable";
import { Select2 } from "../../../components/forms/Select2";
import { tipoVenta } from "../../../resources/dtos/VentasDto";
import { moneda } from "../../../resources/func/moneda";
import { sumaArrayObj } from "../../../resources/func/sumaArrayObj";
import { SelectAddPrecio } from "./otros/SelectAddPrecio";

interface formasPago {
    showFormasPago:boolean;
    // setShowFormasPago:Function;
    venta:any;
    setConfirmarVenta:Function;
    listaPrecios:any;
    setListaPrecios:Function;
    comisionTarjeta:number;
    listaPagosTarjeta:Function;
    setComisionTarjeta:Function;
}

export const DividirPagos = ({ 
    showFormasPago,
    // setShowFormasPago,
    venta,
    setConfirmarVenta,
    listaPrecios,
    setListaPrecios,
    comisionTarjeta,
    listaPagosTarjeta,
    setComisionTarjeta
}:formasPago) => {

    const [nuevoPrecio, setNuevoPrecio] = useState<any>({ forma_pago: "efectivo", precio_parcial: 0 });
    const [switchAdd, setSwitchAdd] = useState<boolean>(false);

    // const estadoCredito:boolean = (
    //     venta.tipo_venta === tipoVenta.credito || 
    //     venta.tipo_venta === tipoVenta.adelanto
    // ) ? true : false;

    const totalParaDividir:number = (
        venta.tipo_venta === tipoVenta.credito || 
        venta.tipo_venta === tipoVenta.adelanto
    ) ? Number(venta.totalPagado) : Number(venta.total);

    const totalRestante = ():number => { 
        const sumaPrecios:number = sumaArrayObj(listaPrecios, "precio_parcial");
        const comisTarjeta:number = Number(comisionTarjeta);
        const total:number = totalParaDividir;
        return (total + comisTarjeta) - sumaPrecios;
    }
   
    
    useEffect(() => {
        if (Number(totalRestante()) === 0) {
            setConfirmarVenta(true);
        } else {
            setConfirmarVenta(false);
        }
    }, [totalRestante()])


    useEffect(() => {
        // calculo de comision de tarjeta
        const listaTarjeta: Array<any> = listaPagosTarjeta();
        if (listaTarjeta.length > 0 && showFormasPago === true) {
            let cincoPor:number = 0;
            listaTarjeta.forEach((e:any) => {
                cincoPor = cincoPor + (Number(e.precio_parcial) * 0.05);
            })
            setComisionTarjeta(cincoPor);
        } else {
            setComisionTarjeta(0);
        }
    }, [listaPrecios, showFormasPago])


    const handlerOnChange = (e:any) => { 
        setNuevoPrecio({
            ...nuevoPrecio,
            [e.target.name]: e.target.value
        })
    }


    const handlerOnChangeArray = (e:any, index:number) => { 
        let updateListaPrecios = [...listaPrecios];
        let objeto = updateListaPrecios[index];
        objeto[e.target.name] = e.target.value;
        updateListaPrecios[index] = objeto;
        setListaPrecios([...updateListaPrecios])
    }


    const pushPrecioToPrecios = () => { 
        const updateDividirPrecios:Array<any> = listaPrecios;
        updateDividirPrecios.push(nuevoPrecio)
        setListaPrecios([ ...updateDividirPrecios ])
        setNuevoPrecio({ forma_pago: "efectivo", precio_parcial: 0 });
        setSwitchAdd(!switchAdd);
    }


    const itemPop = (i:number) => {
        let lista:Array<any> = [...listaPrecios];
        lista.splice(i,1);
        setListaPrecios([...lista]);
    }


    if (showFormasPago) {
        return (
            <div className="formas-pago dividir-pagos">
                <div className="grid-3 gap">
                    <div></div>
                    <div className="box-descripcion center">
                        <p className="center">Sin asignar:</p>
                        <h4 className={
                            "center " + 
                            (
                                totalRestante() > 0
                                ? "warning-i"
                                : totalRestante() < 0
                                ? "danger-i"
                                : "success-i"
                            )
                        }>S/. { moneda(totalRestante()) }</h4>
                    </div>
                </div>
                
                {
                    listaPrecios.map((e:any, index:number) => { 
                        return (
                            <div className="box-dividir-precios mb-10" key={index}>
                                <div></div>
                                <div className="grid-2 gap10 ">
                                    {/* <MetodosPago
                                        name="forma_pago"
                                        onChange={(e:any) => handlerOnChangeArray(e, index)}
                                        value={e.forma_pago}
                                    /> */}
                                    <Select2
                                        // label="Forma de pago"
                                        name="forma_pago"
                                        onChange={(e:any) => handlerOnChangeArray(e, index)}
                                        value={e.forma_pago}
                                    >
                                        <option value="efectivo">Efectivo</option>
                                        <option value="tarjeta">Tarjeta</option>
                                        <option value="pago_electronico">Pago electronico</option>
                                        <option value="deposito">Deposito</option>
                                    </Select2>

                                    {
                                        e.forma_pago === "tarjeta"
                                        ? (
                                            <InputDisable
                                                value={e.precio_parcial}
                                                moneda
                                            />
                                        ) : (
                                            <Input
                                                type="number"
                                                name="precio_parcial"
                                                value={e.precio_parcial}
                                                onChange={(e:any) => handlerOnChangeArray(e, index)}
                                                moneda
                                                noMenos
                                            />
                                        )
                                    }
                                </div>
                                <div className="delete-forma-pago">
                                    <BiX 
                                        className="pointer danger" 
                                        onClick={() => itemPop(index)} 
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                <div className="mt-20 add-precio">
                    {
                        switchAdd
                        ? (
                            <SelectAddPrecio
                                pushPrecioToPrecios={pushPrecioToPrecios}
                                handlerOnChange={handlerOnChange}
                                nuevoPrecio={nuevoPrecio}
                                switchAdd={switchAdd}
                                setSwitchAdd={setSwitchAdd}
                            />
                        ) : (
                            <div className="center box-add-precio">
                                <BiPlus 
                                    className="success pointer" 
                                    onClick={() => setSwitchAdd(!switchAdd)}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        )
    } else {
        return ( <></> )
    }

}

// const dividirPreciosProd = () => { // ***
//     let divPrecio:any = [];
//     venta.ventaDetalles.forEach((e:any) => { 
//         const updateDivPrecio:any = {
//             forma_pago: "efectivo",
//             precio_parcial: Number(e.precio_parcial)
//         }
//         divPrecio.push(updateDivPrecio);
//     })
//     setListaPrecios(divPrecio)
// }


// useEffect(() => {
//     if (showFormasPago) {
//         dividirPreciosProd();
//     } else {
//         setListaPrecios([]);
//     }
// }, [showFormasPago])