import { WrapTickets } from "../tickets/WrapTickets";
import { FullScreen } from "./header/FullScreen";
import { MenuDesplegable } from "./header/MenuDesplegable";
import { User } from "./header/User";

export const Header = () => {

    return (
        <div className="header grid-2 gap">

            <div className="header-left">
                <FullScreen />
                {/* <MenuDesplegable /> */}
            </div>

            <div className="header-right">
                <WrapTickets />
                <User />
            </div>

        </div>
    )
};

