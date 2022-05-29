import { NavLink } from "react-router-dom"

interface itemMenu {
    url:string;
    label:string;
    icon:any;
    end?:boolean;
}

export const ItemMenu = ({ url, label, icon, end }:itemMenu) => {

    const isActive = (n:any) => { 
        return n.isActive ? "activeMenu" : ""
    }

    return (
        <NavLink end={end ? true : false} to={url} className={ (n) => isActive(n) }>
            <li>
                { icon }<p>{ label }</p>
            </li>
        </NavLink>
    )
}
