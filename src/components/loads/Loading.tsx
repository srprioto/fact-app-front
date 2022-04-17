import { BiLoaderAlt } from "react-icons/bi";

interface loading{
    background?:boolean;
    noLabel?:boolean;
    heightModal?:boolean;
}

export const Loading = ({ background, noLabel, heightModal }:loading) => {

    const handlerBackground = () => { 
        if (background) {
            return "box-bg"
        } else {
            return ""
        }
    }

    const handlerHeightModal = () => { 
        if (heightModal) {
            return " min-height-modal"
        } else {
            return ""
        }
    }

    return (
        <div className={"cargando " + handlerBackground() + handlerHeightModal()}>
            <div className="rotarIcon">
                { !noLabel && <h4>Por favor, espere ...</h4> } 
                <BiLoaderAlt />
            </div>
        </div>
    )
};
