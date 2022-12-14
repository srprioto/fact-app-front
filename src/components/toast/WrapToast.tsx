interface toastWrap {
    toast:boolean;
    children:any;
}

export const WrapToast = ({ toast, children }:toastWrap) => {
    return ( toast && children );
}
