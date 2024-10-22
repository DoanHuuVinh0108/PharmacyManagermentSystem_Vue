import axios from "axios";

const baseURL = 'https://localhost:7194/api/Category';

async function getCategories() {
    const response = await axios.get(`${baseURL}/getAll`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function createCategory(category) {
    const response = await axios.post(`${baseURL}/add`, category);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function updateCategory(category) {
    console.log(category);
    const response = await axios.put(`${baseURL}/update`, category);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function deleteCategory(payload) {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if(response.status == 200) {
        return true;
    }
    return false;
}

async function findByNameCategory(name) {
    const response = await axios.get(`${baseURL}/find/${name}`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

export { getCategories,createCategory,updateCategory,deleteCategory ,findByNameCategory};