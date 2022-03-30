interface ModalWrap {
    modal:boolean;
    children:any;
}

// evita que el modal inicie con el componente
export const ModalWrap = ({ modal, children }:ModalWrap) => {
    return (
        <>
            {
                modal
                && children
            }
        </>
    )
}
