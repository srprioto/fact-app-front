import { useState } from "react"

export const usePlugIn = () => { 

    const userStorage:any = localStorage.getItem('UserApp');

    const [loggedUserApp, setLoggedUserApp] = useState<any>(JSON.parse(userStorage) || null);

    return [loggedUserApp, setLoggedUserApp];

}