import { useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi";
import { useAuth } from "../../../../auth/useAuth";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { Checkbox2 } from "../../../../components/forms/Checkbox2";
import { Input } from "../../../../components/forms/Input";
import { Modal } from "../../../../components/modals/Modal"
import { post } from "../../../../resources/fetch";
import { COMPROBANTE } from "../../../../resources/routes";

export const ModalAnularComp = ({ modal, setModal, comprobante, getData }:any) => {

    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const [notaBaja, setNotaBaja] = useState<string>("");
    const [restoAnulacion, setRestoAnulacion] = useState<boolean>(false);
    const [afectarCaja, setAfectarCaja] = useState<boolean>(true);

    const correlativo = comprobante.correlativos;

    const onChange = (e:any) => { 
        setNotaBaja(e.target.value);
    }
    
    const handlerReenviarComp = async () => {
        setLoading(true);
        try {
            const resto:boolean = await post(
                {
                    id: comprobante.id,
                    notaBaja: notaBaja,
                    serie: correlativo.serie,
                    usuarioId: auth.userInfo.sub,
                    afectarCaja: afectarCaja
                }, 
                COMPROBANTE + "/anular"
            );
            setRestoAnulacion(resto);
            setLoading(false);
            if (!resto) {
                await getData();
                setModal(false);
            }
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    const validMsg = () => { 
        if (!!notaBaja) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            titulo="Anulacion de comprobante"
            width={60}
            border="border-danger"
        >
            <div className="grid-1 gap">
                
                <div>
                    <h3 className="center m-0">¿Seguro que quieres ANULAR este comprobante?</h3>
                    <h5 className="center m-0 danger">Ten en cuenta que esta acción es irreversible y también anulara la venta asociada</h5>
                </div>

                <div>
                    <div className="grid-21 gap">
                        <Input
                            label="Nota de anulación *"
                            type="text"
                            name="notaBaja"
                            value={notaBaja}
                            onChange={onChange}
                        />
                        <div>
                            <label htmlFor="afectarCaja" className="center w100">¿Devolver dinero?</label>
                            <Checkbox2
                                // label="Afectar estado de caja"
                                name="afectarCaja"
                                checked={afectarCaja}
                                handlerCheck={ () => setAfectarCaja(!afectarCaja) }
                            />
                        </div>
                    </div>
                    {
                        restoAnulacion
                        ? (
                            <h5 className="center m-0 danger">
                                Caja no tiene suficientes fondos para hacer una devolucion
                            </h5>
                        ) : (
                            <h5 className="center m-0 transparent">
                                ...
                            </h5>
                        )
                    }
                </div>

                <div className="grid-4 gap">
                    <div></div>
                    {
                        !restoAnulacion
                        ? (
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
                        ) : (
                            <button className="btn btn-disable" type="button">
                                <BiCheck /> Anular
                            </button>
                        )
                    }                    
                    <button className="btn btn-warning" onClick={() => {setModal(false)}}>
                        <BiReply /> Regresar
                    </button>
                </div>

            </div>
        </Modal>
    )
}
