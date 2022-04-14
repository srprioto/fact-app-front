const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "https://dry-reef-20604.herokuapp.com";
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
        console.log(error)
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
        console.log(error)
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
    }

    return data;

}

function url(){
    return API_URL;
}


export {
    get,
    paginate,
    getOne,
    post, 
    put, 
    destroy,
    url
}
