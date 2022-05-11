import { useState } from "react";
import { BiChevronRight } from "react-icons/bi"

export const TablaVentas = ({ data, handlerGetFacturaVenta }:any) => {

    const [tabb, setTabb] = useState<number>(0);

    const handlerOnClick = (e:any) => { 
        handlerGetFacturaVenta(e.id)
        setTabb(e.id)
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Codigo de venta</th>
                    <th className="transparent inlineblock">...</th>
                </tr>
            </thead>
        
            <tbody>
                {
                    data.map((e:any) => {
                        return (
                            <tr 
                                key={e.id}
                                onClick={() => handlerOnClick(e)}
                                className={tabb === e.id ? "tr-active pointer" : "pointer"}
                            >
                                <td className="mayus secundary">
                                    <strong>{ e.codigo_venta }</strong>
                                </td>
                                
                                <td className={"arrow-icon-select " + (
                                    tabb === e.id 
                                    ? "arrow-icon-select-active" 
                                    : ""
                                    )
                                }>
                                    <span>
                                        <BiChevronRight />
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
