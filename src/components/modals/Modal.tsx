import { BiX } from "react-icons/bi";

import { Loading } from "../loads/Loading";

interface modal{
    modal:boolean;
    title?:string;
    border?:string;
    width?:number;
    setModal?:Function;
    getFuncion?:Function;
    btnClose?:Function;
    loading?:boolean;
    children:any;
}

export const Modal = ({ 
    title = "", 
    border = "", 
    width, 
    modal, 
    setModal, 
    getFuncion,
    btnClose,
    loading = false, 
    children 
}:modal) => {
    
    const handlerCloseModal = () => { 
        setModal && setModal(!modal)
        getFuncion && getFuncion();
        btnClose && btnClose();
    }

    return (
        <>
            {
                modal
                && (
                    // componente 2 del modal aqui
                    <div className="wrap-modal">
                        {
                            loading 
                            ? <Loading />
                            : (
                                <div className={"modal " + border} style={{width: `${width}%`}}>

                                    {
                                        setModal
                                        && <span className="close-modal" onClick={() => handlerCloseModal()}><BiX /></span>
                                    }

                                    {title && <h2 className="title-modal">{ title }</h2>}
                                    { children }
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
    
};
