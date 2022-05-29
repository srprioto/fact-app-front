import { Header } from "../../components/layouts/Header"
import { CajaProvider } from "../../hooks/useContext/caja.ts/CajaProvider";
import { WrapVender } from "./WrapVender";

export const Seller = () => {

    return (
        <CajaProvider>
            <div className="seller">
                <Header />
                <WrapVender />
            </div>
        </CajaProvider>
    )
}

