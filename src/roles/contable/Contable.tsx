import { Header } from "../../components/layouts/Header"
import { Comprobantes } from "../../pages/registros/ventas/Comprobantes"

export const Contable = () => {
    return (
        <div className="contable">
            <Header />
            <div className="wrap-contable">
                <div className="box-contable">
                    <Comprobantes idLocal={"_"} contable />
                </div>
            </div>
        </div>
    )
}
