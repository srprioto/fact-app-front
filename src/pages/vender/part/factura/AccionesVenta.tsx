import { BiArrowBack, BiCaretRight } from "react-icons/bi"
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2"

interface rapidaVenta {
    loadVenta:boolean;
    setShowWindow:Function;
    verificarCaja:Function;
    handlerVenta:Function;
}

export const AccionesVenta = ({ loadVenta, setShowWindow, verificarCaja, handlerVenta }:rapidaVenta) => {
    return (
        <div className="grid-3 gap acciones-venta">
            <div className="grid-6">
                <button className="btn btn-primary" onClick={() => setShowWindow(1)}>
                    {/* <BiRightArrowAlt /> */}
                    <BiArrowBack />
                </button>
            </div>
            <LoadSwitchBtn2
                loading={loadVenta}
                className="btn btn-success"
                handler={() => verificarCaja(handlerVenta)}
            >
                <BiCaretRight /> Vender
            </LoadSwitchBtn2>
        </div>
    )
}
