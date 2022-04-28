// suma los valores de una array de objetos
// donde:
// * key .- es el valor del objeto que se sumara
export const sumaArrayObj = (array:Array<any>, key:any) => {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
}