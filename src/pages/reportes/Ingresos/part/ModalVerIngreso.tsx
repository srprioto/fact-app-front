import { useEffect, useState } from "react"
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal"
import { getOne } from "../../../../resources/fetch";
import { zeroFill } from "../../../../resources/func/ceroFill";
import { MOVIMIENTOS } from "../../../../resources/routes";
import { ProductoInfo } from "./ProductoInfo";

export const ModalVerIngreso = ({ modal, setModal, idIngreso }:any) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
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
    

    return (
        <Modal
            title="Detalles del ingreso de productos"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={70}
        >
            {
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        movimiento.movimientoDetalles
                                        && (
                                            movimiento.movimientoDetalles.map((e:any) => {
                                                return (
                                                    <tr key={e.id}>
                                                        <td className="info">{ e.productos.nombre }</td>
                                                        <td>
                                                            <ProductoInfo producto={e.productos} />
                                                        </td>
                                                        <td>{ e.cantidad }</td>
                                                        <td>{ e.precio_unidad }</td>
                                                        <td>{ e.precio_parcial }</td>
                                                        <td>{ e.proveedores && e.proveedores.nombre }</td>
                                                        <td>{ e.descripcion }</td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>

                        </div>

                        <div className="grid-2 gap">

                            <div className="wrap-descripcion3">
                                <h3>Costos</h3>
                                <div className="box-wrap-descripcion3">
                                    <span>
                                        <p>Subtotal</p>
                                        <h4>{ movimiento.subtotal }</h4>
                                    </span>
                                    <span>
                                        <p>Costo de transporte</p>
                                        <h4>{ movimiento.costo_transporte }</h4>
                                    </span>
                                    <span>
                                        <p>Otros costos</p>
                                        <h4>{ movimiento.costo_otros }</h4>
                                    </span>
                                    <span>
                                        <p>Total</p>
                                        <h4>{ movimiento.total }</h4>
                                    </span>
                                </div>
                            </div>

                            <div className="wrap-descripcion3">
                                <h3>Otros</h3>
                                <div className="box-wrap-descripcion3">
                                    <span>
                                        <p>Codigo de ingreso: </p>
                                        <h4>{ zeroFill(Number(movimiento.id), 8) }</h4>
                                    </span>

                                    <span>
                                        <p>Local destino: </p>
                                        <h4>{ movimiento.locales && movimiento.locales.nombre }</h4>
                                    </span>

                                    <span>
                                        <p>Observaciones: </p>
                                        <h4>{ movimiento.observaciones }</h4>
                                    </span>

                                    <span>
                                        <p>Fecha de envio: </p>
                                        <h4>{ movimiento.created_at }</h4>
                                    </span>
                                </div>                    
                            </div>
                        </div>
                    </div>        
                )
            }

            
            
            

        </Modal>
    )
}
