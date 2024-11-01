import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/Medicine";

async function getProducts({ page, pageSize, pharmacyId }) {
  const response = await axios.get(
    `${baseURL}/getAll/${page}/${pageSize}/${pharmacyId}`
  );
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function createProduct(product) {
  try {
    const response = await axios.post(`${baseURL}/add`, product);
    if (response.status == 200) {
      showToast({ description: "Thêm sản phẩm thành công", type: "success" });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Thêm sản phẩm thất bại", type: "error" });
    return false;
  }
}

async function updateProduct(product) {
  try {
    const response = await axios.put(`${baseURL}/update`, product);
    if (response.status == 200) {
      showToast({
        description: "Cập nhật sản phẩm thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Cập nhật sản phẩm thất bại", type: "error" });
    return false;
  }
}

async function deleteProduct(payload) {
  try {
    const response = await axios.delete(
      `${baseURL}/delete/${payload.id}/${payload.batchNumber}/${payload.categoryId}`
    );
    if (response.status == 200) {
      showToast({ description: "Xóa sản phẩm thành công", type: "success" });
      return true;
    }
  } catch (error) {
    showToast({ description: "Xóa sản phẩm thất bại", type: "error" });
    return false;
  }
}

export { getProducts, createProduct, updateProduct, deleteProduct };
