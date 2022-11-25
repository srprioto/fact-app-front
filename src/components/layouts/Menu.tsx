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
    BiCartAlt,
    BiDollarCircle,
    BiBarChartAlt,
    BiAnalyse,
} from "react-icons/bi";
import { BoxMenu } from "./menu/BoxMenu";
import { ItemMenu } from "./menu/ItemMenu";
import { MenuTop } from "./menu/MenuTop";

export const Menu = () => {

    return (
        <div className="menu">

            <MenuTop />

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
                    <ItemMenu url="/ingreso-productos" label="Reabastecer" icon={ <BiPlusCircle /> } />
                    <ItemMenu url="/productos" label="Productos" icon={ <BiBox /> } />
                </BoxMenu>

                <BoxMenu titulo="Movimientos">
                    <ItemMenu url="/ingresos-egresos" label="Ingresos/Egresos" icon={ <BiAnalyse /> } />
                </BoxMenu>

                <BoxMenu titulo="Registros">
                    <ItemMenu url="/registros/ventas" label="Ventas" icon={ <BiCartAlt /> } />
                    <ItemMenu url="/registros/transacciones" label="Transferencias" icon={ <BiTransfer /> } />
                    <ItemMenu url="/registros/ingreso-productos" label="Reabastecimiento" icon={ <BiArchiveIn /> } />
                </BoxMenu>

                <BoxMenu titulo="Reportes">
                    <ItemMenu url="/reporte/ventas" label="Ventas" icon={ <BiBarChartAlt /> } />
                    <ItemMenu url="/reporte/ganancias" label="Ganancias" icon={ <BiDollarCircle /> } />
                </BoxMenu>

                <BoxMenu titulo="Personas">
                    <ItemMenu url="/clientes" label="Clientes" icon={ <BiGroup /> } />
                    <ItemMenu url="/proveedores" label="Proveedores" icon={ <BiWalk /> } />
                    <ItemMenu url="/usuarios" label="Usuarios" icon={ <BiUser /> } />
                </BoxMenu>

                

                {/* <BoxMenu>
                    <ul>
                        <li onClick={handlerSalir} className="pointer"><p><BiExit className="rotate-180" />Salir</p></li>
                    </ul>
                </BoxMenu> */}

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