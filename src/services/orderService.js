import axios from "axios";

const baseURL = 'https://localhost:7194/api/Order';

async function createOrder(order) {
    const response = await axios.post(`${baseURL}/add`, order);
    console.log("test",response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
} 

export { createOrder };