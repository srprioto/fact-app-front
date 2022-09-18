import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { zeroFill } from "../../../resources/func/ceroFill";
import { TextoRelleno } from "../../TextoRelleno";
import { TransferenciaDetalles } from "./TransferenciaDetalles";

export const RecibirTransferencia = ({ 
    data, 
    getTransacciones, 
    // actualizarDatos
}:any) => {

    const [transferencia, setTransferencia] = useState<any>({});
    const [toggle, setToggle] = useState<number>(0);


    const handlerTransferencia = (elemento:any, idToggle:number) => { 
        setToggle(idToggle);
        setTransferencia(elemento)
    }

    
    return (
        <div className="grid-11-3 gap">
            <div className="box recibir-transferencia">
                <h4 className="desc-form">Lista de envios</h4>
                {
                    <table className="table2">
                            
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Origen</th>
                                <th>Nota de envio</th>
                                <th className="transparent inlineblock">...</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                data.map((el:any) => {
                                    return (
                                        <tr 
                                            key={el.id}
                                            onClick={() => handlerTransferencia(el, el.id)}
                                            className={toggle === el.id ? "tr-active pointer" : "pointer"}
                                        >
                                            <td>{ zeroFill(el.id, 6) }</td>
                                            <td>{ el.localOrigen ? el.localOrigen.nombre : "Externo" }</td>
                                            <td>{ el.descripcion }</td>
                                            <td>
                                                <span 
                                                    className={
                                                        toggle === el.id 
                                                        ? "arrow-icon-select arrow-icon-select-active" 
                                                        : "arrow-icon-select"
                                                    }
                                                >
                                                    <BiChevronRight />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })   
                            }
                        </tbody>
                    </table>
                }
            </div>

            <div className="box recibir-transferencia">
                {
                    !transferencia.id
                    ? <TextoRelleno texto="Selecciona un envio" />
                    : (
                        <TransferenciaDetalles
                            data={transferencia}
                            getTransacciones={getTransacciones}
                            setTransf={setTransferencia}
                            // actualizarDatos={actualizarDatos}
                        />
                    )
                }
            </div>

        </div>
    )

}


