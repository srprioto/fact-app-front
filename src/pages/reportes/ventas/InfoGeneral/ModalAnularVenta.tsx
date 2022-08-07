import { useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { Input } from "../../../../components/forms/Input";
import { Modal } from "../../../../components/modals/Modal"
import { put } from "../../../../resources/fetch";
import { VENTAS } from "../../../../resources/routes";

interface modalAnularVenta {
    modal:boolean;
    setModal:Function;
    idVenta:number;
    getData:Function;
}

export const ModalAnularVenta = ({ modal, setModal, idVenta, getData }:modalAnularVenta) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [msgAnulacion, setMsgAnulacion] = useState<string>("");

    const onChange = (e:any) => {
        setMsgAnulacion(e.target.value);
    }

    const handlerAnular = async () => { 
        setLoadingOne(true);
        try {
            await put(idVenta, { msgAnulacion: msgAnulacion }, VENTAS + "/anular");
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        } finally {
            getData();
            setModal(false);
        }
    }

    const validMsg = () => { 
        if (!!msgAnulacion) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title="Anulacion de venta"
            width={50}
            border="border-danger"
        >
            <div className="grid-1 gap">

                <div>
                    <h3 className="center m-0">¿Seguro que quieres ANULAR esta venta?</h3>
                    <h5 className="center m-0 danger">Ten en cuenta que esta accion es irreversible</h5>
                </div>
                
                <div>
                    <Input
                        label="Nota de anulación *"
                        type="text"
                        name="msgAnulacion"
                        value={msgAnulacion}
                        onChange={onChange}
                    />
                </div>

                <div className="grid-4 gap">
                    <div></div>
                    <BtnOnOff2
                        estado={validMsg()}
                        icon={<BiCheck />}
                        label="Anular"
                    >
                        <LoadSwitchBtn2
                            loading={loadingOne}
                            className="btn btn-danger"
                            handler={handlerAnular}
                        >
                            <BiCheck /> Anular
                        </LoadSwitchBtn2>    
                    </BtnOnOff2>
                    
                    <button className="btn btn-warning" onClick={() => {setModal(false)}}>
                        <BiReply /> Regresar
                    </button>
                </div>
            </div>
        </Modal>
    )
}
