interface CardUno {
    titulo:string;
    label?:string|undefined;
    icon:any;
    descripcion?:string;
    coloricon?:string;
}

export const CardUno = ({ titulo, label, descripcion, icon, coloricon = "primary" }:CardUno) => {
    return (
        <div className="wrap-card-uno">
            <div className="box box-par card-uno grid-31">
                <div className="info-card-uno">
                    <h4>{ titulo }</h4>
                    <h2>{ label !== undefined ? label : "..."}</h2>
                    {
                        descripcion && <p>{ descripcion }</p>
                    }
                </div>
                <div className={ "icon-card-uno " + coloricon }>
                    { icon }
                </div>
            </div>
        </div>
    )
}
