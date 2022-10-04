import { BiChevronDown, BiChevronUp } from "react-icons/bi"

export const MasAccionesCobrar = ({ 
    venta, setListaPrecios, showFormasPago, setShowFormasPago, 
    // switchCredito, setSwitchCredito
}:any) => {

    const dividirPreciosProd = () => { // ***
        if (!showFormasPago) {
            let divPrecio:any = [];
            venta.ventaDetalles.forEach((e:any) => { 
                const updateDivPrecio:any = {
                    forma_pago: "efectivo",
                    precio_parcial: Number(e.precio_parcial)
                }
                divPrecio.push(updateDivPrecio);
            })
            setListaPrecios(divPrecio)
        } else {
            setListaPrecios([]);
        }
        setShowFormasPago(!showFormasPago)
    }

    return (
        <div className="mas-acciones-cobrar grid-1 gap">

            <div className="grid-3 gap">
                <div></div>
                <button
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
                
            </div>

            {/* <div className="grid-1 gap">
                <button
                    onClick={() => setSwitchCredito(!switchCredito)}
                    className="btn-show red-text center"
                >
                    Credito o adelanto
                    {
                        switchCredito
                        ? <BiChevronUp />
                        : <BiChevronDown />
                    }
                </button>                            
            </div> */}

        </div>
    )
}
