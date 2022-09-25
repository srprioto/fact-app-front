import { useEffect, useState } from "react";
import { Loading } from "../../../components/loads/Loading";
import { Modal } from "../../../components/modals/Modal"
import { getOne } from "../../../resources/fetch";
import { fecha } from "../../../resources/func/fechas";
import { moneda } from "../../../resources/func/moneda";
import { PRODUCTOS } from "../../../resources/routes";

export const ModalVerProducto = ({ modal, setModal, idProducto }:any) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [producto, setProducto] = useState<any>({});

    const stockGeneral:Array<any> = producto.localesStock ? producto.localesStock : [];
    
    
    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
        setLoading(true);
        try {
            const dataOne = await getOne(idProducto, PRODUCTOS);
            setProducto(dataOne);
            setLoading(false);            
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    return (
        <Modal
            title={"Informacion de " + (!loading ? producto.nombre : "...")}
            modal={modal}
            setModal={setModal}
        >
            {
                loading
                ? <Loading />
                : (
                    <div className="grid-1 gap">
                    
                        <div className="grid-2 gap">

                            <div className="wrap-descripcion5 box box-par m-0">
                                <h3>Información del producto</h3>
                                <span className="grid-12 gap">
                                    <p>Codigo</p>
                                    <h4>{ producto.codigo }</h4>
                                </span>
                                <span className="grid-12 gap">
                                    <p>Nombre</p>
                                    <h4>{ producto.nombre }</h4>
                                </span>
                                <span className="grid-12 gap">
                                    <p>Descripcion</p>
                                    <h4>{ producto.descripcion }</h4>
                                </span>
            
                            </div>
            
                            <div className="wrap-descripcion5 box box-par m-0">
                                <h3>Detalles del producto</h3>
                                <span className="grid-12 gap">
                                    <p>Marca</p>
                                    <h4>{ producto.marca }</h4>
                                </span>
                                <span className="grid-12 gap">
                                    <p>Color</p>
                                    <h4>{ producto.color }</h4>
                                </span>
                                <span className="grid-12 gap">
                                    <p>Talla</p>
                                    <h4>{ producto.talla }</h4>
                                </span>
            
                            </div>
            
                            <div className="wrap-descripcion5 box box-par m-0">
                                <h3>Precios</h3>
                                <span className="grid-12 gap">
                                    <p>Precio de compra</p>
                                    <h4>S/. { moneda(producto.precio_compra) }</h4>
                                </span>
                                <span className="grid-12 gap">
                                    <p>Precio de venta 1</p>
                                    <h4>S/. { moneda(producto.precio_venta_1) }</h4>
                                </span>
                                <span className="grid-12 gap">
                                    <p>Precio de venta 2</p>
                                    <h4>S/. { moneda(producto.precio_venta_2) }</h4>
                                </span>
                                <span className="grid-12 gap">
                                    <p>Precio de venta 3</p>
                                    <h4>S/. { moneda(producto.precio_venta_3) }</h4>
                                </span>
            
                            </div>
            
                            <div className="wrap-descripcion5 box box-par m-0">
                                <h3>Otros</h3>
                                <span className="grid-12 gap">
                                    <p>Creacion</p>
                                    <h4>{ fecha(producto.created_at) }</h4>
                                </span>
                                <span className="grid-12 gap">
                                    <p>Ultima actualizacion</p>
                                    <h4>{ fecha(producto.updated_at) }</h4>
                                </span>
                            </div>
                        </div>

                        {
                            stockGeneral.length > 0 
                            && (
                                <div className="box box-par m-0">
                                    <h3>Stock general del producto</h3>
                                    <table className="table2">
                                        <thead>
                                            <tr>
                                                <th>Local</th>
                                                <th>Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stockGeneral.map((e:any) => {
                                                    const classCantidad = (cantidad:any) => { 
                                                        if (cantidad > 0) {
                                                            return "success"
                                                        } else if (cantidad === 0){
                                                            return "warning"
                                                        } else {
                                                            return "danger"
                                                        }
                                                    }
                                                    return (
                                                        <tr key={e.id}>
                                                            <td>{ e.locales.nombre }</td>
                                                            <td className={
                                                                "strong " + 
                                                                ( classCantidad(e.cantidad) )
                                                            }>{ e.cantidad }</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
        
                                </div>
                            )
                        }


                    </div>

                )
            }
 

        </Modal>
    )
}
