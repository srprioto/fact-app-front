import { BiCheck } from "react-icons/bi";
import { LoadingBtn } from "./LoadingBtn";

interface loadSwitchBtn {
    label?:string;
    loading:boolean;
    handler?:any;
    className?:string;
    icon?:any;
}

export const LoadSwitchBtn = ({ label = "Aceptar", loading, handler, className = "success", icon }:loadSwitchBtn) => {
    return (
        <>
            {
                loading
                ? <LoadingBtn />
                : (
                    handler
                    ? (
                        <button className={"btn btn-" + className} type="submit" onClick={() => handler()}>
                            { icon ? icon : <BiCheck /> }
                            { label ? label : "Aceptar" }
                        </button>
                    ) : (
                        <button className={"btn btn-" + className} type="submit">
                            { icon ? icon : <BiCheck /> }
                            { label ? label : "Aceptar" }
                        </button>
                    )
                    
                )
            }
        </>
    )
};
