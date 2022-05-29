import { Header } from "../../components/layouts/Header";
import { CajaProvider } from "../../hooks/useContext/caja.ts/CajaProvider";
import { MenuSup } from "./part/MenuSup";

export const Supervisor = ({ children }:any) => {

    return (
        <CajaProvider>
            <div className="supervisor">
                <div className="layout">
                    <MenuSup />
                    <div className="wrap-main">
                        <Header/>
                        <div className="main">
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </CajaProvider>
    )
}
