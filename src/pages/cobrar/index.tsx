import { useParams } from "react-router-dom";
import { Layout } from "../../components/layouts/Layout"
import { Cobrar } from "./part/Cobrar"

export const IndexCobrar = () => {

    const params = useParams(); // params.id, params.nombre

    const idLocal:any = params.id
    const nombreLocal:any = params.nombre

    return (
        <Layout>
            <Cobrar
                idLocal={idLocal}
                nombreLocal={nombreLocal}
            />
        </Layout>
    )
}

