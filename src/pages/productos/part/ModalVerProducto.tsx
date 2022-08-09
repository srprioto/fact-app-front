import { Modal } from "../../../components/modals/Modal"
import { fecha } from "../../../resources/func/fechas";
import { moneda } from "../../../resources/func/moneda";

export const ModalVerProducto = ({ modal, setModal, producto }:any) => {

    return (
        <Modal
            title={"Informacion de " + producto.nombre}
            modal={modal}
            setModal={setModal}
            
        >

            <div className="grid-2 gap">

                <div className="wrap-descripcion5 box box-par m-0">
                    <h3>Información del producto</h3>
                    <span className="grid-12 gap">
                        <p>Codigo</p>
                        <h4>{ producto.razonSocial }</h4>
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

        </Modal>
    )
}
