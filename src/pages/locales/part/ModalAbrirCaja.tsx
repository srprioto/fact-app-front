import { useState } from "react"
import { BiReply } from "react-icons/bi";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";
import { Input } from "../../../components/forms/Input"
import { Modal } from "../../../components/modals/Modal"
import { post } from "../../../resources/fetch";
import { CAJA_ABRIR } from "../../../resources/routes";

interface modalAbrirCaja{
    modal:boolean;
    setModal:Function;
    idLocal:number;
    nombreLocal?:string;
    setStateCaja?:Function;
}

export const ModalAbrirCaja = ({ modal, setModal, idLocal, nombreLocal, setStateCaja }:modalAbrirCaja) => {

    const [loadAbrirCaja, setLoadAbrirCaja] = useState<boolean>(false);
    const [aperturaCaja, setAperturaCaja] = useState({
        monto_apertura: 0,
        localId: idLocal,
        usuarioAbreId: 1
    })


    const handlerOnChange = (e:any) => { 
        setAperturaCaja({
            ...aperturaCaja,
            [e.target.name]: Number(e.target.value)
        })
    }

    
    const handlerAbrirCaja = async () => { 
        setLoadAbrirCaja(true);
        try {
            await post(aperturaCaja, CAJA_ABRIR);
            setLoadAbrirCaja(false);
            setStateCaja && setStateCaja(true);
        } catch (error) {
            setLoadAbrirCaja(true);
            console.log(error);
        } finally {
            setModal(false);
        }

    }


    return (
        <Modal
            title={"Apertura de caja en " + nombreLocal}
            modal={modal}
            setModal={setModal}
            width={50}
        >
            <div className="grid-1 gap">

                <h3 className="center">No hay caja abierta en la tienda</h3>
                <div className="grid-3 gap mb-15">
                    <div></div>
                    <Input
                        label="Ingresa una cantidad"
                        type="number"
                        name="monto_apertura"
                        value={aperturaCaja.monto_apertura}
                        onChange={handlerOnChange}
                        moneda
                        noMenos
                    />
                    <div></div>
                </div>
                <div className="grid-4 gap">
                    <div></div>
                    <LoadSwitchBtn
                        label="Confirmar"
                        loading={loadAbrirCaja}
                        className="success"
                        handler={handlerAbrirCaja}
                    />
                    <button className="btn btn-warning" onClick={() => setModal(false)}>
                        <BiReply /> Regresar
                    </button>
                </div>
            </div>
        </Modal>
    )
}
