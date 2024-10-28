import axios from "axios";

const baseURL = 'https://localhost:7194/api/Shift';

async function getShifts({page, pageSize,pharmacyId}) {
    const response = await axios.get(`${baseURL}/getByPage/${page}/${pageSize}/${pharmacyId}`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function createShift(shift) {
    const response = await axios.post(`${baseURL}/add`, shift);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function updateShift(shift) {
    console.log(shift);
    const response = await axios.put(`${baseURL}/update`, shift);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function deleteShift(payload) {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if(response.status == 200) {
        return true;
    }
    return false;
}

export { getShifts,createShift,updateShift,deleteShift };

