import { BiCheck } from "react-icons/bi";

interface btnOnOff2 {
    label?:string;
    estado:boolean;
    icon?:any;
    children:any;
}

export const BtnOnOff2 = ({ label = "Aceptar", estado, icon, children }:btnOnOff2) => {
    return (
        <>
            {
                estado
                ? (
                    children
                ) : (
                    <button className="btn btn-disable">
                        { icon ? icon : <BiCheck /> } { " " + label }
                    </button>
                )
            }
        
        </>
    )
}
