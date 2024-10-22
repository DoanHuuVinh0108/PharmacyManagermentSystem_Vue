import axios from "axios";

const baseURL = 'https://localhost:7194/api/Pharmacy';

async function getPharmacies() {
    const response = await axios.get(`${baseURL}/getAll`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function createPharmacy(pharmacy) {
    const response = await axios.post(`${baseURL}/add`, pharmacy);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function updatePharmacy(pharmacy) {
    console.log(pharmacy);
    const response = await axios.put(`${baseURL}/update/${pharmacy.id}`, pharmacy);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}   

async function deletePharmacy(payload) {    
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if(response.status == 200) {
        return true;
    }
    return false;
}

export { getPharmacies,createPharmacy,updatePharmacy,deletePharmacy };