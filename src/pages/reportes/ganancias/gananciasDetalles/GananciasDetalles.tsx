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
    // totalGanancias:number;
}

export const GananciasDetalles = ({ data, loading, getData, fechas, setFechas }:gananciasDetalles) => {

    const sumaMontos:any = data.sumaMontos ? data.sumaMontos : {};

    
    return (
        <div className="box ganancias-detalles">
            <div className="grid-21 gap">
                <div className="grid-3 gap">
                    <div className="box-total-ganancias gap10">
                        <h3 className="secundary">Ingresos: </h3>
                        <h3 className="strong info">S/. { moneda(sumaMontos.sumaIngresos) }</h3>
                    </div>
                    <div className="box-total-ganancias gap10">
                        <h3 className="secundary">Costos: </h3>
                        <h3 className="strong info">S/. { moneda(sumaMontos.sumaCostos) }</h3>
                    </div>
                    <div className="box-total-ganancias gap10">
                        <h3 className="secundary">Total ganado: </h3>
                        <h2 className="strong success m-0">S/. { moneda(sumaMontos.sumaGanancias) }</h2>
                    </div>
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
                    data.query.length <= 0
                    ? <NoRegistros />
                    : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ingresos del dia</th>
                                    <th>Costos del dia</th>
                                    <th>Ganancias del dia</th>
                                    <th>Fecha</th>
                                    {/* <th className="transparent inlineblock">...</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.query.map((e:any, index:number) => {
                                        return (
                                            <tr className="items-caja" key={index}>
                                                <td>S/. { moneda(e.Ingresos_dia) }</td>
                                                <td>S/. { moneda(e.Costos_dia) }</td>
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
