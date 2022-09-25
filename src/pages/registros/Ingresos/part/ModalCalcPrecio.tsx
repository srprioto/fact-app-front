import { useEffect, useState } from "react";
import { BiReply } from "react-icons/bi";
import { LoadSwitchBtn } from "../../../../components/btns/LoadSwitchBtn";
import { Input } from "../../../../components/forms/Input";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal"
import { get, put } from "../../../../resources/fetch";
import { moneda } from "../../../../resources/func/moneda";
import { LOCAL_STOCK, PRODUCTOS } from "../../../../resources/routes";

interface modalCalcPrecio {
    modal:boolean;
    setModal:Function;
    movimientoDetalle:any; 
    gastosAdicionales:number;
    totalProductos:number;
    getDataOne:Function;
}

export const ModalCalcPrecio = ({ 
    modal, 
    setModal, 
    movimientoDetalle, 
    gastosAdicionales, 
    totalProductos,
    getDataOne
}:modalCalcPrecio) => {

    const compra:number = Number(movimientoDetalle.productos.precio_compra);
    const venta1:number = Number(movimientoDetalle.productos.precio_venta_1);
    const venta2:number = Number(movimientoDetalle.productos.precio_venta_2);
    const venta3:number = Number(movimientoDetalle.productos.precio_venta_3);
    const precioUnidad:number = Number(movimientoDetalle.precio_unidad);
    const descuentoPrecio2:number = 0;
    const descuentoPrecio3:number = 0;

    const multiploDePrecio:number = 1; // multiplo para calcular el precio de venta en base al precio del costo

    const idProducto:number = Number(movimientoDetalle.productos.id);
    const adicionalesXUnidad:number = Number(gastosAdicionales / totalProductos);
    const costoRealProd:number = precioUnidad + adicionalesXUnidad;
    const difePrecioCompra:number = costoRealProd - compra;

    // calcula el promedio de diferencia
    // añadir aqui el calculo en caso de que se requiera algo mas especifico
    const acumAddPrecio:number = (difePrecioCompra / 2);

    const precioVenta1:number = Number((
        venta1 <= 0
        ? (costoRealProd + (costoRealProd * multiploDePrecio))
        : compra === 0
        ? venta1
        : venta1 + acumAddPrecio
    ).toFixed());

    const precioVenta2:number = Number((
        venta2 <= 0
        ? (costoRealProd + (costoRealProd * multiploDePrecio))
        : compra === 0
        ? venta2
        : venta2 + acumAddPrecio
    ).toFixed());

    const precioVenta3:number = Number((
        venta3 <= 0
        ? (costoRealProd + (costoRealProd * multiploDePrecio))
        : compra === 0
        ? venta3
        : venta3 + acumAddPrecio
    ).toFixed());


    const [loadingData, setLoadingData] = useState<boolean>(false); // loading general
    const [stockTotalProducto, setStockTotalProducto] = useState<number>(0);
    const [producto, setProducto] = useState({
        precio_compra: costoRealProd,
        precio_venta_1: Number(precioVenta1),
        precio_venta_2: Number(precioVenta2 - descuentoPrecio2),
        precio_venta_3: Number(precioVenta3 - descuentoPrecio3)
    });


    useEffect(() => {
        getData();
    }, [])
    

    const handlerOnChange = (e:any) => { 
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }
    

    const getData = async () => { 
        setLoadingData(true);
        try {
            const totalStockproducto = await get(LOCAL_STOCK + "/stock/producto/" + idProducto);
            setStockTotalProducto(totalStockproducto.stockGeneral);
            setLoadingData(false);            
        } catch (error) {
            setLoadingData(true);
            console.log(error);
        }
    }


    const handlerEdit = async () => { 
        setLoadingData(true);
        try {
            await put(idProducto, producto, PRODUCTOS);
            setLoadingData(false);
        } catch (error) {
            setLoadingData(true);
            console.log(error);
        } finally {
            setProducto({
                precio_compra: 0,
                precio_venta_1: 0,
                precio_venta_2: 0,
                precio_venta_3: 0 
            }) 
            getDataOne();
            setModal(false);
        }
    }


    const classDiferenciaPreciosComrpa = () => { 
        if(difePrecioCompra >= 0){
            return "danger-i"
        } else if (difePrecioCompra < 0){
            return "info-i"
        }
    }


    return (
        <Modal
            modal={modal}
            // back={setModal}
            setModal={setModal}
            width={80}
            border="border-primary"
            notransparent
        >
            {
                loadingData
                ? <Loading />
                : (
                    <div className="grid-1 gap-v m-0">

                        <h2 className="mayus center mb-15">
                            Calcular precios de 
                            {
                                movimientoDetalle.productos.nombre + (
                                    movimientoDetalle.productos.marca 
                                    && (" - " + movimientoDetalle.productos.marca + " - " )
                                ) + movimientoDetalle.productos.talla
                            }
                        </h2>
                        
                        <div className="grid-2 gap">

                            <div className="wrap-descripcion3">
                                <h3>Calcular costo del producto</h3>
                                <div className="box-wrap-descripcion3">
                                    <span>
                                        <p>T. de gastos adicionales: </p>
                                        <h4>S/. { moneda(gastosAdicionales) }</h4>
                                    </span>

                                    <span>
                                        <p>T. unidades en bloque: </p>
                                        <h4>{ totalProductos }</h4>
                                    </span>

                                    <span>
                                        <p>Gastos adicionales por unidad: </p>
                                        <h4>S/. { moneda(adicionalesXUnidad) }</h4>
                                    </span>

                                    <span>
                                        <p>Nuevo costo del producto: </p>
                                        <h4 className="success-i">S/. { moneda(costoRealProd) }</h4>
                                    </span>

                                    {
                                        compra > 0
                                        && (
                                            <span>
                                                <p>Diferencia precios de compra: </p>
                                                <h4 className={classDiferenciaPreciosComrpa()}>
                                                    S/. { moneda(difePrecioCompra) }
                                                </h4>
                                            </span>
                                        )
                                    }

                                </div>                    
                            </div>

                            <div className="wrap-descripcion3">
                                <h3>Informacion del producto</h3>
                                <div className="box-wrap-descripcion3">
                                    <span>
                                        <p>T. productos de esta carga: </p>
                                        <h4>{ movimientoDetalle.cantidad }</h4>
                                    </span>

                                    <span>
                                        <p>T. productos en stock: </p>
                                        <h4>{ stockTotalProducto }</h4>
                                    </span>

                                    <span>
                                        <p>Precio de compra registrado: </p>
                                        <h4>
                                            { compra === 0 
                                            ? "No registrado" 
                                            : "S/. " + moneda(compra) }
                                        </h4>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="box m-0 grid-1 gap">
                            <div>
                                <h3 className="mb-25">Precios actuales del producto</h3>
                                <div className="grid-3 gap">
                                    <span className="center">
                                        <p>Precio por unidad actual</p>
                                        <h3>
                                            {
                                                venta1 === 0
                                                ? "No registrado"
                                                : "S/. " + moneda(venta1)
                                            }
                                        </h3>
                                    </span>
                                    <span className="center">
                                        <p>Precio por menor actual</p>
                                        <h3>
                                            {
                                                venta2 === 0
                                                ? "No registrado"
                                                : "S/. " + moneda(venta2)
                                            }
                                        </h3>
                                    </span>
                                    <span className="center">
                                        <p>Precio por mayor actual</p>
                                        <h3>
                                            {
                                                venta3 === 0
                                                ? "No registrado"
                                                : "S/. " + moneda(venta3)
                                            }
                                        </h3>
                                    </span>
                                </div>
                            </div>  

                            <div>
                                <h3 className="mb-25">Calcular precios de venta</h3>
                                <div className="grid-3 gap">
                                    <Input
                                        label="Nuevo precio por unidad"
                                        type="number"
                                        name="precio_venta_1"
                                        value={producto.precio_venta_1}
                                        onChange={handlerOnChange}
                                        moneda
                                    />
                                    <Input
                                        label="Nuevo precio por menor"
                                        type="number"
                                        name="precio_venta_2"
                                        value={producto.precio_venta_2}
                                        onChange={handlerOnChange}
                                        moneda
                                    />
                                    <Input
                                        label="Nuevo precio por mayor"
                                        type="number"
                                        name="precio_venta_3"
                                        value={producto.precio_venta_3}
                                        onChange={handlerOnChange}
                                        moneda
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="box m-0 grid-4 gap">
                            <div></div>
                            <LoadSwitchBtn 
                                label="Establecer precios" 
                                loading={loadingData} 
                                handler={handlerEdit}
                            />

                            <button onClick={() => setModal(false)} className="btn btn-warning">
                                <BiReply /> Regresar
                            </button>
                        </div>
                    </div>
                )
            }
            
        </Modal>
    )
}
