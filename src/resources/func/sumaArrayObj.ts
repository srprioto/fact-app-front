// suma los valores de una array de objetos
// donde:
// * key .- es el valor del objeto que se sumara
export const sumaArrayObj = (array:Array<any>, key:any) => {
    const suma:number = Number(array.reduce((a, b) => {
        return Number(a) + Number((b[key] || 0))
    }, 0))
    return suma
}