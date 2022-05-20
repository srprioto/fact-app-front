import { BiCheck } from "react-icons/bi";
import { Modal } from "../../../../../components/modals/Modal"

interface modalCodigoVenta {
    modal:boolean;
    setModal:Function;
    ventaRes:any
    setShowWindow?:Function;
}

export const ModalCodigoVenta = ({ modal, setModal, ventaRes, setShowWindow }:modalCodigoVenta) => {

    
    const handlerCloseModal = () => { 
        setModal(false)
        setShowWindow && setShowWindow(1);
    }

    return (
        <Modal
            // title="Pedido de venta realizado correctamente"
            modal={modal}
            // setModal={setModal}
            width={30}
        >
            <div className="grid-1 gap">
                <h2 className="mb-15 center">Pedido realizado exitosamente!</h2>
                <div className="mb-15 center">
                    <p className="info">Codigo de venta:</p>
                    <h1 className="success strong">{ ventaRes.codigo_venta }</h1>
                </div>
                <div className="grid-3 gap">
                    <div></div>
                    <button className="btn btn-success" onClick={() => handlerCloseModal()}>
                        <BiCheck size={30} />
                    </button>
                    <div></div>
                </div>
            </div>
            
        </Modal>
    )
}
