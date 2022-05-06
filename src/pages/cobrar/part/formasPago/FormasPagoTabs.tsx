import { DescripcionCliente } from "./DescripcionCliente"

export const FormasPagoTabs = ({ clientesExistente, clienteRapido, tabbs, updateCliente, modalCliente }:any) => {
    
    return (
        <div
            className={
                "desc-formas-pago m-0 box " + 
                (tabbs === 1 ? "border-success" : "") +
                (tabbs === 2 ? "border-info" : "") +
                (tabbs === 3 ? "border-warning" : "")
            } 
        >
            {
                tabbs === 1
                && (
                    <div className="nota-venta box-desc-formas-pago">
                        <div className="grid-1">

                            <DescripcionCliente
                                clienteExistente={clientesExistente}
                                clienteNuevo={clienteRapido}
                                updateCliente={updateCliente}
                                modalCliente={modalCliente}
                            />


                        </div>
                    </div>
                )
            }
            {
                tabbs === 2
                && (
                    <div className="boleta box-desc-formas-pago">
                        <h1>boleta</h1>
                    </div>
                )
            }
            {
                tabbs === 3
                && (
                    <div className="factura box-desc-formas-pago">
                        <h1>factura</h1>
                    </div>
                )
            }

        </div>
    )
}
