import { BiCheck, BiX } from "react-icons/bi";
import { Modal } from "../../../../components/modals/Modal"
import { post } from "../../../../resources/fetch";
import { TRANSACCIONES } from "../../../../resources/routes";

interface modalConfirmarTrans {
    modal:boolean;
    setModal:Function;
    transaccion:any;
    transaccionDetalles:any;
    setLoading:Function;
    getDataOne:Function;
    getData:Function;
    btnClose:Function;

}

export const ModalConfirmarTrans = ({ 
    modal, 
    setModal,
    transaccion,
    transaccionDetalles, 
    setLoading, 
    getDataOne, 
    getData,
    btnClose
}:modalConfirmarTrans) => {


    const confirmarEnvio = async () => { 

        setLoading(true);
        try {
            await post(transaccionDetalles, TRANSACCIONES + "/transaccion/corregir");
            await getDataOne();
            await getData();
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }

        setModal(false);

    }


    const validarConfirmacionORetorno = () => { 
        if (transaccionDetalles.estado_detalle === "listo") {
            const local:string = transaccion.localDestino.nombre;
            return "Seguro que confirmar la transaccion a " + local
        } else if (transaccionDetalles.estado_detalle === "regresar"){
            const local:string = transaccion.localOrigen.nombre;
            return "Seguro que regresar el envio a " + local
        }
    }


    const handlerClose = () => { 
        btnClose()
        setModal(false)
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            btnClose={btnClose}
            width={60}
            // height={100}
        >

            <div className="modal-corregir-confirm-transf">

                <div className="grid-1 gap">

                    <h2 className="center mayus">{ validarConfirmacionORetorno() }</h2>

                    <div className="grid-4 gap">

                        <div></div>

                        <button className="btn btn-success" onClick={confirmarEnvio}>
                            <BiCheck /> Confirmar
                        </button>

                        <button className="btn btn-warning" onClick={() => handlerClose()}>
                            <BiX /> Cancelar
                        </button>

                    </div>

                </div>

            </div>
      
        </Modal>
    )
}
