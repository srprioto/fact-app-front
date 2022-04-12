interface modalWrap {
    modal:boolean;
    children:any;
}

// evita que el modal inicie con el componente
export const ModalWrap = ({ modal, children }:modalWrap) => {
    return (
        <>
            {
                modal
                && children
            }
        </>
    )
}
