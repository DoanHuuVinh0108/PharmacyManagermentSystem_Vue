import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/Receipt";

async function addReceipt(receipt) {
  try {
    const response = await axios.post(`${baseURL}/addReceipt`, receipt);
    if (response.status == 200) {
      showToast({ description: "Thêm đơn nhập thành công", type: "success" });
      return response.data;
    }
  } catch (error) {
    showToast({ description: "Thêm đơn nhập thất bại", type: "error" });
    return false;
  }
}

export { addReceipt };
