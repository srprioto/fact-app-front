import { AccionesVenta } from "./AccionesVenta";

interface rapidaVenta {
    loadVenta:boolean;
    setShowWindow:Function;
    verificarCaja:Function;
    handlerVenta:Function;
    verificarVender:Function;
}

export const RapidaVenta = ({ loadVenta, setShowWindow, verificarCaja, handlerVenta, verificarVender }:rapidaVenta) => {
    return (
        <div className="venta-rapida">
            <div style={{height: "90px"}} />
            <AccionesVenta
                loadVenta={loadVenta}
                setShowWindow={setShowWindow}
                verificarCaja={verificarCaja}
                handlerVenta={handlerVenta}
                verificarVender={verificarVender}
            />
        </div> 
    )
}
