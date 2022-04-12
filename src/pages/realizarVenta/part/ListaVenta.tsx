import { useEffect, useState } from "react"
import { BiPlay } from "react-icons/bi"
import { BtnOnOff } from "../../../components/btns/BtnOnOff"

import { Input } from "../../../components/forms/Input"
import { InputDisable } from "../../../components/forms/InputDisable"

import { Venta } from "../../../resources/dtos/VentasDto"
import { AnadirClientes } from "./AnadirClientes"

import { ModalConfirmarVenta } from "./ModalConfirmarVenta"
import { TablaListaVenta } from "./TablaListaVenta"


interface listaVenta {
    listaVenta:any;
    itemPop:Function;
    handlerReinicioProd:Function;
    setListaVenta:Function;
    idLocal:number;
}

export const ListaVenta = ({ listaVenta, itemPop, handlerReinicioProd, setListaVenta, idLocal }:listaVenta) => {

    const [modalConfirmar, setModalConfirmar] = useState<boolean>(false);

    const [descuentoOn, setDescuentoOn] = useState<boolean>(false);
    // const [checkIGV, setCheckIGV] = useState<boolean>(true); // igv handler

    const [venta, setVenta] = useState<Venta>({
        descuento_total: 0,
        subtotal: listaVenta[0].precio_parcial,
        total: 0,
        observaciones:"",
        estado_venta:"enviado",
        nombre_cliente: "",
        clienteId: 0,
        usuarioId: 1,
        localId: idLocal,
        ventaDetalles: []
    })

    const handlerChangeVenta = (e:any) => {
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        })
    }

    const handlerCliente = (cliente:any) => { 
        setVenta({
            ...venta,
            clienteId: Number((cliente.split('@'))[0]),
            nombre_cliente: (cliente.split('@'))[1]
        })        
    }

    // const handlerIGV = () => setCheckIGV(!checkIGV)
    
    
    useEffect(() => { // calcular subtotal
        listaVenta.forEach((e:any) => { // verficar que existen descuentos activos
            if (e.descuento < 0) { setDescuentoOn(true) }
        })
        const sumaSubtotal = listaVenta
            .map((item:any) => item.precio_parcial)
            .reduce((prev:number, curr:number) => prev + curr, 0);

        setVenta({ ...venta, subtotal: sumaSubtotal });
    }, [listaVenta])


    useEffect(() => { // calcular total
        // const igv:number = Number(venta.subtotal) * 0.18;
        setVenta({
            ...venta,
            total: (venta.subtotal + (Number(venta.descuento_total)) /* + (checkIGV ? igv : 0) */)
        })
    }, [
        venta.subtotal, 
        venta.descuento_total, 
        // checkIGV
    ])


    const alertaDescuento = () => { 
        if (venta.descuento_total < 0 && descuentoOn) {
            return true;
        } else {
            return false;
        }
    }

    const handlerHacerPedido = () => setModalConfirmar(!modalConfirmar)

    const habilitarHacerPedido = () => { 
        if (venta.nombre_cliente !== "") {
            return true
        } else {
            return false;
        }
    }
    

    return (
        <div className="wrap-lista-venta">

            <div className="lista-venta bb bb-neutro">

                <TablaListaVenta
                    listaVenta={listaVenta}
                    itemPop={itemPop}
                />
                                     
            </div>

            <div className="wrap-informacion-lista-venta mt-25 grid-1 gap">

                <div className="informacion-lista-venta grid-1 gap bb bb-neutro">
                    
                    <AnadirClientes
                        handlerCliente={handlerCliente}
                        venta={venta}
                        setVenta={setVenta}
                        handlerChangeVenta={handlerChangeVenta}
                    />

                    <div className="grid-2 gap">
                    
                        <div className="">
                            <InputDisable
                                label="Subtotal"
                                name="subtotal"
                                value={venta.subtotal}
                                moneda
                            />
                        </div>

                        <div className="">
                            <Input
                                label="Incr/Desc total"
                                type="number"
                                name="descuento_total"
                                value={venta.descuento_total}
                                onChange={handlerChangeVenta}
                                moneda
                                color={(venta.descuento_total < 0) ? "danger-i" : ""}
                            />

                            <div className="center mt-5">
                                {
                                    alertaDescuento()
                                    ? <h5 className="danger mb-18">¡CUIDADO! Ya existe un descuento</h5>
                                    : <h5 className="warning m-0">Haz un descuento añadiendo una cantidad negativa</h5>
                                }
                            </div>

                            {/* <div className="mt-18">
                                <Checkbox2
                                    label="Habilitar IGV"
                                    name="igv"
                                    checked={checkIGV}
                                    handlerCheck={handlerIGV}
                                />
                            </div> */}
                        </div>

                    </div>

                    <div className="grid-3 mt-15">
                        <div></div>
                        <span className="center">
                            <p className="info">Total de la venta</p>
                            <h1 className="success">S/. { venta.total }</h1>
                        </span>
                        <div></div>    
                    </div>

                    <div className="grid-1 gap">
                        <Input
                            label="Observación"
                            type="text"
                            name="observaciones"
                            value={venta.observaciones}
                            onChange={handlerChangeVenta}
                            placeholder="Observacion o descripcion"
                        />
                    </div>

                </div>

                <div className="grid-2 gap mt-5">
                    <div></div>

                    <BtnOnOff
                        label="Hacer pedido"
                        estado={habilitarHacerPedido()}
                        onClick={() => handlerHacerPedido()}
                        className="success"
                        icon={ <BiPlay /> }
                    />

                </div>
            </div>


            <ModalConfirmarVenta
                modal={modalConfirmar}
                setModal={setModalConfirmar}
                venta={venta}
                listaVenta={listaVenta}
                handlerReinicioProd={handlerReinicioProd}
                setListaVenta={setListaVenta}
            />
            

        </div>        
    )
}
