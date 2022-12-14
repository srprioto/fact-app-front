import { createContext, useState } from "react";
import { Toast } from "../../../components/toast/Toast";
import { WrapToast } from "../../../components/toast/WrapToast";

export const ToastContext = createContext<any>({});

export const ToastProvider = ({ children }:any) => {

    const [showToast, setShowToast] = useState<boolean>(false);
    const [infoToast, setInfoToast] = useState<any>({});
    
    const show = (tipo:string, descripcion:string, titulo?:string, icon?:any) => {
        setInfoToast({
            tipo,
            descripcion,
            titulo: titulo && titulo,
            icon: icon && icon
        })
        setShowToast(!showToast);
    }

    const contextValue:any = { show }

    return (
        <ToastContext.Provider value={contextValue}>
            <WrapToast toast={showToast}>
                <Toast 
                    toast={showToast} 
                    setToast={setShowToast} 
                    infoToast={infoToast} 
                />
            </WrapToast>
            { children }
        </ToastContext.Provider>
    )
}

