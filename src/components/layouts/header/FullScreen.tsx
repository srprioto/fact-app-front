import { BiFullscreen } from "react-icons/bi";

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
            title="Permite intercambiar la pantalla del navegador normal a pantalla completa"
            className="pointer" 
            onClick={() => { fullScreenOn() }}
        >
            <BiFullscreen className="icon-header" />
        </div>
    )
}
