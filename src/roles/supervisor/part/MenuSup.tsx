import { BiBarChart, BiCartAlt, BiCoin, BiListOl } from "react-icons/bi"
import { BoxMenu } from "../../../components/layouts/menu/BoxMenu"
import { ItemMenu } from "../../../components/layouts/menu/ItemMenu"
import { MenuTop } from "../../../components/layouts/menu/MenuTop"
import { LoadingImg } from "../../../components/loads/LoadingImg"
import { useCaja } from "../../../hooks/useContext/caja.ts/useCaja"

export const MenuSup = () => {

    const caja = useCaja();
    const cajaState = caja.cajaState;
    const loadingCaja = caja.loadingCaja;

    return (
        <div className="menu">

            <MenuTop />

            <div className="menu-body">
                
                <BoxMenu titulo="Menu">
                    <ItemMenu end url="/local" label="Dashboard" icon={ <BiBarChart /> } />
                    <div className="items-menu-supervisor">
                    {
                        !loadingCaja
                        ? (
                            cajaState
                            ? (
                                <>
                                    <ItemMenu end url="/local/cobrar" label="Cobrar" icon={ <BiCoin /> } />
                                    <ItemMenu end url="/local/vender" label="Vender" icon={ <BiCartAlt /> } />
                                    <ItemMenu end url="/local/stock" label="Stock" icon={ <BiListOl /> } />
                                </>
                            ) : (
                                <div className="load-items-menu"></div>
                            )
                        ) : (
                            <div className="middle load-items-menu">
                                <LoadingImg />
                            </div>
                        )
                    }
                    </div>
                </BoxMenu>

            </div>

        </div>
    )
}
