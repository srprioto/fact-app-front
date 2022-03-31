interface BoxFixed {
    condicion:boolean;
    children:any;
}

export const BoxFixed = ({ condicion, children }:BoxFixed) => {
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
