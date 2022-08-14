import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp, BiPlus, BiX } from "react-icons/bi";
import { Input } from "../../../components/forms/Input";
import { Select2 } from "../../../components/forms/Select2";
import { moneda } from "../../../resources/func/moneda";
import { sumaArrayObj } from "../../../resources/func/sumaArrayObj";
import { SelectAddPrecio } from "./otros/SelectAddPrecio";

interface formasPago {
    showFormasPago:boolean;
    setShowFormasPago:Function;
    venta:any;
    setConfirmarVenta:Function;
    listaPrecios:any;
    setListaPrecios:Function;
}

export const FormasPago = ({ 
    showFormasPago,
    setShowFormasPago,
    venta,
    setConfirmarVenta,
    listaPrecios,
    setListaPrecios
}:formasPago) => {

    const total:number = Number(venta.total);

    const [nuevoPrecio, setNuevoPrecio] = useState<any>({ forma_pago: "efectivo", precio_parcial: 0 });
    const [totalRestante, setTotalRestante] = useState<number>(0);
    const [switchAdd, setSwitchAdd] = useState<boolean>(false);


    useEffect(() => {
        if (Number(totalRestante) === 0) {
            setConfirmarVenta(true);
        } else {
            setConfirmarVenta(false);
        }
    }, [totalRestante])


    useEffect(() => {
        calcularRestante();
    }, [listaPrecios])
    

    useEffect(() => {
        if (showFormasPago) {
            dividirPreciosProd();    
        } else {
            setListaPrecios([]);
        }
    }, [showFormasPago])


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


    const dividirPreciosProd = () => { 
        let divPrecio:any = [];
        venta.ventaDetalles.forEach((e:any) => { 
            const updateDivPrecio:any = {
                forma_pago: "efectivo",
                precio_parcial: Number(e.precio_parcial)
            }
            divPrecio.push(updateDivPrecio);
        })
        setListaPrecios(divPrecio)
        
    }


    const calcularRestante = () => { 
        setTotalRestante(total - sumaArrayObj(listaPrecios, "precio_parcial"));
    }


    return (
        <div className="formas-pago">
            <div className="grid-3 gap">
                <div></div>
                <button
                    onClick={() => setShowFormasPago(!showFormasPago)}
                    className="btn-show red-text center"
                >
                    ¿Dividir pagos?
                    {
                        showFormasPago
                        ? <BiChevronUp />
                        : <BiChevronDown />
                    }
                </button>
                <div></div>
            </div>
            
            {
                showFormasPago
                && (
                    <div className="dividir-pagos">

                        <div className="grid-3 gap mt-15">
                            <div></div>
                            <div className="box-descripcion center">
                                <p className="center">Sin asignar:</p>
                                <h4 className={
                                    "center " + 
                                    (
                                        totalRestante > 0
                                        ? "warning-i"
                                        : totalRestante < 0
                                        ? "danger-i"
                                        : "success-i"
                                    )
                                }>S/. { moneda(totalRestante) }</h4>
                            </div>
                        </div>
                        
                        {
                            listaPrecios.map((e:any, index:number) => { 
                                return (
                                    <div className="box-dividir-precios mb-10" key={index}>
                                        <div></div>
                                        <div className="grid-2 gap ">
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
                                                <option value="yape">Yape</option>
                                                <option value="deposito">Deposito</option>
                                            </Select2>

                                            <Input
                                                // label="Precio de compra del paquete"
                                                type="number"
                                                name="precio_parcial"
                                                value={e.precio_parcial}
                                                onChange={(e:any) => handlerOnChangeArray(e, index)}
                                                moneda
                                                noMenos
                                            />
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
            }

        </div>
    )
}



