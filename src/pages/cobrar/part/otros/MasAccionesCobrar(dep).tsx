import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { ToolTip } from "../../../../components/tooltip/ToolTip";

interface masAccionesCobrar{
    setListaPrecios:Function;
    showFormasPago:boolean;
    setShowFormasPago:Function;
}

export const MasAccionesCobrar = ({ 
    setListaPrecios, 
    showFormasPago, 
    setShowFormasPago, 
    // venta, 
    // switchCredito, setSwitchCredito
}:masAccionesCobrar) => {

    const dividirPreciosProd = () => {
        // if (!showFormasPago) {
        //     let divPrecio:any = [];
        //     venta.ventaDetalles.forEach((e:any) => { 
        //         const updateDivPrecio:any = {
        //             forma_pago: "efectivo",
        //             precio_parcial: Number(e.precio_parcial)
        //         }
        //         divPrecio.push(updateDivPrecio);
        //     })
        //     setListaPrecios(divPrecio)
        // } else {
        //     setListaPrecios([]);
        // }
        setListaPrecios([]);
        setShowFormasPago(!showFormasPago)
    }

    return (
        <div className="mas-acciones-cobrar grid-1 gap">

            <div className="grid-3 gap">
                <div></div>
                <button
                    id="btn-dividir-pagos"
                    onClick={() => dividirPreciosProd()}
                    className="btn-show red-text center"
                >
                    Dividir pagos
                    {
                        showFormasPago
                        ? <BiChevronUp />
                        : <BiChevronDown />
                    }
                </button>
                <ToolTip
                    anchor="btn-dividir-pagos"
                    descripcion="Permite dividir pagos y añadir otras formas de pago"
                /> 
            </div>

        </div>
    )
}
