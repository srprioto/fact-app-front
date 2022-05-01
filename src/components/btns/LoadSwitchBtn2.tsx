import { LoadingBtn } from "./LoadingBtn";

interface loadSwitchBtn2 {
    loading:boolean;
    className:string;
    handler?:any; // requiere arrow function por fuera
    children?:any
}

export const LoadSwitchBtn2 = ({ loading, className, handler, children }:loadSwitchBtn2) => {
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
