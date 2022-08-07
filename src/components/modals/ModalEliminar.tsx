import { useState } from "react";
import { BiReply } from "react-icons/bi";

import { Modal } from "./Modal";
import { LoadSwitchBtn } from "../btns/LoadSwitchBtn";

import { destroy } from "../../resources/fetch";

interface modalEliminar{
    modal:boolean;
    setModal:Function;
    id:number;
    nombre?:string;
    url:string;
    getData:Function;
    setSearchState?:Function;
}

export const ModalEliminar = ({ modal, setModal, id, nombre, url, getData, setSearchState }:modalEliminar) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handlerDestoroy = async () => { 

        setLoading(true);
        try {
            await destroy(id, url);
            setModal(false);
            setSearchState && setSearchState(false);
            getData();
            setLoading(false);
        } catch (error) {
            setLoading(true);
            getData();
            console.log(error);            
        }
    }

    return (
        <Modal border={"border-danger"} modal={modal}>
            <div className="center grid-1 gap">

                <div className="grid-1 gap">
                    {
                        nombre
                        ? <h3>¿Seguro que quieres eliminar { nombre }?</h3>
                        : <h3>¿Seguro que quieres eliminar el registro?</h3>
                    }
                </div>

                <div className="grid-4 gap">
                    <div />

                    <LoadSwitchBtn label="Aceptar" loading={loading}  handler={handlerDestoroy}/>
                    
                    <button className="btn btn-danger" onClick={ () => { setModal(false) } }>
                        <BiReply /> Regresar
                    </button>

                    <div />
                </div>

            </div>

        </Modal>
    )
};
