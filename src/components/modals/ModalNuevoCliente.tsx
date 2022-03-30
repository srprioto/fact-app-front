import { useState } from "react";
import { FormCrearCliente } from "../../pages/clientes/part/forms/FormCrearCliente"
import { post } from "../../resources/fetch";
import { CLIENTES } from "../../resources/routes";
import { Modal } from "./Modal";

interface ModalNuevoCliente {
    modal:boolean;
    setModal:Function;
    handlerCliente?:Function; // handlerCliente(data) envia como parametro todos los datos del cliente a fuera
}

export const ModalNuevoCliente = ({ modal, setModal, handlerCliente }:ModalNuevoCliente) => {

    const [loadCrearCliente, setLoadCrearCliente] = useState<boolean>(false);
    
    const handlerCrearCliente = async (cliente:any) => { 

        if (handlerCliente) {
            handlerCliente(cliente);
            setModal(false); // cierra modal
        } else {
            setLoadCrearCliente(true);
            try {
                await post(cliente, CLIENTES);
                setLoadCrearCliente(false);
            } catch (error) {
                setLoadCrearCliente(true);
                console.log(error);
            } finally {
                setModal(false); // cierra modal
            }

        }
    }

    return (
        <Modal
            title="Registrar un nuevo cliente"
            modal={modal}
            setModal={setModal}
            width={65}
        >
            <div className="nuevo-cliente">
                <FormCrearCliente
                    handlerCreate={handlerCrearCliente}
                    loading={loadCrearCliente}
                />
            </div>
        </Modal>
    )
}

