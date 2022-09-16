export const TablaFiltro = ({ getData, toggle }:any) => {
    return (
        <div className="grid-3 gap mb-25">

            <div></div>
            <div className="grid-6 gap">

                <button 
                    onClick={() => getData("", "_", 1)}
                    className={`btn2 btn2-info ${toggle === 1 && "btn2-sub-info"}`}>
                    {/* <BiBarChartAlt /> */}
                    Todos
                </button>
                <button 
                    onClick={() => getData("", "ACEPTADO", 2)}
                    className={`btn2 btn2-success ${toggle === 2 && "btn2-sub-success"}`}>
                    {/* <BiCheck /> */}
                    Aceptados
                </button>
                <button 
                    onClick={() => getData("", "OBSERVACION", 3)}
                    className={`btn2 btn2-primary ${toggle === 3 && "btn2-sub-primary"}`}>
                    {/* <BiCartAlt /> */}
                    Observados
                </button>
                <button 
                    onClick={() => getData("", "RECHAZADO", 4)}
                    className={`btn2 btn2-warning ${toggle === 4 && "btn2-sub-warning"}`}>
                    {/* <BiX /> */}
                    Rechazados
                </button>
                <button 
                    onClick={() => getData("", "Excepción", 5)}
                    className={`btn2 btn2-secundary ${toggle === 5 && "btn2-sub-secundary"}`}>
                    {/* <BiX /> */}
                    Excepciones
                </button>
                <button 
                    onClick={() => getData("", "ERROR", 6)}
                    className={`btn2 btn2-danger ${toggle === 6 && "btn2-sub-danger"}`}>
                    {/* <BiX /> */}
                    Errores
                </button>
                
                
                
            </div>
            <div></div>

        </div>
    )
}
