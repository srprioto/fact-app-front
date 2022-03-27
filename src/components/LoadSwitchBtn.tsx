import { BiCheck } from "react-icons/bi";
import { LoadingBtn } from "./LoadingBtn";

interface LoadSwitchBtn {
    label?:string;
    loading:boolean;
    handler?:any;
}

export const LoadSwitchBtn = ({ label = "Aceptar", loading, handler }:LoadSwitchBtn) => {
    return (
        <>
            {
                loading
                ? <LoadingBtn />
                : (
                    handler
                    ? (
                        <button className="btn btn-success" type="submit" onClick={() => handler()}>
                            <BiCheck />{ label ? label : "Aceptar" }
                        </button>
                    ) : (
                        <button className="btn btn-success" type="submit">
                            <BiCheck />{ label ? label : "Aceptar" }
                        </button>
                    )
                    
                )
            }
        </>
    )
};
