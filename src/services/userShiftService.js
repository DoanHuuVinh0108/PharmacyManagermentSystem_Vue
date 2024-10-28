import axios from "axios";

const baseURL = 'https://localhost:7194/api/UserShift';

async function createUserShift(userShift) {
    const response = await axios.post(`${baseURL}/add`, userShift);
    if(response.status == 200) {
        return response.data;
    }
    return false;
    
}

async function getUserShiftById(id,pharmacyId) {
    const response = await axios.get(`${baseURL}/getById/${id}/${pharmacyId}`);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}
async function getUserShiftByDate(date,pharmacyId) {
    const response = await axios.get(`${baseURL}/getByDate/${date}/${pharmacyId}`);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function deleteUserShift(id,date,pharmacyId) {
    const response = await axios.delete(`${baseURL}/delete/${id}/${date}/${pharmacyId}`);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

export { createUserShift,getUserShiftById,getUserShiftByDate,deleteUserShift };