import { Layout } from "../../components/layouts/Layout"
import { TransaccionRepo } from "./transacciones/TransaccionRepo"

export const Transacciones = () => {
    return (
        <Layout>
            <TransaccionRepo />
        </Layout>
    )
}
