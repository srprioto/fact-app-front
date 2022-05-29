import { useParams } from "react-router-dom";
import { Layout } from "../../components/layouts/Layout"
import { CajaChica } from "./part/CajaChica"

export const IndexCajaChica = () => {

    const params = useParams(); // params.id, params.nombre

    const idLocal:any = params.id;
    const nombreLocal:any = params.nombre;

    return (
        <Layout>
            <CajaChica
                idLocal={idLocal}
                nombreLocal={nombreLocal}
            />
        </Layout>
    )
}
