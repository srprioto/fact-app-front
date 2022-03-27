import { Header } from "./Header";
import { Menu } from "./Menu";

export const Layout = ({ children }:any) => {
    return (
        <div className="layout">
            <Menu />
            <div className="wrap-main">
                <Header />
                <div className="main">
                    {
                        // paginas aqui
                        children
                    }
                </div>
            </div>
        </div>
    ) 
};
