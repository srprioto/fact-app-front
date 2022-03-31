import { BiCubeAlt } from "react-icons/bi";

interface TextoRelleno {
    texto?:string;
    heightAuto?:boolean;
}

export const TextoRelleno = ({ texto, heightAuto }:TextoRelleno) => {
    return (
        <div className={"vacio " + (heightAuto && "vacio-heightauto")}>
            <div className="rotarIcon">
                {
                    texto && <h4>{ texto }</h4>
                }
                <BiCubeAlt />
            </div>
        </div>
    )
}
