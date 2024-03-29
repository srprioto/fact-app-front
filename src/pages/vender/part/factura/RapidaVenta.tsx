import { BiArrowBack, BiCaretRight } from "react-icons/bi";
import { useAuth } from "../../../../auth/useAuth";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { ToolTip } from "../../../../components/tooltip/ToolTip";
import { Roles } from "../../../../resources/dtos/RolesDto";
import { tipoVenta } from "../../../../resources/dtos/VentasDto";

interface rapidaVenta {
    loadVenta:boolean;
    setShowWindow:Function;
    verificarCaja:Function;
    handlerVenta:Function;
    verificarVender:Function;
}

export const RapidaVenta = ({ loadVenta, setShowWindow, verificarCaja, handlerVenta, verificarVender }:rapidaVenta) => {

    // const serie:string = "V001";
    const tipo_venta:string = tipoVenta.venta_rapida;
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
                <div className="grid-6" id="btn-back-page">
                    <button className="btn btn-primary" onClick={() => setShowWindow(1)}>
                        {/* <BiRightArrowAlt /> */}
                        <BiArrowBack />
                    </button>
                    <ToolTip
                        anchor="btn-back-page"
                        descripcion="Ir un paso atrás"
                    /> 
                </div>
                
                <BtnOnOff2
                    label="Vender"
                    estado={verCaja}
                    icon={<BiCaretRight />}
                >
                    <LoadSwitchBtn2
                        loading={loadVenta}
                        className="btn btn-success"
                        handler={() => verificarCaja(handlerVenta, tipo_venta)}
                    >
                        <BiCaretRight /> Venta rapida
                    </LoadSwitchBtn2>
                </BtnOnOff2>
            </div>

        </div> 
    )
}


// <BtnOnOff2
//     label="Vender"
//     estado={verCaja}
//     icon={<BiCaretRight />}
// >
//     <LoadSwitchBtn2
//         loading={loadVenta}
//         className="btn btn-info"
//         handler={() => verificarCaja(handlerVenta, serie, "cotizacion")}
//     >
//         <BiBook /> Crear cotizacion
//     </LoadSwitchBtn2>
// </BtnOnOff2>