import axios from "axios";

const baseURL = 'https://localhost:7194/api/Medicine';

async function getByCategory(category) {
    const response = await axios.get(`${baseURL}/getByCategoryId/${category}`);
    if(response.status == 200) {
        return response.data;
    }
    return false;   
}

async function getBatchNumberAndCategory(batchNumber, category) {
    const response = await axios.get(`${baseURL}/getByBatchNumber/${batchNumber}/${category}`);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function getQuality(batchNumber,category, id) {
    const response = await axios.get(`${baseURL}/getQuality/${batchNumber}/${category}/${id}`);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

export { getByCategory,getBatchNumberAndCategory,getQuality };