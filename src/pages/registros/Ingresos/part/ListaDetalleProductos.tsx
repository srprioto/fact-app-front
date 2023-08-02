import { BiCaretDown } from "react-icons/bi"

export const ListaDetalleProductos = ({ detalles }:any) => {

    return (
        <div className="lista-ingreso-productos">
            <BiCaretDown />
            <ul className="box-lista-ingreso-productos">
                {
                    detalles.map((e:any) => { 
                        return (
                            <li key={e.id}>
                                {e.productos && e.productos.nombre}
                                {e.productos.marca && " - " + e.productos.marca}
                                {e.productos.talla && " - " + e.productos.talla}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
