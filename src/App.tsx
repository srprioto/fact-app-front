import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import { IndexDashboard } from "./pages/dashboard";


import { IndexVenta } from "./pages/realizarVenta";

import { IndexCaja } from "./pages/caja";

import { IndexLocales } from "./pages/locales";
import { IndexLocal } from "./pages/locales/Local";


import { IndexAlmacen } from "./pages/almacen";
import { IndexIngresoProductos } from "./pages/IngresoProductos";

import { IndexProductos } from "./pages/productos";
import { NuevoProducto } from "./pages/productos/NuevoProducto";
import { IndexEditarProducto } from "./pages/productos/Editar";


import { IndexClientes } from "./pages/clientes";
import { IndexNuevoCliente } from "./pages/clientes/Nuevo";
import { IndexEditarCliente } from "./pages/clientes/Editar";

import { IndexProveedores } from "./pages/proveedores";
import { IndexNuevoProv } from "./pages/proveedores/Nuevo";
import { IndexEditProv } from "./pages/proveedores/Editar";

import { IndexUsuarios } from "./pages/usuarios";
import { IndexNuevoUser } from "./pages/usuarios/Nuevo";
import { IndexEditUser } from "./pages/usuarios/Editar";


import { Transacciones } from "./pages/reportes/Transacciones";





function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>

                    {/* dashboard */}
                    <Route path="/" element={ <IndexDashboard /> } />

                    {/* punto de venta */}
                    <Route path="/tiendas" element={ <IndexLocales /> } />
                    <Route path="/tiendas/local/:id/:nombre" element={ <IndexLocal /> } />
                    <Route path="/tiendas/vender/:id/:nombre" element={ <IndexVenta /> } />
                    <Route path="/tiendas/caja/:id/:nombre" element={ <IndexCaja /> } />


                    {/* stock */}
                    <Route path="/almacen" element={ <IndexAlmacen /> } />
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


                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;