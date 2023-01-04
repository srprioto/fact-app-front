import { useState } from "react";
import { FormCrearProveedor } from "../../pages/proveedores/part/FormCrearProveedor"
import { CreateProveedoresDto } from "../../resources/dtos/ProveedoresDto";
import { post } from "../../resources/fetch";
import { PROVEEDORES } from "../../resources/routes";
import { Modal } from "./Modal"

export const ModalNuevoProveedor = ({ 
    modal, 
    setModal, 
    movDetails, 
    setMovDetails, 
    // proveedorSolo, 
    setProveedorSolo 
}:any) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateProveedor = async (data:CreateProveedoresDto) => { 
        setLoading(true);
        try {
            const proveedorListo = await post(data, PROVEEDORES);
            setProveedorSolo(proveedorListo.data)
            setLoading(false);

            setMovDetails({
                ...movDetails,
                proveedor: {
                    id: proveedorListo.data.id,
                    nombre: proveedorListo.data.nombre
                }
            })

            setModal(false);
            
        } catch (error) {
            setLoading(true);
            console.log(error);
        } 
    }

    return (
        <Modal
            titulo="Registrar un nuevo proveedor"
            modal={modal}
            setModal={setModal}
            width={80}
            height={100}
        >
            <div className="nuevo-proveedor box2">
                <FormCrearProveedor
                    handlerCreateProveedor={handlerCreateProveedor} 
                    loading={loading}
                />
            </div>
        </Modal>
    )
}
