import { useState } from "react"
import { BiCheck, BiReply } from "react-icons/bi";
import { BtnOnOff2 } from "../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../components/btns/LoadSwitchBtn2";
import { Input } from "../../../components/forms/Input"
import { Modal } from "../../../components/modals/Modal"
import { post } from "../../../resources/fetch";
import { CAJA_DETALLES } from "../../../resources/routes";

export const ModalOtroMonto = ({ modal, setModal, getDataOne, idCaja }:any) => {

    const cajaDet = {
        monto_movimiento: 0,
        descripcion: "",
        cajaId: idCaja,
        usuarioId: 1
    }

    const [loading, setLoading] = useState<boolean>(false);
    const [cajaDetalles, setCajaDetalles] = useState<any>(cajaDet);

    const handlerOnChange = (e:any) => { 
        setCajaDetalles({
            ...cajaDetalles,
            [e.target.name]: e.target.value
        })
    }

    const handlerCrearCajaDetalle = async () => { 
        setLoading(true);
        console.log(cajaDet);
        
        try {
            const data = await post(cajaDetalles, CAJA_DETALLES);
            console.log(data);
            
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        } finally {
            setCajaDetalles(cajaDet);
            await getDataOne();
            setModal();
        }
    }


    const validarCajaDetalles = () => { 
        if (Number(cajaDetalles.monto_movimiento) !== 0 && cajaDetalles.descripcion !== "") {
            return true
        } else {
            return false
        }
    }


    return (
        <Modal
            title="Movimiento de caja"
            modal={modal}
            setModal={setModal}
            width={50}
        >
            <div className="grid-1 gap">

                <div className="center">
                    <p className="m-0">Ingresa o quita una cantidad</p>
                    <h6 className="warning">Para retirar dinero de caja ingresa una cantidad negativa</h6>
                </div>

                <div className="grid-2 gap">
                    <Input
                        label={
                            cajaDetalles.monto_movimiento > 0
                            ? "Realizando ingreso"
                            : cajaDetalles.monto_movimiento < 0
                            ? "Realizando retiro"
                            : "Ingreso o retiro *"                            
                        }
                        type="number"
                        name="monto_movimiento"
                        value={cajaDetalles.monto_movimiento}
                        onChange={handlerOnChange}
                        color={
                            cajaDetalles.monto_movimiento < 0
                            ? "danger-i"
                            : ""
                        }
                        moneda
                    />
                    <Input
                        label="Nota de movimiento *"
                        type="text"
                        name="descripcion"
                        value={cajaDetalles.descripcion}
                        onChange={handlerOnChange}
                    />
                </div>

                <div className="grid-4 gap">
                    <div></div>
                    <BtnOnOff2
                        label="Confirmar"
                        estado={validarCajaDetalles()}
                    >
                        <LoadSwitchBtn2
                            loading={loading}
                            className="btn btn-success"
                            handler={handlerCrearCajaDetalle}
                        >
                            <BiCheck /> Confirmar
                        </LoadSwitchBtn2>    
                    </BtnOnOff2>
                    
                    <button onClick={() => setModal(false)} className="btn btn-warning">
                        <BiReply /> Regresar
                    </button>
                </div>

            </div>
        </Modal>
    )
}


