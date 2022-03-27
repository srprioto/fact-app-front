import { useState } from "react";
import { BiBarChart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CustomActiveShapePieChart } from "../../components/charts/CustomActiveShapePieChart";
import { RadioButton } from "../../components/forms/RadioButton";

export const Dashboard = () => {

    const [checked, setChecked] = useState<any>([]);

    const checkList = [
        {
            "id": 36,
            "estado_detalle": "enviado"
        },
        {
            "id": 37,
            "estado_detalle": "enviado"
        },
        {
            "id": 38,
            "estado_detalle": "enviado"
        },
        {
            "id": 39,
            "estado_detalle": "enviado"
        },
        {
            "id": 40,
            "estado_detalle": "enviado"
        },
        {
            "id": 41,
            "estado_detalle": "enviado"
        }
    ]


    // Add/Remove checked item from list
    const handleCheck = (e:any) => {
        var updatedList = [...checked];

        if (e.target.checked) {

            updatedList = [
                ...checked, 
                e.target.value
            ];

        } else {

            updatedList.splice(checked.indexOf(e.target.value), 1);

        }

        setChecked(updatedList);
    };

    // Generar cadena de elementos marcados
    const checkedItems = checked.length
        ? checked.reduce((total:any, item:any) => {
            return total + ", " + item;
        })
        : "";


    return (
        <div>
            <h2 className="title-page">Dashboard</h2>
            
            <div className="box">

                <h1>Lorem ipsum dolor sit amet</h1>
                <h2>Lorem ipsum dolor sit amet</h2>
                <h3>Lorem ipsum dolor sit amet</h3>
                <h4>Lorem ipsum dolor sit amet</h4>
                <h5>Lorem ipsum dolor sit amet</h5>
                <h6>Lorem ipsum dolor sit amet</h6>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt laboriosam sapiente nisi vel nam illum assumenda suscipit exercitationem ipsum quae cupiditate voluptatum, consectetur quod autem repellendus. Eum, libero fugit.
                </p>
                <span><Link to="#">autem repellendus. Eum</Link> Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit id itaque animi. Molestiae, libero est consectetur ex temporibus sit sunt excepturi suscipit Linkaiores corrupti tempora totam at reprehenderit, recusandae ab.</span>

            </div>
            
            <div className="box">

                <Link to="#" className="btn btn-primary">
                    btn btn-primary link 
                </Link>
                <Link to="#" className="btn btn-secundary">
                    btn btn-secundary link
                </Link>
                <Link to="#" className="btn btn-success">
                    btn btn-success link
                </Link>
                <Link to="#" className="btn btn-info">
                    btn btn-info link
                </Link>
                <Link to="#" className="btn btn-warning">
                    btn btn-warning link
                </Link>
                <Link to="#" className="btn btn-danger">
                    btn btn-danger link
                </Link>

                <br />

                <button className="btn btn-primary">
                    <BiBarChart /> btn btn-primary
                </button>
                <button className="btn btn-secundary">
                    btn btn-secundary
                </button>
                <button className="btn btn-success">
                    btn btn-success
                </button>
                <button className="btn btn-info">
                    btn btn-info
                </button>
                <button className="btn btn-warning">
                    btn btn-warning
                </button>
                <button className="btn btn-danger">
                    btn btn-danger
                </button>

            </div>

            <div className="box grid-3 gap">

                <div className="wrap-form">
                    <label htmlFor="">Nombre</label><br />
                    <input type="text" />
                </div>
                <div className="wrap-form">
                    <label htmlFor="">Nombre</label><br />
                    <input type="text" />
                </div>
                <div className="wrap-form">
                    <label htmlFor="">Nombre</label><br />
                    <input type="text" />
                </div>

            </div>

            <div className="box">

                <div className="checkList">

                    <div className="title">Your CheckList:</div>

                    <div className="list-container">
                        {checkList.map((item:any) => (

                            <div key={item.id}>

                                <input 
                                    value={item.id}
                                    type="checkbox"
                                    onChange={handleCheck}
                                />

                                <span> {item.id} </span>

                            </div>

                        ))}
                    </div>
                </div>

                <div>
                    {`Items checked are: ${checkedItems}`}
                </div>

            </div>

            <div className="box">

                {/* <RadioButton
                    name="precios"
                    values={
                        [
                            {
                                label: "Si",
                                value: "si"
                            },
                            {
                                label: "No",
                                value: "no"
                            },
                            {
                                label: "Talvez",
                                value: "talvez"
                            }
                        ]
                    }
                /> */}

            </div>

        </div>
    )
};
