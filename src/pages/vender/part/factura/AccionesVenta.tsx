import { BiArrowBack, BiCaretRight } from "react-icons/bi"
import { useAuth } from "../../../../auth/useAuth";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2"
import { ToolTip } from "../../../../components/tooltip/ToolTip";
import { Roles } from "../../../../resources/dtos/RolesDto";

interface rapidaVenta {
    loadVenta:boolean;
    setShowWindow:Function;
    verificarVender:Function;
    // estadoCliente:boolean;
    labelBtn:string;
    showFormsCliente:boolean;
    tipoDoc?:string;
}

export const AccionesVenta = ({ 
    loadVenta, 
    setShowWindow, 
    verificarVender,
    // estadoCliente,
    labelBtn,
    showFormsCliente,
    tipoDoc
}:rapidaVenta) => {

    const auth = useAuth();
    
    const verVender = () => { 
        if (
            // (verificarVender() && estadoCliente) ||
            (verificarVender() && tipoDoc === "noDocumento") || 
            (verificarVender() && showFormsCliente)
        ) {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            <div style={{height: "90px"}} />
            <div className={
                "grid-3 gap " + 
                (
                    auth.rol === Roles.SALLER 
                    ? "acciones-venta-vendedor"
                    : "acciones-venta"
                )
            }>
                <div className="grid-6" id="btn-back-page">
                    <button 
                        className="btn btn-primary" 
                        type="button" 
                        onClick={() => setShowWindow(1)}
                    >
                        <BiArrowBack />
                    </button>
                    <ToolTip
                        anchor="btn-back-page"
                        descripcion="Ir un paso atrás"
                    /> 
                </div>
                
                <BtnOnOff2
                    label={labelBtn}
                    estado={verVender()}
                    icon={<BiCaretRight />}
                    tooltipDisable={{
                        anchor: "btn-conf-venta",
                        descripcion: "Requiere la información del cliente",
                    }}
                >
                    <LoadSwitchBtn2
                        loading={loadVenta}
                        className="btn btn-success"
                    >
                        <BiCaretRight /> { labelBtn }
                    </LoadSwitchBtn2>
                </BtnOnOff2>
            </div>
        </>
    )
}
