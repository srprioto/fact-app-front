import { BiLoaderAlt } from "react-icons/bi";

interface loading{
    background?:boolean;
    noLabel?:boolean;
}

export const Loading = ({ background, noLabel }:loading) => {
    return (
        <div className={"cargando " + (background && "box-bg")}>
            <div className="rotarIcon">
                { !noLabel && <h4>Por favor, espere ...</h4> } 
                <BiLoaderAlt />
            </div>
        </div>
    )
};
