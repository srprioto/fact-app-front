import { NavLink } from "react-router-dom"

interface ItemMenu {
    url:string;
    label:string;
    icon:any;
}

export const ItemMenu = ({ url, label, icon }:ItemMenu) => {

    const isActive = (n:any) => { 
        return n.isActive ? "activeMenu" : ""
    }

    return (
        <NavLink to={url} className={ (n) => isActive(n) }>
            <li>
                { icon }<p>{ label }</p>
            </li>
        </NavLink>
    )
}
