import { useState } from "react";
import { useToast } from "../../hooks/useContext/toast/useToast";
import { WrapCrearProducto } from "../../pages/productos/part/forms/WrapCrearProducto";
import { post } from "../../resources/fetch";
import { PRODUCTOS } from "../../resources/routes";
import { Modal } from "./Modal"

export const ModalNuevoProducto = ({ 
    modal, 
    setModal, 
    movDetails, 
    setMovDetails, 
    productoSolo, 
    setProductoSolo 
}:any) => {

    const toast = useToast();

    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateProducto = async (data:any) => { 
        setLoading(true);
        try {
            const productoListo = await post(data, PRODUCTOS);
            setProductoSolo(productoListo.data);
            if (productoListo.estado) {
                toast.show("success", "Producto registro correctamente!");    
            } else {
                toast.show("warning", "El producto fue registrado anteriormente!");    
            }
            setMovDetails({
                ...movDetails,
                producto: {
                    id: productoListo.data.id,
                    nombre: productoListo.data.nombre
                }
            })
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    
    return (
        <Modal
            titulo="Registrar un nuevo producto"
            modal={modal}
            setModal={setModal}
            width={80}
            height={100}
        >
            <div className="nuevo-producto box2">
                <WrapCrearProducto
                    handlerCreateProducto={handlerCreateProducto} 
                    loading={loading}
                    producto={productoSolo}
                    setProducto={setProductoSolo}
                />
            </div>
        </Modal>
    )
}
