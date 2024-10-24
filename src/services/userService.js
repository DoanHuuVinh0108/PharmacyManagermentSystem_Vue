import axios from "axios";

const baseURL = 'https://localhost:7194/api/User';

async function getUsers({page, pageSize}) {
    const response = await axios.get(`${baseURL}/getAll/${page}/${pageSize}`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function createUser(user) {
    const response = await axios.post(`${baseURL}/add`, user);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function updateUser(user) {
    const response = await axios.put(`${baseURL}/update`, user);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function deleteUser(payload) {
    
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if(response.status == 200) {
        return true;
    }
    return false;
}

async function findByPhoneNumber(phoneNumber) {
    const response = await axios.get(`${baseURL}/findByPhoneNumber/${phoneNumber}`);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function getUserByRole(role){
    const response = await axios.get(`${baseURL}/getByRole/${role}`);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

export { getUsers,createUser,updateUser,deleteUser,findByPhoneNumber,getUserByRole };