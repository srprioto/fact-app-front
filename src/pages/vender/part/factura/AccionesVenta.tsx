import { BiArrowBack, BiCaretRight } from "react-icons/bi"
import { useAuth } from "../../../../auth/useAuth";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2"
import { Roles } from "../../../../resources/dtos/RolesDto";

interface rapidaVenta {
    loadVenta:boolean;
    setShowWindow:Function;
    verificarVender:Function;
    estadoCliente:boolean;
}

export const AccionesVenta = ({ 
    loadVenta, 
    setShowWindow, 
    verificarVender,
    estadoCliente
}:rapidaVenta) => {

    const auth = useAuth();
    
    const verVender = () => { 
        if (verificarVender() && estadoCliente) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className={
            "grid-3 gap " + 
            (
                auth.rol === Roles.SALLER 
                ? "acciones-venta-vendedor"
                : "acciones-venta"
            )
        }>
            <div className="grid-6">
                <button className="btn btn-primary" onClick={() => setShowWindow(1)}>
                    {/* <BiRightArrowAlt /> */}
                    <BiArrowBack />
                </button>
            </div>
            
            <BtnOnOff2
                label="Vender"
                estado={verVender()}
                icon={<BiCaretRight />}
            >
                <LoadSwitchBtn2
                    loading={loadVenta}
                    className="btn btn-success"
                >
                    <BiCaretRight /> Vender
                </LoadSwitchBtn2>
            </BtnOnOff2>
        </div>
    )
}
