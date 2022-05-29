import { useParams } from "react-router-dom";
import { Layout } from "../../components/layouts/Layout"
import { Tienda } from "./part/Tienda";

export const IndexLocal = () => {

    const params = useParams(); // params.id, params.nombre

    const idLocal:any = params.id
    const nombreLocal:any = params.nombre


    return (
        <Layout>
            <Tienda 
                idLocal={idLocal}
                nombreLocal={nombreLocal}
            />
        </Layout>
    )
}
