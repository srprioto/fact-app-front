import { BiCubeAlt } from "react-icons/bi";

interface textoRelleno {
    texto?:string;
    heightAuto?:boolean;
    icon?:any;
}

export const TextoRelleno = ({ texto, heightAuto, icon }:textoRelleno) => {
    return (
        <div className={"vacio " + (heightAuto && "vacio-heightauto")}>

            {
                !icon 
                ? (
                    <div className="rotarIcon">
                        { texto && <h4>{ texto }</h4> } <BiCubeAlt />
                    </div>
                )
                : (
                    <div>
                        { texto && <h4>{ texto }</h4> } { icon }
                    </div>
                )
            }
        </div>
    )
}
