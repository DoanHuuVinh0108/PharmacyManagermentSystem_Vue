import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/Category";

async function getCategories({ page, pageSize }) {
  const response = await axios.get(`${baseURL}/getAll/${page}/${pageSize}`);
  console.log(response);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function createCategory(category) {
  try {
    const response = await axios.post(`${baseURL}/add`, category);
    if (response.status == 200) {
      showToast({
        description: "Thêm danh mục thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({
      description: "Thêm danh mục thất bại",
      type: "error",
    });
  }
  return false;
}

async function updateCategory(category) {
  try {
    const response = await axios.put(`${baseURL}/update`, category);
    if (response.status == 200) {
      showToast({
        description: "Cập nhật danh mục thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({
      description: "Cập nhật danh mục thất bại",
      type: "error",
    });
    return false;
  }
}

async function deleteCategory(payload) {
  try {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if (response.status == 200) {
      showToast({
        description: "Xóa danh mục thành công",
        type: "success",
      });
      return true;
    }
  } catch (error) {
    showToast({
      description: "Xóa danh mục thất bại",
      type: "error",
    });
    return false;
  }
}

async function findByNameCategory(name) {
  const response = await axios.get(`${baseURL}/find/${name}`);
  console.log(response);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  findByNameCategory,
};
