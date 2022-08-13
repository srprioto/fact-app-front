import { BiX } from "react-icons/bi"
import { noDecimal } from "../../../resources/func/noDecimal";
import { Input } from "../../forms/Input";
import { TextoRelleno } from "../../TextoRelleno";

export const ListaProductosTransf = ({ listaProductos, setListaProductos, repetidos, setRepetidos, data }:any) => {

    const itemPop = (i:number) => {     // i .- indice del elemento que se va a borrar
        let lista:Array<any> = [...listaProductos];    // convetimos el estado en un array
        lista.splice(i,1);              // borramos el elemento en base al indice
        setListaProductos([...lista]);      // añadimos la lista corregida al estado

        // quitar de lista repetidos 
        let prodRepe:Array<number> = [...repetidos];
        prodRepe.splice(i,1);
        setRepetidos([...prodRepe]);
    }


    const handlerChangeCantidad = (e:any, index:number) => { 
        let updateListaPrecios = [...listaProductos];
        let objeto = updateListaPrecios[index];
        objeto[e.target.name] = Number(noDecimal(e.target.value));
        updateListaPrecios[index] = objeto;
        setListaProductos([...updateListaPrecios])
    }

    const validarCantidad = (idItem:number, cantidad:number) => { 
        const elemento:any = data.find((e:any) => e.productos.id === idItem && e);
        if (cantidad > elemento.cantidad) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div className="box box-par m-0 lista-productos-transf">
            {
                listaProductos.length > 0
                ? (
                    <div className="grid-1 gap">
                        <h4 className="desc-form">Lista de productos para transferir</h4>
                        <table className="table3 no-hover no-cursor">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th className="transparent inlineblock">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaProductos.map((e:any, index:number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{ e.productoNombre }</td>
                                                <td>
                                                    <Input
                                                        // color={
                                                        //     validarCantidad(e.productosId, e.cantidad)
                                                        //     ? "danger-i"
                                                        //     : "secundary-i"
                                                        // }
                                                        className="input2"
                                                        type="number"
                                                        name="cantidad"
                                                        value={
                                                            !validarCantidad(e.productosId, e.cantidad)
                                                            ? e.cantidad
                                                            : e.cantOriginal
                                                        }
                                                        onChange={(event:any) => {
                                                            handlerChangeCantidad(event, index)
                                                            // if (!validarCantidad(e.productosId, e.cantidad)) {
                                                            //     handlerChangeCantidad(event, index)
                                                            // }
                                                        }}
                                                        noMenos
                                                    />
                                                </td>
                                                <td>
                                                    <span className="wrap-icons danger center">
                                                        <BiX 
                                                            className="pointer" 
                                                            onClick={() => { itemPop(index) }} 
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                ) : <TextoRelleno texto="Añade un elemento" />
            }

            
        </div>
    )
}
