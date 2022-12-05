// import { BiRefresh } from "react-icons/bi"

export const TablaFiltro = ({ getData, toggle }:any) => {
    return (
        <div className="grid-3 gap mb-25">

            <div></div>
            <div className="grid-7">

                <button 
                    onClick={() => getData("", "_", 1)}
                    className={`btn2 btn2-info ${toggle === 1 && "btn2-sub-info"}`}>
                    {/* <BiBarChartAlt /> */}
                    Todos
                </button>
                <button 
                    onClick={() => getData("", "Aceptado", 2)}
                    className={`btn2 btn2-success ${toggle === 2 && "btn2-sub-success"}`}>
                    {/* <BiCheck /> */}
                    Aceptados
                </button>
                <button 
                    onClick={() => getData("", "Observado", 3)}
                    className={`btn2 btn2-primary ${toggle === 3 && "btn2-sub-primary"}`}>
                    {/* <BiCartAlt /> */}
                    Observados
                </button>
                <button 
                    onClick={() => getData("", "Rechazado", 4)}
                    className={`btn2 btn2-warning ${toggle === 4 && "btn2-sub-warning"}`}>
                    {/* <BiX /> */}
                    Rechazados
                </button>
                <button 
                    onClick={() => getData("", "Excepcion", 5)}
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
                <button
                    onClick={() => getData("", "ANULADO", 7)}
                    className={`btn2 btn2-secundary opacity ${toggle === 7 && "btn2-sub-secundary opacity"}`}>
                    {/* <BiX /> */}
                    Anulados
                </button>
                
            </div>
            {/* <div className="right">
                <button
                    className="btn-icon btn2-success"
                    onClick={() => getData("", "", "", {
                        inicio: "_",
                        fin: "_"
                    })}
                >
                    <BiRefresh />
                </button>
            </div> */}

        </div>
    )
}
