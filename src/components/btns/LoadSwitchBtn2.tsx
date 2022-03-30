import { BiCheck } from "react-icons/bi";
import { LoadingBtn } from "./LoadingBtn";

interface LoadSwitchBtn {
    loading:boolean;
    className:string;
    handler?:any;
    children?:any
}

export const LoadSwitchBtn2 = ({ loading, className, handler, children }:LoadSwitchBtn) => {
    return (
        <>
            {
                loading
                ? <LoadingBtn />
                : (
                    handler
                    ? (
                        <button className={className} type="submit" onClick={() => handler()}>
                            {
                                children
                            }
                        </button>
                    ) : (
                        <button className={className} type="submit">
                            {
                                children
                            }
                        </button>
                    )
                    
                )
            }
        </>
    )
};
