import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

interface tituloBox {
    titulo:string;
    link?:string;
    back?:boolean;
    accion?:Function;
}

export const TitleBox = ({ titulo, link, back = false, accion }:tituloBox) => {

    const navigate = useNavigate();

    const handlerAccion = () => { 
        accion && accion();
    }
    
    return (
        <div className="titulo-box">
            {
                link 
                && <Link to={`${link}`} className="button-icon"><BiArrowBack /></Link>
            }
            {
                back
                && <button onClick={() => navigate(-1)} className="button-icon"><BiArrowBack /></button>
            }
            {
                accion
                && <button onClick={() => handlerAccion()} className="button-icon"><BiArrowBack /></button>
            }
            
            {/* { 
                back
                && (
                    navigate(-1) == undefined 
                    ? <Link to={`${link}`} className="button-icon"><BiLeftArrow /></Link>
                    : <button onClick={() => navigate(-1)} className="button-icon"><BiLeftArrow /></button>
                )
                
            } */}
            <h2 className="title-page">{ titulo }</h2>
        </div>
    )
}

// <button onClick={() => navigate(-1)}>go back</button>

