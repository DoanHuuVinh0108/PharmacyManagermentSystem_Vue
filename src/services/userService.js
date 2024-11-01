import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/User";

async function getUsers({ page, pageSize }) {
  const response = await axios.get(`${baseURL}/getAll/${page}/${pageSize}`);
  console.log(response);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function createUser(user) {
  try {
    const response = await axios.post(`${baseURL}/add`, user);
    if (response.status == 200) {
      showToast({ description: "Thêm người dùng thành công", type: "success" });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Thêm người dùng thất bại", type: "error" });
    return false;
  }
}

async function updateUser(user) {
  try {
    const response = await axios.put(`${baseURL}/update`, user);
    if (response.status == 200) {
      showToast({
        description: "Cập nhật người dùng thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Cập nhật người dùng thất bại", type: "error" });
    return false;
  }
}

async function deleteUser(payload) {
  try {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if (response.status == 200) {
      showToast({ description: "Xóa người dùng thành công", type: "success" });
      return true;
    }
  } catch (error) {
    showToast({ description: "Xóa người dùng thất bại", type: "error" });
    return false;
  }
}

async function findByPhoneNumber(phoneNumber) {
  const response = await axios.get(
    `${baseURL}/findByPhoneNumber/${phoneNumber}`
  );
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function getUserByRole(role) {
  const response = await axios.get(`${baseURL}/getByRole/${role}`);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  findByPhoneNumber,
  getUserByRole,
};
