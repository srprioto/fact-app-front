import { BiCheck } from "react-icons/bi";

interface btnOnOff {
    label?:string;
    estado:boolean;
    onClick?:any;
    className?:string;
    icon?:any
}

export const BtnOnOff = ({ label = "Aceptar", estado, onClick, icon, className = "success" }:btnOnOff) => {
    return (
        <>
            {
                estado
                ? (
                    <button 
                        className={"btn btn-" + className}
                        onClick={ onClick }
                    >
                        { icon ? icon : <BiCheck /> } { " " + label }
                    </button>
                ) : (
                    <button className="btn btn-disable">
                        { icon ? icon : <BiCheck /> } { " " + label }
                    </button>
                )
            }
        
        </>
    )
}
