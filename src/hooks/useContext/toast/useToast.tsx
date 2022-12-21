import { useContext } from "react";
import { ToastContext } from "./ToastProvider";

export const useToast = () => {
    return useContext(ToastContext);
}

// const toast = useToast();
// toast.show("success", "Producto registro correctamente!");  