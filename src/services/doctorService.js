import axios from "axios";

const baseURL = 'https://localhost:7194/api/Doctor';

async function getDoctors() {
    const response = await axios.get(`${baseURL}/getAll`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function createDoctor(doctor) {
    const response = await axios.post(`${baseURL}/add`, doctor);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function updateDoctor(doctor) {
    console.log(doctor);
    const response = await axios.put(`${baseURL}/update/${doctor.id}`, doctor);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function deleteDoctor(payload) {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if(response.status == 200) {
        return true;
    }
    return false;
}

export { getDoctors,createDoctor,updateDoctor,deleteDoctor };