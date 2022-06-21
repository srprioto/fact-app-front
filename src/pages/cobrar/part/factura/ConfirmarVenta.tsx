import { BiCaretRight, BiX } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";

interface confirmarVenta {
    // setModalConfVenta?:Function;
    // modalConfVenta?:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
    clienteExist:boolean;
}

export const ConfirmarVenta = ({ 
    // setModalConfVenta, 
    // modalConfVenta, 
    setModalRechazVenta, 
    modalRechazVenta,
    clienteExist
}:confirmarVenta) => {
    return (
        <div className="wrap-confirmar-venta grid-3 gap mb-10 mt-25">
            <BtnOnOff2
                label="Confirmar venta"
                estado={clienteExist}
                icon={<BiCaretRight />}
            >
                <button
                    className="btn btn-success" 
                    type="submit"
                ><BiCaretRight /> Confirmar venta</button>
            </BtnOnOff2>
            
            <div></div>
            <button
                className="btn btn-danger"
                type="button"
                onClick={() => setModalRechazVenta(!modalRechazVenta)}
            ><BiX /> Rechazar venta</button>
        </div>
    )
}

// onClick={() => setModalConfVenta(!modalConfVenta)}