import { Tickets } from "../tickets/Tickets";
import { FullScreen } from "./header/FullScreen";
import { User } from "./header/User";

export const Header = () => {

    return (
        <div className="header grid-2 gap">

            <div className="header-left">
                <FullScreen />
            </div>

            <div className="header-right">
                <Tickets />
                <User />
            </div>

        </div>
    )
};

