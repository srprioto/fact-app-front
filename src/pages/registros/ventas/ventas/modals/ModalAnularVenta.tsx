import { useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi";
import { useAuth } from "../../../../../auth/useAuth";
import { BtnOnOff2 } from "../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../components/btns/LoadSwitchBtn2";
import { Input } from "../../../../../components/forms/Input";
import { Modal } from "../../../../../components/modals/Modal"
import { put } from "../../../../../resources/fetch";
import { VENTAS } from "../../../../../resources/routes";

interface modalAnularVenta {
    modal:boolean;
    setModal:Function;
    idVenta:number;
    getData:Function;
}

export const ModalAnularVenta = ({ modal, setModal, idVenta, getData }:modalAnularVenta) => {

    const auth = useAuth();

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [notaBaja, setNotaBaja] = useState<string>("");
    const [restoAnulacion, setRestoAnulacion] = useState<boolean>(false);
    // const [afectarCaja, setAfectarCaja] = useState<boolean>(true);

    const onChange = (e:any) => {
        setNotaBaja(e.target.value);
    }

    const handlerAnular = async () => { 
        setLoadingOne(true);
        let resto:boolean;
        try {
            resto = await put(idVenta, { 
                notaBaja: notaBaja,
                usuarioId: auth.userInfo.sub,
                // afectarCaja: afectarCaja
            }, VENTAS + "/anular");
            setRestoAnulacion(resto);
            setLoadingOne(false);
            if (!resto) {
                await getData();
                setModal(false);
            }
        } catch (error) {
            setLoadingOne(true);
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
            title="Anulacion de venta"
            width={50}
            border="border-danger"
        >
            <div className="grid-1 gap">

                <div>
                    <h3 className="center m-0">¿Seguro que quieres ANULAR esta venta?</h3>
                    <h5 className="center m-0 danger">
                        Ten en cuenta que esta acción es irreversible y también anulara el comprobante asociado
                    </h5>
                </div>
                
                <div>
                    <div className="grid-1 gap">
                        <Input
                            label="Nota de anulación *"
                            type="text"
                            name="notaBaja"
                            value={notaBaja}
                            onChange={onChange}
                        />
                        {/* {
                            auth.rol === Roles.ADMIN
                            && (
                                <div>
                                    <label htmlFor="afectarCaja" className="center w100">Afectar ingresos de caja</label>
                                    <Checkbox2
                                        // label="Afectar estado de caja"
                                        name="afectarCaja"
                                        checked={afectarCaja}
                                        handlerCheck={ () => setAfectarCaja(!afectarCaja) }
                                    />
                                </div>
                            )
                        } */}
                        
                        
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
                                    loading={loadingOne}
                                    className="btn btn-danger"
                                    handler={handlerAnular}
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
