import { useEffect, useState } from "react";
import { BiCaretDown, BiLoaderAlt } from "react-icons/bi";
import { get } from "../../../../resources/fetch";
import { LOCAL_STOCK } from "../../../../resources/routes";

export const StockGeneral = ({ idProducto }:any) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [stockLocales, setStockLocales] = useState<any>([]);

    useEffect(() => {
        getData();
    }, [idProducto])
    
    const getData = async () => { 
        setLoading(true);
        try {
            const totalStockproducto = await get(LOCAL_STOCK + "/stock/producto/" + idProducto);
            setStockLocales(totalStockproducto.stockLocales);
            setLoading(false);            
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    return (
        <div className="stock-general-locales">
                                            
            <span>
                <p>Stock general</p>
                { loading ? <div className="rotate-icon-solo m-0"><BiLoaderAlt size={16} /></div> : <BiCaretDown /> }
            </span>
            <h5>
                Importante! Vender stock de otros locales requiere una transferencia
            </h5>

            {
                stockLocales.length > 0 
                && (
                    <div className="box-stock-general">
                        {
                            stockLocales.map((e:any) => { 

                                return(
                                    <span key={e.id}>
                                        <h4>{e.locales && e.locales.nombre}</h4>
                                        <p>{e.cantidad} Und.</p>
                                    </span>
                                )
                            })
                        }
                    </div>
                )
            }
            
            
        </div>
    )
}
