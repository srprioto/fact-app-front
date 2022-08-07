import { BiReply } from "react-icons/bi"
import { Link } from "react-router-dom"

export const Page404 = () => {
    return (
        <div className="page-404 middle">
            <div className="middle">
                <div className="center">
                    <h1>404</h1>
                    <Link to="/"><BiReply /> Regresar</Link>
                </div>
            </div>
        </div>
    )
}
