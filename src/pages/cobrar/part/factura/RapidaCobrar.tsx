// import { BiCaretRight, BiX } from "react-icons/bi"
import { useEffect } from "react";
import { BiCaretRight, BiX } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
// import { ConfirmarVenta } from "./ConfirmarVenta"
import { tipoVenta } from "../../../../resources/dtos/VentasDto";

export const RapidaCobrar = ({ 
    setModalConfVenta, 
    modalConfVenta, 
    setModalRechazVenta, 
    modalRechazVenta,
    venta,
    setVenta,
    activarConfirmarVenta
}:any) => {

    // const serie:string = "V001";
    const tipo_venta:string = tipoVenta.venta_rapida;

    useEffect(() => {
        setVenta({
            ...venta,
            tipo_venta: tipo_venta
            // serie: serie
        })
    }, [])
    

    return (
        <div className="bt bt-neutro">

            <div className="wrap-confirmar-venta grid-3 gap mb-10 mt-25">
                <BtnOnOff2
                    label="Confirmar venta"
                    estado={activarConfirmarVenta()}
                    icon={<BiCaretRight />}
                >
                    <button
                        className="btn btn-success" 
                        type="submit"
                        onClick={() => setModalConfVenta(!modalConfVenta)}
                    ><BiCaretRight /> Confirmar venta</button>
                </BtnOnOff2>
                <div></div>
                <button 
                    className="btn btn-danger"
                    onClick={() => setModalRechazVenta(!modalRechazVenta)}
                ><BiX /> Rechazar venta</button>
            </div>

        </div>
    )
}


