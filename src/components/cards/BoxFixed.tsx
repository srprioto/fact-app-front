interface boxFixed {
    condicion:boolean;
    children:any;
}

export const BoxFixed = ({ condicion, children }:boxFixed) => {
    return (
        condicion
        ? (
            <div className="box-fixed">
                { children }
            </div>
        ) : (
            <></>
        )
    )
}
