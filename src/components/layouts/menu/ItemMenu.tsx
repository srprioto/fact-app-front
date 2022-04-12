import { NavLink } from "react-router-dom"

interface itemMenu {
    url:string;
    label:string;
    icon:any;
}

export const ItemMenu = ({ url, label, icon }:itemMenu) => {

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
