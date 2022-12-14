import { useEffect } from "react";
import { BiCheckCircle, BiInfoCircle, BiX, BiXCircle } from "react-icons/bi";

interface toast {
    toast:boolean;
    setToast:Function;
    infoToast:any;
}

export const Toast = ({ toast, setToast, infoToast }:toast) => {
    
    let icon:any;
    let titulo:string = "";

    switch (infoToast.tipo) {
        case "success":
            titulo = "Éxito";
            icon = <BiCheckCircle color="#34c38f" />
            break;
        case "warning":
            titulo = "Advertencia";
            icon = <BiInfoCircle color="#f1b44c" />
            break;
        case "danger":
            titulo = "Error";
            icon = <BiXCircle color="#f46a6a" />
            break;
    }   

    useEffect(() => {
        setTimeout(() => {
            setToast(false);
        }, 5000)
    }, [])


    return <>{
        toast
        && (
            <div className="toast">
                <BiX className="closeToast" onClick={() => setToast(false)} />
                <div className={`box-toast border-${infoToast.tipo}`}>
                    <div className="toast-icon">{ !!infoToast.icon ? infoToast.icon : icon }</div>
                    <div className="toast-info">
                        <h2>{ infoToast.titulo ? infoToast.titulo : titulo }</h2>
                        <p>{ infoToast.descripcion }</p>
                    </div>
                </div>
            </div>
        )
    }</>
    
}
