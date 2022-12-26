import { BiCaretLeft, BiCaretRight } from "react-icons/bi";

export const Paginacion2 = ({ paginacion, setPaginacion }:any) => {

    const handlerPage = (nro:number) => { 
        let pagina:number = 1;
        if ((paginacion.pagina + nro) < 1) {
            pagina = 1;
        } else if ((paginacion.pagina + nro) >= paginacion.totalPaginas) {
            pagina = paginacion.totalPaginas;
        } else {
            pagina = (paginacion.pagina + nro);
        }
        setPaginacion({
            ...paginacion,
            pagina: pagina
        })
    }


    return (
        <div className="pagination">

            <div className="grid-3 gap mt-25">
                <div />
                <div className="grid-5 gap">
                    <div />
                    {
                        paginacion.pagina > 1
                        ? <button 
                            onClick={() => handlerPage(-1)}
                            className="btn btn-primary"
                        ><BiCaretLeft /></button> : <div></div>
                    }
                    <h3 className="middle primary">{ paginacion.pagina }</h3>                          
                    {
                        paginacion.paginasRestantes > 0
                        ? <button 
                            onClick={() => handlerPage(1)}
                            className="btn btn-primary"
                        ><BiCaretRight /></button> : <div></div>
                    }
                    <div />
                </div>
                <div />
            </div>

        </div>
    )
}



// // por fuera
// // estados
// const paginacionDTO:any = {
//     pagina: 1,
//     paginasRestantes: 0,
//     totalItems: 0,
//     totalPaginas: 0
// }
// const [paginacion, setPaginacion] = useState<any>(paginacionDTO);


// // funcion get
// const getData = async () => { 
//     setLoading(true);
//     const postData:any = { pagina: paginacion.pagina };
//     try {
//         const resto = await post(postData, VENTAS_REPORTES + "/top_productos_vendidos");
//         setPaginacion({ ...paginacion, ...resto.meta }) // añadir obligatoriamente
//         setData(resto.data);
//         setLoading(false);
//     } catch (error) {
//         setLoading(true);
//         console.log(error);
//     }
// }