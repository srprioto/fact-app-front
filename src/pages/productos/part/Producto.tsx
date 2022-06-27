import { ProductosDto } from "../../../resources/dtos/ProductosDto";
import { moneda } from "../../../resources/func/moneda";

import { ProdDropdown } from "./ProdDropdown";

interface producto { 
    producto:ProductosDto;
    handlerDeleted?:Function;
    handlerBarcode?:Function;
    handlerVer?:Function;
}

export const Producto = ({ 
    producto, 
    handlerDeleted, 
    handlerVer,
    handlerBarcode
}:producto) => {

    return (

        <tr className="producto-item">
            
            <td className="info">{ producto.codigo }</td>
            <td className="strong">{ producto.nombre }</td>
            <td>{ producto.marca }</td>
            <td>{ producto.talla }</td>
            <td>{ producto.color }</td>
            <td className="strong secundary">S/. { moneda(producto.precio_venta_1) }</td>
            <td className="strong secundary">S/. { moneda(producto.precio_venta_2) }</td>
            <td className="strong secundary">S/. { moneda(producto.precio_venta_3) }</td>
            <td>
                <ProdDropdown 
                    id={producto.id}
                    nombre={producto.nombre}
                    producto={producto}
                    handlerDeleted={handlerDeleted}
                    handlerBarcode={handlerBarcode}
                    handlerVer={handlerVer}
                />
            </td>
            
        </tr>
    )
};




// <div className="producto border-primary">

// {
//     handlerDeleted
//     && (
//         <div className="prod-dd">
//             <BiDotsVertical className="pointer" />
//             <ProdDropdown 
//                 id={producto.id}
//                 nombre={producto.nombre}
//                 producto={producto}
//                 handlerDeleted={handlerDeleted}
//                 handlerBarcode={handlerBarcode}
//                 // handlerVer={handlerVer}
//             />
//         </div>
//     )
// }

// <div className="prod-nombre">
//     <h3>{ producto.nombre }</h3>
// </div>            

// <h4 className="prod-cod">
//     <span>Codigo: </span>
//     <strong className="info">{ producto.codigo }</strong>
// </h4>

// <div className="prod-border"></div>

// <div className="prod-info">
   
//     <h4 className="prod-desc-int">Descripcion</h4>
//     <p>{ producto.descripcion }</p>

// </div>

// <div className="prod-border"></div>

// <div className="prod-detalles grid-3 gap">
//     <div className="prod-det-int">
//         <h4>Marca</h4>
//         <p>{ producto.marca }</p>
//     </div>
//     <div className="prod-det-int">
//         <h4>Color</h4>
//         <p>{ producto.color }</p>
//     </div>
//     <div className="prod-det-int">
//         <h4>Talla</h4>
//         <p>{ producto.talla }</p>
//     </div>
// </div>

// <div className="prod-border"></div>

// <div className="prod-prec">
//     <h4 className="secundary">P. compra: </h4><h4 className="info"><strong>
//         S/. { moneda(producto.precio_compra) }</strong>
//     </h4>
//     <h4 className="secundary">P. unidad: </h4><h4 className="success"><strong>
//         S/. { moneda(producto.precio_venta_1) }</strong>
//     </h4>
//     <h4 className="secundary">P. por mayor: </h4><h4 className="success"><strong>
//         S/. { moneda(producto.precio_venta_2) }</strong>
//     </h4>
//     <h4 className="secundary">P. por menor: </h4><h4 className="success"><strong>
//         S/. { moneda(producto.precio_venta_3) }</strong>
//     </h4>
// </div>

// <div className="prod-border"></div>

// <div className="prod-fec grid-2 gap">
//     <div>
//         <h5>Creacion</h5>
//         <h5>{ producto.created_at }</h5>
//     </div>
//     <div>
//         <h5>Ultima actualizacion</h5>
//         <h5>{ producto.updated_at }</h5>
//     </div>
// </div>




// </div>