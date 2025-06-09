import axios from "axios"


const getApiUrl = () =>{

    const origin = window.location.origin;
    if(origin.includes("localhost")) return "http://localhost:8080"
    return origin

};

export const apiClient = axios.create({
    baseURL : getApiUrl(),
    withCredentials : false,

})