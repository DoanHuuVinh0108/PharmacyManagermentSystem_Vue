import axios from "axios";
import { showToast } from "../utils/index";
const baseURL = "https://localhost:7194/api/Order";

async function createOrder(order) {
  try {
    const response = await axios.post(`${baseURL}/add`, order);
    if (response.status == 200) {
      showToast({
        description: "Thêm đơn hàng thành công",
        type: "success",
      });
      return response.data;
    }
  } catch (error) {
    showToast({
      description: "Thêm đơn hàng thất bại",
      type: "error",
    });
    return false;
  }
}

export { createOrder };
