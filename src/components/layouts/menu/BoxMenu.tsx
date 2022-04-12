interface boxMenu { 
    titulo?:string
    children:any
}

export const BoxMenu = ({ titulo, children }:boxMenu) => {
    
    return (
        <div className="box-menus">
            { titulo && <h4 className="title-item-menu">{ titulo }</h4> }
            <ul className="item-menu">
                { children }
            </ul>
        </div>
    )
}
