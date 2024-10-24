import axios from "axios";

const baseURL = 'https://localhost:7194/api/Salary';

async function getSalaries({page, pageSize}) {
    const response = await axios.get(`${baseURL}/getAll/${page}/${pageSize}`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function createSalary(salaryId) {
    const response = await axios.post(`${baseURL}/add`, salaryId);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function updateSalary(salary) {
    const response = await axios.put(`${baseURL}/update`, salary);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

async function deleteSalary({month, year, employeeId}) {
    const response = await axios.delete(`${baseURL}/delete/${month}/${year}/${employeeId}`);
    console.log(response);
    if(response.status == 200) {
        return response.data;
    }
    return false;
}

export { getSalaries, createSalary, updateSalary, deleteSalary };