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
    labelBtn:string;
    tipoDoc?:string;
}

export const AccionesVenta = ({ 
    loadVenta, 
    setShowWindow, 
    verificarVender,
    estadoCliente,
    labelBtn,
    tipoDoc
}:rapidaVenta) => {

    const auth = useAuth();
    
    const verVender = () => { 
        if (
            (verificarVender() && estadoCliente) ||
            (verificarVender() && tipoDoc === "noDocumento")
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
                <div className="grid-6">
                    <button className="btn btn-primary" type="button" onClick={() => setShowWindow(1)}>
                        {/* <BiRightArrowAlt /> */}
                        <BiArrowBack />
                    </button>
                </div>
                
                <BtnOnOff2
                    label={labelBtn}
                    estado={verVender()}
                    icon={<BiCaretRight />}
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
