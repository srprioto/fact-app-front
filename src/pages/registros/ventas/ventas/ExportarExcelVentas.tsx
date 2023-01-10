import { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { ModalWrap } from "../../../../components/modals/ModalWrap";
import { ToolTip } from "../../../../components/tooltip/ToolTip";
import { API_URL } from "../../../../resources/fetch";
import { VENTAS } from "../../../../resources/routes";
import { ModalExportarExcel } from "./modals/ModalExportarExcel";
// import { Link } from "react-router-dom";


interface exportarExcel {
    fechas:any;
}

export const ExportarExcelVentas = ({ fechas }:exportarExcel) => {

    const [modalExport, setModalExport] = useState<boolean>(false);    

    return (
        <>
            {/* <a 
                href={url() + VENTAS + "/reporte/download"} 
                className="btn btn-info nm-svg"
                // target="_blank" rel="noopener noreferrer"
            ><BiDownload /></a> */}

            <button 
                id="btn-desc-excel"
                className="btn btn-primary" 
                onClick={() => { 
                window.location.href = API_URL + VENTAS + `/reporte/download/${fechas.inicio}/${fechas.fin}`;
            }}>
                <BiDownload />
                <ToolTip
                    anchor="btn-desc-excel"
                    descripcion="
                        Descarga un documento Excel con la lista de registros.<br/>
                        Requiere establecer un rango de fechas para la descarga, de lo contrario, solo se descargará los registros comprendidos el mes pasado.
                    "
                /> 
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
