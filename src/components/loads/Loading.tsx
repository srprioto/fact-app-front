import { BiLoaderAlt } from "react-icons/bi";

export const Loading = () => {
    return (
        <div className="cargando">
            <div className="rotarIcon">
                <h4>Por favor, espere ...</h4>
                <BiLoaderAlt />
            </div>
        </div>
    )
};
