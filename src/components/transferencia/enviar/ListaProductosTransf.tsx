import { BiX } from "react-icons/bi"
import { TextoRelleno } from "../../TextoRelleno"

export const ListaProductosTransf = ({ transferencia, itemPop }:any) => {
    return (
        <div className="box">
            <div className="lista-transf">
                {
                    transferencia.length <= 0
                    ? <TextoRelleno texto="Añade un elemento" />
                    : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Unidades</th>
                                    <th className="transparent inlineblock">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transferencia.map((e:any, index:number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{ e.productoNombre }</td>
                                                <td>{ e.cantidad }</td>
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
                    )
                }
            </div>
        </div>
    )
}
