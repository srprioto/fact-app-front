import { BiDotsVertical } from "react-icons/bi";

export const DropDown = ({ width = 190, children }:any) => {

    return (
        <div className="wrap-dropdown">
            <BiDotsVertical className="pointer" />
            <div className="dropdown" style={{width: `${width}px`}}>
                { children }
            </div>
        </div>
    )
};

/* 
<DropDown>
    <Link to={`/proveedores/${id}/edit`} >
        <BiPencil />Editar proveedor
    </Link>
    <span onClick={ () => handlerVer(id) }>
        <BiShowAlt />Ver detalles
    </span>
</DropDown> 
*/
