import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/UserShift";

async function createUserShift(userShift) {
  try {
    const response = await axios.post(`${baseURL}/add`, userShift);
    if (response.status == 200) {
      showToast({
        description: "Đăng ký ca làm việc thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Đăng ký ca làm việc thất bại", type: "error" });
    return false;
  }
}

async function getUserShiftById(id, pharmacyId) {
  const response = await axios.get(`${baseURL}/getById/${id}/${pharmacyId}`);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}
async function getUserShiftByDate(date, pharmacyId) {
  const response = await axios.get(
    `${baseURL}/getByDate/${date}/${pharmacyId}`
  );
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function deleteUserShift(id, date, pharmacyId) {
  try {
    const response = await axios.delete(
      `${baseURL}/delete/${id}/${date}/${pharmacyId}`
    );
    if (response.status == 200) {
      showToast({ description: "Hủy ca làm việc thành công", type: "success" });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Hủy ca làm việc thất bại", type: "error" });
    return false;
  }
}

export {
  createUserShift,
  getUserShiftById,
  getUserShiftByDate,
  deleteUserShift,
};
