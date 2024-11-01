import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/Pharmacy";

async function getPharmacies({ page, pageSize }) {
  const response = await axios.get(`${baseURL}/getAll/${page}/${pageSize}`);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

async function createPharmacy(pharmacy) {
  try {
    const response = await axios.post(`${baseURL}/add`, pharmacy);
    if (response.status == 200) {
      showToast({ description: "Thêm nhà thuốc thành công", type: "success" });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Thêm nhà thuốc thất bại", type: "error" });
    return false;
  }
}

async function updatePharmacy(pharmacy) {
  try {
    const response = await axios.put(
      `${baseURL}/update/${pharmacy.id}`,
      pharmacy
    );
    if (response.status == 200) {
      showToast({
        description: "Cập nhật nhà thuốc thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Cập nhật nhà thuốc thất bại", type: "error" });
    return false;
  }
}

async function deletePharmacy(payload) {
  try {
    const response = await axios.delete(`${baseURL}/delete/${payload.id}`);
    if (response.status == 200) {
      showToast({ description: "Xóa nhà thuốc thành công", type: "success" });
      return true;
    }
  } catch (error) {
    showToast({ description: "Xóa nhà thuốc thất bại", type: "error" });
    return false;
  }
}

async function getAll() {
  const response = await axios.get(`${baseURL}/get`);
  if (response.status == 200) {
    return response.data;
  }
  return false;
}

export {
  getPharmacies,
  createPharmacy,
  updatePharmacy,
  deletePharmacy,
  getAll,
};
