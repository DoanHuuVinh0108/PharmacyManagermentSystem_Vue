import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/Shift";

async function getShifts({ page, pageSize, pharmacyId }) {
  const response = await axios.get(
    `${baseURL}/getByPage/${page}/${pageSize}/${pharmacyId}`
  );
  console.log(response);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function createShift(shift) {
  const response = await axios.post(`${baseURL}/add`, shift);
  if (response.status == 200) {
    showToast({ description: "Thêm ca làm việc thành công", type: "success" });
    return response.data;
  }
  showToast({ description: "Thêm ca làm việc thất bại", type: "error" });
  return false;
}

async function updateShift(shift) {
  const response = await axios.put(`${baseURL}/update`, shift);
  if (response.status == 200) {
    showToast({
      description: "Cập nhật ca làm việc thành công",
      type: "success",
    });
    return response.data;
  }
  showToast({ description: "Cập nhật ca làm việc thất bại", type: "error" });
  return false;
}

async function deleteShift(payload) {
  try {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if (response.status == 200) {
      showToast({ description: "Xóa ca làm việc thành công", type: "success" });
      return true;
    }
  } catch (error) {
    showToast({ description: "Xóa ca làm việc thất bại", type: "error" });
    return false;
  }
}

export { getShifts, createShift, updateShift, deleteShift };
