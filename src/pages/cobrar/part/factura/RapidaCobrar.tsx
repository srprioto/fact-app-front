// import { BiCaretRight, BiX } from "react-icons/bi"
import { BiCaretRight, BiX } from "react-icons/bi"
import { ConfirmarVenta } from "./ConfirmarVenta"

export const RapidaCobrar = ({ setModalConfVenta, modalConfVenta, setModalRechazVenta, modalRechazVenta }:any) => {
    return (
        <div className="">

            <div className="wrap-confirmar-venta grid-3 gap mb-10 mt-25">
                <button
                    className="btn btn-success" 
                    type="submit"
                    onClick={() => setModalConfVenta(!modalConfVenta)}
                ><BiCaretRight /> Confirmar venta</button>
                <div></div>
                <button 
                    className="btn btn-danger"
                    onClick={() => setModalRechazVenta(!modalRechazVenta)}
                ><BiX /> Rechazar venta</button>
            </div>

            {/* <ConfirmarVenta
                setModalConfVenta={setModalConfVenta}
                modalConfVenta={modalConfVenta}
                setModalRechazVenta={setModalRechazVenta}
                modalRechazVenta={modalRechazVenta}
            /> */}

        </div>
    )
}
