import axios from "axios";


const BaseURL = "https://b3c7-2804-774-8101-a81b-7d12-c81c-a952-361c.ngrok.io/api"


const api = axios.create({
    baseURL: BaseURL
});



export default api;