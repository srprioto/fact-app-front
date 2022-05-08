import { useState } from "react";
import { BiLockOpenAlt } from "react-icons/bi";
import { ModalWrap } from "../../../components/modals/ModalWrap"
import { ModalAbrirCaja } from "../../locales/part/ModalAbrirCaja"

export const CajaCerrada = ({ idLocal, nombreLocal, getDataOne }:any) => {

    const [modalAbrirCaja, setModalAbrirCaja] = useState<boolean>(false);

    return (
        <div className="box grid-1 gap">
            <div className="box-descripcion center mb-5">
                <p className="right m-0">Estado de caja: </p>
                <h2 className="strong left danger">Cerrado</h2>
            </div>

            <div className="grid-5 gap">
                <div></div>
                <div></div>
                <button className="btn btn-success" onClick={() => setModalAbrirCaja(true)}>
                    <BiLockOpenAlt /> Abrir caja
                </button>
            </div>

            <ModalWrap modal={modalAbrirCaja}>
                <ModalAbrirCaja
                    modal={modalAbrirCaja}
                    setModal={setModalAbrirCaja}
                    idLocal={idLocal}
                    nombreLocal={nombreLocal}
                    getDataOne={getDataOne}
                />
            </ModalWrap>

        </div>
    )
}
