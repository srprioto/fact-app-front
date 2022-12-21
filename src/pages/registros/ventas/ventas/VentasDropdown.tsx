import { BiBookBookmark, BiBookmarkAltMinus, BiMoveHorizontal, BiShowAlt, BiX } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"
import { tipoVenta } from "../../../../resources/dtos/VentasDto";
// import { tipoVenta } from "../../../../resources/dtos/VentasDto";

interface ventasDropdown {
    ventas:any;
    handlerVer:Function; 
    // updateData:Function;
    handlerAnular:Function;
    handlerReimprimir:Function;
    handlerCredito:Function;
    handlerConvertirComp:Function;
}

export const VentasDropdown = ({ 
    ventas, 
    handlerVer, 
    // updateData, 
    handlerAnular, 
    handlerReimprimir, 
    handlerCredito,
    handlerConvertirComp
}:ventasDropdown) => {

    const esVenta:boolean = ventas.tipo_venta === tipoVenta.venta_rapida;

    const anulado = () => { 
        if (
            ventas.estado_venta === "anulado" || 
            ventas.estado_venta === "rechazado" || 
            ventas.estado_venta === "enviado" ||
            ventas.estado_venta === "cotizacion"
        ) {
            return true;
        } else {
            return false;
        }
    }


    const esCredito = () => { 
        if (
            ventas.tipo_venta === tipoVenta.credito ||
            ventas.tipo_venta === tipoVenta.adelanto
        ) {
            return true;
        } else {
            return false;
        }
    }
    

    return (
        <DropDown width="190">

            <span onClick={ () => handlerVer(ventas.id) } >
                <BiShowAlt /> Ver detalles
            </span>

            {
                (esCredito() && !anulado())
                && (
                    <span onClick={ () => handlerCredito(ventas.id) } >
                        <BiBookBookmark /> Cred/Adel
                    </span>
                )
            }

            {
                (ventas.estado_venta === "listo" && !esCredito())
                && (
                    <span onClick={ () => handlerReimprimir(ventas.id) } >
                        <BiBookmarkAltMinus /> Imprimir
                    </span>
                )
            }

            {
                esVenta
                && <span onClick={ () => handlerConvertirComp(ventas.id) } >
                    <BiMoveHorizontal /> Cambiar Comp.
                </span>
            }

            {
                !anulado()
                && <span onClick={ () => handlerAnular(ventas.id, ventas.locales.id) } >
                    <BiX /> Anular Venta
                </span>
            }
                        
        </DropDown>
    )
}


/* {
    (ventas.estado_venta === "rechazado" ||
    ventas.estado_venta === "rechazado")
    && (
        <span onClick={ () => updateData(ventas.id) } >
            <BiLike /> Habilitar venta
        </span>
    )
} */