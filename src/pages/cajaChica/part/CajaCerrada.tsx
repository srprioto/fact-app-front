import { BiLockOpenAlt } from "react-icons/bi";

export const CajaCerrada = ({ setModalAbrirCaja }:any) => {

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

        </div>
    )
}
