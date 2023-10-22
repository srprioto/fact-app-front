const API_URL = process.env.REACT_APP_API_URL;
const headers = {
    "Content-Type": "application/json"
}

async function get(endpoint:string) {

    let data;

    try {
        const response = await fetch(API_URL + endpoint, { 
            method: "GET", 
            headers
        })
        const res = await response.json();
        data = res.data;
        
    } catch (error) {
        console.log(error);
        document.location.href = "/#/404";
    }

    return data;

}


async function paginate(endpoint:string) {

    let res;
    try {
        const response = await fetch(API_URL + endpoint, { 
            method: "GET", 
            headers
        })
        res = await response.json();
        
        
    } catch (error) {
        console.log(error);
        document.location.href = "/#/404";
    }
    return res;

}


async function getOne(id:number, endpoint:string) {

    let data;

    try {
        const response = await fetch(API_URL + endpoint + "/" + id, { 
            method: "GET", 
            headers
        })
        const res = await response.json();
        data = res.data;

    } catch (error) {
        console.log(error);
        document.location.href = "/#/404";
    }

    return data;

}


async function post(data:any, endpoint:string) {
    let post;
    try {
        post = await fetch(API_URL + endpoint, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers
        })
        post = await post.json()
    } catch (error) {
        console.log(error);
        document.location.href = "/#/404";
    }
    return post
}


async function put(id:number, data:any, endpoint:string) {

    let put;

    try {

        put = await fetch(API_URL + endpoint + "/" + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers
        })
        put = await put.json()

    } catch (error) {
        console.log(error);
        document.location.href = "/#/404";
    }

    return put

}


async function destroy(id:number|null|undefined, endpoint:string) {

    let data;

    try {
        const response = await fetch(API_URL + endpoint + "/" + id,{ 
            method: "DELETE"
        })
        const res = await response.json();
        data = res.data;
        
    } catch (error) {
        console.log(error);
        document.location.href = "/#/404";
    }

    return data;

}


async function downloadFile(endpoint:string, nombre_archivo:string, loading:any, modal?:any) {
    loading.setLoading(true);

    // Realiza la solicitud GET para obtener el archivo
    fetch(endpoint)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.blob(); // Obtener el contenido del archivo como un Blob
    })
    .then((blob) => {
        // Crear una URL de objeto a partir del Blob
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace temporal para iniciar la descarga
        const link = document.createElement('a');
        link.href = url;
        link.download = nombre_archivo; // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();

        // Liberar la URL del objeto cuando ya no se necesita
        window.URL.revokeObjectURL(url);
    })
    .then(() => { 
        loading.setLoading(false);
        modal.setModal(false);
    })
    .catch((error) => {
        console.error(error);
        loading.setLoading(false);
    });
}


// function url(){
//     return API_URL;
// }


export {
    get,
    paginate,
    getOne,
    post, 
    put, 
    destroy,
    downloadFile,
    API_URL,
    // ur1l
}
