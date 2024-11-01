import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/Doctor";

async function getDoctors({ page, pageSize }) {
  const response = await axios.get(`${baseURL}/getAll/${page}/${pageSize}`);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function createDoctor(doctor) {
  try {
    const response = await axios.post(`${baseURL}/add`, doctor);
    if (response.status == 200) {
      showToast({
        description: "Thêm bác sĩ thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({
      description: "Thêm bác sĩ thất bại",
      type: "error",
    });
    return false;
  }
}

async function updateDoctor(doctor) {
  try {
    const response = await axios.put(`${baseURL}/update/${doctor.id}`, doctor);
    if (response.status == 200) {
      showToast({
        description: "Cập nhật bác sĩ thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({
      description: "Cập nhật bác sĩ thất bại",
      type: "error",
    });
    return false;
  }
}

async function deleteDoctor(payload) {
  try {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if (response.status == 200) {
      showToast({
        description: "Xóa bác sĩ thành công",
        type: "success",
      });
      return true;
    }
  } catch (error) {
    showToast({
      description: "Xóa bác sĩ thất bại",
      type: "error",
    });
    return false;
  }
}

export { getDoctors, createDoctor, updateDoctor, deleteDoctor };
