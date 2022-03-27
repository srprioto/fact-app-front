import { 
    BiBarChart, 
    BiPlusCircle, 
    BiUser, 
    BiWalk, 
    BiGroup, 
    BiLayout,
    BiBox,
    BiStore,
    BiTransfer,
} from "react-icons/bi";

import { BoxMenu } from "./menu/BoxMenu";
import { ItemMenu } from "./menu/ItemMenu";

export const Menu = () => {

    const isActive = (n:any) => { 
        return n.isActive ? "activeMenu" : ""
    }

    return (
        <div className="menu">

            <div className="menu-top">
                <h1>Addid Sport</h1>
            </div>

            <div className="menu-body">

                <BoxMenu titulo="Menu">
                    <ItemMenu url="/" label="Dashboard" icon={ <BiBarChart /> } />
                </BoxMenu>

                <BoxMenu titulo="Locales">
                    <ItemMenu url="/tiendas" label="Tiendas" icon={ <BiStore /> } />
                </BoxMenu>

                <BoxMenu titulo="Stock">
                    <ItemMenu url="/almacen" label="Almacen" icon={ <BiLayout /> } />
                    <ItemMenu url="/ingreso-productos" label="Ingreso de productos" icon={ <BiPlusCircle /> } />
                    <ItemMenu url="/productos" label="Inventario" icon={ <BiBox /> } />
                </BoxMenu>

                <BoxMenu titulo="Personas">
                    <ItemMenu url="/clientes" label="Clientes" icon={ <BiGroup /> } />
                    <ItemMenu url="/proveedores" label="Proveedores" icon={ <BiWalk /> } />
                    <ItemMenu url="/usuarios" label="Usuarios" icon={ <BiUser /> } />
                </BoxMenu>

                <BoxMenu titulo="Reportes">
                    <ItemMenu url="/reporte/transacciones" label="Transferencias" icon={ <BiTransfer /> } />
                </BoxMenu>

            </div>

        </div>
    )
};







{/* <div className="box-menus">
    <h4 className="title-item-menu">Menu</h4>
    <ul className="item-menu">

        <NavLink to="/" className={ (n) => isActive(n) }>
            <li>
                <BiBarChart /><p>Dashboard</p>
            </li>
        </NavLink>

    </ul>
</div> */}