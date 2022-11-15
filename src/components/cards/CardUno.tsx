import { BiBomb } from "react-icons/bi";
import { LoadingImg } from "../loads/LoadingImg";

interface cardUno {
    titulo:string;
    label?:string|undefined;
    icon?:any;
    descripcion?:string;
    coloricon?:string;
    loading?:boolean;
}

export const CardUno = ({ titulo, label, descripcion, icon, coloricon = "primary", loading }:cardUno) => {

    return (
        loading
        ? (
            <LoadingImg />
        ) : (
            <div className="wrap-card-uno">
                <div className="box box-par m-0 card-uno grid-31">
                    <div className="info-card-uno">
                        <h4 className="mayus">{ titulo }</h4>
                        <h2>{ label !== undefined ? label : "..."}</h2>
                        {
                            descripcion && <p>{ descripcion }</p>
                        }
                    </div>
                    <div className={ "icon-card-uno " + coloricon }>
                        { icon ? icon : <BiBomb /> }
                    </div>
                </div>
            </div>
        )

    )
}



