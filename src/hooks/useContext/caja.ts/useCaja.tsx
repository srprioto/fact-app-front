import { useContext } from "react";
import { CajaContext } from "./CajaProvider";

export const useCaja = () => {
    const contextValue = useContext(CajaContext)
    return contextValue
}
