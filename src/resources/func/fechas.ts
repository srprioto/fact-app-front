import moment from 'moment';
import 'moment/locale/es';

// let date = "2017-02-01 15:20:00.00";
// let pattern = "YYYY-MM-DD HH:mm:ss.SS"
// let d = moment(date, pattern).utc(false);

moment.locale('es');

export const fecha = (fecha:any) => {
    return moment(fecha).utc(false).format('DD MMMM YYYY - LT');
    // return moment(fecha).format('DD MMMM YYYY - LT');
}

export const fechaResumen = (fecha:any) => {
    return moment(fecha).utc(false).format('DD/MM/yy - LT');
}

export const fechaNoHora = (fecha:any) => {
    return moment(fecha).utc(false).format('DD MMMM YYYY');
}
