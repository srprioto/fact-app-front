import { BiDownload } from "react-icons/bi"
import { Modal } from "./Modal"
import { downloadFile } from "../../resources/fetch";
import { useState } from "react";
import { LoadingBtn } from "../btns/LoadingBtn";

interface modalDescExcel {
    modal:boolean;
    setModal:Function;
    linkDescarga:string;
    nombreArchivo:string;
}

export const ModalDescExcel = ({ modal, setModal, linkDescarga, nombreArchivo }:modalDescExcel) => {

    const [loading, setLoading] = useState<boolean>(false);


    const iniciarDescarga = async () => {

        await downloadFile(
            linkDescarga, 
            nombreArchivo, 
            { loading, setLoading },
            { modal, setModal }
        );

    }
    

    return (
        <Modal
            modal={modal}
            setModal={setModal}
            width={40}
        >

            <h3 className="mb-20 center mayus">Importante</h3>

            <p className="center warning">Esta descarga puede tardar un poco, mantente a la espera y no te desconectes.</p>

            <div className="grid-3 gap mt-25">
                <div></div>
                {
                    loading 
                    ? <LoadingBtn />
                    : <button className="btn btn-warning w100" onClick={iniciarDescarga}>
                        <BiDownload /> Descargar
                    </button>
                }
                
            </div>

        </Modal>
    )
}


/* 
<ModalWrap modal={modalDescargarExcel}>
    <ModalDescExcel
        modal={modalDescargarExcel}
        setModal={setModalDescargarExcel}
        linkDescarga={API_URL + PRODUCTOS + '/descargar/excel'}
        nombreArchivo="productos_excel.xlsx"
    />
</ModalWrap> 
*/