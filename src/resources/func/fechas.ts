import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export const fecha = (fecha:any) => {
    return moment(fecha).format('DD MMMM YYYY - LT');
}


export const fechaNoHora = (fecha:any) => {
    return moment(fecha).format('DD MMMM YYYY');
}
