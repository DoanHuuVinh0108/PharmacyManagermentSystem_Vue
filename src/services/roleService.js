import axios from "axios";

const baseURL = 'https://localhost:7194/api/Role';

async function getRoles() {
    const response = await axios.get(`${baseURL}/getAll`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

export { getRoles };