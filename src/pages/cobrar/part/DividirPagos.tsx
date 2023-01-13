import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp, BiPlus, BiX } from "react-icons/bi";
import { InputDisable } from "../../../components/forms/InputDisable";
import { ToolTip } from "../../../components/tooltip/ToolTip";
import { formasDePago, formasPago } from "../../../resources/dtos/FormasPago";
import { tipoVenta } from "../../../resources/dtos/VentasDto";
import { moneda } from "../../../resources/func/moneda";
import { sumaArrayObj } from "../../../resources/func/sumaArrayObj";
import { SelectAddPrecio } from "./otros/SelectAddPrecio";

interface dividirPagos {
    showFormasPago:boolean;
    // setShowFormasPago:Function;
    venta:any;
    setConfirmarVenta:Function;
    listaPrecios:any;
    setListaPrecios:Function;
    // comisionTarjeta:number;
    listaPagosTarjeta:Function;
    setComisionTarjeta:Function;
    setShowFormasPago:Function;
}

export const DividirPagos = ({ 
    showFormasPago,
    // setShowFormasPago,
    venta,
    setConfirmarVenta,
    listaPrecios,
    setListaPrecios,
    // comisionTarjeta,
    listaPagosTarjeta,
    setComisionTarjeta,
    setShowFormasPago
}:dividirPagos) => {
    
    const nuevoPrecioDto:any = { forma_pago: "", precio_parcial: 0 };

    const [switchAdd, setSwitchAdd] = useState<boolean>(false);
    const [nuevoPrecio, setNuevoPrecio] = useState<any>(nuevoPrecioDto);

    const [tipoPagosRepetidos, setTipoPagosRepetidos] = useState<any>([]);


    const totalParaDividir:number = (
        venta.tipo_venta === tipoVenta.credito || 
        venta.tipo_venta === tipoVenta.adelanto
    ) ? Number(venta.totalPagado) : Number(venta.total);


    const totalRestante = ():number => { 
        const sumaPrecios:number = sumaArrayObj(listaPrecios, "precio_parcial");
        const total:number = totalParaDividir;
        return total - sumaPrecios;
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




    // la zona comentada permite añadir como forma de pago a todos los productos en lista
    const dividirPreciosProd = () => { 
        // if (!showFormasPago) {
        //     let divPrecio:any = [];
        //     venta.ventaDetalles.forEach((e:any) => { 
        //         const updateDivPrecio:any = {
        //             forma_pago: "efectivo",
        //             precio_parcial: Number(e.precio_parcial)
        //         }
        //         divPrecio.push(updateDivPrecio);
        //     })
        //     setListaPrecios(divPrecio)
        // } else {
        //     setListaPrecios([]);
        // }
        setListaPrecios([]);
        setShowFormasPago(!showFormasPago)
    }


    const pushPrecioToPrecios = () => { // añade elemento a lista de precios
        // añade elemento a la lista de repetidos
        const updateTipoPagosLista:Array<string> = tipoPagosRepetidos;
        updateTipoPagosLista.push(nuevoPrecio.forma_pago);
        setTipoPagosRepetidos(updateTipoPagosLista);

        // aqui añade a lista de precios
        const updateDividirPrecios:Array<any> = listaPrecios;
        updateDividirPrecios.push(nuevoPrecio)
        setListaPrecios([ ...updateDividirPrecios ])
        setNuevoPrecio(nuevoPrecioDto); // reinicio del nuevo precio
        setSwitchAdd(!switchAdd);
    }


    const itemPop = (i:number) => { // elimina elemento de lista de precios
        let lista:Array<any> = [...listaPrecios];
        lista.splice(i,1);
        setListaPrecios([...lista]);

        let prodRepe:Array<number> = [...tipoPagosRepetidos];
        prodRepe.splice(i,1);
        setTipoPagosRepetidos([...prodRepe]);
    }


    const mostrarFormaPago = (forma:string) => { 
        if (forma === formasPago.pago_electronico) {
            return "Pago electronico"
        } else if (forma === formasPago.deposito) {
            return "Deposito";
        } else if (forma === formasPago.efectivo) {
            return "Efectivo";
        } else if (forma === formasPago.tarjeta) {
            return "Tarjeta";
        }
    }


    const mostrarComisionTarjeta = (valor:number):Array<number> => { 
        const cincoPor:number = Number(valor) * 0.05;
        return [Number(valor) + Number(cincoPor), Number(cincoPor)];
    }


    return (
        <>

            <div className="mas-acciones-cobrar grid-1 gap">

                <div className="grid-3 gap">
                    <div></div>
                    <button
                        id="btn-dividir-pagos"
                        onClick={() => dividirPreciosProd()}
                        className="btn-show red-text center"
                    >
                        Dividir pagos
                        {
                            showFormasPago
                            ? <BiChevronUp />
                            : <BiChevronDown />
                        }
                    </button>
                    <ToolTip
                        anchor="btn-dividir-pagos"
                        descripcion="Permite dividir pagos y añadir otras formas de pago"
                    /> 
                </div>

            </div>

            {
                showFormasPago
                && <div className="formas-pago dividir-pagos">
                    <div className="grid-3 gap">
                        <div></div>
                        <div 
                            id="txt-cant-sin-asignar"
                            className="box-descripcion center"
                        >
                            <p className="center">Sin asignar:</p>
                            <span className="middle">
                                <h4 className={
                                    "center " + 
                                    (
                                        (Number(totalRestante()) - Number(nuevoPrecio.precio_parcial)) > 0
                                        ? "warning-i"
                                        : (Number(totalRestante()) - Number(nuevoPrecio.precio_parcial)) < 0
                                        ? "danger-i"
                                        : "success-i"
                                    )
                                }>S/. { moneda(Number(totalRestante()) - Number(nuevoPrecio.precio_parcial))}</h4>
                            </span>
                            {
                                (Number(totalRestante()) - Number(nuevoPrecio.precio_parcial)) !== 0
                                && <ToolTip
                                    anchor="txt-cant-sin-asignar"
                                    descripcion="Requiere asignar todo el monto pendiente a las formas de pago, de lo contrario no se podrá confirmar la venta"
                                /> 
                            }
                            
                        </div>
                    </div>
                    
                    {
                        listaPrecios.map((e:any, index:number) => { 
                            return (
                                <div className="box-dividir-precios mb-10" key={index}>
                                    <div></div>
                                    <div className="grid-2 gap10 ">

                                        <InputDisable
                                            value={mostrarFormaPago(e.forma_pago)}
                                        />

                                        {
                                            e.forma_pago === "tarjeta"
                                            ? (
                                                <InputDisable
                                                    value={mostrarComisionTarjeta(e.precio_parcial)[0]}
                                                    color="warning"
                                                    moneda
                                                />
                                            ) : (
                                                <InputDisable
                                                    value={e.precio_parcial}
                                                    moneda
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
                                    nuevoPrecio={nuevoPrecio}
                                    switchAdd={switchAdd}
                                    setSwitchAdd={setSwitchAdd}
                                    handlerOnChange={handlerOnChange}
                                    tipoPagosRepetidos={tipoPagosRepetidos}
                                    // pushPrecioToPrecios={pushPrecioToPrecios}
                                    // setNuevoPrecio={setNuevoPrecio}
                                    // nuevoPrecio={nuevoPrecio}
                                    // switchAdd={switchAdd}
                                    // setSwitchAdd={setSwitchAdd}
                                    // listaPrecios={listaPrecios}
                                    // setListaPrecios={setListaPrecios}
                                />
                            ) : (
                                formasDePago.length !== tipoPagosRepetidos.length
                                ? <div className="center box-add-precio">
                                    <BiPlus 
                                        id="btn-add-tipo-pago"
                                        className="success pointer" 
                                        onClick={() => setSwitchAdd(!switchAdd)}
                                    />
                                    <ToolTip
                                        anchor="btn-add-tipo-pago"
                                        descripcion="
                                            Permite añadir una nueva forma de pago.<br/>
                                            Si todas las formas de pago fueron aplicadas, esta opción será deshabilitada.
                                        "
                                    /> 
                                </div> : <></>
                            )
                        }
                    </div>
                </div>
            }
        </>
    )

}
