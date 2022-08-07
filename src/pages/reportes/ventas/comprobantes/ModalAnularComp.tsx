import { useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { Input } from "../../../../components/forms/Input";
import { Modal } from "../../../../components/modals/Modal"
import { post } from "../../../../resources/fetch";
import { COMPROBANTE } from "../../../../resources/routes";

export const ModalAnularComp = ({ modal, setModal, comprobante, getData }:any) => {

    const [loading, setLoading] = useState(false);
    const [msgAnulacion, setMsgAnulacion] = useState<string>("");

    const onChange = (e:any) => { 
        setMsgAnulacion(e.target.value);
    }

    
    const handlerReenviarComp = async () => {
        setLoading(true);
        try {
            await post(
                {  
                    // idComprobante: comprobante.id,
                    id: comprobante.id,
                    notaBaja: msgAnulacion,
                    serie: comprobante.serie
                }, 
                COMPROBANTE + "/anular"
            );
            setLoading(false);
        } catch (error) {
            setLoading(true);
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
            title="Anulacion de comprobante"
            width={50}
            border="border-danger"
        >
            <div className="grid-1 gap">
                
                <h3 className="center m-0">¿Seguro que quieres ANULAR este comprobante?</h3>

                <div>
                    <Input
                        label="Nota de anulación"
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
                            loading={loading}
                            className="btn btn-danger"
                            handler={handlerReenviarComp}
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
