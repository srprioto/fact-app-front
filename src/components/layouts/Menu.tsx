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
    BiArchiveIn,
    BiExit,
    BiCartAlt,
} from "react-icons/bi";

import { useAuth } from "../../auth/useAuth";

import { BoxMenu } from "./menu/BoxMenu";
import { ItemMenu } from "./menu/ItemMenu";

export const Menu = () => {

    const auth = useAuth();

    const handlerSalir = () => { 
        auth.logout();
    }

    return (
        <div className="menu">

            <div className="menu-top">
                <h1>Addid Sport</h1>
            </div>

            <div className="menu-body">

                <BoxMenu titulo="Menu">
                    <ItemMenu url="/dashboard" label="Dashboard" icon={ <BiBarChart /> } />
                </BoxMenu>

                <BoxMenu titulo="Locales">
                    <ItemMenu url="/tiendas" label="Tiendas" icon={ <BiStore /> } />
                    <ItemMenu url="/almacenes" label="Almacenes" icon={ <BiLayout /> } />
                </BoxMenu>

                <BoxMenu titulo="Productos">
                    {/* <ItemMenu url="/almacen" label="Almacen" icon={ <BiLayout /> } /> */}
                    <ItemMenu url="/ingreso-productos" label="Ingresar productos" icon={ <BiPlusCircle /> } />
                    <ItemMenu url="/productos" label="Productos" icon={ <BiBox /> } />
                </BoxMenu>

                <BoxMenu titulo="Personas">
                    <ItemMenu url="/clientes" label="Clientes" icon={ <BiGroup /> } />
                    <ItemMenu url="/proveedores" label="Proveedores" icon={ <BiWalk /> } />
                    <ItemMenu url="/usuarios" label="Usuarios" icon={ <BiUser /> } />
                </BoxMenu>

                <BoxMenu titulo="Reportes">
                    <ItemMenu url="/reporte/ventas" label="Ventas" icon={ <BiCartAlt /> } />
                    <ItemMenu url="/reporte/transacciones" label="Transferencias" icon={ <BiTransfer /> } />
                    <ItemMenu url="/reporte/ingreso-productos" label="Ingresos de productos" icon={ <BiArchiveIn /> } />
                </BoxMenu>

                <BoxMenu>
                    <ul>
                        <li onClick={handlerSalir} className="pointer"><p><BiExit className="rotate-180" />Salir</p></li>
                    </ul>
                </BoxMenu>

            </div>

        </div>
    )
};


/* <div className="box-menus">
    <h4 className="title-item-menu">Menu</h4>
    <ul className="item-menu">

        <NavLink to="/" className={ (n) => isActive(n) }>
            <li>
                <BiBarChart /><p>Dashboard</p>
            </li>
        </NavLink>

    </ul>
</div> */