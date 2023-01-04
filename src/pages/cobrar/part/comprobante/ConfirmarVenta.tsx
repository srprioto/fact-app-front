import { BiCaretRight, BiX } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";

interface confirmarVenta {
    // setModalConfVenta?:Function;
    // modalConfVenta?:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
    // clienteExist:boolean;
    activarConfirmarVenta:Function;
    getCliente:any;
    showFormsCliente:boolean;
}

export const ConfirmarVenta = ({ 
    // setModalConfVenta, 
    // modalConfVenta, 
    setModalRechazVenta, 
    modalRechazVenta,
    // clienteExist,
    activarConfirmarVenta,
    getCliente,
    showFormsCliente
}:confirmarVenta) => {

    const validarVenta = () => { 
        if (
            (activarConfirmarVenta() && showFormsCliente) ||
            // (activarConfirmarVenta() && clienteExist) ||
            (activarConfirmarVenta() && getCliente.tipoDocumento === "noDocumento")
        ) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="wrap-confirmar-venta mb-10 mt-30 bt bt-neutro">
            <div className="grid-3 gap mt-25">
                <BtnOnOff2
                    titleDisable="Requiere la información del cliente"
                    label="Confirmar venta"
                    estado={validarVenta()}
                    icon={<BiCaretRight />}
                >
                    <button
                        className="btn btn-success" 
                        type="submit"
                    ><BiCaretRight /> Confirmar venta</button>
                </BtnOnOff2>
                
                <div></div>
                <button
                    title="Inhabilita la venta actual"
                    className="btn btn-danger"
                    type="button"
                    onClick={() => setModalRechazVenta(!modalRechazVenta)}
                ><BiX /> Rechazar venta</button>
            </div>
        </div>
    )
}

// onClick={() => setModalConfVenta(!modalConfVenta)}