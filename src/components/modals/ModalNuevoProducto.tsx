import { useState } from "react";
import { WrapCrearProducto } from "../../pages/productos/part/forms/WrapCrearProducto";
import { post } from "../../resources/fetch";
import { PRODUCTOS } from "../../resources/routes";
import { Modal } from "./Modal"

export const ModalNuevoProducto = ({ modal, setModal, movDetails, setMovDetails, productoSolo, setProductoSolo }:any) => {

    const [loading, setLoading] = useState<boolean>(false);
    // const [producto, setProducto] = useState<any>({});

    const handlerCreateProducto = async (data:any) => { 
        setLoading(true);
        try {
            const productoListo = await post(data, PRODUCTOS);
            setProductoSolo(productoListo.data);
            setLoading(false);

            setMovDetails({
                ... movDetails,
                producto: {
                    id: productoListo.data.id,
                    nombre: productoListo.data.nombre
                }
            })

            // navigate('/productos');
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    return (
        <Modal
            title="Registrar un nuevo producto"
            modal={modal}
            setModal={setModal}
            width={100}
            height={100}
        >
            <div className="nuevo-producto box2">
                <WrapCrearProducto
                    handlerCreateProducto={handlerCreateProducto} 
                    loading={loading}
                    producto={productoSolo}
                    // setCodigoProd={setCodigoProd}
                />
            </div>
        </Modal>
    )
}
