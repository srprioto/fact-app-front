import { Loading } from "../../../../components/loads/Loading";
import { NoRegistros } from "../../../../components/NoRegistros";
import { moneda } from "../../../../resources/func/moneda";
import { GestionFechas } from "../../../../components/fechas/GestionFechas";

interface gananciasDetalles {
    data:any;
    loading:boolean;
    getData:Function;
    fechas:string;
    setFechas:Function;
    totalGanancias:number;
}

export const GananciasDetalles = ({ data, loading, getData, fechas, setFechas, totalGanancias }:gananciasDetalles) => {

    return (
        <div className="box ganancias-detalles">
            <div className="grid-3 gap">
                <div></div>
                <div className="box-total-ganancias">
                    <h3 className="secundary">Total ganado: </h3>
                    <h3 className="strong success">S/. { moneda(totalGanancias) }</h3>
                </div>
                <div className="box-fechas-chars-ganan-2">
                    <GestionFechas
                        getData={getData}
                        fechas={fechas}
                        setFechas={setFechas}
                    />
                </div>
            </div>
            {
                loading 
                ? <Loading />
                : (
                    data.length <= 0
                    ? <NoRegistros />
                    : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ganancias del dia</th>
                                    <th>Fecha</th>
                                    <th className="transparent inlineblock">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((e:any, index:number) => {
                                        return (
                                            <tr className="items-caja" key={index}>
                                                <td className="success strong">S/. { moneda(e.Ganancias_dia) }</td>
                                                <td className="">{ e.Fecha }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                )
            }
        </div>
    )
}
