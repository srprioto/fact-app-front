import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

interface tituloBox {
    titulo:string;
    link?:string;
    back?:boolean;
}

export const TitleBox = ({ titulo, link, back = false }:tituloBox) => {

    const navigate = useNavigate();
    
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
};



{/* <button onClick={() => navigate(-1)}>go back</button> */}