import { AccionesVenta } from "./AccionesVenta";

interface rapidaVenta {
    loadVenta:boolean;
    setShowWindow:Function;
    verificarCaja:Function;
    handlerVenta:Function;
}

export const RapidaVenta = ({ loadVenta, setShowWindow, verificarCaja, handlerVenta }:rapidaVenta) => {
    return (
        <div className="venta-rapida">
            <div style={{height: "90px"}} />
            <AccionesVenta
                loadVenta={loadVenta}
                setShowWindow={setShowWindow}
                verificarCaja={verificarCaja}
                handlerVenta={handlerVenta}
            />
        </div> 
    )
}
