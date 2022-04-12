import { useState } from "react";
import { BiDownload } from "react-icons/bi";
// import { Link } from "react-router-dom";
import { ModalWrap } from "../../../../components/modals/ModalWrap";
import { url } from "../../../../resources/fetch";
import { VENTAS } from "../../../../resources/routes";
import { ModalExportarExcel } from "./ModalExportarExcel";

export const ExportarExcel = () => {

    const [modalExport, setModalExport] = useState<boolean>(false);    

    return (
        <>
            {/* <a 
                href={url() + VENTAS + "/reporte/download"} 
                className="btn btn-info nm-svg"
                // target="_blank" rel="noopener noreferrer"
            ><BiDownload /></a> */}

            <button className="btn btn-primary" onClick={() => { 
                window.location.href = url() + VENTAS + "/reporte/download"
                // setModalExport(!modalExport)
            }}>
                <BiDownload />
            </button>

            <ModalWrap modal={modalExport}>
                <ModalExportarExcel
                    modal={modalExport}
                    setModal={setModalExport}
                />
            </ModalWrap>
        
        </>
    )
}
