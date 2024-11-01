import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/Salary";

async function getSalaries({ page, pageSize }) {
  const response = await axios.get(`${baseURL}/getAll/${page}/${pageSize}`);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function createSalary(salaryId) {
  try {
    const response = await axios.post(`${baseURL}/add`, salaryId);
    if (response.status == 200) {
      showToast({ description: "Thêm lương thành công", type: "success" });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Thêm lương thất bại", type: "error" });
    return false;
  }
}

async function updateSalary(salary) {
  try {
    const response = await axios.put(`${baseURL}/update`, salary);
    if (response.status == 200) {
      showToast({ description: "Cập nhật lương thành công", type: "success" });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Cập nhật lương thất bại", type: "error" });
    return false;
  }
}

async function deleteSalary({ month, year, employeeId }) {
  try {
    const response = await axios.delete(
      `${baseURL}/delete/${month}/${year}/${employeeId}`
    );
    if (response.status == 200) {
      showToast({ description: "Xóa lương thành công", type: "success" });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Xóa lương thất bại", type: "error" });
    return false;
  }
}

export { getSalaries, createSalary, updateSalary, deleteSalary };
