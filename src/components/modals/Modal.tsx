import { BiArrowBack, BiX } from "react-icons/bi";

import { Loading } from "../loads/Loading";

interface modal{
    modal:boolean;
    title?:string;
    border?:string; // border="border-danger"
    width?:number;
    height?:string|number;
    setModal?:Function; // habilita el boton de cerrar
    back?:Function; // habilita un boton de flecha atras
    getFuncion?:Function;
    btnClose?:Function;
    loading?:boolean;
    notransparent?:boolean;
    children:any;
}

export const Modal = ({ 
    title = "", 
    border = "", 
    width,
    height,
    modal, 
    setModal, 
    back,
    getFuncion,
    btnClose,
    loading = false, 
    notransparent,
    children 
}:modal) => {
    
    const handlerCloseModal = () => { 
        setModal && setModal(!modal)
        back && back(!modal)
        getFuncion && getFuncion();
        btnClose && btnClose();
    }

    const styles = {
        width: `${width}%`,
        height: height && `${height}%`
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
                                <div className={
                                    "modal " + 
                                    border +
                                    (notransparent ? " modal-notransparent" : "")
                                } style={styles}>

                                    
                                    <div className="relative w100">
                                        {
                                            back
                                            && <span 
                                                className="back-modal"
                                                onClick={() => handlerCloseModal()}
                                            ><BiArrowBack /></span>
                                        }
                                        {
                                            title && (
                                                <h2 className="title-modal">
                                                    { title }
                                                </h2>
                                            )
                                        }
                                        {
                                            setModal
                                            && <span 
                                                className="close-modal" 
                                                onClick={() => handlerCloseModal()}
                                            ><BiX /></span>
                                        }
                                    </div>



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


// para usar overHidden

// const [overHidden, setOverHidden] = useState<boolean>(false) en los estados del modal padre
// luego, añadimos como propiedad a overHidden del modal padre
// añadimos setOverHidden al modal hijo como propiedad para el boton btnClose={setOverHidden(false)}
// añadimos setOverHidden al boton que active el modal hijo setOverHidden(true)