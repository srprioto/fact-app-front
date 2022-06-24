import { useEffect, useState } from "react"
import { Loading } from "../../../../components/loads/Loading";
import { ModalWrap } from "../../../../components/modals/ModalWrap";

import { getOne } from "../../../../resources/fetch";
import { moneda } from "../../../../resources/func/moneda";
import { MOVIMIENTOS } from "../../../../resources/routes";
import { ProductoInfo } from "../../../productos/otros/ProductoInfo";
import { InfoIngresoProductos } from "./InfoIngresoProductos";
import { IngresoDetalleDropD } from "./IngresoDetalleDropD";
import { ModalCalcPrecio } from "./ModalCalcPrecio";

interface boxVerIngresos {
    idIngreso:number;
}

export const BoxVerIngresos = ({ idIngreso }:boxVerIngresos) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [modalCalcPrecio, setModalCalcPrecio] = useState<boolean>(false);
    const [movimientoDetalle, setMovimientoDetalle] = useState<any>({});
    const [movimiento, setMovimiento] = useState<any>({});

    
    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
    
        setLoadingOne(true);
        try {
            const movimiento = await getOne(idIngreso, MOVIMIENTOS);
            setMovimiento(movimiento);
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }


    const handlerCalcularPrecio = (ingresoDetalle:any) => { 
        setMovimientoDetalle(ingresoDetalle);
        setModalCalcPrecio(true);
    }


    const handlerCalcularTotalProductos = () => { 

        let totalProductos:number = 0;

        if (movimiento.movimientoDetalles) {
            movimiento.movimientoDetalles.forEach((el:any) => {
                totalProductos = totalProductos + el.cantidad
            });
        }

        return totalProductos
    }


    const classNoPrecios = (precioVenta1:number|string, precioCompra:number|string) => {
        let classItem:string = "";
        if (precioVenta1 === 0 || precioCompra === 0) {
            classItem = "danger-i"
        }
        return classItem
    }
    

    return (
        loadingOne
        ? <Loading />
        : (
            <div className="modal-ver-ingreso grid-1 gap">

                <div className="box m-0">

                    <table className="table2">

                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th></th>
                                <th>Cantidad</th>
                                <th>Precio/unidad</th>
                                <th>Precio/paquete</th>
                                <th>Proveedor</th>
                                <th>Descripcion</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movimiento.movimientoDetalles
                                && (
                                    movimiento.movimientoDetalles.map((e:any) => {

                                        const precioVenta1:number = Number(e.productos.precio_venta_1)
                                        const precioCompra:number = Number(e.productos.precio_compra)

                                        return (
                                            <tr 
                                                key={e.id} 
                                                className={classNoPrecios(precioVenta1, precioCompra)}
                                            >
                                                <td className={
                                                    classNoPrecios(precioVenta1, precioCompra) === ""
                                                    ? "info"
                                                    : classNoPrecios(precioVenta1, precioCompra)
                                                }>{ e.productos.nombre }</td>
                                                <td><ProductoInfo producto={e.productos} /></td>
                                                <td>{ e.cantidad }</td>
                                                <td>S/. { moneda(e.precio_unidad) }</td>
                                                <td className={
                                                    "strong " +
                                                    (classNoPrecios(precioVenta1, precioCompra) === ""
                                                    ? "info"
                                                    : classNoPrecios(precioVenta1, precioCompra))
                                                }>S/. { moneda(e.precio_parcial) }</td>
                                                <td>{ e.proveedores && e.proveedores.nombre }</td>
                                                <td>{ e.descripcion }</td>
                                                <td>
                                                    <IngresoDetalleDropD
                                                        el={e}
                                                        calcularPrecio={handlerCalcularPrecio}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <InfoIngresoProductos movimiento={movimiento} />

                <ModalWrap modal={modalCalcPrecio}>
                    <ModalCalcPrecio
                        modal={modalCalcPrecio}
                        setModal={setModalCalcPrecio}
                        movimientoDetalle={movimientoDetalle}
                        gastosAdicionales={movimiento.costo_transporte + movimiento.costo_otros}
                        totalProductos={handlerCalcularTotalProductos()}
                        getDataOne={getDataOne}
                    />
                </ModalWrap>
                
            </div>
        )
    )
}
