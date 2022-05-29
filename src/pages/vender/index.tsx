import { useParams } from "react-router-dom";
import { Layout } from "../../components/layouts/Layout"
import { CajaProvider } from "../../hooks/useContext/caja.ts/CajaProvider";
import { Vender } from "./part/Vender"

export const IndexVender = () => {

    const params = useParams(); // params.id, params.nombre
    const idLocal:any = params.id;

    return (
        <Layout>
            <CajaProvider>
                <Vender
                    idLocal={idLocal}
                    nombreLocal={params.nombre}
                />
            </CajaProvider>
        </Layout>
    )
}
