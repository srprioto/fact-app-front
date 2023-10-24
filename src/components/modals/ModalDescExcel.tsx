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
            setModal={!loading ? setModal : undefined}
            width={40}
        >

            <h3 className="mb-20 center mayus">Importante</h3>

            <p className="center strong">Esta descarga puede tardar, espera un poco y no te desconectes.</p>

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

BOTON DE ACTIVACION:

const [modalDescargarExcel, setModalDescargarExcel] = useState<boolean>(false);

const handlerModalDescargarExcel = () => { 
    setModalDescargarExcel(true);
}

<button 
    id="btn-desc-excel"
    className="btn btn-primary" 
    onClick={() => handlerModalDescargarExcel()}
    // onClick={() => {window.location.href = `https://www.youtube.com/`;}}
>
    <BiDownload />
</button>


MODAL:

<ModalWrap modal={modalDescargarExcel}>
    <ModalDescExcel
        modal={modalDescargarExcel}
        setModal={setModalDescargarExcel}
        linkDescarga={API_URL + PRODUCTOS + '/descargar/excel'}
        nombreArchivo="productos_excel.xlsx"
    />
</ModalWrap> 


*/