import { useEffect, useState } from "react"
import { BiCheck, BiReply } from "react-icons/bi";
import { BtnOnOff2 } from "../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../components/btns/LoadSwitchBtn2";
import { Input } from "../../../components/forms/Input"
import { Select2 } from "../../../components/forms/Select2";
import { Modal } from "../../../components/modals/Modal"
import { tipoMovimiento } from "../../../resources/dtos/Caja";
import { post } from "../../../resources/fetch";
import { CAJA_DETALLES } from "../../../resources/routes";

export const ModalOtroMonto = ({ modal, setModal, getDataOne, idCaja, usuarioId }:any) => {

    const cajaDet = {
        monto_movimiento: 0,
        descripcion: "",
        tipo_movimiento: tipoMovimiento.ingresosEgresosCaja,
        forma_pago: "efectivo",
        cajaId: idCaja,
        usuarioId: usuarioId,
    }

    const [loading, setLoading] = useState<boolean>(false);
    const [cajaDetalles, setCajaDetalles] = useState<any>(cajaDet);


    useEffect(() => {
        setCajaDetalles({
            ...cajaDetalles,
            monto_movimiento: 0
        })
    }, [cajaDetalles.tipo_movimiento])
    


    const handlerOnChange = (e:any) => { 
        setCajaDetalles({
            ...cajaDetalles,
            [e.target.name]: e.target.value
        })
    }


    const handlerCrearCajaDetalle = async () => { 
        setLoading(true);
        
        try {
            await post(cajaDetalles, CAJA_DETALLES);           
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
            width={60}
        >
            <div className="grid-1 gap">

                <div className="center">
                    <p className="m-0">Ingresa o quita una cantidad</p>
                    <h6 className="warning">Para retirar dinero de caja ingresa una cantidad negativa</h6>
                </div>

                <div className="grid-3 gap mb-15">

                    {
                        cajaDetalles.tipo_movimiento === tipoMovimiento.ingresosEgresosCaja
                        ? <Input
                            label="Realizar retiro *"
                            type="number"
                            name="monto_movimiento"
                            value={cajaDetalles.monto_movimiento}
                            onChange={handlerOnChange}
                            moneda
                            noMas
                        />
                        : <Input
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
                    }

                    <Select2
                        label="Tipo de movimiento"
                        name="tipo_movimiento"
                        value={cajaDetalles.tipo_movimiento}
                        onChange={handlerOnChange}
                        defaultValue={tipoMovimiento.ingresosEgresosCaja}
                    >
                        <option value={tipoMovimiento.ingresosEgresosCaja}>Gastos internos</option>
                        <option value={tipoMovimiento.otrosMovimientos}>Otros movimientos</option>
                    </Select2>

                    <Input
                        label="Nota de movimiento *"
                        type="text"
                        name="descripcion"
                        value={cajaDetalles.descripcion}
                        onChange={handlerOnChange}
                    />
                </div>

                <div className="grid-4 gap mb-10">
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


