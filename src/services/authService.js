import axios from "axios";

const baseURL = 'https://localhost:7194/api/Auth/login';

async function login(user) {
    const response = await axios.post(`${baseURL}`, user);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

export { login };