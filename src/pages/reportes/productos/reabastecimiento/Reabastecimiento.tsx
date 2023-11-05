import { SelectLocales } from "../../../../components/forms/SelectLocales"
import { useEffect, useState } from "react"
import { GestionFechas } from "../../../../components/fechas/GestionFechas";
import { MOVIMIENTOS } from "../../../../resources/routes";
import { post } from "../../../../resources/fetch";
import { ChartsProductosAdquiridos } from "./ChartsProductosAdquiridos";
import { Loading } from "../../../../components/loads/Loading";

interface fechasInterface {
    inicio:string;
    fin:string;
}

export const Reabastecimiento = () => {

    const [fechas, setFechas] = useState<fechasInterface>({ inicio: "_", fin: "_" });
    const [local, setLocal] = useState<number>(0);

    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [data, setData] = useState<any>({});

    const sumatorias:any = data.sumatorias && data.sumatorias[0];
    const suma_costo_otros:number = sumatorias && (sumatorias.suma_costo_otros === null ? 0 : sumatorias.suma_costo_otros)
    const suma_costo_transporte:number = sumatorias && (sumatorias.suma_costo_transporte === null ? 0 : sumatorias.suma_costo_transporte)
    const suma_subtotal:number = sumatorias && (sumatorias.suma_subtotal === null ? 0 : sumatorias.suma_subtotal)
    const suma_total:number = sumatorias && (sumatorias.suma_total === null ? 0 : sumatorias.suma_total)


    useEffect(() => {
        getData();
    }, [fechas, local])
    

    const getData = async () => { 
        setLoadingData(true);
        try {
            const data = await post({ local: local, fechas: fechas }, MOVIMIENTOS + "/reportes");
            setData(data);
            setLoadingData(false);
        } catch (error) {
            setLoadingData(true);
            console.log(error);
        }
    }

    
    return (
        <div className="reabastecimiento-repo grid-1 gap">
            <div className="box m-0 grid-1 gap">
                <div className="grid-3 gap mb-10">
                    <div></div>
                    <div className="center grid-12 gap">
                        <GestionFechas 
                            getData={getData}
                            fechas={fechas}
                            setFechas={setFechas}
                        />
                        <SelectLocales setLocal={setLocal} />
                    </div>
                </div>

                <h4 className="center strong m-0">Resumen de reabastecimiento</h4>
                <div className="grid-4 gap center mb-10">
                    <div className="">
                        <h3 className="secundary m-0">Subtotal: </h3>
                        <h2 className="strong info m-0">S/. { suma_subtotal }</h2>
                    </div>

                    <div className="">
                        <h3 className="secundary m-0">Costos de transporte: </h3>
                        <h2 className="strong info m-0">S/. { suma_costo_transporte }</h2>
                    </div>

                    <div className="">
                        <h3 className="secundary m-0">Otros costos: </h3>
                        <h2 className="strong info m-0">S/. { suma_costo_otros }</h2>
                    </div>

                    <div className="">
                        <h3 className="secundary m-0">Total: </h3>
                        <h2 className="strong info m-0">S/. { suma_total }</h2>
                    </div>
                </div>

            </div>

            <div className="box box-par">

                {
                    loadingData
                    ? <Loading />
                    : <ChartsProductosAdquiridos data={data.total_comprado} />
                }

            </div>

            
            
        </div>
    )
}







