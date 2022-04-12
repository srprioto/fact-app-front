import { useState } from "react";

import { Modal } from "../../../components/modals/Modal"
import { VENTAS } from "../../../resources/routes";

import { post } from "../../../resources/fetch";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";
import { BiReply } from "react-icons/bi";


interface modalConfirmarVenta {
    modal:boolean;
    setModal:Function;
    venta:any
    listaVenta:Array<any>;
    handlerReinicioProd:Function;
    setListaVenta:Function;
}

export const ModalConfirmarVenta = ({ 
    modal, 
    setModal, 
    venta, 
    listaVenta, 
    handlerReinicioProd, 
    setListaVenta 
}:modalConfirmarVenta) => {

    const [loadVenta, setLoadVenta] = useState<boolean>(false);
    const postVenta = async () => {

        venta.ventaDetalles = listaVenta;

        setLoadVenta(true);
        try {
            const response = await post(venta, VENTAS);
            console.log(response);
            setLoadVenta(false);
        } catch (error) {
            setLoadVenta(true);
            console.log(error);
        } finally{
            handlerReinicioProd();
            setListaVenta([]);
        }
    }

    return (
        <Modal title="Resumen de la venta" modal={modal} setModal={setModal} width={50}>

            <div className="grid-1">
                <div className="box lista-productos">

                    <div className="grid-12 mb-25">
                        <p className="primary">Nombre del cliente: </p><h2>{ venta.nombre_cliente }</h2>
                    </div>

                    <table className="table2">
                        
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cant.</th>
                                <th>Precio U.</th>
                                <th>Inc/Desc</th>
                                <th>Precio V.</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                listaVenta.map((e:any, index:number) => {

                                    let cambioPrecio:string = "info";

                                    if (e.descuento < 0) {
                                        cambioPrecio = "danger";
                                    } else if (e.descuento > 0) {
                                        cambioPrecio = "success";
                                    }

                                    return (
                                        <tr key={index}>
                                            <td>{ e.nombre_producto }</td>
                                            <td><strong>{ e.cantidad_venta }</strong></td>
                                            <td><strong>S/. { e.precio_venta }</strong></td>
                                            <td className={cambioPrecio}>S/. { e.descuento }</td>
                                            <td className={cambioPrecio}><strong>S/. { e.precio_parcial }</strong></td>
                                        </tr>
                                    )
                                })   
                            }
                        </tbody>
                    </table>  
                
                    <div className="grid-3 gap center mt-25">
                        <span>
                            <p>Subtotal:</p>
                            <p className="info"><strong>S/. { venta.subtotal }</strong></p>
                        </span>
                        <span>
                            <p>Incr/Desc total:</p>
                            <p className={(
                                venta.descuento_total < 0 
                                ? "danger" 
                                : venta.descuento_total > 0
                                ? "success" 
                                : "info"
                            )}>
                                <strong>S/. { venta.descuento_total }</strong>
                            </p>
                        </span>
                        <span>
                            <p>TOTAL:</p><h1 className="success"><strong>S/. { venta.total }</strong></h1>
                        </span>
                    </div>
                </div>

                <div className="box grid-4 gap center">
                    <div></div>
                    <LoadSwitchBtn
                        loading={loadVenta}
                        handler={postVenta}
                        label="Confirmar"
                    />
                    <button 
                        className="btn btn-warning"
                        onClick={() => setModal(false)}
                    ><BiReply /> Regresar
                    </button>
                    <div></div>
                </div>

            </div>
        </Modal>
    )
}


