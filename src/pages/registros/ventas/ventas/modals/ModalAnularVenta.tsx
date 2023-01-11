import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useAuth } from "../../../../../auth/useAuth";
import { BtnOnOff2 } from "../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../components/btns/LoadSwitchBtn2";
import { Input } from "../../../../../components/forms/Input";
import { Modal } from "../../../../../components/modals/Modal"
import { useToast } from "../../../../../hooks/useContext/toast/useToast";
import { estados_comprobante } from "../../../../../resources/dtos/ComprobantesDto";
import { put } from "../../../../../resources/fetch";
import { VENTAS } from "../../../../../resources/routes";

interface modalAnularVenta {
    modal:boolean;
    setModal:Function;
    idVenta:number;
    getData?:Function;
}

export const ModalAnularVenta = ({ modal, setModal, idVenta, getData }:modalAnularVenta) => {

    const auth = useAuth();
    const toast = useToast();


    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [notaBaja, setNotaBaja] = useState<string>("");
    const [sinFondos, setSinFondos] = useState<boolean>(false);
    // const [afectarCaja, setAfectarCaja] = useState<boolean>(true);

    const onChange = (e:any) => {
        setNotaBaja(e.target.value);
    }

    const handlerAnular = async () => { 
        setLoadingOne(true);
        let resto:any;
        try {
            resto = await put(idVenta, { 
                notaBaja: notaBaja,
                usuarioId: auth.userInfo.sub,
                // afectarCaja: afectarCaja
            }, VENTAS + "/anular");
            setSinFondos(resto.sinFondos);
            setLoadingOne(false);
            if (!resto.sinFondos) {
                getData && await getData();
                setModal(false);
            }
            if (resto.estado === estados_comprobante.Anulado) {
                toast.show("success", "La venta se anuló correctamente!");
            } else if (resto.estado === estados_comprobante.Error_anulacion) {
                toast.show("danger", "Ocurrió un error en la anulación!");
            } else if (resto.estado === estados_comprobante.Rechazado){
                toast.show("warning", "La anulación fue rechazada!");
            } else if (resto.estado === estados_comprobante.Anulacion_procesada){
                toast.show("secundary", "La anulación está en proceso!");
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
            titulo="Anulacion de venta"
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
                    </div>
                    {
                        sinFondos
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

                <div className="grid-3 gap">
                    <div></div>
                    {
                        !sinFondos
                        ? (
                            <BtnOnOff2
                                estado={validMsg()}
                                icon={<BiCheck />}
                                label="Anular"
                                tooltipDisable={{
                                    anchor: "btm-confirmar anular",
                                    descripcion: "Requiere una nota de anulacion",
                                }}
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
                  
                    {/* <button className="btn btn-warning" onClick={() => {setModal(false)}}>
                        <BiReply /> Regresar
                    </button> */}
                </div>
            </div>
        </Modal>
    )
}
