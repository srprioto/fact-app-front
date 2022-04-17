import { Modal } from "../../../../components/modals/Modal"
import { post } from "../../../../resources/fetch";
import { TRANSACCIONES } from "../../../../resources/routes";

interface modalConfirmarTrans {
    modal:boolean;
    setModal:Function;
    transaccionDetalles:any;
    setLoading:Function;
    getDataOne:Function;
    getData:Function;
}

export const ModalConfirmarTrans = ({ modal, setModal, transaccionDetalles, setLoading, getDataOne, getData }:modalConfirmarTrans) => {

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

    return (
        <Modal
            title="Confirmar correccion de transaccion"
            modal={modal}
            setModal={setModal}
            width={70}
        >
            <div className="grid-1 gap">

                <h1>asdfsadf</h1>
                <h1>asdfsadf</h1>
                <h1>asdfsadf</h1>

                <div className="grid-3 gap">

                    <button className="btn btn-success" onClick={confirmarEnvio}>
                        Ok
                    </button>

                </div>

            </div>
        </Modal>
    )
}
