import { BiArrowBack, BiDotsVertical, BiX } from "react-icons/bi";

import { Loading } from "../loads/Loading";

interface modal{
    modal:boolean;
    titulo?:string;
    border?:string; // border="border-danger"
    width?:number;
    height?:string|number;
    setModal?:Function; // habilita el boton de cerrar
    back?:Function; // habilita un boton de flecha atras
    getFuncion?:Function;
    btnClose?:Function;
    loading?:boolean;
    notransparent?:boolean;
    acciones?:Array<any>|null; // abre modals, tiene que estar fuera, dentro del modal principal
    children:any;
}

export const Modal = ({ 
    titulo = "", 
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
    acciones,
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
                                            titulo && (
                                                <h2 className="title-modal">
                                                    { titulo }
                                                </h2>
                                            )
                                        }
                                        {
                                            acciones
                                            && <span className="wrap-dropdown-modal acciones-modal">
                                                <BiDotsVertical />
                                                <div className="dropdown-modal" >
                                                    {
                                                        acciones.map((e:any, i:number) => { 
                                                            return (
                                                                <span key={i} onClick={ e.funcion } >
                                                                    { e.icon } { e.label }
                                                                </span>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            </span>
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


// acciones

/* 
const acciones = ():Array<any> => {
    const accionesArray:Array<any> = [];

    if (!loadingOne && venta.estado_venta === "listo" && !modalConvert) {
        accionesArray.push({
            label: "Imprimir",
            funcion: () => setModalReimprimir(true),
            icon: <BiBookmarkAltMinus />
        });
        if ( venta.tipo_venta === tipoVenta.venta_rapida ) {
            accionesArray.push({
                label: "Cambiar Comp.",
                funcion: () => setModalConvComprobante(true),
                icon: <BiMoveHorizontal />
            });
        }
        accionesArray.push({
            label: "Anular Venta",
            funcion: () => setModalAnular(true),
            icon: <BiX /> 
        });
    }
    
    return accionesArray;
}

<Modal
    // ...
    acciones={acciones().length > 0 ? acciones() : null}
>

*/