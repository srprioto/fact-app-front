import { HashRouter, Routes as Switch, Route, Navigate } from "react-router-dom";

import { PrivateRouter } from "./PrivateRouter";

import { useAuth } from "../auth/useAuth";
import { Roles } from "../resources/dtos/RolesDto";

// admin
import { IndexAlmacenes } from "../pages/almacenes";
import { IndexAlmacen } from "../pages/almacenes/Almacen";
import { IndexCobrar } from "../pages/cobrar";
import { IndexClientes } from "../pages/clientes";
import { IndexEditarCliente } from "../pages/clientes/Editar";
import { IndexNuevoCliente } from "../pages/clientes/Nuevo";
import { IndexDashboard } from "../pages/dashboard";
import { IndexIngresoProductos } from "../pages/IngresoProductos";
import { IndexLocales } from "../pages/locales";
import { IndexLocal } from "../pages/locales/Local";
import { IndexLogin } from "../pages/login";
import { IndexProductos } from "../pages/productos";
import { IndexEditarProducto } from "../pages/productos/Editar";
import { NuevoProducto } from "../pages/productos/NuevoProducto";
import { IndexProveedores } from "../pages/proveedores";
import { IndexEditProv } from "../pages/proveedores/Editar";
import { IndexNuevoProv } from "../pages/proveedores/Nuevo";
import { Transacciones } from "../pages/registros/Transacciones";
import { IndexUsuarios } from "../pages/usuarios";
import { IndexEditUser } from "../pages/usuarios/Editar";
import { IndexNuevoUser } from "../pages/usuarios/Nuevo";
import { PublicRouter } from "./PublicRouter";
import { Page404 } from "../pages/Page404";
import { IngresoProductos } from "../pages/registros/IngresoProductos";
import { Ventas } from "../pages/registros/Ventas";
import { IndexCajaChica } from "../pages/cajaChica";
import { IndexVender } from "../pages/vender";

// supervisor
import { DashboardSup } from "../roles/supervisor/pages/DashboardSup";
import { VenderSup } from "../roles/supervisor/pages/VenderSup";

// vendedor
import { Seller } from "../roles/vendedor/Seller";
import { CobrarSup } from "../roles/supervisor/pages/CobrarSup";
import { StockSup } from "../roles/supervisor/pages/StockSup";
import { IndexGanancias } from "../pages/reportes/ganancias/Index";
import { IndexVentas } from "../pages/reportes/ventas/Index";
import { IndexTickets } from "../pages/tickets/Index";
import { IndexIngresosEgresos } from "../pages/gastos/Index";
import { TicketsSup } from "../roles/supervisor/pages/TicketsSup";


export const AppRoutes = () => {

    const auth = useAuth();
    
    return (
        <HashRouter>
            <Switch>

                <Route path="/" element={ <Navigate to="/login" /> }/>

                <Route path="/" element={ <PublicRouter /> }>
                    <Route path="/login" element={ <IndexLogin /> } />
                </Route>

                <Route path="/" element={ <PrivateRouter /> }>

                    {
                        auth.rol === Roles.ADMIN
                        && <>
                            {/* dashboard */}
                            <Route path="/dashboard" element={ <IndexDashboard /> } />

                            {/* locales */}
                            <Route path="/tiendas" element={ <IndexLocales /> } />
                            <Route path="/tiendas/local/:id/:nombre" element={ <IndexLocal /> } />
                            <Route path="/tiendas/vender/:id/:nombre" element={ <IndexVender /> } />
                            <Route path="/tiendas/caja/:id/:nombre" element={ <IndexCobrar /> } />
                            <Route path="/tiendas/caja-chica/:id/:nombre" element={ <IndexCajaChica /> } />

                            <Route path="/almacenes" element={ <IndexAlmacenes /> } />
                            <Route path="/almacenes/almacen/:id/:nombre" element={ <IndexAlmacen /> } />

                            {/* Productos */}
                            <Route path="/ingreso-productos" element={ <IndexIngresoProductos /> } />

                            <Route path="/productos" element={ <IndexProductos /> } />
                            <Route path="/productos/crear-producto" element={ <NuevoProducto /> } />
                            <Route path="/productos/:id/edit" element={ <IndexEditarProducto /> } />

                            {/* personas */}
                            <Route path="/clientes" element={ <IndexClientes /> } />
                            <Route path="/clientes/nuevo" element={ <IndexNuevoCliente /> } />
                            <Route path="/clientes/:id/edit" element={ <IndexEditarCliente /> } />

                            <Route path="/proveedores" element={ <IndexProveedores /> } />
                            <Route path="/proveedores/nuevo" element={ <IndexNuevoProv /> } />
                            <Route path="/proveedores/:id/edit" element={ <IndexEditProv /> } />

                            <Route path="/usuarios" element={ <IndexUsuarios /> } />
                            <Route path="/usuarios/nuevo" element={ <IndexNuevoUser /> } />
                            <Route path="/usuarios/:id/edit" element={ <IndexEditUser /> } />

                            {/* registros */}
                            <Route path="/registros/transacciones" element={ <Transacciones /> } />
                            <Route path="/registros/ingreso-productos" element={ <IngresoProductos /> } />
                            <Route path="/registros/ventas" element={ <Ventas /> } />

                            {/* reportes */}
                            <Route path="/reporte/ventas" element={ <IndexVentas /> } />
                            <Route path="/reporte/ganancias" element={ <IndexGanancias /> } />

                            {/* tickets */}
                            <Route path="/tickets" element={ <IndexTickets /> } />

                            {/* ingresos egresos */}
                            <Route path="/ingresos-egresos" element={ <IndexIngresosEgresos /> } />

                            
                        </>
                    }

                    {
                        auth.rol === Roles.SUPERVISOR
                        && <>
                            <Route path="/local" element={ <DashboardSup /> } />
                            <Route path="/local/vender" element={ <VenderSup /> } />
                            <Route path="/local/cobrar" element={ <CobrarSup /> } />
                            <Route path="/local/stock" element={ <StockSup /> } />
                            <Route path="/tickets" element={ <TicketsSup /> } />
                        </>
                    }

                    {
                        auth.rol === Roles.SALLER
                        && (
                            <Route path="/punto-venta" element={ <Seller /> } />
                        )
                    }
                    

                </Route>
                
                <Route path='*' element={ <Navigate to="/404" /> } />
                <Route path="/404" element={ <Page404 /> } />
                
            </Switch>
        </HashRouter>
    )
}
