import { BiCheck } from "react-icons/bi";
import { LoadingBtn } from "./LoadingBtn";

interface loadSwitchBtn {
    label?:string;
    loading:boolean;
    handler?:any;
    className?:string;
}

export const LoadSwitchBtn = ({ label = "Aceptar", loading, handler, className = "success" }:loadSwitchBtn) => {
    return (
        <>
            {
                loading
                ? <LoadingBtn />
                : (
                    handler
                    ? (
                        <button className={"btn btn-" + className} type="submit" onClick={() => handler()}>
                            <BiCheck />{ label ? label : "Aceptar" }
                        </button>
                    ) : (
                        <button className={"btn btn-" + className} type="submit">
                            <BiCheck />{ label ? label : "Aceptar" }
                        </button>
                    )
                    
                )
            }
        </>
    )
};
