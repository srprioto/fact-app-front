import { BiFullscreen } from "react-icons/bi";
import { ToolTip } from "../../tooltip/ToolTip";

export const FullScreen = () => {

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
        <div 
            id="full-screen"
            className="pointer" 
            onClick={() => { fullScreenOn() }}
        >
            <BiFullscreen className="icon-header" />
            <ToolTip 
                anchor="full-screen" 
                descripcion="
                    Permite intercambiar la pantalla del<br/>
                    navegador normal a pantalla completa
                "
            />
        </div>
    )
}
