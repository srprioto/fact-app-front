import { BiArrowBack, BiCaretRight } from "react-icons/bi";
import { useAuth } from "../../../../auth/useAuth";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { Roles } from "../../../../resources/dtos/RolesDto";

interface rapidaVenta {
    loadVenta:boolean;
    setShowWindow:Function;
    verificarCaja:Function;
    handlerVenta:Function;
    verificarVender:Function;
}

export const RapidaVenta = ({ loadVenta, setShowWindow, verificarCaja, handlerVenta, verificarVender }:rapidaVenta) => {

    const serie:string = "V001";
    const verCaja:boolean = verificarVender();
    const auth = useAuth();

    return (
        <div className="venta-rapida">
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
                    <button className="btn btn-primary" onClick={() => setShowWindow(1)}>
                        {/* <BiRightArrowAlt /> */}
                        <BiArrowBack />
                    </button>
                </div>
                
                <BtnOnOff2
                    label="Vender"
                    estado={verCaja}
                    icon={<BiCaretRight />}
                >
                    <LoadSwitchBtn2
                        loading={loadVenta}
                        className="btn btn-success"
                        handler={() => verificarCaja(handlerVenta, serie)}
                    >
                        <BiCaretRight /> Vender
                    </LoadSwitchBtn2>
                </BtnOnOff2>            
            </div>

        </div> 
    )
}
