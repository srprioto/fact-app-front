import { BiDownload } from "react-icons/bi";
import { Modal } from "../../../../components/modals/Modal"
import { BoxVerIngresos } from "./BoxVerIngresos";
import { useState } from "react";
import { ModalWrap } from "../../../../components/modals/ModalWrap";
import { ModalDescExcel } from "../../../../components/modals/ModalDescExcel";
import { API_URL } from "../../../../resources/fetch";
import { MOVIMIENTOS } from "../../../../resources/routes";

export const ModalVerIngreso = ({ modal, setModal, idIngreso }:any) => {

    const [modalDescargarExcel, setModalDescargarExcel] = useState<boolean>(false);

    const handlerDescargarExcel = () => { 
        setModalDescargarExcel(true);
    }


    return (
        <Modal
            titulo="Detalles del ingreso de productos"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={80}
            acciones={[{
                label: "Descargar Excel",
                funcion: () => handlerDescargarExcel(),
                icon: <BiDownload /> 
            }]}
        >
            <BoxVerIngresos idIngreso={idIngreso} />

            <ModalWrap modal={modalDescargarExcel}>
                <ModalDescExcel
                    modal={modalDescargarExcel}
                    setModal={setModalDescargarExcel}
                    linkDescarga={API_URL + MOVIMIENTOS + '/descargar/excel/' + idIngreso}
                    nombreArchivo="Registro_Ingresos.xlsx"
                />
            </ModalWrap> 

        </Modal>
    )
}
