import { HashRouter, Routes as Switch, Route, Navigate } from "react-router-dom";

import { PrivateRouter } from "./PrivateRouter";

import { IndexAlmacenes } from "../pages/almacenes";
import { IndexAlmacen } from "../pages/almacenes/Almacen";
import { IndexCaja } from "../pages/caja";
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
import { IndexVenta } from "../pages/realizarVenta";
import { Transacciones } from "../pages/reportes/Transacciones";
import { IndexUsuarios } from "../pages/usuarios";
import { IndexEditUser } from "../pages/usuarios/Editar";
import { IndexNuevoUser } from "../pages/usuarios/Nuevo";
import { PublicRouter } from "./PublicRouter";
import { Page404 } from "../pages/Page404";
import { IngresoProductos } from "../pages/reportes/IngresoProductos";
import { Ventas } from "../pages/reportes/Ventas";
import { IndexCajaChica } from "../pages/cajaChica";


export const AppRoutes = () => {
    return (
        <HashRouter>
            <Switch>

                <Route path="/" element={ <Navigate to="/login" /> }/>

                <Route path="/" element={ <PublicRouter /> }>
                    <Route path="/login" element={ <IndexLogin /> } />
                </Route>

                {/* <Route path="/" element={ <IndexLogin /> } /> */}

                <Route path="/" element={ <PrivateRouter /> }>

                    {/* dashboard */}
                    <Route path="/dashboard" element={ <IndexDashboard /> } />

                    {/* locales */}
                    <Route path="/tiendas" element={ <IndexLocales /> } />
                    <Route path="/tiendas/local/:id/:nombre" element={ <IndexLocal /> } />
                    <Route path="/tiendas/vender/:id/:nombre" element={ <IndexVenta /> } />
                    <Route path="/tiendas/caja/:id/:nombre" element={ <IndexCaja /> } />
                    <Route path="/tiendas/caja-chica/:id/:nombre" element={ <IndexCajaChica /> } />
                    
                    <Route path="/almacenes" element={ <IndexAlmacenes /> } />
                    <Route path="/almacenes/almacen/:id/:nombre" element={ <IndexAlmacen /> } />
                    
                    
                    {/* Productos */}
                    {/* <Route path="/almacen" element={ <IndexAlmacen /> } /> */}
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


                    {/* reportes */}
                    <Route path="/reporte/transacciones" element={ <Transacciones /> } />
                    <Route path="/reporte/ingreso-productos" element={ <IngresoProductos /> } />
                    <Route path="/reporte/ventas" element={ <Ventas /> } />

                </Route>

                <Route path='*' element={<Page404 />} />
                

            </Switch>
        </HashRouter>
    )
}
