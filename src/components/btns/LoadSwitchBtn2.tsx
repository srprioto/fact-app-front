import { LoadingBtn } from "./LoadingBtn";

interface loadSwitchBtn2 {
    loading:boolean;
    className:string;
    handler?:any; // requiere arrow function por fuera
    title?:string;
    children?:any
}

export const LoadSwitchBtn2 = ({ loading, className, handler, title, children }:loadSwitchBtn2) => {
    return (
        <>
            {
                loading
                ? <LoadingBtn />
                : (
                    handler
                    ? (
                        <button 
                            title={title}
                            className={className} 
                            type="submit" 
                            onClick={() => handler()}
                        >
                            {
                                children
                            }
                        </button>
                    ) : (
                        <button 
                            title={title}
                            className={className} 
                            type="submit"
                        >
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
