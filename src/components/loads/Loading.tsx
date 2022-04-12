import { BiLoaderAlt } from "react-icons/bi";

interface Loading{
    background?:boolean;
    noLabel?:boolean;
}

export const Loading = ({ background, noLabel }:Loading) => {
    return (
        <div className={"cargando " + (background && "box-bg")}>
            <div className="rotarIcon">
                { !noLabel && <h4>Por favor, espere ...</h4> } 
                <BiLoaderAlt />
            </div>
        </div>
    )
};
