import { CardsIngresosGenerales } from "./CardsIngresosGenerales"
import { CharsGanancias } from "./CharsGanancias"

interface reporteGeneral {
    data:any;
    loading:boolean;
    getData:Function;
    fechas:string;
    setFechas:Function;
    handlerLocal:Function;
    loadingLocales:boolean;
    locales:any;
}

export const ReporteGeneral = ({ 
    data, 
    loading, 
    getData, 
    fechas, 
    setFechas, 
    handlerLocal, 
    loadingLocales, 
    locales 
}:reporteGeneral) => {

    return (
        <div className="grid-1 gap reporte-general">
            <CardsIngresosGenerales />
            <CharsGanancias 
                data={data} 
                loading={loading} 
                getData={getData} 
                fechas={fechas} 
                setFechas={setFechas} 
                handlerLocal={handlerLocal}
                loadingLocales={loadingLocales}
                locales={locales}
            />
        </div>
    )
}
