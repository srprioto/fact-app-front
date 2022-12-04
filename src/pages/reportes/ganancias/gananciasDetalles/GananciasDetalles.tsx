import { Loading } from "../../../../components/loads/Loading";
import { NoRegistros } from "../../../../components/NoRegistros";
import { GestionFechas } from "../../../../components/fechas/GestionFechas";
import { Select } from "../../../../components/forms/Select";
import { TablaGananciasDetall } from "./TablaGananciasDetall";
import { ResumGananciaDetall } from "./ResumGananciaDetall";

interface gananciasDetalles {
    data:any;
    loading:boolean;
    getData:Function;
    fechas:string;
    setFechas:Function;
    // idLocal:string;
    handlerLocal:Function;
    loadingLocales:boolean;
    locales:any;
}

export const GananciasDetalles = ({ 
    data, 
    loading, 
    getData, 
    fechas, 
    setFechas, 
    // idLocal, 
    handlerLocal,
    loadingLocales,
    locales
}:gananciasDetalles) => {

    const sumaMontos:any = data.sumaMontos ? data.sumaMontos : {};

    return (
        <>
            <div className="box box-par grid-2 gap">
                <div></div>
                <div className="grid-2 gap">
                    <div className="grid-4 gap">
                        <div></div>
                        <div></div>
                        <div></div>
                        <GestionFechas
                            getData={getData}
                            fechas={fechas}
                            setFechas={setFechas}
                        />
                    </div>

                    <Select
                        loading={loadingLocales}
                        name={"id_local"}
                        onChange={handlerLocal}
                        textDefault="Selecciona un local"
                        defaultValue={false}
                    >
                        <option value={"_"}>Todas las tiendas</option>
                        {
                            locales.map((e:any) => { 
                                return (
                                    <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                                )
                            })
                        }
                    </Select>
                </div>
            </div>

            <div className="box ganancias-detalles">
                {
                    loading 
                    ? <Loading />
                    : (
                        data.query.length <= 0
                        ? <NoRegistros />
                        : <>
                            <ResumGananciaDetall sumaMontos={sumaMontos} />
                            <TablaGananciasDetall 
                                data={data} 
                                locales={locales}
                                loadingLocales={loadingLocales}
                            />
                        </>
                    )
                }
            </div>
        </>
    )
}
