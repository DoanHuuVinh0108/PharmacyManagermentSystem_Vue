import axios from "axios";

const baseURL = 'https://localhost:7194/api/Medicine';

async function getProducts({page, pageSize,pharmacyId}) {
    const response = await axios.get(`${baseURL}/getAll/${page}/${pageSize}/${pharmacyId}`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function createProduct(product) {
    const response = await axios.post(`${baseURL}/add`, product);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function updateProduct(product) {
    const response = await axios.put(`${baseURL}/update`, product);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function deleteProduct(payload) {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}/${payload.batchNumber}/${payload.categoryId}`);
    if(response.status == 200) {
        return true;
    }
    return false;
}

export { getProducts,createProduct,updateProduct,deleteProduct };