import { BiCaretRight, BiX } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { ToolTip } from "../../../../components/tooltip/ToolTip";

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
                    label="Confirmar venta"
                    estado={validarVenta()}
                    icon={<BiCaretRight />}
                    tooltipDisable={{
                        anchor: "btn-conf-venta-cob",
                        descripcion: "Requiere la información del cliente",
                    }}
                >
                    <button
                        className="btn btn-success" 
                        type="submit"
                    ><BiCaretRight /> Confirmar venta</button>
                </BtnOnOff2>
                
                <div></div>
                <button
                    id="btn-rechaz-venta-cob"
                    className="btn btn-danger"
                    type="button"
                    onClick={() => setModalRechazVenta(!modalRechazVenta)}
                ><BiX /> Rechazar venta</button>
                <ToolTip
                    anchor="btn-rechaz-venta-cob"
                    descripcion="Rechaza la venta actual"
                /> 
            </div>
        </div>
    )
}

// onClick={() => setModalConfVenta(!modalConfVenta)}