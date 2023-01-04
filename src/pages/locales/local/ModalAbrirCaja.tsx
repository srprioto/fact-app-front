import { useState } from "react"
import { BiRename, BiReply } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BtnOnOff2 } from "../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";
import { Input } from "../../../components/forms/Input"
import { Modal } from "../../../components/modals/Modal"
import { useCaja } from "../../../hooks/useContext/caja.ts/useCaja";
import { post } from "../../../resources/fetch";
import { CAJA_ABRIR } from "../../../resources/routes";

interface modalAbrirCaja{
    modal:boolean;
    setModal:Function;
    idLocal:number;
    nombreLocal?:string;
    setStateCaja?:Function;
    getDataOne?:Function;
    usuarioId:number;
    user?:boolean;
}

export const ModalAbrirCaja = ({ 
    modal, 
    setModal, 
    idLocal, 
    nombreLocal, 
    setStateCaja, 
    getDataOne, 
    usuarioId,
    user 
}:modalAbrirCaja) => {

    const caja = useCaja();

    const [loadAbrirCaja, setLoadAbrirCaja] = useState<boolean>(false);
    const [aperturaCaja, setAperturaCaja] = useState({
        monto_apertura: 0,
        localId: idLocal,
        usuarioAbreId: usuarioId
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
            setStateCaja && setStateCaja(true);
            getDataOne && getDataOne();
            user && caja.handlerEstadoCaja();
            setLoadAbrirCaja(false);
        } catch (error) {
            setLoadAbrirCaja(false);
            console.log(error);
        } finally {
            
        }
        setModal(false);
    }


    const validarAbrirCaja = () => {
        if (aperturaCaja.monto_apertura <= 0) {
            return false
        } else {
            return true
        }
    }


    return (
        <Modal
            titulo={"Apertura de caja en " + nombreLocal}
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
                <div className={"gap " + (!getDataOne ? "grid-3" : "grid-4")}>
                    { getDataOne && <div></div> }
                    <BtnOnOff2
                        label="Confirmar"
                        estado={validarAbrirCaja()}
                    >
                        <LoadSwitchBtn
                            label="Confirmar"
                            loading={loadAbrirCaja}
                            className="success"
                            handler={handlerAbrirCaja}
                        />    
                    </BtnOnOff2>
                    
                    <button className="btn btn-warning" onClick={() => setModal(false)}>
                        <BiReply /> Regresar
                    </button>
                    {
                        !getDataOne
                        && (
                            <Link className="btn btn-info" to={`/tiendas/caja-chica/${idLocal}/${nombreLocal}`}>
                                <BiRename /> Ver caja
                            </Link>
                        )
                    }
                    
                </div>
            </div>
        </Modal>
    )
}
