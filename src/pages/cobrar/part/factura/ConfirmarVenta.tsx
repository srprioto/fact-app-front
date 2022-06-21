import { BiCaretRight, BiX } from "react-icons/bi"

interface confirmarVenta {
    // setModalConfVenta?:Function;
    // modalConfVenta?:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
}

export const ConfirmarVenta = ({ 
    // setModalConfVenta, 
    // modalConfVenta, 
    setModalRechazVenta, 
    modalRechazVenta 
}:confirmarVenta) => {
    return (
        <div className="wrap-confirmar-venta grid-3 gap mb-10 mt-25">
            <button
                className="btn btn-success" 
                type="submit"
                // onClick={() => setModalConfVenta(!modalConfVenta)}
            ><BiCaretRight /> Confirmar venta</button>
            <div></div>
            <button 
                className="btn btn-danger"
                onClick={() => setModalRechazVenta(!modalRechazVenta)}
            ><BiX /> Rechazar venta</button>
        </div>
    )
}
