import { BiCheck } from "react-icons/bi";

interface btnOnOff2 {
    label?:string;
    estado:boolean;
    icon?:any;
    titleDisable?:string;
    children:any;
}

export const BtnOnOff2 = ({ label = "Aceptar", estado, icon, titleDisable, children }:btnOnOff2) => {
    return (
        <>
            {
                estado
                ? (
                    children
                ) : (
                    <button className="btn btn-disable" type="button" title={titleDisable}>
                        { icon ? icon : <BiCheck /> } { " " + label }
                    </button>
                )
            }
        
        </>
    )
}


/* <BtnOnOff2
    estado={validMsg()}
    icon={<BiCheck />}
    label="Anular"
>
    // ...
</BtnOnOff2> */