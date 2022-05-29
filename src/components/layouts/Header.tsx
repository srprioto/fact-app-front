import { BiFullscreen } from "react-icons/bi";
import { User } from "./header/User";

export const Header = () => {

    const fullScreenOn = () => { 
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    return (
        <div className="header grid-5 gap">

            <div className="icons-header grid-7 gap">
                <span className="" onClick={() => { fullScreenOn() }}>
                    <BiFullscreen />
                </span>

            </div>

            <div></div>

            <div></div>

            <div></div>

            <User />

        </div>
    )
};

