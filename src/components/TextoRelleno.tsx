import { BiCubeAlt } from "react-icons/bi";

interface TextoRelleno {
    texto:string;
}

export const TextoRelleno = ({ texto }:TextoRelleno) => {
    return (
        <div className="vacio">
            <div className="rotarIcon">
                <h4>{ texto }</h4>
                <BiCubeAlt />
            </div>
        </div>
    )
}
