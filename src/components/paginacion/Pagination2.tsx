import { BiCaretLeft, BiCaretRight } from "react-icons/bi";


interface pagination2 {
    paginacion:any;
    getData:Function;
}

export const Pagination2 = ({ paginacion, getData }:pagination2) => {

    const handlerPage = (nro:number) => { 
        let pagina:number = 1;
        if ((paginacion.pagina + nro) < 1) {
            pagina = 1;
        } else if ((paginacion.pagina + nro) >= paginacion.totalPaginas) {
            pagina = paginacion.totalPaginas;
        } else {
            pagina = (paginacion.pagina + nro);
        }
        return pagina;
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
                            onClick={() => getData(handlerPage(-1))}
                            className="btn btn-primary"
                        ><BiCaretLeft /></button> : <div></div>
                    }
                    <h3 className="middle primary">{ paginacion.pagina }</h3>                          
                    {
                        paginacion.paginasRestantes > 0
                        ? <button 
                            onClick={() => getData(handlerPage(1))}
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
// const [paginacion, setPaginacion] = useState<any>(paginacionDTO);

// // funciones
// const getData = async (pagina:number = 1) => {
//     setLoading(true);
//     const postData:any = {
//         pagina: pagina,
//         ordenar: ordenProductos,
//         searchText: searchText.value
//     };
//     try {
//         const resto = await post(postData, VENTAS_REPORTES + "/top_productos_vendidos");
//         setPaginacion({ ...resto.meta, pagina: pagina })
//         setData(resto.data);
//         setLoading(false);
//     } catch (error) {
//         setLoading(true);
//         console.log(error);
//     }
// }