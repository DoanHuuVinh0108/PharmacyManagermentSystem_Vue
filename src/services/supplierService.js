import axios from "axios";

const baseURL = 'https://localhost:7194/api/Supplier';

async function getAll(){
    const response = await axios.get(`${baseURL}/getAll`);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

export { getAll };