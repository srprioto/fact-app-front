import { BiReply } from "react-icons/bi"
import { Link } from "react-router-dom"

export const Page404 = () => {
    return (
        <div className="page-404 middle">
            <div className="middle">
                <div className="center">
                    <Link to="/dashboard"><h3>ADDIDSPORT</h3></Link>
                    <h1>404</h1>
                    <p>Algo salio mal!</p>
                    {/* <button onClick={() => navigate(-1)} className="btn-show red-text center">
                        <BiReply /> Regresar
                    </button> */}
                    <Link to="/dashboard" className="btn-show red-text center"><BiReply /> Regresar</Link>
                </div>
            </div>
        </div>
    )
}
