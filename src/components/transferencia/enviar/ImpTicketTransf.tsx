import { useEffect, useRef } from "react";
import { BiCheckbox } from "react-icons/bi";
import { useAuth } from "../../../auth/useAuth";
import { ahora, fecha } from "../../../resources/func/fechas";

interface impTicketTransf {
    setImprimir:Function;
    setModal:Function;
    transferencia:any;
    listaProductos:any;
    nombreLocal?:string;
    locales:Array<any>;
}

export const ImpTicketTransf = ({ setImprimir, setModal, transferencia, listaProductos, nombreLocal, locales }:impTicketTransf) => {

    const imprimir = useRef<any>(null);
    const auth = useAuth();

    useEffect(() => {
        handlerPrint();
    }, [])
        

    const handlerPrint = () => { 
        let ventimp:any = window.open(' ', 'popimpr');
        ventimp.document.write( imprimir.current.innerHTML );
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
        setImprimir(false);
        setModal(false);
    }


    const findLocal = (id:number) => { 
        return locales.find((e) => {
            if (Number(e.id) === Number(id)) {
                return true;
            }else{
                return false;
            }
        })
    }


    // estilos
    const center:any = {
        fontFamily: "arial",
        textAlign: "center"
    }
    const table:any = {
        borderCollapse: "separate",
        borderSpacing: "10px 0"
    }
    const strong = {
        fontWeight: "600"
    }
    const grid2 = {
        display: "grid",
        gridTemplateColumns: "1fr 2fr"
    }
    const texto = {
        fontFamily: "arial",
        fontWeight: "100",
        fontSize: "12px",
    }
    const parrafo = {
        ...texto,
        display: "inline-block",
        margin: "0"
    }
    
    const margin15 = {
        margin: "0 0 15px 0"
    }
    const borderbottom = {
        borderBottom: "1px dotted #000"
    }


    return (
        <div className="none">
            <div ref={imprimir}>
                <div style={margin15}>
                    <h3 style={center}>Constancia de transferencia de productos</h3>
                    <div>
                        <span style={grid2}>
                            <p style={parrafo}>Origen: </p>
                            <p style={{...parrafo, ...strong}}>{ nombreLocal }</p>
                        </span>
                        <span style={grid2}>
                            <p style={parrafo}>Destino: </p>
                            <p style={{...parrafo, ...strong}}>{ findLocal(transferencia.localDestino).nombre }</p>
                        </span>
                        <span style={grid2}>
                            <p style={parrafo}>Enviado por: </p>
                            <p style={{...parrafo, ...strong}}>{ auth.userInfo.name }</p>
                        </span>
                        <span style={grid2}>
                            <p style={parrafo}>Fecha: </p>
                            <p style={{...parrafo, ...strong}}>{ fecha(ahora()) }</p>
                        </span>
                    </div>
                </div>
                <table style={{...table, ...margin15}}>
                    <thead>
                        <tr style={texto}>
                            {/* <th>Cod</th> */}
                            <th>Prod</th>
                            {/* <th>Marca</th>
                            <th>Talla</th> */}
                            <th>Cant</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaProductos.map((e:any, index:number) => {

                                const producto:string = 
                                    e.productoNombre + " - " + 
                                    e.productoNombre + " - " + 
                                    e.productoNombre;

                                return (
                                    <tr key={index} style={texto}>
                                        {/* <td>{ e.codigo }</td> */}
                                        <td>{ producto }</td>
                                        {/* <td>{ e.marca }</td>
                                        <td>{ e.talla }</td> */}
                                        <td>{ e.cantidad }</td>
                                        <td><BiCheckbox size="25" /></td>
                                    </tr>            
                                );                                
                            })
                        }
                        
                    </tbody>
                </table>
                <div>
                    <span style={grid2}>
                        <p style={parrafo}>Observación: </p>
                        <p style={{...parrafo, ...borderbottom}}></p>
                    </span>
                </div>
            </div>
        </div>
    )
}
